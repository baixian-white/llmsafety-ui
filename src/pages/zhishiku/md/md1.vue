<!-- src/pages/zhishiku/md1.vue -->
<template>
  <div
    class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark relative">
    <!-- 顶部阅读进度条 -->
    <div class="fixed top-0 left-0 right-0 h-[3px] z-50">
      <div
        class="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 transition-[width] duration-150 ease-out"
        :style="{ width: progress + '%' }" />
    </div>

    <!-- 深色模式霓虹光晕 -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div
        class="absolute top-[-25%] left-[-10%] w-[560px] h-[560px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse">
      </div>
      <div
        class="absolute bottom-[-25%] right-[-10%] w-[560px] h-[560px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000">
      </div>
    </div>

    <!-- 主体 -->
    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- 玻璃态 Hero -->
      <section class="relative mb-12 md:mb-16 animate-fade-in-down">
        <div
          class="max-w-5xl mx-auto rounded-3xl border border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_60px_-20px_rgba(99,102,241,.35)] dark:shadow-[0_20px_60px_-20px_rgba(6,182,212,.25)]">
          <div class="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div class="flex-1">
              <p class="text-xs uppercase tracking-widest text-indigo-500 mb-2">Model Safety</p>
              <h1
                class="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500">
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
          class="max-w-5xl mx-auto p-6 md:p-10 border border-white/15 bg-white/60 dark:bg-white/5 rounded-3xl shadow-xl dark:shadow-2xl shadow-gray-200/40 dark:shadow-indigo-500/10 backdrop-blur-xl">
          <article ref="articleEl" @click="onArticleClick" class="prose prose-gray dark:prose-invert max-w-none
                   prose-headings:scroll-mt-24
                   prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                   prose-p:leading-7
                   prose-a:underline-offset-2 hover:prose-a:underline
                   prose-img:rounded-xl prose-img:shadow
                   prose-strong:font-semibold" v-html="html" />
        </div>
      </section>

      <!-- 底部 CTA -->
      <section class="text-center mt-12 md:mt-16 animate-fade-in-up" style="animation-delay: 120ms;">
        <div
          class="max-w-4xl mx-auto rounded-3xl border border-white/20 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 dark:from-indigo-500/15 dark:via-fuchsia-500/15 dark:to-cyan-500/15 backdrop-blur p-8 md:p-10">
          <h2
            class="text-2xl md:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500">
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
        @click="scrollToTop" aria-label="返回顶部">
        <svg class="size-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5m0 0l-6 6m6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <button
        class="size-11 rounded-full border border-white/20 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg transition flex items-center justify-center"
        @click="toggleDark" aria-label="切换主题">
        <svg v-if="isDark" class="size-5" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else class="size-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M8.05 8.05 6.636 6.636m10.728 0-1.414 1.414M8.05 15.95l-1.414 1.414"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- 图片灯箱（点击图片放大） -->
    <transition name="fade">
      <div v-if="lightbox.open"
        class="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="closeLightbox">
        <button
          class="absolute top-4 right-4 size-10 rounded-full bg-white/90 dark:bg-white/10 border border-white/20 flex items-center justify-center shadow hover:scale-105 transition"
          @click="closeLightbox" aria-label="关闭">
          ✕
        </button>
        <img :src="lightbox.src" :alt="lightbox.alt || 'image'"
          class="max-w-[95vw] max-h-[85vh] rounded-xl shadow-2xl object-contain" />
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
import { computed, ref, onBeforeUnmount, onMounted } from "vue"

/** ① 直接内联 Markdown 原文（去掉了容易出错的模板拼接写法） */
const mdRaw = ref<string>(
  `
# 九个大模型安全框架解读

## 一、前言

大模型的安全问题，已经不再只是技术人员的“幕后焦虑”，而逐渐成为产业界、政策制定者与普通用户都必须面对的现实。如何防范模型被投毒？如何确保训练数据合规？如何避免“AI 失控”？

近两年，国内外学术机构、企业和监管组织纷纷提出各类大模型安全框架。它们有的侧重技术，有的着眼治理，有的强调伦理。

本文将系统梳理当前最具影响力的 **九大框架**，并从维度、特点和适用场景进行分析。

![图片1](./assets/图片1.png)

## 二、九大安全框架详解

### 1. Google Secure AI Framework (SAIF, 2025.4)

* **核心理念**：将 AI 系统拆解为 **数据、基础设施、模型、应用** 四层，逐层分析风险。

* **亮点**：明确了 15 大风险（数据中毒、模型篡改、提示注入、敏感数据泄漏等），并给出相应的 15 类防控措施。

* **适用场景**：适合技术驱动型企业在研发与落地环节进行 **全链路风险扫描**。

![2](./assets/2.jpeg)

### 2. OWASP Top 10 LLM 安全威胁 (2025.3)

* **核心理念**：借鉴 Web 安全领域的经验，将大模型应用拆解为 **多个信任域**（服务、插件、数据库、外部数据源），重点识别交互中的高危点。

* **十大风险**：提示词注入、敏感信息泄露、供应链风险、模型投毒、不当输出、过度授权、系统提示泄漏、嵌入漏洞、信息误导、无限资源消耗。

* **适用场景**：为开发者与安全团队提供一份 **最常见威胁的清单**。

![3](./assets/3.jpeg)

### 3. OpenAI 模型安全框架 (System Card, updating)

* **核心理念**：从 **CBRN（大规模杀伤性风险）、网络攻击、说服力、自主性** 四个维度评估。

* **运作机制**：每次模型发布前，都要通过 **价值观对齐 → 对抗评估 → 管控迭代** 三步走，生成一份 System Card。

* **特点**：强调“模型上线前必须经过全方位红蓝对抗”，并在部署后继续动态治理。

* **适用场景**：适合在 **商业大模型落地** 前进行合规化审查。

![4](./assets/4.jpeg)

### 4. 人工智能安全标准体系 V1.0（网安标委, 2025.1）

* **核心理念**：与网络安全国家标准体系衔接，形成一套覆盖 **基础共性、安全管理、关键技术、测试评估、产品应用** 的综合体系。

* **重点维度**：

  * 管理：算法安全、数据安全、系统安全、供应链安全；

  * 技术：生成式 AI 安全、智能体安全、多模态安全、安全围栏。

* **适用场景**：监管与企业 **合规落地** 的参考依据。

  ![5](./assets/5.jpeg)

### 5. 人工智能安全治理框架（网安标委, 2024.9）

* **风险划分**：内生风险（模型本身：算法、数据、系统）+ 应用风险（网络域、现实域、认知域、伦理域）。

* **治理理念**：不仅靠技术，更要多方共治——研发机构、服务商、用户、政府、行业协会共同参与治理。

* **适用场景**：宏观治理层面的政策框架，适合 **行业规范与政策制定**。

![6](./assets/6.jpeg)

### 6. 大模型安全实践 2024（清华大学&中关村实验室&蚂蚁集团, 2024.11）

* **核心理念**：安全不仅是底层技术，更是“以人为本、AI 向善”的体系构建。

* **五大部分**：建设指导思想、安全技术体系、安全测评与防御、端边云安全、多行业应用。

* **覆盖风险**：数据泄漏、模型投毒、指令攻击、窃取攻击、硬件/软件漏洞、虚假信息、意识形态风险、诈骗、知识产权侵犯等。

* **适用场景**：研究机构与大厂的 **实践落地经验总结**。

![7](./assets/7.jpeg)

### 7. 大模型安全研究报告（阿里云&信通院, 2024.9）

* **四大维度**：数据安全、模型安全、系统平台安全、业务应用安全。

* **亮点**：首次提出“大模型安全不仅保护自身，还能反哺网络安全”。

* **适用场景**：企业级 **云端安全治理** 与产品化参考。

![8](./assets/8.jpeg)

### 8. 大模型安全与伦理研究 2024（腾讯研究院, 2024.1）

* **核心理念**：安全问题与伦理问题不可分割。

* **内容**：梳理 15 类风险（数据泄漏、供应链投毒、硬件漏洞、平台漏洞等），提出四类最佳实践：

  * Prompt 安全测评

  * 蓝军攻防演练

  * 源码防护实践

  * 基础设施安全方案

* **适用场景**：偏 **研究与伦理治理**，适合政策讨论和学术探索。

![9](./assets/9.jpeg)

### 9. 360 大模型安全解决方案（updating）

* **风险划分**：系统安全、内容安全、可信安全、可控安全。

* **产品矩阵**：

  * **智鉴**：生态链漏洞检测

  * **智盾**：内容安全防护

  * **智搜**：可信安全评估

* **特点**：较早推出 **完整的安全产品组合**，将框架直接转化为工具。

* **适用场景**：企业 **落地级安全解决方案**。

![10](./assets/10.jpeg)

## 三、比较与趋势

| 框架              | 主要提出方    | 特点                         | 适用场景           |
| ----------------- | ------------- | ---------------------------- | ------------------ |
| SAIF              | Google        | 全链路 15 风险点 + 防控措施  | 技术研发与应用落地 |
| OWASP Top 10      | OWASP         | 面向开发者的十大常见威胁     | 开发与测试环节     |
| OpenAI Framework  | OpenAI        | System Card + 三步治理       | 商业大模型发布     |
| 安全标准体系 V1.0 | 网安标委      | 与国标衔接，标准化分类       | 监管/合规          |
| 安全治理框架      | 网安标委      | 内生 + 应用风险，全社会共治  | 政策治理           |
| 安全实践 2024     | 清华&蚂蚁     | 技术与应用结合，强调 AI 向善 | 行业实践           |
| 安全研究报告      | 阿里云&信通院 | 自身安全 + 赋能网络安全      | 云平台治理         |
| 安全与伦理研究    | 腾讯研究院    | 技术安全 + 伦理对齐          | 学术/政策          |
| 360 解决方案      | 360           | 产品化工具，解决方案导向     | 企业落地           |

## 四、总结与思考

* **趋同点**：所有框架都强调 **全链路防护** 和 **多方协同治理**。

* **差异性**：

  * 国际厂商（Google、OpenAI）强调 **技术全流程与实测**；

  * 国内机构（网安标委、信通院、清华、腾讯等）更关注 **治理、合规与伦理**；

  * 企业（360、阿里云）倾向于 **产品化落地**。

* **趋势**：框架正在从“原则性指南”走向“工具化落地”，未来可能形成国际/国内标准融合。

一句话总结：**大模型的安全框架已经从理念探索走向产品与治理并重的新阶段，真正的挑战是如何在创新与监管之间找到平衡。*


`)

/** 图片根目录（修正相对路径） */
const baseImageDir = ref<string>('/articles/tool/md1')

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
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  opacity: 0;
  animation: fadeInDown .8s ease-out forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp .8s ease-out forwards;
}

/* 文章内图片：给放大手势 */
.prose img {
  cursor: zoom-in;
}

/* 灯箱过渡（可选） */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>