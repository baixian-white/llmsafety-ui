/**
 * 老内核颜色降级插件（仅构建期生效）
 *
 * 背景：Tailwind v4 的调色板全部是 oklch()，任意色值加透明度（如 from-[#5830D6]/20）
 * 会直接输出 oklab()，渐变默认用 `in oklab` 插值 —— 这些都要 Chrome 111+ / Safari 16.2+。
 * 部分安卓系统自带浏览器仍是 Chrome 110 内核，在这些浏览器上：
 *   - `--color-purple-500: oklch(...)` 这类变量在使用时被判定无效
 *     → 背景透明、边框退回 currentColor（黑色），白字按钮/选中卡片直接「消失」
 *   - `linear-gradient(to right in oklab, ...)` 整条无效 → 渐变按钮、气泡没有背景
 *
 * （调色板颜色的透明度修饰符 bg-x/30 之类 Tailwind 4.1 已自带 hex 兜底，不需要处理）
 *
 * 做法：在产物 CSS 上做「渐进增强」改写，新内核看到的结果和原来完全一致：
 *
 *   :root { --c: oklch(62.7% .265 303.9) }
 *     ↓
 *   :root { --c: #ab4eff }
 *   @supports (color: oklch(0% 0 0)) { :root { --c: oklch(62.7% .265 303.9) } }
 *
 * 自定义属性（以及含 var() 的普通属性）在解析期都「合法」，同一规则里写两条只会
 * 后者覆盖前者，所以必须拆进 @supports；插入位置紧跟原规则、在同一个父级（@layer 等）内，
 * 不改变层叠顺序。
 */
import type { Plugin } from 'vite'
import postcss, { type AtRule, type Declaration, type Rule } from 'postcss'

// oklab() 与 oklch() 在各浏览器中同版本支持，共用一个检测条件
const SUPPORTS_OK_COLORS = '(color: oklch(0% 0 0))'
const SUPPORTS_GRADIENT_INTERPOLATION = '(background-image: linear-gradient(in oklab, red, red))'

const OK_COLOR_RE = /okl(?:ch|ab)\(/i
const OKLCH_RE = /oklch\(\s*([^()]*?)\s*\)/gi
const OKLAB_RE = /oklab\(\s*([^()]*?)\s*\)/gi
const GRADIENT_INTERPOLATION_RE = /\s+in\s+okl(?:ab|ch)(?:\s+(?:shorter|longer|increasing|decreasing)\s+hue)?\s*$/i

/* ------------------------------ 颜色换算 ------------------------------ */

/** 解析颜色分量；percentBase 为 100% 对应的数值（L:1，C/a/b:0.4，alpha:1） */
function parseComponent(token: string, percentBase: number): number | null {
  if (token === 'none') return 0
  const m = /^(-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?)(%|deg)?$/i.exec(token)
  if (!m) return null
  const n = parseFloat(m[1])
  return m[2] === '%' ? (n / 100) * percentBase : n
}

/** 解析 `x y z [/ alpha]` 形式的函数体，返回 [x, y, z, alpha] */
function parseColorBody(body: string, percentBases: [number, number, number]): [number, number, number, number] | null {
  const [main, alphaToken] = body.split('/')
  const parts = main.trim().split(/\s+/)
  if (parts.length !== 3) return null

  const values = parts.map((part, i) => parseComponent(part, percentBases[i]))
  const alpha = alphaToken === undefined ? 1 : parseComponent(alphaToken.trim(), 1)
  if (values.some((v) => v === null) || alpha === null) return null

  return [values[0]!, values[1]!, values[2]!, alpha]
}

function oklchToLinearSrgb(L: number, C: number, hueDeg: number): [number, number, number] {
  const h = (hueDeg * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)

  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

const EPS = 1e-4
const inGamut = (rgb: number[]) => rgb.every((v) => v >= -EPS && v <= 1 + EPS)

const toHexByte = (v: number) =>
  Math.round(Math.min(1, Math.max(0, v)) * 255)
    .toString(16)
    .padStart(2, '0')

function gammaEncode(v: number): number {
  return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055
}

/**
 * OKLCH → sRGB hex。Tailwind v4 很多颜色超出 sRGB 色域（P3），
 * 超出时保持明度和色相、二分收缩彩度，比直接截断 RGB 更接近原色。
 */
function lchToHex(L: number, C: number, H: number, alpha: number): string {
  let rgb: number[]
  if (L >= 1) rgb = [1, 1, 1]
  else if (L <= 0) rgb = [0, 0, 0]
  else {
    rgb = oklchToLinearSrgb(L, C, H)
    if (!inGamut(rgb)) {
      let lo = 0
      let hi = C
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2
        if (inGamut(oklchToLinearSrgb(L, mid, H))) lo = mid
        else hi = mid
      }
      rgb = oklchToLinearSrgb(L, lo, H)
    }
  }

  const hex = '#' + rgb.map((v) => toHexByte(gammaEncode(v))).join('')
  return alpha >= 1 ? hex : hex + toHexByte(alpha)
}

function oklchToHex(body: string): string | null {
  const parsed = parseColorBody(body, [1, 0.4, 1])
  return parsed && lchToHex(...parsed)
}

function oklabToHex(body: string): string | null {
  const parsed = parseColorBody(body, [1, 0.4, 0.4])
  if (!parsed) return null
  const [L, a, b, alpha] = parsed
  return lchToHex(L, Math.hypot(a, b), (Math.atan2(b, a) * 180) / Math.PI, alpha)
}

/* ------------------------------ CSS 改写 ------------------------------ */

interface Fallback {
  value: string
  condition: string
}

function getFallback(decl: Declaration): Fallback | null {
  if (OK_COLOR_RE.test(decl.value)) {
    const value = decl.value
      .replace(OKLCH_RE, (match, body: string) => oklchToHex(body) ?? match)
      .replace(OKLAB_RE, (match, body: string) => oklabToHex(body) ?? match)
    // 有任何一处没转成功就不动，避免产出半新半旧的值
    return OK_COLOR_RE.test(value) ? null : { value, condition: SUPPORTS_OK_COLORS }
  }

  if (decl.prop === '--tw-gradient-position' && GRADIENT_INTERPOLATION_RE.test(decl.value)) {
    const value = decl.value.replace(GRADIENT_INTERPOLATION_RE, '')
    // 只剩空值（如 bg-radial 的 `in oklab`）时无法安全降级，保持原样
    return value.trim() ? { value, condition: SUPPORTS_GRADIENT_INTERPOLATION } : null
  }

  return null
}

const isInsideKeyframes = (rule: Rule) =>
  rule.parent?.type === 'atrule' && /keyframes$/i.test((rule.parent as AtRule).name)

export function transformLegacyColors(css: string): string {
  const root = postcss.parse(css)

  // 先收集再处理，避免遍历到自己插入的 @supports 规则
  const rules: Rule[] = []
  root.walkRules((rule) => {
    if (!isInsideKeyframes(rule)) rules.push(rule)
  })

  for (const rule of rules) {
    const modernByCondition = new Map<string, Declaration[]>()

    rule.each((node) => {
      if (node.type !== 'decl') return
      const fallback = getFallback(node)
      if (!fallback) return

      // 自定义属性、以及含 var() 的普通属性在解析期都「合法」，后写的必然覆盖前者，只能拆进 @supports
      if (node.prop.startsWith('--') || /var\(/i.test(node.value)) {
        const list = modernByCondition.get(fallback.condition) ?? []
        list.push(node.clone())
        modernByCondition.set(fallback.condition, list)
        node.value = fallback.value
      } else {
        // 普通属性：老内核解析期会丢弃不认识的值，前面垫一条兜底即可
        node.cloneBefore({ value: fallback.value })
      }
    })

    let anchor: Rule | AtRule = rule
    for (const [condition, decls] of modernByCondition) {
      const supports = postcss.atRule({ name: 'supports', params: condition })
      supports.append(postcss.rule({ selector: rule.selector }).append(decls))
      anchor.after(supports)
      anchor = supports
    }
  }

  return root.toString()
}

export function legacyColorFallback(): Plugin {
  return {
    name: 'legacy-color-fallback',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue

        const source = typeof file.source === 'string' ? file.source : new TextDecoder().decode(file.source)
        if (!/okl(?:ch|ab)\(|in\s+okl(?:ab|ch)/i.test(source)) continue

        file.source = transformLegacyColors(source)
      }
    },
  }
}
