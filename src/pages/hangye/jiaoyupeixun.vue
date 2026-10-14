<!-- src/pages/hangye/jiaoyupeixun.vue -->
<template>
  <div class="relative min-h-screen bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-gray-100 overflow-x-hidden">
    <!-- 背景 -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:22px_22px] opacity-60">
      </div>
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full blur-[120px] opacity-60"
        style="background: radial-gradient(40% 40% at 50% 50%, rgba(88,48,214,0.35), rgba(88,48,214,0.1) 60%, transparent 70%);">
      </div>
      <div class="absolute top-20 right-[-120px] h-[360px] w-[360px] rounded-full blur-3xl opacity-50"
        style="background: radial-gradient(50% 50% at 50% 50%, rgba(88,48,214,0.35), transparent 70%);"></div>
    </div>

    <main class="relative z-10">

      <!-- Hero：右侧视觉满宽 -->
      <section class="relative isolate overflow-hidden h-130">
        <div aria-hidden="true" class="absolute inset-0 z-0">
          <!-- 背景图（放到 public/hangye/jiaoyupeixun/p1.png） -->
          <div
            class="bg-cover absolute inset-0 bg-[url('/hangye/jiaoyupeixun/p1.webp')] bg-no-repeat bg-right md:bg-center opacity-90">
          </div>
          <!-- 文字可读性遮罩 -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0A0A0F] dark:via-[#0A0A0F]/80 dark:to-transparent">
          </div>
          <!-- 网格叠加 -->
          <div
            class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:22px_22px] opacity-40">
          </div>
        </div>

        <div class="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div class="max-w-2xl">
            <h1 class="text-4xl md:text-6xl font-bold leading-tight tracking-tighter
                      text-transparent bg-clip-text
                      bg-gradient-to-br from-gray-900 via-gray-700 to-black
                      dark:from-white dark:to-gray-300">
              教育与培训<br class="hidden md:block" />
            </h1>
            <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-xl">
              AI 正在重塑教学与学习：个性化辅导、智能评测与沉浸式课堂显著提升效率与体验；同时也带来隐私保护、内容可靠性、学术诚信与系统稳定性等新挑战。
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a href="#benefits" class="btn-primary">AI 在教育中的应用</a>
            </div>

            <div class="mt-6 flex flex-wrap gap-2 text-xs">
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">智能辅导</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">学习路径推荐</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">自动评测</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">虚拟课堂/实验</span>
            </div>

            <div class="mt-8 flex flex-wrap gap-3">
              <a href="#cases" class="btn-primary">潜在风险</a>
            </div>
            <div class="mt-6 flex flex-wrap gap-2 text-xs">
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">学生隐私</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">算法偏见</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">内容可靠性</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">学术诚信</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 机遇（应用）：横向无缝滚动卡片 -->
      <section id="benefits" class="py-16 md:py-20">
        <div class="container mx-auto px-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl md:text-3xl font-semibold">AI 在教育与培训中的关键应用</h2>
            <div class="hidden md:flex items-center gap-2 text-xs">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10">个性化
                · 自适应</span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10">评测
                · 教研 · 沉浸式</span>
            </div>
          </div>

          <!-- 横向滚动：无缝 + 悬停暂停 -->
          <div ref="scrollWrap" class="py-10 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            style="scrollbar-width:none;" @mouseenter="pauseScroll" @mouseleave="resumeScroll"
            @touchstart.passive="pauseScroll" @touchend.passive="resumeAfterDelay">
            <div ref="track"
              class="grid auto-cols-[85%] sm:auto-cols-[60%] md:auto-cols-[42%] xl:auto-cols-[32%] grid-flow-col gap-6 snap-x snap-mandatory">
              <div v-for="(b, i) in benefitsLoop" :key="i"
                class="panel p-6 snap-start hover:shadow-xl transition-shadow">
                <div class="flex items-center gap-3">
                  <div class="size-10 shrink-0 rounded-xl bg-white/70 dark:bg-white/10 grid place-items-center">
                    <svg viewBox="0 0 24 24" class="w-5 h-5 opacity-80">
                      <path fill="currentColor"
                        d="M12 3a9 9 0 1 1-9 9a9 9 0 0 1 9-9m-1 5v5l4 2l.75-1.23l-3.25-1.77V8z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">{{ b.title }}</h3>
                </div>
                <p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{{ b.desc }}</p>

                <!-- 证据链接（可选） -->
                <div class="mt-2" v-if="b.source">
                  <a :href="b.source.href" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full
                            border border-gray-200 dark:border-white/10
                            bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition">
                    <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 opacity-80">
                      <path fill="currentColor"
                        d="M14 3h7v7h-2V6.41L9.41 16L8 14.59L17.59 5H14zM5 5h6v2H7v10h10v-4h2v6H5z" />
                    </svg>
                    <span>来源：{{ b.source.label }}</span>
                  </a>
                </div>

                <ul class="mt-4 flex flex-wrap gap-2 text-xs">
                  <li v-for="t in b.tags" :key="t"
                    class="px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
                    {{ t }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 参考来源（低调展示，可留空/保留） -->
        <div class="container mx-auto px-6 mt-6">
          <div class="text-xs text-gray-500 dark:text-gray-400/70 leading-relaxed">
            <span class="font-semibold">参考来源：</span>
            <a href="https://unesdoc.unesco.org/ark:/48223/pf0000382071" target="_blank" rel="noopener"
              class="underline hover:text-gray-700 dark:hover:text-gray-200">UNESCO 指南</a>，
            <a href="https://oecd.ai/en/wonk/ai-in-education" target="_blank" rel="noopener"
              class="underline hover:text-gray-700 dark:hover:text-gray-200">OECD AI in Education</a>
          </div>
        </div>
      </section>

      <!-- 风险与案例：左侧粘性说明 + 右侧案例卡（此处仍然是“风险列表 + 案例区”的组合） -->
      <section id="cases" class="py-16 md:py-20 bg-gray-50/60 dark:bg-black/20">
        <div class="container mx-auto px-6 grid lg:grid-cols-12 gap-10 items-stretch">
          <!-- 左：粘性侧栏（风险） -->
          <aside class="lg:col-span-4 flex">
            <div class="lg:sticky lg:top-24 flex-1 flex flex-col">
              <h2 class="text-2xl md:text-3xl font-semibold">潜在风险</h2>
              <p class="mt-3 text-gray-600 dark:text-gray-400">
                我们从隐私保护、算法公平、内容可靠、学术诚信与系统稳定五个维度构建教育 AI 风险图谱，支持可持续、安全落地。
              </p>
              <ul class="mt-6 space-y-3 flex-1">
                <li v-for="(r, idx) in risks" :key="idx" class="panel my-4 p-4 flex items-start">
                  <div class="size-6 shrink-0 rounded-md bg-red-500/15 text-red-500 grid place-items-center">!</div>
                  <div>
                    <div class="font-medium">{{ r.title }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ r.desc }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          <!-- 右：案例区（示例占位，后续可换成你的真实案例） -->
          <!-- 右：案例区（展示新闻数据） -->
<section class="lg:col-span-8 flex">
  <div class="flex-1 max-h-[90vh] overflow-y-auto pr-2">
    <div v-for="(c, i) in cases" :key="i" class="panel p-0 overflow-hidden mb-4">
      <div class="grid md:grid-cols-5">
        <div class="md:col-span-5 p-6">
          <!-- 来源标签 -->
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ c.label }}</div>
          <!-- 标题 -->
          <h3 class="text-xl font-semibold mt-1">{{ c.title }}</h3>
          <!-- 摘要 -->
          <p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{{ c.desc }}</p>
          <!-- 标签 -->
          <ul class="mt-4 flex flex-wrap gap-2 text-xs">
            <li
              v-for="t in c.tags"
              :key="t"
              class="px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5"
            >
              {{ t }}
            </li>
          </ul>
          <!-- 链接 -->
          <div class="mt-4">
            <a
              :href="c.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
            >
              查看详情
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
      </section>

      <!-- 解决方案 -->
      <section id="solution" class="py-16 md:py-20 container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-center">人工智能教学解决方案</h2>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            我们推出了一套以基础硬件为底座、知识体系为抓手、平台能力为核心的综合性教学实训体系，全面覆盖从通用知识到具体应用场景的教学需求。
        </p>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(s, i) in solutions" :key="i" class="panel p-6 flex flex-col h-full">
                <h3 class="text-xl font-semibold">{{ s.title }}</h3>
                <p class="mt-4 text-gray-600 dark:text-gray-400">{{ s.desc }}</p>
                <ul class="mt-auto pt-4 flex flex-wrap gap-2 text-sm">
                     <li v-for="tag in s.tags" :key="tag" class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">{{tag}}</li>
                </ul>
            </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

type Benefit = {
  title: string;
  desc: string;
  tags: string[];
  source?: { label: string; href: string };
}
type Risk = { title: string; desc: string; tags?: string[] }
type Case = {
  label: string;     // 来源标签，比如“光明网科技 报道”
  title: string;     // 新闻标题
  desc: string;      // 摘要描述
  tags: string[];    // 标签数组
  link: string;      // 原文链接
}

type Solution = { title: string; desc: string; tags: string[]; }

const benefits: Benefit[] = [
  {
    title: '智能辅导与助教',
    desc: '面向课前预习、课后巩固与难点讲解，提供会话式答疑、讲义精读与分层练习。',
    tags: ['个性化学习', '自适应练习', '学习反馈'],
    source: { label: 'UNESCO AI in Education', href: 'https://unesdoc.unesco.org/ark:/48223/pf0000382071' }
  },
  {
    title: '学习路径推荐',
    desc: '依据学习画像动态规划学习进度与资源，按需推送示例、习题与视频。',
    tags: ['学习画像', '资源推荐', '进度管理'],
    source: { label: 'OECD – AI in Education', href: 'https://oecd.ai/en/wonk/ai-in-education' }
  },
  {
    title: '自动阅卷与评估',
    desc: '客观题自动判分、主观题辅助评分并给出改进建议，提升评测时效。',
    tags: ['自动化评测', '形成性评价', '即时反馈']
  },
  {
    title: '虚拟课堂与模拟实验',
    desc: '结合仿真与多模态交互，提供沉浸式实验与情境教学，突破器材与场地限制。',
    tags: ['沉浸式学习', '实验仿真', '多模态交互']
  },
  {
    title: '教研内容生产',
    desc: '辅助备课、题目创编与教案优化，减少重复性工作，聚焦教学创新。',
    tags: ['教案生成', '题库建设', '知识重组']
  },
  {
    title: '运营分析与质量保障',
    desc: '基于学习数据洞察课程质量与教学瓶颈，驱动教学改进与资源配置优化。',
    tags: ['数据洞察', '质量监控', '资源优化']
  }
]

// 横向无缝滚动：把 benefits 拼接两遍
const benefitsLoop = [...benefits, ...benefits]

const risks: Risk[] = [
  {
    title: '学生隐私与数据合规',
    desc: '学习记录、作业与语音视频等属于敏感教育数据，采集与存储需要最小化、可控化与透明化。'
  },
  {
    title: '算法偏见与不公平',
    desc: '训练数据不均衡可能放大对特定群体的刻板印象，影响推荐与评分的公平性。'
  },
  {
    title: '内容错误与幻觉',
    desc: '生成内容可能“看起来有理但实际错误”，需要事实核验与人类复核机制。'
  },
  {
    title: '学术诚信风险',
    desc: '作业代写、考试违规与抄袭检测绕过等问题需要技术与制度并行治理。'
  },
  {
    title: '系统稳定与依赖',
    desc: '平台宕机或模型失效会影响教学秩序，需建立灰度与降级预案，保持可替代性。'
  }
]

const cases: Case[] = [
  {
    "title": "教育部发布新版《AI 通识教育指南》：为“AI热”紧刹车",
    "desc": "新版指南禁止作业考试中直接使用 AI 内容，强调教师引导与分层目标，防止思维退化和认知混淆。",
    "tags": ["AI通识教育", "生成式AI", "教育指南"],
    "label": "光明网科技 报道",
    "link": "https://tech.gmw.cn/2025-09/02/content_38260352.htm"
  },
    {
    "title": "阿里云天池举办生成式教学大模型安全攻防赛",
    "desc": "阿里云天池平台推出教学生成式大模型安全攻防竞赛，评估主流教学大模型的安全防护能力，推动中文教育场景下的模型安全研究与对抗能力提升。",
    "label": "阿里报道",
    "link": "https://tianchi.aliyun.com/competition/entrance/532362/introduction",
    "tags": ["安全竞赛", "模型防护", "教育场景"]
    
  },
  {
    "title": "生成式 AI 教育应用安全风险研判与应对建议",
    "desc": "学界指出生成式 AI 可能导致学习自主性降低、隐私泄露、伦理缺失，并提出理念、技术和治理三方面的应对路径。",
    "tags": ["生成式AI", "教育风险", "隐私安全"],
    "label": "安全内参 专题文章",
    "link": "https://www.secrss.com/articles/79016"
  },
  {
    "title": "AI 教育助力思维退化？专家促批判思维培训为先",
    "desc": "专家警示 AI 工具虽高效，但可能削弱学生独立思考与提问能力，建议将批判性思维训练放在首位。",
    "tags": ["批判思维", "AI教育", "认知风险"],
    "label": "央视网教育 报道",
    "link": "https://edu.cctv.com/2025/09/01/ARTI5aLiYxZOdRCrVlSj8kv9250901.shtml"
  }
]


const solutions: Solution[] = [
    {
        title: '构建完整知识体系',
        desc: '整合国内外顶尖高校的前沿研究成果与丰富的教学经验，实时集成最新的AI技术与算法，确保学员始终接触到行业最新的知识，保障所学知识紧密贴合实际应用需求，提升知识的时效性与实用性。',
        tags: ['前沿理论', '动态更新', '实用导向'],
    },
    {
        title: '打造沉浸式场景体验',
        desc: '紧贴行业需求，将知识点巧妙融入具体任务，构建高度仿真的企业级实战环境。学员在模拟场景中反复历练，完成知识的快速迁移，无缝对接企业需求。例如，在金融场景中，利用AI进行金融风险预测模型的构建与验证。',
        tags: ['行业驱动', '实战模拟', '快速上手'],
    },
    {
        title: '精准溯源解析',
        desc: '搭建专属AI靶场，模拟各类真实且复杂的行业任务场景。通过可视化工具边学边练，完成诸如智能客服系统、工业设备故障预测模型等任务。系统会自动检测并评估学员解决问题的能力指标，并给出精准评分，帮助学员在模拟实战中获得提升。',
        tags: ['AI靶场', '可视化实操', '精准评估'],
    }
]

// 自动滚动
const scrollWrap = ref<HTMLDivElement | null>(null)
let rafId: number | null = null
let isPaused = false

function step() {
  if (!scrollWrap.value) return
  if (!isPaused) {
    scrollWrap.value.scrollLeft += 0.7
    const half = (scrollWrap.value.scrollWidth - scrollWrap.value.clientWidth) / 2
    if (scrollWrap.value.scrollLeft >= half - 1) {
      scrollWrap.value.scrollLeft = 0
    }
  }
  rafId = requestAnimationFrame(step)
}
function pauseScroll() { isPaused = true }
function resumeScroll() { isPaused = false }
function resumeAfterDelay() { setTimeout(() => (isPaused = false), 400) }

onMounted(() => { rafId = requestAnimationFrame(step) })
onBeforeUnmount(() => { if (rafId) cancelAnimationFrame(rafId) })
</script>

<style scoped>
.panel {
  transition: transform .25s ease, box-shadow .25s ease;
}

.panel:hover {
  transform: translateY(-2px);
}
</style>
```