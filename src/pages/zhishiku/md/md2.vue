<!-- src/pages/zhishiku/md2.vue -->
<template>
  <div
    class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark relative"
  >
    <!-- 顶部阅读进度条 -->
    <div class="fixed top-0 left-0 right-0 h-[3px] z-50">
      <div
        class="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 transition-[width] duration-150 ease-out"
        :style="{ width: progress + '%' }"
      />
    </div>

    <!-- 深色模式霓虹光晕 -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-25%] left-[-10%] w-[560px] h-[560px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-25%] right-[-10%] w-[560px] h-[560px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <!-- 主体 -->
    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- 玻璃态 Hero -->
      <section class="relative mb-12 md:mb-16 animate-fade-in-down">
        <div
          class="max-w-5xl mx-auto rounded-3xl border border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_60px_-20px_rgba(99,102,241,.35)] dark:shadow-[0_20px_60px_-20px_rgba(6,182,212,.25)]"
        >
          <div class="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div class="flex-1">
              <p class="text-xs uppercase tracking-widest text-indigo-500 mb-2">Model Safety</p>
              <h1
                class="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500"
              >
                {{ pageTitle }}
              </h1>
              <p class="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                从评测、对齐、防护、监控到合规，构建<span class="font-semibold">大模型安全闭环</span>。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 正文玻璃卡（图片点击放大：事件委托） -->
      <section class="animate-fade-in-up">
        <div
          class="max-w-5xl mx-auto p-6 md:p-10 border border-white/15 bg-white/60 dark:bg-white/5 rounded-3xl shadow-xl dark:shadow-2xl shadow-gray-200/40 dark:shadow-indigo-500/10 backdrop-blur-xl"
        >
          <article
            ref="articleEl"
            @click="onArticleClick"
            class="prose prose-gray dark:prose-invert max-w-none
                   prose-headings:scroll-mt-24
                   prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                   prose-p:leading-7
                   prose-a:underline-offset-2 hover:prose-a:underline
                   prose-img:rounded-xl prose-img:shadow
                   prose-strong:font-semibold"
            v-html="html"
          />
        </div>
      </section>

      <!-- 底部 CTA -->
      <section class="text-center mt-12 md:mt-16 animate-fade-in-up" style="animation-delay: 120ms;">
        <div class="max-w-4xl mx-auto rounded-3xl border border-white/20 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 dark:from-indigo-500/15 dark:via-fuchsia-500/15 dark:to-cyan-500/15 backdrop-blur p-8 md:p-10">
          <h2 class="text-2xl md:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500">
            想把这些安全框架应用到你的模型里？
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mb-6">立即启动安全评测与治理，让你的 AI 更可信、更合规。</p>
          <router-link to="/guanyuwomen/lianxiwomen"
            class="inline-flex items-center gap-2 h-11 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
            联系我们
          </router-link>
        </div>
      </section>
    </main>

    <!-- 浮动快捷按钮：返回顶部 / 主题切换 -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        class="size-11 rounded-full border border-white/20 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg transition flex items-center justify-center"
        @click="scrollToTop"
        aria-label="返回顶部"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0l-6 6m6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button
        class="size-11 rounded-full border border-white/20 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg transition flex items-center justify-center"
        @click="toggleDark"
        aria-label="切换主题"
      >
        <svg v-if="isDark" class="size-5" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <svg v-else class="size-5" viewBox="0 0 24 24" fill="none"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M8.05 8.05 6.636 6.636m10.728 0-1.414 1.414M8.05 15.95l-1.414 1.414" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>

    <!-- 图片灯箱（点击图片放大） -->
    <transition name="fade">
      <div
        v-if="lightbox.open"
        class="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          class="absolute top-4 right-4 size-10 rounded-full bg-white/90 dark:bg-white/10 border border-white/20 flex items-center justify-center shadow hover:scale-105 transition"
          @click="closeLightbox"
          aria-label="关闭"
        >
          ✕
        </button>
        <img
          :src="lightbox.src"
          :alt="lightbox.alt || 'image'"
          class="max-w-[95vw] max-h-[85vh] rounded-xl shadow-2xl object-contain"
        />
        <div v-if="lightbox.alt" class="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80">
          {{ lightbox.alt }}
        </div>
      </div>
    </transition>
  </div>
</template>



<script setup lang="ts">
/**
 * 依赖：
 *   npm i markdown-it
 * 如果你使用 Tailwind v4，请在 index.css 中加入：
 *   @plugin "@tailwindcss/typography";
 * 并在模板中使用 .prose / dark:prose-invert（本页已用）。
 */
import MarkdownIt from "markdown-it"
import { computed, ref,onBeforeUnmount, onMounted } from "vue"

/** ① 直接内联 Markdown 原文（去掉了容易出错的模板拼接写法） */
const mdRaw = ref<string>(
`
# LLM 安全评测数据集汇总

## 一、背景：安全数据集的重要性

随着大语言模型（LLM）逐渐融入社会生产与生活场景，它们所带来的安全挑战愈发突出。
无论是 **越狱攻击（Jailbreak）**、**提示注入（Prompt Injection）**，还是 **价值观偏移**、**有害内容生成**、**隐私信息泄露**，都可能在现实中引发严重后果。

在这样的背景下，**如何科学、系统地评估 LLM 的安全性**，成为学界与产业界共同关注的焦点。而高质量、安全导向的评测数据集，正是这项工作的基石。

2025 年 4 月，由 Paul Röttger 等学者维护的全球 LLM 安全评测活目录 **SafetyPrompts.com** 已收录 **149 个安全评测数据集**，成为迄今为止覆盖最全、更新最快的 LLM 安全数据集索引网站，地址为：https://safetyprompts.com/?utm_source=chatgpt.com&sessionid=。 这份汇总不仅展示了安全评测的多样性，也揭示了行业在安全研究上的演进轨迹。![图片1](./assets/图片1.jpeg)

## 二、数据集分类总览

SafetyPrompts.com 将收录的数据集分为五大类（按 **目的 Purpose 分类**），并统计了数量：

| 类别                                | 描述                                                       | 数量 |
| ----------------------------------- | ---------------------------------------------------------- | ---- |
| **综合安全类（Broad Safety）**      | 覆盖 jailbreak、拒答行为、有害内容等多维度，综合性安全评估 | 55   |
| **专项安全类（Narrow Safety）**     | 聚焦单一风险（如提示注入、拒答、隐私等）                   | 26   |
| **价值观对齐类（Value Alignment）** | 检验模型在伦理、价值观与文化多样性上的对齐能力             | 23   |
| **偏见评估类（Bias）**              | 测试社会偏见（性别、种族、年龄等）                         | 35   |
| **其他（Others）**                  | 其他探索性或跨领域数据集                                   | 10   |

这五类构成了 LLM 安全评测的“全景版图”：

* **Broad Safety** 适合综合测试模型的整体安全水平；

* **Narrow Safety** 有助于聚焦单点突破问题；

* **Value Alignment** 与 **Bias** 则强调社会影响和伦理合规；

* **Others** 提供更多创新或前沿探索。

## 三、代表性数据集一览

### 1. Broad Safety（综合安全类）

* **SafetyBench**：中英双语 11,435 道多选题，覆盖 7 大主题，检测安全知识理解与拒答能力。

* **JailbreakBench**：约 300 条越狱与良性对照样本，专注模型的鲁棒性与误报率。

* **WildJailbreak**：26 万条真实与合成越狱提示，模拟近野外攻击场景。

* **Do Anything Now (DAN)**：10 万+ 条攻击样本，覆盖 13 类敏感禁区，是越狱防护的“压力测试”。

* **CHiSafetyBench**：中文环境下 1,861 道 MCQ + 462 QA，细分为 5 域 31 类，全面评估识别与拒答。

### 2. Narrow Safety（专项安全类）

* **SORRY-Bench**：9,500 条多语言不安全指令，用于测试拒答行为的稳定性。

* **XSTest**：200 条无害但易被误拒的问题，衡量过度拒答倾向。

* **Prompt Injections Benchmark**：5,000 条提示注入与良性对照样本，考察检测精准率与召回率。

* **Do-Not-Answer**：数百条明确的应拒绝问题，用于快速检测“安全闸门”。

* **HEx-PHI**：330 条依据政策条款设计的有害指令，验证模型是否遵循安全规范。

### 3. Value Alignment（价值观对齐类）

* **PRISM**：8,011 条跨 75 个国家人群反馈的多轮对话，测试多元文化下的对齐表现。

* **WorldValuesBench**：两千万条基于世界价值观调查的问答，规模庞大，跨文化对齐能力检测首选。

* **Social-Chemistry-101**：29 万条道德常识与生活经验，用于增强社会规范理解。

* **ETHICS**：五大伦理维度的基准，涵盖正义、责任、道德判断等方面。

### 4. Bias（偏见评估类）

* **BBQ**：覆盖 9 大社会维度的问题，测试模型在信息不足场景下的偏见。

* **CrowS-Pairs**：1,508 对句子，评估语言建模偏见。

* **StereoSet**：刻板印象评测，包含判别和生成两类任务。

* **BOLD**：23,000 条开放生成提示，衡量职业、性别、种族等生成偏见。

* **CBBQ**：中文偏见评测集，覆盖与中国文化相关的多种社会属性。

### 5. Others（其他）

* 多数为跨模态、跨场景实验性数据集，用于探索安全评测的新维度，如多模态幻觉检测、跨语言不一致性研究等。

## 四、中文语料数据集

在收录的 149 个评测数据集中，至少有 **16 个直接面向中文场景**，涵盖综合安全、价值观对齐、偏见检测等方向，说明中文语料的安全评测正在快速发展。

部分代表：

* **CHiSafetyBench**：基于风险分级的中文安全测评集，覆盖 31 类细分任务。

* **SafetyBench**：中英双语对照，便于跨语言对比。

* **Flames**：中文 LLM 价值观对齐标准，涵盖公平性、道德、合法性等 5 个维度。

* **CBBQ、CHBias、CDialBias**：针对中文语境的偏见检测集，来源包括微博与知乎。

这一趋势意味着：**未来中文 LLM 的安全评测将更加精细化与本土化**，不仅能对标国际基准，还能贴合本地文化与社会环境。





数据集详细情况，可访问https://safetyprompts.com/?utm_source=chatgpt.com&sessionid=



`)

/** 图片根目录（修正相对路径） */
const baseImageDir = ref<string>('/articles/tool/md2')

/** markdown-it */
const md = new MarkdownIt({ html: true, linkify: true, breaks: false })

/** 页面标题（首个 H1） */
const pageTitle = computed(() => {
  const m = mdRaw.value.match(/^\s*#\s+(.+)$/m)
  return m ? m[1].trim() : '文档'
})

/** 重写相对图片路径 */
function rewriteImagePaths(markdown: string) {
  return markdown.replace(/!\[([^\]]*)\]\((?!https?:\/\/|\/\/|\/)([^)]+)\)/g, (_m, alt, path) => {
    const safe = String(path).replace(/^\.\//, '')
    return `![${alt}](${baseImageDir.value}/${safe})`
  })
}

/** 渲染 HTML */
const html = computed(() => md.render(rewriteImagePaths(mdRaw.value)))

/** 阅读进度条 */
const progress = ref(0)
function handleScroll() {
  const el = document.documentElement
  const h = el.scrollHeight - el.clientHeight
  progress.value = h > 0 ? Math.min(100, (el.scrollTop / h) * 100) : 0
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', onKeydown)
})

/** 浮动按钮 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const isDark = ref<boolean>(document.documentElement.classList.contains('dark'))
function toggleDark() {
  const root = document.documentElement
  const nowDark = root.classList.toggle('dark')
  isDark.value = nowDark
}

/** —— 图片灯箱（事件委托） —— */
const articleEl = ref<HTMLElement | null>(null)
const lightbox = ref<{ open: boolean; src: string; alt: string }>({
  open: false,
  src: '',
  alt: ''
})

function onArticleClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target && target.tagName === 'IMG') {
    const img = target as HTMLImageElement
    // currentSrc 能拿到实际加载的资源（含可能的绝对路径）
    openLightbox(img.currentSrc || img.src, img.alt || '')
  }
}

function openLightbox(src: string, alt = '') {
  lightbox.value = { open: true, src, alt }
  // 可选：锁定滚动
  document.documentElement.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.value.open = false
  lightbox.value.src = ''
  lightbox.value.alt = ''
  document.documentElement.style.overflow = ''
}

function onKeydown(ev: KeyboardEvent) {
  if (!lightbox.value.open) return
  if (ev.key === 'Escape') closeLightbox()
}
</script>

<style scoped>


/* 背景网格 */
.bg-grid-pattern-light {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}
.bg-grid-pattern-dark {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}

/* 入场动画 */
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp   { from { opacity: 0; transform: translateY(20px); }  to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { opacity: 0; animation: fadeInDown .8s ease-out forwards; }
.animate-fade-in-up   { opacity: 0; animation: fadeInUp   .8s ease-out forwards; }

/* 文章内图片：给放大手势 */
.prose img { cursor: zoom-in; }

/* 灯箱过渡（可选） */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>