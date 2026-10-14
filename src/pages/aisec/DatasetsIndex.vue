<!-- src/pages/aisec/DatasetsIndex.vue -->
<template>
  <div class="relative min-h-screen overflow-hidden font-sans bg-surface text-foreground">
    <!-- 背景：网格 + 彩色雾团 + 粒子 -->
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <div class="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-[0.08]"></div>
      <div class="absolute -top-24 -left-24 w-[42rem] h-[42rem] bg-gradient-to-br from-violet-600/22 via-fuchsia-500/14 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-[42rem] h-[42rem] bg-gradient-to-tl from-cyan-500/18 via-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute inset-0">
        <span v-for="n in 70" :key="n" class="star" :style="starStyle(n)"></span>
      </div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-18 sm:py-22">
      <!-- 页头 -->
      <header class="text-center mb-14 md:mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-wider border border-zinc-300/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
          <span class="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"></span>
          LLM 安全评测数据集
        </div>
        <h1 class="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
          <span class="bg-gradient-to-r from-zinc-900 via-zinc-700 to-black dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
            大语言模型安全评测数据集
          </span>
        </h1>
<p class="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-muted ">
  我们汇集了近两百种开放的数据集，用于评估和提升大型语言模型（LLMs）的安全性。我们收录的数据集大致满足两个条件：
  1）与 LLM 聊天应用密切相关，尤其是包含问题或指令形式的提示集合；
  2）与 LLM 安全议题相关，特别是那些专门设计来触发、暴露或评估模型潜在不安全行为的提示。
</p>
      </header>

      <!-- 三卡左侧叠放轮播 + 右侧五分类叠放轮播 -->
      <section class="relative mx-auto max-w-6xl">
        <!-- 背景单条弧线 -->
        <svg
          class="absolute left-1/2 -translate-x-1/2 pointer-events-none hidden md:block -z-[1]"
          :style="{ top: '140px', width: '1200px', height: '520px' }"
          viewBox="0 0 1200 520" fill="none"
        >
          <defs>
            <linearGradient id="g-strong" x1="80" y1="300" x2="1120" y2="260">
              <stop offset="0%" stop-color="#8B5CF6" />
              <stop offset="50%" stop-color="#06B6D4" />
              <stop offset="100%" stop-color="#22C55E" />
            </linearGradient>
            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 80 300 C 340 160, 860 160, 1120 300"
            stroke="url(#g-strong)"
            stroke-width="10" stroke-linecap="round"
            class="dash-run-single" filter="url(#soft-glow)" opacity="0.95"
          />
        </svg>

        <!-- 两列：左=阶段轮播，右=安全维度轮播 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <!-- 左：事前/事中/事后 叠放轮播（不透明） -->
          <div class="relative">
            <div class="stacker">
              <transition-group name="vslide" tag="div" class="relative h-[460px]">
                <div
                  v-for="(card, idx) in stackedVisible"
                  :key="card.key"
                  class="absolute inset-0"
                  :style="stackStyle(idx)"
                >
                  <div
                    class="card card--xl card--solid"
                    @mousemove="tiltOnEl"
                    @mouseleave="resetOnEl"
                    @mouseenter="stopAuto"
                    @mouseleave.capture="startAuto"
                  >
                    <span class="shine" />
                    <span class="glare" />
                    <div class="banner layer" data-depth="0.4">
                      <!-- 左侧沿用默认渐变；如需精确色，给这里加 :style="{'--from':'#...', '--to':'#...'}" -->
                      <span class="ribbon" :class="card.ribbon"></span>
                    </div>

                    <div class="body">
                      <div class="icon-wrap layer" :class="card.iconBorder" data-depth="0.7">
                        <component :is="card.icon" class="w-6 h-6" :class="card.iconColor" />
                      </div>
                      <h3 class="title layer" :class="card.titleColor" data-depth="0.65">
                        {{ card.title }}
                      </h3>
                      <p class="desc layer" data-depth="0.6">{{ card.desc }}</p>
                      <div class="chips layer" data-depth="0.55">
                        <span v-for="t in card.chips" :key="t"># {{ t }}</span>
                      </div>
                      <RouterLink :to="card.link" class="cta layer" :class="card.cta" data-depth="0.5">
                        进入{{ card.stage }}数据集
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>

            <!-- 左侧指示器（紫色系，高对比，向下移防遮挡） -->
            <div class="carousel-dots left">
              <button
                v-for="(c, i) in leftCards"
                :key="'ldot-'+i"
                :class="{ active: i===currentIdx }"
                @click="jumpTo(i)"
                aria-label="切换左侧轮播"
              />
            </div>
          </div>

          <!-- 右：五类安全维度 叠放轮播（不透明） -->
          <div class="relative">
            <div class="stacker" style="--dot-on:#06B6D4;--dot-off:rgba(0,0,0,.15)">
              <transition-group name="vslide" tag="div" class="relative h-[460px]">
                <div
                  v-for="(card, idx) in rightStackedVisible"
                  :key="card.key"
                  class="absolute inset-0"
                  :style="stackStyle(idx)"
                >
                  <div
                    class="card card--xl card--solid"
                    @mousemove="tiltOnEl"
                    @mouseleave="resetOnEl"
                    @mouseenter="rightStopAuto"
                    @mouseleave.capture="rightStartAuto"
                  >
                    <span class="shine" />
                    <span class="glare" />

                    <!-- 顶部色带使用每个类别自带 gradient -->
                    <div class="banner layer" data-depth="0.4">
                      <span
                        class="ribbon"
                        :style="{ '--from': card.gradient[0], '--to': card.gradient[1] }"
                      ></span>
                    </div>

                    <div class="body">
                      <div class="flex items-center justify-between">
                        <span class="text-xs px-2 py-1 rounded-full border" :style="{borderColor:card.color, color:card.color}">
                          {{ card.badge }}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">数量：{{ card.count }}</span>
                      </div>

                      <h3 class="title layer mt-2 font-extrabold text-lg leading-snug" data-depth="0.65">
                        {{ card.title }}
                      </h3>
                      <p class="desc layer" data-depth="0.6">{{ card.desc }}</p>

                      <div class="chips layer" data-depth="0.55">
                        <span v-for="t in card.tags" :key="t"># {{ t }}</span>
                      </div>

                      <RouterLink
                        :to="card.link"
                        class="cta layer"
                        data-depth="0.5"
                        :style="{ color: card.color, borderColor: card.color + '44', background: card.color + '1a' }"
                      >
                        查看该类数据集 →
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>

            <!-- 右侧指示器（青色系，高对比，向下移防遮挡） -->
            <div class="carousel-dots right">
              <button
                v-for="(c, i) in safetyCats"
                :key="'rdot-'+i"
                :class="{ active: i===rightIdx }"
                @click="rightJumpTo(i)"
                aria-label="切换右侧轮播"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 补充区：说明 + 三列要点 -->
      <section class="max-w-6xl mx-auto mt-24">
        <div class="grid gap-5 md:grid-cols-3">
          <div class="pill pill--tall pill--violet" @mousemove="pillTilt" @mouseleave="pillReset">
            <h4 class="gtitle gtitle--violet">事前 · 建立安全基线</h4>
            <p>用越狱/危害/毒性等数据集，形成门禁项与阈值；上线前先过线。</p>
            <span class="pill-glare"></span>
          </div>
          <div class="pill pill--medium pill--amber" @mousemove="pillTilt" @mouseleave="pillReset">
            <h4 class="gtitle gtitle--amber">事中 · 贴近真实流量</h4>
            <p>采样线上请求、构造蜜罐提示，动态检测提示注入与 RAG 污染。</p>
            <span class="pill-glare"></span>
          </div>
          <div class="pill pill--short pill--emerald" @mousemove="pillTilt" @mouseleave="pillReset">
            <h4 class="gtitle gtitle--emerald">事后 · 回归与沉淀</h4>
            <p>把真实事件脚本化为 Evals，持续回归，避免老问题回潮。</p>
            <span class="pill-glare"></span>
          </div>
        </div>
      </section>

      <!-- 数据集速览（保持原逻辑：按阶段/按安全维度双视图） -->
      <section class="max-w-6xl mx-auto mt-20">
        <header class="mb-6 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="size-2 rounded-full" style="background:#8B5CF6"></div>
            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">数据集速览</h2>
          </div>
          <div class="inline-flex rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-1">
            <button
              class="px-3 py-1.5 text-sm rounded-md transition"
              :class="viewMode==='phase' ? 'font-semibold bg-black/5 dark:bg-white/10' : 'opacity-70 hover:opacity-100'"
              @click="viewMode='phase'">按阶段 (3类)</button>
            <button
              class="px-3 py-1.5 text-sm rounded-md transition"
              :class="viewMode==='safety' ? 'font-semibold bg-black/5 dark:bg-white/10' : 'opacity-70 hover:opacity-100'"
              @click="viewMode='safety'">按安全维度 (5类)</button>
          </div>
        </header>

        <!-- 按阶段 -->
        <div v-if="viewMode==='phase'" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article v-for="(d, i) in datasetShowcase" :key="'ds-'+i"
                   class="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-4 hover:shadow-xl transition overflow-hidden relative">
            <div class="absolute inset-x-0 -top-12 h-24 opacity-40 blur-2xl -z-10"
                 :class="d.badge==='before'?'from-violet-500/30 to-indigo-500/30':d.badge==='during'?'from-amber-500/30 to-rose-500/30':'from-emerald-500/30 to-teal-500/30'"
                 :style="{backgroundImage:'linear-gradient(90deg, var(--tw-gradient-from), var(--tw-gradient-to))'}"></div>

            <div class="flex items-center justify-between">
              <span class="text-xs px-2 py-1 rounded-full border"
                    :class="d.badge==='before'?'border-violet-400/40 text-violet-600 dark:text-violet-300':d.badge==='during'?'border-amber-400/40 text-amber-600 dark:text-amber-300':'border-emerald-400/40 text-emerald-600 dark:text-emerald-300'">
                {{ d.badgeLabel }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ d.size }}</span>
            </div>

            <h3 class="mt-2 font-extrabold text-lg leading-snug">{{ d.title }}</h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ d.desc }}</p>

            <div class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="t in d.tags" :key="t" class="text-[11px] px-2 py-1 rounded-full border border-white/20 bg-white/60 dark:bg-white/5">
                #{{ t }}
              </span>
            </div>

            <RouterLink :to="d.link"
              class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
              :class="d.badge==='before'?'text-violet-600 dark:text-violet-300':d.badge==='during'?'text-amber-600 dark:text-amber-300':'text-emerald-600 dark:text-emerald-300'">
              查看详情 →
            </RouterLink>
          </article>
        </div>

        <!-- 按安全维度 -->
        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article v-for="(c, i) in safetyCats" :key="'cat-'+i"
                   class="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-4 hover:shadow-xl transition overflow-hidden relative">
            <div class="absolute inset-x-0 -top-12 h-24 opacity-40 blur-2xl -z-10"
                 :style="{backgroundImage:`linear-gradient(90deg, ${c.gradient[0]}, ${c.gradient[1]})`}"></div>

            <div class="flex items-center justify-between">
              <span class="text-xs px-2 py-1 rounded-full border" :style="{borderColor:c.color, color:c.color}">
                {{ c.badge }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">数量：{{ c.count }}</span>
            </div>

            <h3 class="mt-2 font-extrabold text-lg leading-snug">{{ c.title }}</h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ c.desc }}</p>

            <div class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="t in c.tags" :key="t" class="text-[11px] px-2 py-1 rounded-full border border-white/20 bg-white/60 dark:bg-white/5">
                #{{ t }}
              </span>
            </div>

            <RouterLink :to="c.link" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" :style="{color:c.color}">
              查看该类数据集 →
            </RouterLink>
          </article>
        </div>
      </section>

      <!-- 评测流水线 -->
      <section class="max-w-6xl mx-auto mt-20">
        <header class="mb-6 flex items-center gap-3">
          <div class="size-2 rounded-full" style="background:#06B6D4"></div>
          <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">评测流水线</h2>
        </header>

        <div class="grid md:grid-cols-5 gap-4">
          <div v-for="(s, i) in pipeline" :key="'pl-'+i"
               class="relative rounded-2xl p-4 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
            <div class="size-10 rounded-xl flex items-center justify-center border mb-2" :class="s.colorBorder">
              <component :is="s.icon" class="w-5 h-5" :class="s.colorText"/>
            </div>
            <h3 class="font-bold">{{ s.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ s.desc }}</p>
            <div v-if="i<pipeline.length-1" class="hidden md:block absolute top-1/2 -right-3 translate-y-[-50%]">
              <div class="w-6 h-6 rotate-45 border-r border-b border-white/40 dark:border-white/20"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="max-w-4xl mx-auto mt-20">
        <header class="mb-6 text-center">
          <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">常见问题</h2>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">覆盖引入数据、安全合规、评测标准等</p>
        </header>
        <div class="space-y-3">
          <details v-for="(f,i) in faqs" :key="'faq-'+i"
                   class="group border border-black/10 dark:border-white/10 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur p-4">
            <summary class="cursor-pointer list-none font-semibold flex items-center justify-between">
              <span>{{ f.q }}</span>
              <span class="text-gray-400 group-open:rotate-180 transition">⌄</span>
            </summary>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ f.a }}</p>
          </details>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * 统一说明：
 * - 左/右都为叠放轮播（Stacked Carousel），卡片为不透明（card--solid）
 * - 指示器使用 .carousel-dots（左右颜色区分；深色模式下发光，保证可见性）
 * - 3D 倾斜/分层视差：tiltOnEl/resetOnEl（卡片），pillTilt/pillReset（小卡）
 * - 轮播自动播放，鼠标移入卡片暂停、移出恢复
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { Shield, Activity, RefreshCcw } from 'lucide-vue-next'

/* ========== 左侧轮播卡配置（3 类阶段） ========== */
const leftCards = [
  {
    key: 'before',
    stage: '事前',
    title: '事前 · 对齐 / 红队基线',
    desc: '越狱与危害、毒性/偏见、注入模式、原则遵守与安全门禁。',
    chips: ['JailbreakBench', 'RealToxicityPrompts', 'Prompt Injection'],
    link: '/dataset/Before',
    icon: Shield,
    iconColor: 'text-violet-500',
    iconBorder: 'border-violet-400/40',
    titleColor: 'text-violet-600 dark:text-violet-300',
    cta: 'cta--violet',
    ribbon: 'from-violet-500/35 to-indigo-500/35'
  },
  {
    key: 'during',
    stage: '事中',
    title: '事中 · 运行时探测',
    desc: '真实流量/蜜罐提示、RAG 污染、动态绕过、误检/误拒答校准。',
    chips: ['WildJailbreak', 'RAG Poison', 'Runtime Traces'],
    link: '/dataset/During',
    icon: Activity,
    iconColor: 'text-amber-500',
    iconBorder: 'border-amber-400/40',
    titleColor: 'text-amber-600 dark:text-amber-300',
    cta: 'cta--amber',
    ribbon: 'from-amber-500/35 to-rose-500/35'
  },
  {
    key: 'after',
    stage: '事后',
    title: '事后 · 回归与沉淀',
    desc: '事件回灌、可回放 Evals、纵向对比与改进幅度量化。',
    chips: ['SafetyBench', 'Evals', 'Regression Suite'],
    link: '/dataset/After',
    icon: RefreshCcw,
    iconColor: 'text-emerald-500',
    iconBorder: 'border-emerald-400/40',
    titleColor: 'text-emerald-600 dark:text-emerald-300',
    cta: 'cta--emerald',
    ribbon: 'from-emerald-500/35 to-teal-500/35'
  }
]

/* ========== 左侧轮播状态 ========== */
const currentIdx = ref(0)
/** 三层叠放（当前/下一/下下） */
const stackedVisible = computed(() => {
  const a = []
  for (let i = 0; i < 3; i++) a.push(leftCards[(currentIdx.value + i) % leftCards.length])
  return a
})

/* 自动轮播（左） */
const intervalMs = 5000
let timer: number | undefined
function startAuto() {
  stopAuto()
  timer = window.setInterval(() => {
    currentIdx.value = (currentIdx.value + 1) % leftCards.length
  }, intervalMs)
}
function stopAuto() {
  if (timer) window.clearInterval(timer)
  timer = undefined
}
function jumpTo(i: number) {
  currentIdx.value = i % leftCards.length
  startAuto()
}
onMounted(startAuto)
onBeforeUnmount(stopAuto)

/* ========== 右侧五类叠放轮播 ========== */
const rightIdx = ref(0)
/** 三层叠放（当前/下一/下下） */
const rightStackedVisible = computed(() => {
  const a = []
  for (let i = 0; i < 3; i++) a.push(safetyCats[(rightIdx.value + i) % safetyCats.length])
  return a
})
const rightIntervalMs = 5000
let rightTimer: number | undefined
function rightStartAuto() {
  rightStopAuto()
  rightTimer = window.setInterval(() => {
    rightIdx.value = (rightIdx.value + 1) % safetyCats.length
  }, rightIntervalMs)
}
function rightStopAuto() {
  if (rightTimer) window.clearInterval(rightTimer)
  rightTimer = undefined
}
function rightJumpTo(i: number) {
  rightIdx.value = i % safetyCats.length
  rightStartAuto()
}
onMounted(rightStartAuto)
onBeforeUnmount(rightStopAuto)

/* ========== 叠放层级的 Y 偏移 / 缩放 / 模糊 ========== */
function stackStyle(idx: number) {
  const baseY = [0, 16, 32]      // 每层下移
  const scale = [1, 0.985, 0.97] // 轻微缩放
  const blur  = [0, 0.2, 0.4]    // 远处稍微模糊
  return {
    transform: `translateY(${baseY[idx]}px) scale(${scale[idx]})`,
    filter: `blur(${blur[idx]}px)`,
    zIndex: String(10 - idx)
  }
}

/* ========== 卡片 3D 倾斜/分层视差 ========== */
let rafId = 0
function tiltOnEl(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  if (!el) return
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  const x = px - 0.5
  const y = py - 0.5

  const rx = (y * -16).toFixed(2)
  const ry = (x * 16).toFixed(2)
  const tx = (x * 22).toFixed(2)
  const ty = (y * 22).toFixed(2)

  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    el.style.setProperty('--rx', `${rx}deg`)
    el.style.setProperty('--ry', `${ry}deg`)
    el.style.setProperty('--tx', `${tx}px`)
    el.style.setProperty('--ty', `${ty}px`)
    el.style.setProperty('--mx', `${px}`)
    el.style.setProperty('--my', `${py}`)
    // 分层视差
    el.querySelectorAll<HTMLElement>('.layer').forEach((node) => {
      const depth = Number(node.dataset.depth || 0.5)
      const dx = (x * 28 * depth).toFixed(2)
      const dy = (y * 28 * depth).toFixed(2)
      node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    })
  })
}
function resetOnEl(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  if (!el) return
  el.style.removeProperty('--rx'); el.style.removeProperty('--ry')
  el.style.removeProperty('--tx'); el.style.removeProperty('--ty')
  el.style.removeProperty('--mx'); el.style.removeProperty('--my')
  el.style.transform = ''
  el.querySelectorAll<HTMLElement>('.layer').forEach((n) => (n.style.transform = ''))
}

/* ========== 背景粒子样式 ========== */
function starStyle(i: number) {
  const rnd = (s: number) => { const x = Math.sin(s * 12.9898) * 43758.5453; return x - Math.floor(x) }
  const top = Math.floor(rnd(i) * 100)
  const left = Math.floor(rnd(i * 1.37) * 100)
  const size = 1 + Math.floor(rnd(i * 2.1) * 2)
  const delay = rnd(i * 3.3) * 6
  const o = 0.5 + rnd(i * 4.4) * 0.5
  return `top:${top}%;left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;opacity:${o}`
}

/* ========== 补充区小卡 3D 倾斜（幅度更小） ========== */
function pillTilt(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  if (!el) return
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  const x = px - 0.5
  const y = py - 0.5
  el.style.setProperty('--prx', `${(y * -8).toFixed(2)}deg`)
  el.style.setProperty('--pry', `${(x * 8).toFixed(2)}deg`)
  el.style.setProperty('--ptx', `${(x * 8).toFixed(2)}px`)
  el.style.setProperty('--pty', `${(y * 8).toFixed(2)}px`)
  el.style.setProperty('--pmx', `${px}`)
  el.style.setProperty('--pmy', `${py}`)
}
function pillReset(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  if (!el) return
  el.style.removeProperty('--prx'); el.style.removeProperty('--pry')
  el.style.removeProperty('--ptx'); el.style.removeProperty('--pty')
  el.style.removeProperty('--pmx'); el.style.removeProperty('--pmy')
}

/* ========== 数据：速览 & 流水线 & FAQ（与原逻辑一致） ========== */
const datasetShowcase = [
  // 事前
  { badge:'before', badgeLabel:'事前 / 基线', title:'JailbreakBench v2', size:'3.2k prompts',
    desc:'多策略越狱集合，覆盖角色扮演、token 缓冲、编码绕过等典型模式。',
    tags:['jailbreak','safety','alignment'], link:'/dataset/Before' },
  { badge:'before', badgeLabel:'事前 / 基线', title:'RealToxicityPrompts', size:'100k',
    desc:'真实网络语料的毒性提示，支持不同 toxicity 阈值评估。',
    tags:['toxicity','bias'], link:'/dataset/Before' },
  { badge:'before', badgeLabel:'事前 / 基线', title:'Prompt Injection Zoo', size:'1.1k',
    desc:'多类提示注入，覆盖忽略指令、数据外泄、RAG 引导等。',
    tags:['injection','rag'], link:'/dataset/Before' },

  // 事中
  { badge:'during', badgeLabel:'事中 / 运行', title:'WildJailbreak Samples', size:'5.4k',
    desc:'源自线上真流量的越狱样本，带上下文与响应元数据。',
    tags:['runtime','wild','jailbreak'], link:'/dataset/During' },
  { badge:'during', badgeLabel:'事中 / 运行', title:'RAG Poison Cases', size:'2.3k',
    desc:'RAG 污染与反向提示，评估上下文污染下的防御效果。',
    tags:['rag','poison','context'], link:'/dataset/During' },
  { badge:'during', badgeLabel:'事中 / 运行', title:'Honeypot Prompts', size:'800',
    desc:'蜜罐提示检测与绕过样例，辅助策略迭代与误检校准。',
    tags:['honeypot','monitor'], link:'/dataset/During' },

      // 事后
  { badge:'after', badgeLabel:'事后 / 回归', title:'SafetyBench Regression', size:'2.0k',
    desc:'基于历史事件抽象出的可回放评测脚本，支持纵向对比。',
    tags:['evals','regression'], link:'/dataset/After' },
  { badge:'after', badgeLabel:'事后 / 回归', title:'Evals Suite', size:'1.2k',
    desc:'统一协议的 Evals 套件，固定 seed / 温度以确保可比性。',
    tags:['evals','protocol'], link:'/dataset/After' },
  { badge:'after', badgeLabel:'事后 / 回归', title:'Safety Incident Replay', size:'300',
    desc:'关键事故回灌脚本与断言，用于回归老问题、监控复发率。',
    tags:['incident','replay'], link:'/dataset/After' }
]

const pipeline = [
  { title:'基线准备', desc:'选择阶段与数据集，设定阈值/门禁项。', icon: Shield,
    colorBorder:'border-violet-400/40', colorText:'text-violet-500' },
  { title:'流量采样', desc:'接入线上流量与蜜罐提示，收集运行样本。', icon: Activity,
    colorBorder:'border-amber-400/40', colorText:'text-amber-500' },
  { title:'自动评测', desc:'统一 Evals 协议，固定随机性并保存轨迹。', icon: RefreshCcw,
    colorBorder:'border-emerald-400/40', colorText:'text-emerald-500' },
  { title:'指标产出', desc:'通过率、越狱率、毒性率、阻断率、误拒答率等。', icon: Shield,
    colorBorder:'border-cyan-400/40', colorText:'text-cyan-500' },
  { title:'回归沉淀', desc:'沉淀事故为回归集，纵向对比改进幅度。', icon: RefreshCcw,
    colorBorder:'border-teal-400/40', colorText:'text-teal-500' },
]

const viewMode = ref<'phase' | 'safety'>('phase')

const safetyCats = [
  { key:'broad',  badge:'综合安全',   title:'综合安全（Broad Safety）',   count:55,
    desc:'覆盖 jailbreak、拒答行为、有害内容等多维度，进行综合性安全评估。',
    tags:['jailbreak','拒答策略','危害内容'], color:'#8B5CF6',
    gradient:['#8B5CF6AA','#06B6D4AA'], link:'/dataset/Broad safety' },
  { key:'narrow', badge:'专项安全',   title:'专项安全（Narrow Safety）',  count:26,
    desc:'聚焦单一风险（如提示注入、拒答、隐私等），对特定攻击面进行深入评测。',
    tags:['prompt-injection','privacy','拒答'], color:'#F59E0B',
    gradient:['#F59E0BAA','#FB7185AA'], link:'/dataset/Narrow safety' },
  { key:'alignment', badge:'价值观对齐', title:'价值观对齐（Value Alignment）', count:23,
    desc:'检验模型在伦理、价值观与文化多样性上的对齐能力与一致性。',
    tags:['ethics','culture','value'], color:'#06B6D4',
    gradient:['#06B6D4AA','#22C55EAA'], link:'/dataset/Value alignment' },
  { key:'bias',   badge:'偏见评估',   title:'偏见评估（Bias）',          count:35,
    desc:'测试社会偏见（性别、种族、年龄等）以及相关有害刻板映射。',
    tags:['toxicity','bias','fairness'], color:'#EF4444',
    gradient:['#F43F5EAA','#F59E0BAA'], link:'/dataset/Bias' },
  { key:'others', badge:'其他',       title:'其他（Others）',             count:10,
    desc:'其他探索性或跨领域数据集，用于补充评测覆盖面与真实度。',
    tags:['exploratory','cross-domain'], color:'#10B981',
    gradient:['#10B981AA','#06B6D4AA'], link:'/dataset/Others' }
]

const faqs = [
  { q:'这些数据集来源合规吗？', a:'我们优先使用开源数据集或经授权的内部数据；对含 PII 的运行样本做脱敏与聚合处理。' },
  { q:'如何把线上事故沉淀为可回放的 Evals？', a:'将触发路径抽象成脚本，固定 seed、温度和上下文，并提供期望输出或安全守卫规则。' },
  { q:'指标如何对齐不同模型与温度？', a:'统一评测协议与采样参数，或使用 N 次采样取稳健统计量（如 P95）。' },
  { q:'支持哪些安全维度？', a:'越狱/危害、毒性/偏见、注入与 RAG 污染、误拒答/可用性、溢出与泄露等。' },
]
</script>

<style scoped>
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;   /* 限制三行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* ---- 主题/网格 ---- */
.bg-surface { background: linear-gradient(180deg, rgba(12, 12, 18, 0.02), rgba(12, 12, 18, 0.04)); }
.dark .bg-surface {
  background: radial-gradient(1200px 600px at 10% -10%, rgba(124, 58, 237, 0.12), transparent 60%),
              radial-gradient(1000px 600px at 100% 110%, rgba(34, 211, 238, 0.1), transparent 50%), #0a071a;
}
.text-foreground { color: rgba(20, 20, 20, 0.96); }
.dark .text-foreground { color: rgba(255, 255, 255, 0.92); }
.text-muted { color: rgba(0, 0, 0, 0.62); }
.dark .text-muted { color: rgba(255, 255, 255, 0.68); }

.bg-grid-pattern-light {
  background-image: linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}
.bg-grid-pattern-dark {
  background-image: linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* ---- 粒子 ---- */
.star { position: absolute; background: radial-gradient(circle, #fff, rgba(255, 255, 255, 0.18)); border-radius: 9999px; animation: twinkle 6s ease-in-out infinite; }
@keyframes twinkle { 0%{transform:scale(.8);opacity:.4;} 50%{transform:scale(1.1);opacity:1;} 100%{transform:scale(.8);opacity:.4;} }

/* ---- 单条粗弧线 ---- */
.dash-run-single { stroke-dasharray: 22 16; animation: dash-single 4.6s linear infinite; }
@keyframes dash-single { to{ stroke-dashoffset: -520; } }

/* ---- 大卡（不透明 + 3D） ---- */
.card {
  position: relative; overflow: hidden; border-radius: 1.4rem; isolation: isolate;
  background: rgba(255, 255, 255, 0.78); border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12); backdrop-filter: blur(10px);
  transition: transform .25s ease, box-shadow .25s ease, filter .25s ease, border-color .25s ease;
  transform: perspective(1200px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translate3d(var(--tx, 0), var(--ty, 0), 0);
}
.card--xl { min-height: 460px; }
.dark .card { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.12); box-shadow: 0 26px 60px rgba(124, 58, 237, 0.14); }
.card:hover { filter: saturate(1.08); }

/* 不透明版本（左右轮播均使用） */
.card--solid {
  background: #ffffff !important;
  border-color: rgba(0,0,0,0.08);
  backdrop-filter: none;
}
.dark .card--solid {
  background: #0f0f16 !important;
  border-color: rgba(255,255,255,0.12);
  box-shadow: 0 26px 60px rgba(0,0,0,0.35);
}
.card--solid .chips span {
  background: #f8fafc;
  border-color: rgba(0,0,0,0.08);
  color: #111827;
}
.dark .card--solid .chips span {
  background: #171a22;
  border-color: rgba(255,255,255,0.12);
  color: #e5e7eb;
}

/* 反射线（shine） */
.shine { pointer-events:none; position:absolute; inset:0; transform:translateX(-120%);
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.08) 30%, rgba(255,255,255,.18) 50%, transparent 70%); mix-blend-mode: screen; transition: transform .6s ease; }
.card:hover .shine { transform: translateX(130%); }

/* 高光（glare） */
.glare { pointer-events:none; position:absolute; width:420px; height:420px; border-radius:50%;
  left: calc(var(--mx, .5) * 100% - 210px); top: calc(var(--my, .5) * 100% - 210px);
  background: radial-gradient(closest-side, rgba(255,255,255,.22), rgba(255,255,255,.08), transparent 70%);
  filter: blur(6px); opacity:0; transition: opacity .15s ease; }
.card:hover .glare { opacity:1; }

/* 横幅与色带（支持 CSS 变量 --from / --to） */
.banner { position:relative; height:180px; overflow:hidden; }
.ribbon { position:absolute; inset:auto -10% -12% -10%; height:50%;
  background-image: linear-gradient(115deg, var(--from, rgba(124, 58, 237, .35)), var(--to, rgba(34, 197, 94, .35)));
  transform: skewY(-8deg); filter: blur(26px);
}

/* 卡体 */
.body { padding: 1.2rem 1.2rem 1.4rem; }
.icon-wrap { width:52px; height:52px; border-radius:1.05rem; display:flex; align-items:center; justify-content:center;
  background: rgba(255,255,255, .78); border:1px solid; margin-top:-28px; box-shadow: 0 8px 18px rgba(0,0,0,.06); }
.dark .icon-wrap { background: rgba(255,255,255,.08); }
.title { margin-top:.7rem; font-weight:900; font-size:1.2rem; letter-spacing:.01em; }
.desc { margin:.4rem 0 .7rem; font-size:1rem; color: rgba(0,0,0,.66); }
.dark .desc { color: rgba(255,255,255,.72); }
.chips { display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:.9rem; }
.chips span { font-size:.76rem; padding:.32rem .58rem; border-radius:9999px; background: rgba(255,255,255,.82); border:1px solid rgba(0,0,0,.08); color:#111827; }
.dark .chips span { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.16); color:#e5e7eb; }

/* CTA */
.cta { display:inline-flex; align-items:center; justify-content:center; gap:.35rem; padding:.62rem 1rem;
  border-radius:.95rem; font-weight:800; font-size:.96rem; transition: all .2s ease; border:1px solid transparent; }
.cta--violet { color:#6d28d9; border-color: rgba(109,40,217,.28); background: rgba(109,40,217,.1); }
.dark .cta--violet { color:#c4b5fd; border-color: rgba(196,181,253,.28); background: rgba(196,181,253,.14); }
.cta--amber { color:#b45309; border-color: rgba(245,158,11,.28); background: rgba(245,158,11,.12); }
.dark .cta--amber { color:#fde68a; border-color: rgba(245,158,11,.28); background: rgba(245,158,11,.16); }
.cta--emerald { color:#047857; border-color: rgba(16,185,129,.28); background: rgba(16,185,129,.12); }
.dark .cta--emerald { color:#a7f3d0; border-color: rgba(16,185,129,.28); background: rgba(16,185,129,.16); }
.cta:hover { transform: translateY(-1px); }

/* 三列要点（pill） */
.pill { position:relative; border-radius:1rem; padding:1rem 1.1rem;
  background: linear-gradient(var(--pill-bg, rgba(255,255,255,.72)), var(--pill-bg, rgba(255,255,255,.72))) padding-box,
              linear-gradient(120deg, var(--g1,#8B5CF6), var(--g2,#06B6D4), var(--g3,#22C55E)) border-box;
  border:1px solid transparent; backdrop-filter: blur(6px);
  transform: perspective(900px) rotateX(var(--prx,0)) rotateY(var(--pry,0)) translate3d(var(--ptx,0), var(--pty,0), 0);
  box-shadow: 0 12px 28px rgba(0,0,0,.10); transition: transform .2s ease, box-shadow .2s ease, filter .2s ease, border-color .2s ease;
}
.dark .pill { --pill-bg: rgba(255,255,255,.06); box-shadow: 0 16px 38px rgba(124,58,237,.12); }
.pill--violet { --g1:#8B5CF6; --g2:#6366F1; --g3:#22D3EE; }
.pill--amber  { --g1:#F59E0B; --g2:#FB7185; --g3:#FDE68A; }
.pill--emerald{ --g1:#10B981; --g2:#06B6D4; --g3:#34D399; }
.gtitle { font-weight:900; margin-bottom:.35rem; line-height:1.15; -webkit-background-clip:text; background-clip:text; color:transparent; }
.gtitle--violet { background-image: linear-gradient(90deg, #7C3AED, #06B6D4); }
.gtitle--amber  { background-image: linear-gradient(90deg, #F59E0B, #FB7185); }
.gtitle--emerald{ background-image: linear-gradient(90deg, #10B981, #22D3EE); }
.pill p { font-size:.92rem; color: rgba(0,0,0,.66); }
.dark .pill p { color: rgba(255,255,255,.75); }
.pill:hover { filter: saturate(1.08); box-shadow: 0 16px 40px rgba(0,0,0,.14); }
.pill-glare { pointer-events:none; position:absolute; width:260px; height:260px; border-radius:50%;
  left: calc(var(--pmx, .5) * 100% - 130px); top: calc(var(--pmy, .5) * 100% - 130px);
  background: radial-gradient(closest-side, rgba(255,255,255,.22), rgba(255,255,255,.08), transparent 70%);
  filter: blur(6px); opacity:0; transition: opacity .15s ease; }
.pill:hover .pill-glare { opacity: 1; }

/* 左列叠放指示色（用于点默认变量） */
.stacker { --dot-on: #8B5CF6; --dot-off: rgba(0,0,0,.15); }

/* 纵向切换动画（当前 => 下一层） */
.vslide-enter-active, .vslide-leave-active { transition: transform .45s ease, opacity .45s ease, filter .45s ease; }
.vslide-enter-from { transform: translateY(16px) scale(.985); opacity: .0; filter: blur(2px); }
.vslide-enter-to   { transform: translateY(0px)  scale(1);    opacity: 1;  filter: blur(0); }
.vslide-leave-from { transform: translateY(0px)  scale(1);    opacity: 1; }
.vslide-leave-to   { transform: translateY(-24px) scale(1.01); opacity: 0; filter: blur(2px); }

/* ---- 轮播指示器（左右通用 + 深色可见） ---- */
.carousel-dots {
  margin-top: 2.5rem;             /* 足够下移，避免被卡片阴影遮挡 */
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}
.carousel-dots button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2); /* 浅色模式默认点 */
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.08);
}
.carousel-dots button.active {
  transform: scale(1.4);
  box-shadow: 0 0 6px rgba(0,0,0,0.3);
}

/* 左侧：紫色高亮 */
.carousel-dots.left button.active { background: #8B5CF6; }
.dark .carousel-dots.left button { background: rgba(255,255,255,0.28); border-color: rgba(255,255,255,0.18); box-shadow: 0 0 2px rgba(255,255,255,0.25); }
.dark .carousel-dots.left button.active { background: #a78bfa; box-shadow: 0 0 10px rgba(167,139,250,0.85); }

/* 右侧：青色高亮 */
.carousel-dots.right button.active { background: #06B6D4; }
.dark .carousel-dots.right button { background: rgba(255,255,255,0.28); border-color: rgba(255,255,255,0.18); box-shadow: 0 0 2px rgba(255,255,255,0.25); }
.dark .carousel-dots.right button.active { background: #22d3ee; box-shadow: 0 0 10px rgba(34,211,238,0.85); }

</style>
