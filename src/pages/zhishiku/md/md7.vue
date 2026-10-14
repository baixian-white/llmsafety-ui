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

    <!-- 动态深色模式霓虹光晕 -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-25%] left-[-10%] w-[560px] h-[560px] bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-25%] right-[-10%] w-[560px] h-[560px] bg-cyan-500/30 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
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
import MarkdownIt from "markdown-it"
import { computed, ref, onBeforeUnmount, onMounted } from "vue"

/** ① 直接内联 Markdown 原文（去掉了容易出错的模板拼接写法） */
const mdRaw = ref<string>(`
# Google提出的AI Agent纵深安全体系：从风险识别到动态防御的新范式

随着 AI 技术的不断演进，智能体（AI Agent）正逐步走向实际应用场景：它们能代替人类执行复杂任务、调用外部工具、处理多模态数据。但与此同时，伴随而来的安全风险也在急速放大。
如果没有系统性的防护，智能体可能成为数据泄露、越权操作甚至现实世界损害的“桥梁”。

Google 在 2025 年提出了一套 **AI Agent 安全框架**，其核心理念是：**通过风险识别—安全原则—多层防御的闭环机制，为智能体的可扩展应用奠定安全基础**。这套体系不仅是规则层面的限制，更是结合推理能力的纵深防御实践。

![图片1](./assets/图片1.jpeg)

## 两大核心风险

Google 将智能体面临的风险聚焦为两大类：**异常行为（Rogue Actions）** 和 **敏感数据泄露（Sensitive Data Disclosure）**。

![图片2](./assets/图片2.jpeg)



### 1. 异常行为（Rogue Actions）

异常行为指 AI Agent 偏离预期、执行有害或不合规的操作。产生原因主要包括：

* **提示注入（Prompt Injection）**：攻击者在邮件、网页或文件中嵌入恶意指令，智能体被误导执行攻击者意图。例如，一封精心设计的邮件可能让智能体“主动”将内部报告发送给攻击者。

* **模型误解/对齐问题（Misalignment）**：即使没有恶意输入，模糊指令也可能触发错误。例如“给Mike发项目进展邮件”，智能体可能误选收件人，导致信息泄露。

* **外部交互误解（External Interaction Misinterpretation）**：当智能体调用外部工具或复杂网站时，错误的参数或按钮操作可能触发严重后果，如误下单或非预期数据提交。

**潜在影响**：财务损失、数据泄漏、系统中断、品牌声誉受损，甚至物理层面的安全风险。风险程度通常与智能体所掌控的工具权限成正比。

### 2. 敏感数据泄露（Sensitive Data Disclosure）

数据泄露是另一类关键风险，通常以更隐蔽的方式出现：

* **数据外泄（Data Exfiltration）**：攻击者引导智能体执行特定操作，让敏感信息在副作用中“顺带”泄露。比如将机密数据拼接到 URL 参数中或藏在 Git 提交信息里。

* **输出操控（Output Manipulation）**：攻击者诱导模型直接生成包含敏感数据的输出（如 Markdown 链接或图片 URL）。如果应用缺乏渲染防护，这些数据会在浏览器中被自动请求，进一步导致泄露甚至触发 XSS。

**潜在影响**：隐私被窃取、知识产权流失、合规风险、长期账户安全受损，往往不可逆转。

## 三大安全原则

为应对这些风险，Google 提炼了 **3 项智能体开发与运维原则**：![图片3](./assets/图片3.jpeg)



### 原则 1：必须有明确的人类控制者

* **清晰授权**：每个智能体都要有唯一、可信的人类监督者，系统能区分合法指令与潜在攻击输入。

* **关键操作二次确认**：删除数据库、转账、修改安全策略等操作必须请求用户确认。

* **多用户场景隔离**：在团队环境中，智能体应有独立身份与精细化权限，避免跨用户误触发。

👉 **核心措施**：建立 **Agent User Controls**（用户控制机制），确保智能体身份独立、输入通道安全。

### 原则 2：权限必须受限

* **用途对齐**：智能体的权限需严格符合任务目标。写作助手不应具备删除文件权限，研究助手也不应修改银行数据。

* **动态权限收紧**：不仅仅是最小化权限，还要根据上下文与任务动态调整。

* **权限上限管控**：禁止智能体“自我升级”权限，用户应随时能撤销其能力。

👉 **核心措施**：建立 **Agent Permissions**（权限控制），依托认证、授权和审计（AAA）体系，落实精细化管控。

### 原则 3：行为与规划必须可观察

* **全链路日志**：记录输入、工具调用、输出、参数，甚至推理路径，且需安全存储。

* **操作标注**：所有操作都需标识属性：只读/写入？是否涉及敏感数据？

* **界面透明度**：用户界面应展示智能体“思考过程”和数据来源，在高风险操作前明确提示。

👉 **核心措施**：建立 **Agent Observability**（可观察性控制），通过集中日志和标准化 API 实现可审计、可追踪。





| 安全原则                          | 核心要求                                                   | 控制措施                                  |
| --------------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| **原则1：必须有明确的人类控制者** | - 明确智能体控制用户- 关键操作需确认- 多用户场景下权限隔离 | Agent User Controls（独立身份、安全通道） |
| **原则2：权限必须受限**           | - 权限与用途对齐- 动态收紧权限- 严格禁止自我提权           | Agent Permissions（认证、授权、审计体系） |
| **原则3：行为与规划必须可观察**   | - 全链路日志记录- 操作标注属性- 界面透明化展示             | Agent Observability（集中日志+标准化API） |

## 两层纵深防御策略

Google 提出结合 **确定性措施 + 推理防御** 的双层策略，打造“纵深防御”（Defense-in-Depth）：

![图片4](./assets/图片4.jpeg)

### 第一层：确定性防护（Deterministic Safeguards）

* **手段**：基于策略引擎的规则限制，如金额超过上限则阻止支付、检测到可疑输入则禁止外发邮件。

* **优势**：稳定、可预测、易审计。

* **局限**：难覆盖复杂场景，缺乏上下文灵活性。

### 第二层：基于推理的防御（Reasoning-based Defenses）

* **手段**：利用 AI 模型本身的能力识别和化解风险，例如：

  * 对抗训练（让模型学会忽略恶意指令）；

  * 防护模型检测输入输出中的可疑信号；

  * 分析智能体计划，提前预测潜在风险。

* **优势**：能应对复杂、动态的攻击模式，提升攻击者成本。

* **局限**：依赖模型质量和对齐程度，仍需与确定性策略结合。



| 层级                   | 核心思想             | 主要手段                       | 优势                       | 局限性                       |
| ---------------------- | -------------------- | ------------------------------ | -------------------------- | ---------------------------- |
| **第一层：确定性防护** | 策略引擎拦截行为     | - 规则评估- 硬性限制- 用户确认 | 稳定、可预测、易审计       | 难覆盖复杂场景，缺乏上下文   |
| **第二层：推理防御**   | 利用模型推理识别风险 | - 对抗训练- 防护模型- 计划分析 | 适应动态攻击，识别复杂场景 | 依赖模型质量，需与策略层结合 |

## 总结：智能体安全的未来方向

Google 的 AI Agent 安全框架从 **风险识别 → 原则约束 → 策略落地** 构建了一个完整闭环。
它不仅是安全机制的汇总，更是一种 **哲学转变**：从“防止模型出错”转向“如何在复杂生态中保证智能体行为可控”。

对于开发者与企业而言，这意味着：

* 在设计之初就要嵌入安全考量；

* 不仅依赖静态规则，还要发挥 AI 自身的推理检测能力；

* 安全与实用性之间的平衡将决定智能体能否真正走向规模化应用。

换言之，AI Agent 的未来能否普及，不仅取决于它们的“聪明程度”，更取决于我们能否让它们在 **人类监督下安全工作**。



`)

const baseImageDir = ref<string>('/articles/tool/md7')

const md = new MarkdownIt({ html: true, linkify: true, breaks: false })

const pageTitle = computed(() => {
  const m = mdRaw.value.match(/^\s*#\s+(.+)$/m)
  return m ? m[1].trim() : '文档'
})

function rewriteImagePaths(markdown: string) {
  return markdown.replace(/!\[([^\]]*)\]\((?!https?:\/\/|\/\/|\/)([^)]+)\)/g, (_m, alt, path) => {
    const safe = String(path).replace(/^\.\//, '') 
    return `![${alt}](${baseImageDir.value}/${safe})`
  })
}

const html = computed(() => md.render(rewriteImagePaths(mdRaw.value)))

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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const isDark = ref<boolean>(document.documentElement.classList.contains('dark'))
function toggleDark() {
  const root = document.documentElement
  const nowDark = root.classList.toggle('dark')
  isDark.value = nowDark
}

/** 图片灯箱（事件委托） */
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
    openLightbox(img.currentSrc || img.src, img.alt || '')
  }
}

function openLightbox(src: string, alt = '') {
  lightbox.value = { open: true, src, alt }
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

@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp   { from { opacity: 0; transform: translateY(20px); }  to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { opacity: 0; animation: fadeInDown .8s ease-out forwards; }
.animate-fade-in-up   { opacity: 0; animation: fadeInUp .8s ease-out forwards; }

.prose img { cursor: zoom-in; }

.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
</style>
