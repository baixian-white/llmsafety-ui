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
# 面向 AI 安全的防御框架：MITRE ATLAS 中的 26 种关键措施

## 一、背景

在 AI 的快速演进过程中，安全风险正以前所未有的速度扩散：从 **数据投毒** 到 **模型篡改**，从 **对抗攻击** 到 **供应链漏洞**，AI 的每个生命周期环节都可能成为突破口。
MITRE 作为全球网络安全领域的重要力量，在 2025 年基于 **ATLAS 框架** 提出了 **26 条 AI 安全防御措施**。这份清单不仅是一套“操作手册”，更像是为全球 AI 产业建立的“安全宪法”，为企业和开发者提供了可执行的参考。

![图片1](./assets/图片1.jpeg)

## 二、26 条防御措施详解

### 1. 限制公开信息

避免对外披露组织使用的 AI 堆栈细节（如模型架构、数据集来源），减少被攻击者利用的可能。

### 2. 限制模型发布信息

不随意公布模型权重、训练数据或架构信息，防止对手通过这些信息发起灰盒或白盒攻击。

### 3. 被动 AI 输出混淆

在输出层降低保真度，例如只返回必要结果，避免对手通过高质量输出逆推出模型特性。

### 4. 模型强化

采用对抗性训练、知识蒸馏等方法增强模型鲁棒性，使其对对抗性输入更具抵抗力。

### 5. 限制模型查询

限制查询频率和数量，防止对手通过大规模探测推断模型。

### 6. 控制模型访问权限

建立内部模型注册表，严格管控模型和训练数据的访问权限，确保“最小权限原则”。

### 7. 使用模型集成架构

通过模型集成提升鲁棒性，不同模型相互弥补弱点，降低单点突破风险。

### 8. 净化训练数据

对训练集进行清理与过滤，剔除异常或恶意数据。
**方法**：关键词过滤、人工抽样、自动检测结合。

### 9. 验证模型完整性

通过后门触发器检测、概念漂移监控等手段，确认模型运行是否符合预期。

### 10. 使用多模传感器

采用多源数据输入（如图像+文本+声音），避免单一模态被攻击者操控。

### 11. 输入恢复

在推理前对输入进行预处理，消除可能存在的对抗性扰动。

### 12. 限制库加载

避免随意加载第三方库或不受信任的模型文件格式（如 pickle），防止恶意代码注入。

### 13. 加密敏感信息

对模型权重、参数、训练数据进行加密存储，降低被窃取的风险。

### 14. 代码签名

强制执行二进制与应用的数字签名验证，避免恶意代码在 AI 系统中执行。

### 15. 验证 AI 组件

通过校验和验证，确认模型组件未被篡改。

### 16. 对抗性输入检测

在 AI 模型之前加入检测器，识别恶意输入或异常行为。

### 17. 漏洞扫描

定期扫描 AI 模型和依赖库（如 pickle 文件），发现潜在漏洞并及时修补。

### 18. 模型分布

减少边缘设备部署，更多使用云端模型服务，降低攻击者直接访问模型的可能。

### 19. 用户教育

教育开发者掌握 AI 安全编码实践与漏洞防御知识，提高整体安全意识。

### 20. 身份验证

对用户与 API 调用进行严格身份验证，防止模型被滥用。

### 21. 生成式 AI 护栏

在模型输入与输出间增加“护栏”，通过过滤器、规则、NER 等方式限制不当内容生成。

### 22. 生成式 AI 指南

通过系统提示或全局说明，为模型设定角色、目标和安全边界，引导其避免不良输出。

### 23. 生成式 AI 对齐

在训练或微调中应用 **RLHF（人类反馈强化学习）**、安全微调等方法，让模型行为更符合人类价值与安全需求。

### 24. 构建 AI 物料清单（AI BOM）

完整记录 AI 系统构建所需的数据集、模型、依赖库，降低供应链风险。

### 25. AI 日志审计

记录模型输入与输出日志，帮助溯源安全事件，并在攻击发生前发现异常行为。

### 26. 数据集来源管理

追踪和管理训练数据的来源与修改记录，确保其合法性与可信度。

## 三、MITRE 的简单介绍

![图片1](./assets/图片1.jpeg)

MITRE 作为美国政府和国际安全界的重要合作伙伴，其提出的防御措施延续了 **CVE、CWE、ATT&CK** 等经典安全标准的理念：

* **可操作性**：不是空洞口号，而是能落地的实践指南。

* **全链路覆盖**：从数据、模型、运行到供应链，形成“纵深防御”。

* **全球影响力**：将成为未来 AI 安全国际标准化的重要参考。

## 四、总结与展望

这 26 条防御措施并不是彼此独立的“零散拼图”，而是可以组合成一个 **系统化的 AI 安全防御网络**：

* 在 **前端**：数据源管理与模型强化；

* 在 **中端**：服务层护栏与对抗性检测；

* 在 **后端**：运行时监控与日志审计。

未来，随着 AI 应用场景不断拓展，这些措施还会不断演化。但它们共同传递一个信号：
**AI 安全不能依赖单一防线，而需要构建“纵深、多层、可追溯”的整体体系。**

一句话总结：**MITRE 的 26 条措施，是全球 AI 安全实践的“工具箱”，为企业构筑稳固的 AI 护城河。**


`)

/** 图片根目录（修正相对路径） */
const baseImageDir = ref<string>('/articles/tool/md5')

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