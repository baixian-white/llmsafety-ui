<!-- src/pages/zhishiku/anquankuangjia.vue -->
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
# 大模型安全工具开源大全：攻防博弈下的AI“武器库”

在生成式AI迅速走向产业化的今天，大模型既是生产力引擎，也是潜在风险源。
它能生成知识、写代码、作诗歌，却同样可能被利用来传播虚假信息、窃取数据甚至触发系统级风险。

在这片新的战场上，**黑客的“矛”与防御者的“盾”**正在激烈对抗：

* 如何在攻击者出手前发现模型的薄弱点？

* 如何过滤掉潜藏在输入中的恶意指令？

* 如何确保智能体的输出既可靠又安全？

本文将带你走进大模型安全的“武器库”，一览当前最具代表性的 **开源安全项目**。无论你是研究者、开发者，还是企业安全负责人，都能在其中找到合适的工具，为AI筑起安全防线。

## 一、综合性评估与攻击模拟工具

在安全领域，最有效的防御往往始于主动进攻。就像“红队演练”一样，这类工具通过模拟真实攻击手法，帮助开发者发现模型潜在漏洞。

### 1. garak

被称为 LLM 世界里的 **“nmap/Metasploit”**。

* **功能**：检测模型的多种故障模式，包括幻觉、越狱、提示注入、数据泄露、毒性生成等。

* **特点**：采用静态、动态和自适应探针的组合，全方位扫描模型，就像为大模型做一次“CT体检”。

👉 GitHub: [garak](https://github.com/NVIDIA/garak)

### 2. PyRIT

微软推出的 **Python Risk Identification Tool**。

* **功能**：面向文本输入模型的红队演练，支持与 Azure OpenAI、Hugging Face 等平台集成。

* **特点**：能根据模型的响应调整攻击策略，实现多轮交互式测试，更贴近真实对抗场景。

👉 GitHub: [PyRIT](https://github.com/Azure/PyRIT)

## 二、安全护栏与运行时监控工具

如果说评估工具是“红队”，那么护栏与监控就是“城墙”。它们帮助应用在运行中实时发现、拦截风险。

### 1. Rebuff.ai

* **定位**：专注于提示注入防御。

* **方法**：结合启发式过滤、LLM 检测、向量数据库比对、金丝雀令牌监控。

* **价值**：尽管仍是原型，但提供了一种“多层次防御”思路。

👉 GitHub: [Rebuff](https://github.com/protectai/rebuff)

### 2. Vigil LLM

* **定位**：像“哨兵”一样，实时监测输入是否含有恶意成分。

* **功能**：提示注入检测、越狱尝试拦截、不当输入过滤。

👉 GitHub: [Vigil LLM](https://github.com/deadbits/vigil-llm)

### 3. LlamaFirewall

Meta 提出的“紫色羊驼”安全框架中的重要组件。

* **功能**：

  * **PromptGuard 2**：通用越狱检测器

  * **Agent Alignment Checks**：思维链一致性审计

  * **CodeShield**：代码静态分析引擎

* **价值**：构成 AI 代理风险的“最后一道防线”。

👉 GitHub: [LlamaFirewall](https://github.com/meta-llama/PurpleLlama/tree/main/LlamaFirewall)

### 4. Guardrails AI

* **定位**：输出结果的“质检员”。

* **功能**：通过 RAIL 语言定义输出规则，对 LLM 生成结果进行校验、修正。

* **价值**：避免模型输出结构错乱、类型错误或越界内容，提升可靠性。

👉 GitHub: [Guardrails AI](https://github.com/guardrails-ai/guardrails)

## 三、专项安全检测与防护工具

不同于通用防御，这类工具更像“专科医生”，专注于 LLM 的特定风险点。

### 1. Giskard

* **功能**：自动化检测机器学习模型（含 LLM）的隐患。

* **覆盖范围**：幻觉、错误信息、有害内容、提示注入、信息泄露、偏见歧视等。

* **价值**：是开发环节的“全科安全体检表”。

👉 GitHub: [Giskard](https://github.com/Giskard-AI/giskard)

### 2. LLMFuzzer

* **定位**：大模型的“模糊测试仪”。

* **功能**：通过大量畸形或非预期输入，探索模型边界和漏洞。

* **应用场景**：API 集成应用的安全压力测试。

👉 GitHub: [LLMFuzzer](https://github.com/mnns/LLMFuzzer)

### 3. ModelScan

* **开发方**：Protect AI

* **功能**：扫描模型文件（H5、Pickle、SavedModel 等），检测是否含恶意代码。

* **意义**：防止“带毒模型”在加载时执行恶意逻辑，避免凭证窃取和数据泄露。

👉 GitHub: [ModelScan](https://github.com/protectai/modelscan)

| 工具                | 类型          | 主要功能                   | 适用场景          |
| ----------------- | ----------- | ---------------------- | ------------- |
| **garak**         | 综合评估 / 攻击模拟 | 模拟幻觉、数据泄露、提示注入、越狱等故障模式 | 模型红队测试、漏洞扫描   |
| **PyRIT**         | 综合评估 / 攻击模拟 | 多轮交互式红队演练，动态调整策略       | API 接入模型风险测试  |
| **Rebuff.ai**     | 安全护栏        | 多层防御提示注入，金丝雀令牌检测       | 应用层运行时保护      |
| **Vigil LLM**     | 安全护栏        | 输入检测与过滤，识别恶意提示         | 智能体网关 / 输入预处理 |
| **LlamaFirewall** | 安全护栏        | 越狱检测、思维链审计、不安全代码过滤     | AI 代理运行时最后防线  |
| **Guardrails AI** | 安全护栏        | 用 RAIL 规则验证并修复输出       | 确保输出结构化与合规    |
| **Giskard**       | 专项检测        | 自动化发现幻觉、偏见、提示注入等风险     | 模型开发与测试阶段     |
| **LLMFuzzer**     | 专项检测        | 模糊测试，探索模型边界和漏洞         | 集成应用压力测试      |
| **ModelScan**     | 专项检测        | 扫描模型文件，发现恶意代码          | 模型分发与部署安全     |

## 结语：

大模型安全不仅是技术问题，更是产业可持续发展的基石。
这些开源工具，就像 AI 的“免疫细胞”，帮助开发者和企业在风险扩散前发现、隔离和修复漏洞。

然而，**没有任何单一工具能解决所有安全问题**。真正有效的做法是：

* 根据应用场景，组合使用多种工具；

* 建立覆盖研发、部署、运行全周期的多层次安全体系；

* 持续跟踪前沿威胁，保持安全策略的迭代。

未来，谁能在 **“创新”与“安全”** 之间找到平衡点，谁就能真正掌握大模型时代的主动权。




`)

/** 图片根目录（修正相对路径） */
const baseImageDir = ref<string>('/articles/tool/md6')

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