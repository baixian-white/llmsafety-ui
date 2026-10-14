<!-- src/pages/aisec/LifecycleIndex.vue -->
<template>
  <div class="relative min-h-screen overflow-hidden font-sans bg-surface text-foreground">
    <!-- 背景：动态星轨+网格+彩色光斑 -->
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <div class="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-[0.08]"></div>
      <div
        class="absolute -top-24 -left-24 w-[42rem] h-[42rem] bg-gradient-to-br from-indigo-600/25 via-fuchsia-500/15 to-transparent rounded-full blur-3xl">
      </div>
      <div
        class="absolute -bottom-24 -right-24 w-[42rem] h-[42rem] bg-gradient-to-tl from-cyan-500/20 via-emerald-400/10 to-transparent rounded-full blur-3xl">
      </div>
      <!-- 星轨/粒子 -->
      <div class="absolute inset-0 animate-twinkle opacity-60">
        <div v-for="n in 60" :key="'s' + n" class="star" :style="starStyle(n)"></div>
      </div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <!-- 头部 -->
      <header class="text-center mb-16 md:mb-20">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
          <span
            class="bg-gradient-to-r from-zinc-900 via-zinc-600 to-black dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
            AI 大模型安全 · 全生命周期安全工具及框架集合
          </span>
        </h1>
        <p class="mt-5 w-full mx-auto text-base sm:text-lg text-muted whitespace-nowrap overflow-x-auto">
          事前（预防）— 事中（检测与处置）— 事后（复盘与改进），以设计、监测与迭代构建可信 AI 的<strong
            class="text-indigo-600 dark:text-indigo-300">闭环治理</strong>。
        </p>
      </header>

      <!-- 核心：超大 3D 环形（可点击分区） -->
      <section class="mx-auto max-w-6xl">
        <div ref="ringRef" class="mx-auto relative select-none" :class="['ring-3d-wrapper']">
          <!-- 光晕 -->
          <div class="absolute inset-0 -z-10 blur-2xl opacity-70">
            <div
              class="absolute inset-0 bg-conic from-indigo-500 via-cyan-400 via-emerald-400 via-fuchsia-400 to-indigo-500 rounded-full opacity-30">
            </div>
          </div>

          <!-- 3D 圆环容器（SVG 层 + 立体阴影） -->
          <div class="relative h-[460px] sm:h-[520px] md:h-[620px] flex items-center justify-center preserve-3d">
            <!-- 阴影盘 -->
            <div class="absolute w-[58%] aspect-square rounded-full bg-black/30 blur-3xl translate-z--80"></div>

            <!-- 中心文字盘（悬浮） -->
            <div
              class="absolute w-[42%] aspect-square rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-2xl translate-z-60 flex items-center justify-center">
              <div class="text-center leading-tight">
                <div class="text-[12px] uppercase tracking-[0.2em] text-muted">LLM Security</div>
                <div
                  class="mt-0.5 text-2xl font-bold bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  生命周期</div>
              </div>
            </div>

            <!-- 环：使用三段 stroke，配合 conic 渐变描边发光 -->
            <svg class="relative w-[82%] aspect-square translate-z-40" viewBox="0 0 1000 1000"
              aria-labelledby="ringTitle ringDesc" role="group">
              <title id="ringTitle">生命周期环形图</title>
              <desc id="ringDesc">点击任意分段可进入 事前 / 事中 / 事后 页面</desc>

              <!-- 背景灰环 -->
              <circle cx="500" cy="500" r="330" fill="none" stroke="currentColor" stroke-opacity="0.15"
                stroke-width="88" />

              <!-- 事前（蓝紫） -->
              <g role="button" tabindex="0" class="cursor-pointer focus:outline-none focus:ring-0"
                @click="go('/aisec/before')" @keydown.enter.prevent="go('/aisec/before')">
                <defs>
                  <linearGradient id="seg1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#6366F1" />
                    <stop offset="100%" stop-color="#22D3EE" />
                  </linearGradient>
                  <!-- 文本走的圆弧路径（内缘，避免与粗描边重叠） -->
                  <!-- rText 取 286：= 330 - 44（线宽一半），可按需改小/改大 -->
                  <path id="beforeTextPath" d="M 500,500 m -330,0
                    a 286,286 0 1,1 660,0
                    a 286,286 0 1,1 -660,0" fill="none" />
                </defs>
                <circle cx="500" cy="500" r="330" fill="none" :stroke="isDark ? 'url(#seg1)' : 'url(#seg1)'"
                  stroke-width="88" stroke-linecap="round" :stroke-dasharray="segLen + ' ' + gapLen"
                  :stroke-dashoffset="0" class="transition-all duration-300 drop-glow-blue hover:opacity-95"
                  opacity="0.98" />
              </g>


              <!-- 事中（橙红） -->
              <g role="button" tabindex="0" class="cursor-pointer" @click="go('/aisec/during')"
                @keydown.enter.prevent="go('/aisec/during')">
                <defs>
                  <linearGradient id="seg2" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#F59E0B" />
                    <stop offset="100%" stop-color="#F43F5E" />
                  </linearGradient>
                  <!-- rText 取 286：= 330 - 44（线宽一半），可按需改小/改大 -->
                  <path id="afterTextPath" d="M 500,500 m -330,0
                    a 286,286 0 1,1 660,0
                    a 286,286 0 1,1 -660,0" fill="none" />
                </defs>
                <circle cx="500" cy="500" r="330" fill="none" :stroke="isDark ? 'url(#seg2)' : 'url(#seg2)'"
                  stroke-width="88" stroke-linecap="round" :stroke-dasharray="segLen + ' ' + gapLen"
                  :stroke-dashoffset="-segLen" class="transition-all duration-300 drop-glow-amber hover:opacity-95"
                  opacity="0.98" />

              </g>

              <!-- 事后（青绿） -->
              <g role="button" tabindex="0" class="cursor-pointer" @click="go('/aisec/after')"
                @keydown.enter.prevent="go('/aisec/after')">
                <defs>
                  <!-- 渐变 -->
                  <linearGradient id="seg3" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stop-color="#10B981" />
                    <stop offset="100%" stop-color="#14B8A6" />
                  </linearGradient>

                  <!-- 文本走的圆弧路径（内缘，避免与粗描边重叠） -->
                  <!-- rText 取 286：= 330 - 44（线宽一半），可按需改小/改大 -->
                  <path id="afterTextPath" d="M 500,500 m -330,0
                    a 286,286 0 1,1 660,0
                    a 286,286 0 1,1 -660,0" fill="none" />
                </defs>
                <!-- 圆环本体（带分段） -->
                <circle cx="500" cy="500" r="330" fill="none" :stroke="isDark ? 'url(#seg3)' : 'url(#seg3)'"
                  stroke-width="88" stroke-linecap="round" :stroke-dasharray="segLen + ' ' + gapLen"
                  :stroke-dashoffset="-segLen * 2" class="transition-all duration-300 drop-glow-green hover:opacity-95"
                  opacity="0.98" />

              </g>
              <text fill="#000000" font-size="24" font-weight="700" letter-spacing="0.5px" pointer-events="none">
                <textPath href="#beforeTextPath" startOffset="35%" text-anchor="middle">
                  AI 安全 · 事前阶段
                </textPath>
              </text>
                <text fill="#000000" font-size="24" font-weight="700" letter-spacing="0.5px" pointer-events="none">
                  <textPath href="#afterTextPath" startOffset="65%" text-anchor="middle" >
                    AI 安全 · 事中阶段
                  </textPath>
                </text>
          
              <text fill="#000000" font-size="24" font-weight="700" letter-spacing="0.5px" pointer-events="none">
                <textPath href="#afterTextPath" startOffset="95%" text-anchor="middle">
                  AI 安全 · 事后阶段
                </textPath>
              </text>

              <!-- 调味刻度 -->
              <!-- <g opacity="0.18">
                <circle cx="500" cy="500" r="292" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 10" />
                <circle cx="500" cy="500" r="374" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 10" />
              </g> -->

              <!-- 标签 -->
              <!-- <text x="640" y="200" text-anchor="middle" class="fill-current" :fill-opacity="0.9" style="font-weight:600;font-size:28px;">闭环强化</text>
              <text x="120" y="515" text-anchor="middle" class="fill-current" :fill-opacity="0.9" style="font-weight:600;font-size:28px;">实时预防</text>
              <text x="500" y="920" text-anchor="middle" class="fill-current" :fill-opacity="0.9" style="font-weight:600;font-size:28px;">安全设计</text> -->
            </svg>

            <!-- 浮动徽章（极坐标分布 + 3D 层级） -->
            <div v-for="(b, i) in badges" :key="i" class="badge badge-polar translate-z-80" :class="b.cls"
              :style="badgeStyle(b)">
              {{ b.text }}
            </div>
          </div>
        </div>

      </section>

      <!-- 三阶段·玻璃卡片入口 -->
      <section class="mt-24 md:mt-32 lg:mt-36 grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink to="/aisec/before" class="glass-card border-blue/20 hover:ring-blue">
          <div class="card-head from-indigo-500/20 to-cyan-400/20"></div>
          <h3 class="card-title text-indigo-600 dark:text-indigo-300">事前 · 预防（安全设计）</h3>
          <p class="card-desc">安全架构、数据隐私（DP/FL/HE）、模型对齐、访问控制、Guardrails 与安全标准。</p>
        </RouterLink>

        <RouterLink to="/aisec/during" class="glass-card border-amber/20 hover:ring-amber">
          <div class="card-head from-amber-400/20 to-rose-400/20"></div>
          <h3 class="card-title text-amber-600 dark:text-amber-300">事中 · 检测与处置（实时防护）</h3>
          <p class="card-desc">实时监测、告警联动、输入输出审计、速率限制、自动化熔断与回退、SOAR 编排。</p>
        </RouterLink>

        <RouterLink to="/aisec/after" class="glass-card border-emerald/20 hover:ring-emerald">
          <div class="card-head from-emerald-400/20 to-teal-400/20"></div>
          <h3 class="card-title text-emerald-600 dark:text-emerald-300">事后 · 复盘与改进（闭环强化）</h3>
          <p class="card-desc">取证回溯、影响评估、缺陷修复、规则与模型更新、知识库沉淀与持续 Evals。</p>
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

/** 环形分段长度（总周长 ≈ 2πr = 2073；我们做 1/3 段 + 1/3 gap） */
const segLen = 690
const gapLen = 2073 - segLen

/** 深色检测：系统 + html.dark */
const isDark = ref(false)
let mql: MediaQueryList | null = null
let obs: MutationObserver | null = null
onMounted(() => {
  const html = document.documentElement
  isDark.value = html.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches
  mql = window.matchMedia('(prefers-color-scheme: dark)')
  const onMedia = (e: MediaQueryListEvent) => { if (!html.classList.contains('dark')) isDark.value = e.matches }
  mql.addEventListener('change', onMedia); (mql as any)._handler = onMedia
  obs = new MutationObserver(() => { isDark.value = html.classList.contains('dark') || (mql?.matches ?? false) })
  obs.observe(html, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => {
  if (mql && (mql as any)._handler) mql.removeEventListener('change', (mql as any)._handler)
  if (obs) obs.disconnect()
})

/** 3D 倾斜交互（容器跟随鼠标） */
const ringRef = ref<HTMLElement | null>(null)
let rafId: number | null = null
let tx = 0, ty = 0, targetX = 0, targetY = 0
const damping = 12, tiltMax = 10
function onMove(e: MouseEvent) {
  const el = ringRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const nx = (e.clientX - cx) / (rect.width / 2)
  const ny = (e.clientY - cy) / (rect.height / 2)
  targetX = -(ny * tiltMax)
  targetY = nx * tiltMax
}
function animate() {
  tx += (targetX - tx) / damping
  ty += (targetY - ty) / damping
  if (ringRef.value) {
    ringRef.value.style.transform = `perspective(1100px) rotateX(${tx}deg) rotateY(${ty}deg)`
  }
  rafId = requestAnimationFrame(animate)
}
onMounted(() => {
  const el = ringRef.value
  if (!el) return
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', () => { targetX = 0; targetY = 0 })
  rafId = requestAnimationFrame(animate)
})
onBeforeUnmount(() => {
  if (ringRef.value) {
    ringRef.value.removeEventListener('mousemove', onMove)
  }
  if (rafId) cancelAnimationFrame(rafId)
})

/** 星点随机布局（纯样式，不加载图片） */
function starStyle(i: number) {
  // 简单伪随机
  const rnd = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }
  const top = Math.floor(rnd(i) * 100)
  const left = Math.floor(rnd(i * 1.37) * 100)
  const size = 1 + Math.floor(rnd(i * 2.17) * 2)
  const delay = rnd(i * 3.3) * 5
  const opacity = 0.6 + rnd(i * 4.4) * 0.4
  return `top:${top}%;left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;opacity:${opacity}`
}

const router = useRouter()
function go(path: string) { router.push(path) }

/** --- 浮动徽章数据（文本/颜色/角度/半径%） --- */
type Badge = { text: string; cls: string; angle: number; radius: number }
const badges = ref<Badge[]>([
  // 事前倾向（紫蓝系）
  { text: '差分隐私', cls: 'badge--indigo', angle: -90, radius: 100 },
  { text: '联邦学习', cls: 'badge--blue', angle: -95, radius: 150 },
  { text: '同态加密', cls: 'badge--violet', angle: -130, radius: 180 },

  // 事中倾向（橙红系）
  { text: '实时监测', cls: 'badge--amber', angle: -180, radius: 200 },
  { text: '限流与熔断', cls: 'badge--rose', angle: -200, radius: 170 },
  { text: 'I/O 审计', cls: 'badge--orange', angle: -160, radius: 200 },

  // 事后倾向（绿青系）
  { text: '取证回溯', cls: 'badge--emerald', angle: 80, radius: 130 },
  { text: '影响评估', cls: 'badge--teal', angle: 110, radius: 80 },
  { text: 'Evals 回归', cls: 'badge--green', angle: 130, radius: 160 },
  { text: '规则/模型更新', cls: 'badge--cyan', angle: 20, radius: 45 },
])

/** 极坐标 -> 位置样式（CSS 变量传入，CSS 中统一换算） */
function badgeStyle(b: Badge) {
  return { '--angle': `${b.angle}deg`, '--radius': `${b.radius}%` } as any
}
</script>

<style scoped>
/* 主题底色与文字 */
.bg-surface {
  background: linear-gradient(180deg, rgba(12, 12, 18, 0.02), rgba(12, 12, 18, 0.04))
}

.dark .bg-surface {
  background: radial-gradient(1200px 600px at 10% -10%, rgba(88, 48, 214, .12), transparent 60%), radial-gradient(1000px 600px at 100% 110%, rgba(34, 211, 238, .10), transparent 50%), #0A071A;
}

.text-foreground {
  color: rgba(20, 20, 20, .95);
}

.dark .text-foreground {
  color: rgba(255, 255, 255, .92);
}

.text-muted {
  color: rgba(0, 0, 0, .6);
}

.dark .text-muted {
  color: rgba(255, 255, 255, .68);
}

/* 背景网格 */
.bg-grid-pattern-light {
  background-image: linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}

.bg-grid-pattern-dark {
  background-image: linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* 星点 */
.star {
  position: absolute;
  background: radial-gradient(circle, #fff, rgba(255, 255, 255, .2));
  border-radius: 9999px;
  animation: twinkle 6s ease-in-out infinite;
}

@keyframes twinkle {
  0% {
    transform: scale(0.8);
    opacity: 0.4;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(0.8);
    opacity: 0.4;
  }
}

.animate-twinkle {
  animation: none;
}

/* 3D 场景工具类 */
.preserve-3d {
  transform-style: preserve-3d;
}

.translate-z-40 {
  transform: translateZ(40px);
}

.translate-z-60 {
  transform: translateZ(60px);
}

.translate-z-80 {
  transform: translateZ(80px);
}

.translate-z--80 {
  transform: translateZ(-80px);
}

/* 环形发光阴影 */
.drop-glow-blue {
  filter: drop-shadow(0 6px 18px rgba(99, 102, 241, .45));
}

.drop-glow-amber {
  filter: drop-shadow(0 6px 18px rgba(245, 158, 11, .45));
}

.drop-glow-green {
  filter: drop-shadow(0 6px 18px rgba(16, 185, 129, .45));
}

/* 3D 容器包装（默认有透视） */
.ring-3d-wrapper {
  transform: perspective(1100px) rotateX(0deg) rotateY(0deg);
  transition: filter .3s ease;
}

.ring-3d-wrapper:hover {
  filter: saturate(1.08);
}

/* conic 背景（光晕） */
.bg-conic {
  background: conic-gradient(from 0deg, var(--c1, #6366F1), var(--c2, #22D3EE), var(--c3, #10B981), var(--c4, #E879F9), var(--c1, #6366F1));
}

/* 漂浮徽章（基础） */
.badge {
  position: absolute;
  font-size: 12px;
  line-height: 1;
  padding: .5rem .7rem;
  border-radius: .75rem;
  background: rgba(255, 255, 255, .78);
  border: 1px solid rgba(255, 255, 255, .45);
  backdrop-filter: blur(6px);
  color: #111827;
  white-space: nowrap;
  box-shadow: 0 8px 28px rgba(0, 0, 0, .12);
}

.dark .badge {
  background: rgba(255, 255, 255, .08);
  border-color: rgba(255, 255, 255, .16);
  color: #E5E7EB;
}

/* 极坐标定位：以容器中心为原点，绕圆旋转再外扩 */
.badge-polar {
  left: 50%;
  top: 50%;
  transform:
    rotate(var(--angle)) translate(var(--radius)) rotate(calc(-1 * var(--angle)));
  /* 微调层级避免挡住点击分区 */
  pointer-events: none;
}

/* 色系（文字和边框轻微染色） */
.badge--indigo {
  border-color: rgba(99, 102, 241, .35);
  color: #3730A3;
}

.dark .badge--indigo {
  color: #C7D2FE;
}

.badge--blue {
  border-color: rgba(59, 130, 246, .35);
  color: #1D4ED8;
}

.dark .badge--blue {
  color: #BFDBFE;
}

.badge--violet {
  border-color: rgba(139, 92, 246, .35);
  color: #5B21B6;
}

.dark .badge--violet {
  color: #DDD6FE;
}

.badge--amber {
  border-color: rgba(245, 158, 11, .35);
  color: #92400E;
}

.dark .badge--amber {
  color: #FDE68A;
}

.badge--rose {
  border-color: rgba(244, 63, 94, .35);
  color: #9F1239;
}

.dark .badge--rose {
  color: #FECDD3;
}

.badge--orange {
  border-color: rgba(249, 115, 22, .35);
  color: #9A3412;
}

.dark .badge--orange {
  color: #FED7AA;
}

.badge--emerald {
  border-color: rgba(16, 185, 129, .35);
  color: #065F46;
}

.dark .badge--emerald {
  color: #A7F3D0;
}

.badge--teal {
  border-color: rgba(20, 184, 166, .35);
  color: #115E59;
}

.dark .badge--teal {
  color: #99F6E4;
}

.badge--green {
  border-color: rgba(34, 197, 94, .35);
  color: #166534;
}

.dark .badge--green {
  color: #BBF7D0;
}

.badge--cyan {
  border-color: rgba(6, 182, 212, .35);
  color: #0E7490;
}

.dark .badge--cyan {
  color: #A5F3FC;
}

/* 玻璃卡片 */
.glass-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1.1rem;
  background: rgba(255, 255, 255, .7);
  border: 1px solid rgba(0, 0, 0, .08);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .08);
}

.dark .glass-card {
  background: rgba(255, 255, 255, .06);
  border-color: rgba(255, 255, 255, .14);
  box-shadow: 0 18px 36px rgba(88, 48, 214, .10);
}

.glass-card:hover {
  transform: translateY(-6px);
}

.glass-card:hover.hover\:ring-blue {
  box-shadow: 0 14px 44px rgba(99, 102, 241, .25);
  border-color: rgba(99, 102, 241, .45);
}

.glass-card:hover.hover\:ring-amber {
  box-shadow: 0 14px 44px rgba(245, 158, 11, .25);
  border-color: rgba(245, 158, 11, .45);
}

.glass-card:hover.hover\:ring-emerald {
  box-shadow: 0 14px 44px rgba(16, 185, 129, .25);
  border-color: rgba(16, 185, 129, .45);
}

.card-head {
  position: absolute;
  inset: auto auto 0 0;
  height: 44%;
  width: 100%;
  background-image: linear-gradient(to top right, var(--from, rgba(99, 102, 241, .2)), var(--to, rgba(34, 211, 238, .2)));
  filter: blur(30px);
  opacity: .6;
  pointer-events: none;
}

.card-title {
  position: relative;
  z-index: 1;
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: .02em;
}

.card-desc {
  position: relative;
  z-index: 1;
  margin-top: .5rem;
  font-size: .92rem;
  color: rgba(0, 0, 0, .65);
}

.dark .card-desc {
  color: rgba(255, 255, 255, .72);
}

/* 兜底按钮样式 */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .6rem .9rem;
  border-radius: .75rem;
  color: #4f46e5;
  border: 1px solid rgba(79, 70, 229, .18);
  background: transparent;
  transition: all .2s ease;
}

.btn-ghost:hover {
  transform: translateY(-1px);
  background: rgba(79, 70, 229, .06);
}

.dark .btn-ghost {
  color: #93c5fd;
  border-color: rgba(147, 197, 253, .22);
}

.dark .btn-ghost:hover {
  background: rgba(147, 197, 253, .10);
}

/* 可访问性微调 */
svg [role="button"]:focus {
  outline: none;
}

svg [role="button"]:focus circle {
  filter: drop-shadow(0 0 0.65rem rgba(255, 255, 255, .45));
}

/* 小工具类 */
.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
