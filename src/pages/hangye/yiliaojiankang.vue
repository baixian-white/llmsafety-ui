<!-- src/pages/hangye/yiliaojiankang.vue -->
<template>
  <div class="relative min-h-screen bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-gray-100 overflow-x-hidden">
    <!-- 背景 -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:22px_22px] opacity-60"></div>
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full blur-[120px] opacity-60"
            style="background: radial-gradient(40% 40% at 50% 50%, rgba(88,48,214,0.35), rgba(88,48,214,0.1) 60%, transparent 70%);"></div>
      <div class="absolute top-20 right-[-120px] h-[360px] w-[360px] rounded-full blur-3xl opacity-50"
            style="background: radial-gradient(50% 50% at 50% 50%, rgba(88,48,214,0.35), transparent 70%);"></div>
    </div>

    <main class="relative z-10">
      <!-- Hero：右侧视觉满宽 -->
      <section class="h-130 relative isolate overflow-hidden">
        <div aria-hidden="true" class="absolute inset-0 z-0">
          <!-- 背景图 -->
          <div class="bg-cover absolute inset-0 bg-[url('/hangye/yiliaojiankang/p1.webp')] bg-no-repeat bg-right md:bg-center opacity-90"></div>
          <!-- 文字可读性遮罩 -->
          <div class="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0A0A0F] dark:via-[#0A0A0F]/80 dark:to-transparent"></div>
          <!-- 网格叠加 -->
          <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:22px_22px] opacity-40"></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div class="max-w-2xl">
            <h1 class="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-black dark:from-white dark:to-gray-300">
              医疗与健康<br class="hidden md:block" />
            </h1>
            <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-xl">
              AI深度赋能医疗健康行业，不仅能提升疾病诊断的准确率与治疗效率，还能推动个性化医疗发展，但同时也伴随数据隐私、模型偏差和伦理风险。
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a href="#benefits" class="btn-primary">AI 给医疗健康带来的好处</a>
            </div>

            <div class="mt-6 flex flex-wrap gap-2 text-xs">
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">个性化医疗</span>
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">药物研发加速</span>
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">辅助诊断</span>
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">运营和流程优化</span>
            </div>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="#cases" class="btn-primary">AI给医疗健康带来的风险</a>
            </div>
            <div class="mt-6 flex flex-wrap gap-2 text-xs">
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">数据隐私和合规</span>
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">偏见与不公平</span>
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">幻觉与错误诊断</span>
              <span class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">可不可追溯与审计</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 机遇（好处）：横向无缝滚动卡片 -->
      <section id="benefits" class="py-16 md:py-20">
        <div class="container mx-auto px-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl md:text-3xl font-semibold">AI 在医疗健康中的关键应用</h2>
            <div class="hidden md:flex items-center gap-2 text-xs">
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10">影像 · NLP · 多模态</span>
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10">合规 · 安全 · 可靠</span>
            </div>
          </div>

          <!-- 横向滚动：无缝 + 悬停暂停 -->
          <div
            ref="scrollWrap"
            class="py-10 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            style="scrollbar-width:none;"
            @mouseenter="pauseScroll"
            @mouseleave="resumeScroll"
            @touchstart.passive="pauseScroll"
            @touchend.passive="resumeAfterDelay"
          >
            <div
              ref="track"
              class="grid auto-cols-[85%] sm:auto-cols-[60%] md:auto-cols-[42%] xl:auto-cols-[32%] grid-flow-col gap-6 snap-x snap-mandatory"
            >
              <div
                v-for="(b, i) in benefitsLoop"
                :key="i"
                class="panel p-6 snap-start hover:shadow-lg transition-shadow"
              >
                <div class="flex items-center gap-3">
                  <div class="size-10 shrink-0 rounded-xl bg-white/70 dark:bg-white/10 grid place-items-center">
                    <svg viewBox="0 0 24 24" class="w-5 h-5 opacity-80"><path fill="currentColor" d="M12 3a9 9 0 1 1-9 9a9 9 0 0 1 9-9m-1 5v5l4 2l.75-1.23l-3.25-1.77V8z"/></svg>
                  </div>
                  <h3 class="text-lg font-medium">{{ b.title }}</h3>
                </div>
                <p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{{ b.desc }}</p>
                <!-- 证据链接 -->
                      <div class="mt-2">
                        <a :href="b.source.href" target="_blank" rel="noopener"
                          class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full
                                  border border-gray-200 dark:border-white/10
                                  bg-white/60 dark:bg-white/5 hover:bg-gray-100/80 dark:hover:bg-white/10
                                  transition">
                          <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 opacity-80">
                            <path fill="currentColor" d="M14 3h7v7h-2V6.41L9.41 16L8 14.59L17.59 5H14zM5 5h6v2H7v10h10v-4h2v6H5z"/>
                          </svg>
                          <span>来源：{{ b.source.label }}</span>
                        </a>
                      </div>

                <ul class="mt-4 flex flex-wrap gap-2 text-xs">
                  <li
                    v-for="t in b.tags"
                    :key="t"
                    class="px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5"
                  >
                    {{ t }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 参考来源（低调展示） -->
          <div class="container mx-auto px-6 mt-6">
            <div class="text-xs text-gray-500 dark:text-gray-400/70 leading-relaxed">
              <span class="font-semibold">参考来源：</span>
              <a href="https://jbiomedsci.biomedcentral.com/articles/10.1186/s12929-024-01110-w" target="_blank" rel="noopener"
                class="underline hover:text-gray-700 dark:hover:text-gray-200">BMC Precision Medicine</a>，
              <a href="https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/artificial-intelligence-drug-development" target="_blank" rel="noopener"
                class="underline hover:text-gray-700 dark:hover:text-gray-200">FDA – AI in Drug Development</a>，
              <a href="https://www.nature.com/articles/s41598-024-70073-7" target="_blank" rel="noopener"
                class="underline hover:text-gray-700 dark:hover:text-gray-200">Nature – Diagnosis Research</a>，
              <a href="https://bmcmededuc.biomedcentral.com/articles/10.1186/s12909-023-04698-z" target="_blank" rel="noopener"
                class="underline hover:text-gray-700 dark:hover:text-gray-200">BMC Medical Education</a>
            </div>
          </div>
      </section>

        <!-- 风险与案例：左侧粘性说明 + 右侧案例卡 -->
      <section id="cases" class="bg-gray-50/60 dark:bg-black/20 py-16 md:py-20">
        <!-- 父级 grid，items-stretch 保证左右等高 -->
        <div class="container mx-auto px-6 grid lg:grid-cols-12 gap-10 items-stretch">

          <!-- 左：粘性侧栏 -->
          <aside class="lg:col-span-4 flex">
            <div class="lg:sticky lg:top-24 flex-1 flex flex-col">
              <h2 class="text-2xl md:text-3xl font-semibold">潜在风险</h2>
              <p class="mt-3 text-gray-600 dark:text-gray-400">
                我们提出的医疗 AI 风险图谱，涵盖 偏见、不确定性、隐私保护、可追溯性以及系统安全 等多个维度，以支持系统化的风险治理与实践应用。
              </p>
              <ul class="mt-6 space-y-3 flex-1">
                <li v-for="(r, idx) in risks" :key="idx" class="panel p-4 flex items-start gap-3">
                  <div class="size-6 shrink-0 rounded-md bg-red-500/15 text-red-500 grid place-items-center">!</div>
                  <div>
                    <div class="font-medium">{{ r.title }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ r.desc }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

              <!-- 右：案例卡 -->
              <section class="lg:col-span-8 flex">
            <div class="flex-1 max-h-[90vh] overflow-y-auto pr-2">
              <div v-for="(c, i) in cases" :key="i" class="panel translate-none p-0 overflow-hidden mb-4">
                <div class="grid md:grid-cols-5">
                  <!-- 文本 -->
                  <div class="md:col-span-3 p-6">
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ c.type }}</div>
                    <h3 class="text-xl font-semibold mt-1">
                      <a :href="c.link" target="_blank" rel="noopener" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {{ c.title }}
                      </a>
                    </h3>
                    <p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{{ c.summary }}</p>
                    <ul class="mt-4 flex flex-wrap gap-2 text-xs">
                      <li v-for="t in c.tags" :key="t"
                          class="px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
                        {{ t }}
                      </li>
                    </ul>
                    <div class="mt-4">
                      <a :href="c.link" target="_blank" rel="noopener" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">阅读更多 →</a>
                    </div>
                  </div>
                  <!-- 配图占位（需要可换成真实图） -->

                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <!-- 解决方案 -->
      <section id="solution" class="py-16 md:py-20 container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-center">医疗健康大模型安全解决方案</h2>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            针对医疗健康领域的特殊性与高风险性，我们构建了一套覆盖数据、模型到应用全生命周期的安全与合规解决方案，确保AI技术在守护生命健康的同时，安全、可靠、向善。
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
  source: { label: string; href: string };
};
type Risk = { title: string; desc: string; tags?: string[] }
type Solution = { title: string; desc: string; tags: string[]; }

const benefits: Benefit[] = [
  {
    title: '个性化医疗',
    desc: '结合病史、指标与基因数据，提供个体化诊疗建议与风险预测，提升疗效与依从性。',
    tags: ['纵向病历', '精准医疗', 'CDSS'],
    source: {
      label: 'BMC – Precision Medicine 综述',
      href: 'https://jbiomedsci.biomedcentral.com/articles/10.1186/s12929-024-01110-w'
    }
  },
  {
    title: '药物研发加速',
    desc: 'AI 用于靶点发现、分子筛选与试验设计，缩短研发周期并降低成本。',
    tags: ['分子生成', '虚拟筛选', '试验设计'],
    source: {
      label: 'FDA – AI in Drug Development',
      href: 'https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/artificial-intelligence-drug-development'
    }
  },
  {
    title: '辅助诊断（影像·多模态）',
    desc: '在放射/病理/超声等领域提供第二意见，提升识别效率并降低漏诊率。',
    tags: ['影像识别', '多模态', '临床支持'],
    source: {
      label: 'Nature – 诊断类研究',
      href: 'https://www.nature.com/articles/s41598-024-70073-7'
    }
  },
  {
    title: '运营与流程优化',
    desc: '自动化分诊、质量控制与再入院风险预测，减负医护、优化流程。',
    tags: ['AIOps', '问答Bot', '流程自动化'],
    source: {
      label: 'BMC – 医疗运营与教育场景',
      href: 'https://bmcmededuc.biomedcentral.com/articles/10.1186/s12909-023-04698-z'
    }
  }
];


// 无缝滚动：把 benefits 拼接两遍
const benefitsLoop = [...benefits, ...benefits]

const risks: Risk[] = [
  { 
    title: '数据隐私与合规', 
    desc: '医疗数据高度敏感，训练与推理过程中存在泄露风险；需满足 GDPR / 网安法 / HIPAA 等合规要求。', 
    tags: ['脱敏', '最小权限', '访问控制'] 
  },
  { 
    title: '偏见与不公平', 
    desc: '样本分布不均导致模型在不同人群间表现差异，可能加剧诊断或治疗不平等。', 
    tags: ['分层评测', '加权采样', '公平性约束'] 
  },
  { 
    title: '幻觉与错误诊断', 
    desc: '模型在缺乏把握时仍输出“自信错误”，可能引发误治、过度治疗与责任争议。', 
    tags: ['不确定性估计', '事实核验', '人机协作'] 
  },
  { 
    title: '对抗攻击与系统安全', 
    desc: '医疗 AI 可能遭遇对抗样本、模型篡改或数据投毒，导致诊断结果被恶意操纵。', 
    tags: ['对抗鲁棒性', '输入检测', '安全防护'] 
  },
]


const cases = [
    {
    "type": "伦理安全评估",
    "title": "《医疗健康大模型伦理与安全白皮书》发布",
    "summary": "由上海交通大学、复旦大学、瑞金医院与蚂蚁集团联合发布白皮书，构建医疗大模型伦理、安全、合规评估链条，提出“大模型自评＋专家复核”机制与风险防控路径，推动医疗 AI 可信落地。",
    "link": "https://news.sjtu.edu.cn/jdzh/20250820/213730.html",
    "tags": ["伦理对齐", "模型安全", "自评复核"]
  },
      {
    "type": "模型安全评测",
    "title": "MedBench 测评平台揭示安全与伦理表现",
    "summary": "MedBench 评测平台显示蚂蚁医疗大模型在医学问答、推理、语言生成及安全伦理表现优异，并通过可信一体机+云方案加强数据安全和本地部署能力。",
    "link": "https://www.stdaily.com/web/gdxw/2025-03/12/content_308827.html",
    "tags": ["模型评测", "安全性能", "可信部署"]
  },
  {
    "type": "诊疗安全与误判风险",
    "title": "AI+医疗：便捷与风险并存",
    "summary": "AI 辅助诊疗提升效率，但潜在误诊风险和过度依赖问题凸显，需保持人工医生的决策把关作用。",
    "link": "https://www.news.cn/legal/20240805/b73e7195f17e4fe99c5ff4c888a3a103/c.html",
    "tags": ["辅助诊疗", "误诊风险", "依赖性"]
  },
  {
    "type": "责任归属与透明化",
    "title": "AI 医院来袭，既要发挥优势也要提防风险",
    "summary": "AI 医疗系统在诊断和决策上应用广泛，但一旦出现医疗纠纷，责任界定与追责机制尚不明确。",
    "link": "https://www.xinhuanet.com/comments/20250116/5c5d899222684053a7e6d0572e18e38b/c.html",
    "tags": ["医疗责任", "透明决策", "伦理风险"]
  },
    {
    "type": "安全评测基准构建",
    "title": "China 医疗 LLM 安全伦理风险基准发布",
    "summary": "发布覆盖伦理与安全维度的 12,000 条问答基准，对 Qwen 等医用 LLM 进行评测，揭示性能差距并提出治理框架，强调医院需建立 LLM 审计机制与模拟安全流程。",
    "link": "https://arxiv.org/abs/2505.07205",
    "tags": ["安全评测", "伦理审计", "治理框架"]
  },
    {
    "type": "数据中毒攻击风险",
    "title": "医疗大模型容易遭受数据“投毒”攻击",
    "summary": "研究揭示医疗大模型高度易受“数据投毒”攻击，即使极少量的有毒训练数据也能使模型生成误导性医疗建议，难以察觉却可能危害健康。",
    "link": "https://www.secrss.com/articles/74537",
    "tags": ["数据投毒", "误导风险", "模型安全"]
  },

  {
    "type": "数据安全与隐私保护",
    "title": "AI 时代下，医疗领域数据安全问题不容忽视",
    "summary": "医疗行业面临数据泄露、网络攻击和数据滥用等问题，AI 的融入进一步增加了风险复杂性。",
    "link": "https://news.sciencenet.cn/sbhtmlnews/2024/12/382456.shtm",
    "tags": ["数据泄露", "网络攻击", "隐私安全"]
  },
  {
    "type": "机构能力与隐私风险",
    "title": "AI “双刃剑”：医疗系统内部风险上升",
    "summary": "全球多数医疗机构有 AI 战略，但能力不足，且面临隐私风险、网络安全威胁和平台兼容性不足的问题。",
    "link": "https://www.techradar.com/pro/healthcare-providers-really-want-to-try-out-ai-but-dont-really-have-the-skills",
    "tags": ["隐私风险", "安全威胁", "技术短板"]
  },
  {
    "type": "合规与法律风险",
    "title": "HIPAA 合规重塑，AI 与数据安全成焦点",
    "summary": "美国勒索攻击激增促使 HIPAA 规则更新，AI 在处理健康数据时的合法性和合规性受到严格审查。",
    "link": "https://www.reuters.com/legal/litigation/new-legal-developments-herald-big-changes-hipaa-compliance-2025-2025-04-07/",
    "tags": ["法规合规", "数据安全", "法律风险"]
  }
]


const solutions: Solution[] = [
    {
        title: '可信知识增强',
        desc: '通过接入权威医学知识库、临床指南和最新的循证医学证据，对大模型进行知识增强和事实核验。有效抑制模型产生医学幻觉，确保其生成的诊疗建议、健康咨询内容准确、可靠。',
        tags: ['知识图谱', '事实核查', '幻觉抑制'],
    },
    {
        title: '隐私计算与联邦学习',
        desc: '采用隐私计算和联邦学习技术，支持在“数据不出域”的前提下进行多中心模型训练。在充分利用各机构数据价值的同时，严格保障患者隐私和数据合规性，破解医疗数据孤岛难题。',
        tags: ['隐私计算', '联邦学习', '数据安全'],
    },
    {
        title: '多模态融合与可解释性',
        desc: '融合病历文本、医学影像、基因序列等多模态数据，提供更全面的诊断辅助。同时，利用可解释性AI（XAI）技术，为模型的诊断结论提供可视化归因和证据支持，增强临床医生对AI决策的信任与采纳度。',
        tags: ['多模态AI', '可解释性', '辅助诊断'],
    }
]



// 横向无缝滚动
const scrollWrap = ref<HTMLDivElement | null>(null)
const track = ref<HTMLDivElement | null>(null)
let rafId: number | null = null
let isPaused = false

function step() {
  if (!scrollWrap.value) return
  if (!isPaused) {
    scrollWrap.value.scrollLeft += 0.7 // 速度可调
    // 到“中点”后回到起点（因为列表拼接了两遍）
    const half = (scrollWrap.value.scrollWidth - scrollWrap.value.clientWidth) / 2
    if (scrollWrap.value.scrollLeft >= half - 1) {
      scrollWrap.value.scrollLeft = 0
    }
  }
  rafId = requestAnimationFrame(step)
}

function pauseScroll() {
  isPaused = true
}
function resumeScroll() {
  isPaused = false
}
function resumeAfterDelay() {
  // 触摸结束后稍等再恢复，避免用户交互冲突
  setTimeout(() => (isPaused = false), 400)
}

onMounted(() => {
  rafId = requestAnimationFrame(step)
})
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
})
</script>

<style scoped>
/* 轻微进入动效（可选） */
.panel { transition: transform .25s ease, box-shadow .25s ease; }
.panel:hover { transform: translateY(-2px); }
</style>
```eof
