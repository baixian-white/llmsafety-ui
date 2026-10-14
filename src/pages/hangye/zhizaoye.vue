<!-- src/pages/hangye/zhizaoye.vue -->
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

      <!-- Hero（与医疗页一致：右侧视觉满宽 + 遮罩 + 网格） -->
      <section class="relative isolate overflow-hidden h-130">
        <div aria-hidden="true" class="absolute inset-0 z-0">
          <!-- 背景图（没有也可用遮罩保证可读性） -->
          <div
            class="absolute bg-cover inset-0 bg-[url('/hangye/zhizaoye/p1.webp')] bg-no-repeat bg-right md:bg-center opacity-90">
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
            <h1
              class="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-black dark:from-white dark:to-gray-300">
              制造业<br class="hidden md:block" />
            </h1>
            <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-xl">
              AI 正在重塑制造：从预测性维护、视觉质检到产线调度与能耗优化，推动提质降本增效；同时需关注知识产权泄露、系统安全与模型稳健性等风险。
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <a href="#benefits" class="btn-primary">关键应用</a>
            </div>

            <div class="mt-4 flex flex-wrap gap-2 text-xs">
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">预测性维护</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">视觉质检</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">需求预测/排程</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">能耗优化</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">人机协作/机器人</span>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <a href="#cases" class="btn-primary">风险与案例</a>
            </div>

            <div class="mt-4 flex flex-wrap gap-2 text-xs">
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">知识产权与数据泄露</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">工业视觉质检系统容易被绕过</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">预测性维护模型可能被投毒</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">机器人与自动化控制系统存在漏洞</span>
              <span
                class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">AI
                决策缺乏透明性与追责机制</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 关键应用（网格，内含来源链接） -->
      <section id="benefits" class="py-16 md:py-20">
        <div class="container mx-auto px-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl md:text-3xl font-semibold">AI 在制造业中的关键应用</h2>
            <div class="hidden md:flex items-center gap-2 text-xs">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">质量
                · 运维 · 能源</span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">排程
                · 供应链 · 机器人</span>
            </div>
          </div>

          <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(b, i) in benefits" :key="i" class="panel p-6 hover:shadow-xl">
              <h3 class="text-lg font-medium">{{ b.title }}</h3>
              <p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{{ b.desc }}</p>

              <!-- 证据/来源 -->
              <div class="mt-3">
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
                  class="px-2 py-1 rounded-full border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  {{ t }}
                </li>
              </ul>
            </div>
          </div>

          <!-- 低调参考 -->
          <div class="mt-6 text-xs text-gray-500 dark:text-gray-400/70 leading-relaxed">
            参考：Deloitte、NVIDIA、IBM、Siemens、Financial Times 等公开资料。
          </div>
        </div>
      </section>

      <!-- 风险与案例：左侧粘性 + 右侧可滚动案例 -->
      <section id="cases" class="py-16 md:py-20 bg-gray-50 dark:bg-black/20">
        <div class="container mx-auto px-6 grid lg:grid-cols-12 gap-10 items-stretch">
          <!-- 左侧：潜在风险 -->
          <aside class="lg:col-span-4 flex">
            <div class="lg:sticky lg:top-24 flex-1 flex flex-col">
              <h2 class="text-2xl md:text-3xl font-semibold">潜在风险</h2>
              <p class="mt-3 text-gray-600 dark:text-gray-400">
                我们从 <b>隐私与合规</b>、<b>系统安全</b>、<b>模型稳健性</b>、<b>公平与偏见</b>、<b>可追溯与审计</b> 五个维度构建制造业 AI 风险图谱。
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

          <!-- 右侧：案例列表（固定高度，系统滚动条） -->
          <section class="lg:col-span-8 flex">
            <div class="flex-1 h-210 overflow-y-auto pr-2 pt-10">
              <div v-for="(c, i) in cases" :key="i" class="panel p-0 overflow-hidden mb-4">
                <div class="grid md:grid-cols-5">
                  <!-- 文本 -->
                  <div class="md:col-span-3 p-6">
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ c.type }}</div>
                    <h3 class="text-xl font-semibold mt-1">
                      <a :href="c.link" target="_blank" rel="noopener"
                        class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {{ c.title }}
                      </a>
                    </h3>
                    <p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{{ c.summary }}</p>
                    <ul class="mt-4 flex flex-wrap gap-2 text-xs">
                      <li v-for="t in c.tags" :key="t"
                        class="px-2.5 py-1 rounded-full border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        {{ t }}
                      </li>
                    </ul>
                    <div class="mt-4">
                      <a :href="c.link" target="_blank" rel="noopener"
                        class="text-sm text-blue-600 dark:text-blue-400 hover:underline">阅读更多 →</a>
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
        <h2 class="text-2xl md:text-3xl font-semibold text-center">制造业大模型安全解决方案</h2>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            我们为制造业量身打造了一套覆盖“端-边-云”的AI安全解决方案，聚焦于保护核心知识产权、保障生产安全和提升模型应用的稳健性，助力企业在智能化升级的道路上行稳致远。
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
import { ref } from 'vue';

type Benefit = {
  title: string;
  desc: string;
  tags: string[];
  source: { label: string; href: string };
}
type Risk = { title: string; desc: string; tags?: string[] }
type Case = { type: string; title: string; summary: string; tags: string[]; link: string }
type Solution = { title: string; desc: string; tags: string[]; }

const benefits: Benefit[] = [
  {
    title: '预测性维护（PdM）',
    desc: '基于设备传感与历史维保数据预测故障，减少计划外停机与备件成本。',
    tags: ['振动/温度', '故障预测', 'OEE'],
    source: {
      label: 'Deloitte：制造业 PdM 洞见',
      href: 'https://www2.deloitte.com/us/en/insights/focus/industry-4-0/using-predictive-analytics-in-manufacturing.html'
    }
  },
  {
    title: '视觉质检与缺陷检测',
    desc: '用深度学习替代抽检，进行 100% 外观检测，降低漏检与误报率。',
    tags: ['表面缺陷', '光学检测', '深度学习'],
    source: {
      label: 'NVIDIA 质检案例',
      href: 'https://developer.nvidia.com/blog/ai-powered-visual-inspection-for-manufacturing/'
    }
  },
  {
    title: '需求预测与产线排程',
    desc: '融合历史销量、季节与营销信号，优化 MPS/MRP 与库存在制品。',
    tags: ['预测', 'APS', '供应链'],
    source: {
      label: 'WEF：AI 供应链韧性',
      href: 'https://www.weforum.org/agenda/2023/02/supply-chain-resilience-through-ai/'
    }
  },
  {
    title: '能耗与良率优化',
    desc: '通过过程建模与能耗基线，实现压缩空气、烘干/加热等工序的能效提升。',
    tags: ['能源管理', '过程建模', '节能减排'],
    source: {
      label: 'Siemens：AI 驱动能效',
      href: 'https://press.siemens.com/global/en/pressrelease/siemens-accelerates-industrial-ai-transforming-industrial-production'
    }
  },
  {
    title: '人机协作与柔性自动化',
    desc: '协作机器人（Cobots）安全与易部署，扩展中小工厂的自动化覆盖面。',
    tags: ['Cobots', '柔性产线', '换型更快'],
    source: {
      label: 'FT：Cobots 发展',
      href: 'https://www.ft.com/content/78c1d4e9-ad30-47f5-ab7b-390df5bc1f10'
    }
  },
  {
    title: '仓储与履约智能化',
    desc: '用计算机视觉与优化算法改进拣选、分拨与入库布局，降低履约成本。',
    tags: ['WMS/WES', '路径优化', '拣选效率'],
    source: {
      label: 'IBM：仓储分析案例',
      href: 'https://www.ibm.com/case-studies/warehouse-analytics'
    }
  }
]

const risks: Risk[] = [
  { title: '知识产权与数据泄露', desc: '图纸、工艺参数与源代码外泄会造成竞争与合规风险（如误把敏感内容提交到外部大模型）。' },
  { title: '工业视觉质检系统容易被绕过', desc: '造业广泛使用 AI 视觉检测产品质量，但对抗样本或贴纸等物理扰动可能让缺陷品“看起来正常”。' },
  { title: '预测性维护模型可能被投毒', desc: 'AI 模型依赖传感器数据预测设备故障，若数据源被攻击或污染，可能导致提前或延后预警。' },
  { title: '机器人与自动化控制系统存在漏洞', desc: '多制造业机器人控制器（如焊接、装配）接入 AI 算法，但底层 OT/ICS 系统缺乏安全防护。攻击者可远程控制机器人动作，导致安全事故或精度偏差。' },
  { title: 'AI 决策缺乏透明性与追责机制', desc: 'AI 已用于排产、供应链优化，但决策过程黑箱化，出问题难以溯源。' }
]

// 制造业 · AI 安全真实案例
const cases: Case[] = [
    {
    "type": "大模型安全隐患",
    "title": "生成式人工智能应用于制造业的网络安全风险及对策研究",
    "summary": "我国制造业在应用生成式 AI 时存在多项安全隐患，包括训练数据被恶意篡改、模型生成错误调度策略，可能对 MES、PLC 等控制系统造成灾难性后果，且企业安全管理及技术防护能力不足。",
    "link": "https://www.secrss.com/articles/76297",
    "tags": ["数据篡改", "调度误导", "系统安全"]
  },
  {
    "type": "生产安全与AI预警",
    "title": "工业现场视觉 AI 分析与安全预警平台",
    "summary": "长扬科技（北京）开发的视觉 AI 分析平台可实时监测工业现场安全隐患，通过告警聚合、数据增强和加密存储等机制，提升生产安全管理效率并显著降低事故发生率。",
    "link": "https://www.nda.gov.cn/sjj/ywpd/zcgh/0319/20250319154850933086676_pc.html",
    "tags": ["视觉AI", "安全预警", "数据加密"]
  },
  {
    "type": "智能制造与网络安全",
    "title": "制造业网络安全压力上升，61%专业人士计划采用 AI 防护",
    "summary": "《智能制造现状报告》指出，随着 IT/OT 融合带来更多网络风险，61% 网络安全与 IT 专业人士计划在未来一年内采用 AI/ML 技术加强防护。",
    "link": "https://www.rockwellautomation.com.cn/company/news/press-releases/state-of-smart-manufacturing-cybersecurity-2025.html",
    "tags": ["网络安全", "智能制造", "AI防护"]
  },
    {
    "type": "数据质量评估",
    "title": "工业互联网研究院发布面向制造业场景的人工智能语料数据质量评估体系",
    "summary": "中国工业互联网研究院联合香港科技大学构建适用于制造业场景的大模型语料数据质量评估体系，强调高质量数据是保障模型稳定可信的重要基础。",
    "link": "https://www.china-aii.com/jgdt/7140906.jhtml",
    "tags": ["数据质量", "模型信任", "评估体系"]
  },
  {
    "type": "数据准备与整合挑战",
    "title": "数据未准备好是制造业应用 AI 最大障碍",
    "summary": "英国制造企业普遍缺乏 AI 所需的清洁、结构化数据。清理、统一 IT/OT 数据和升级遗留系统是实现智能制造的关键，但仍存在严重缺口。",
    "link": "https://www.techradar.com/pro/is-your-data-ready-this-is-the-biggest-mistake-businesses-make-when-building-ai-systems",
    "tags": ["数据清洗", "系统整合", "IT/OT 脱节"]
  },
  {
    "type": "工人安全与 AI 辅助培训",
    "title": "AI 在提高制造工人安全中的潜力",
    "summary": "美国研究发现，多模态大语言模型可以辅助识别焊接质量，但其在真实工业焊接图像中的表现不及网络来源图像，强调模型需结合实地数据进行训练。",
    "link": "https://www.safetyandhealthmagazine.com/articles/27144-ai-tools-show-promise-in-improving-manufacturing-worker-safety-study",
    "tags": ["工人安全", "机器学习", "焊接质量"]
  },
  {
    "type": "预测维护与设备可靠性",
    "title": "AI 与机器人助力预防工厂设备故障",
    "summary": "制造企业通过 AI、传感器和机器人实施预测性维护，有效减少停机时间和高额维修开支；虽然存在成本与人才挑战，但 AI 被视为辅助而非替代工人的工具。",
    "link": "https://www.businessinsider.com/artificial-intelligence-robotics-predictive-maintenance-manufacturing-factory-solutions-2025-5",
    "tags": ["预测维护", "机器人", "生产效率"]
  }
]


const solutions: Solution[] = [
    {
        title: '数字孪生与过程仿真',
        desc: '构建产线或设备的数字孪生体，利用AI进行工艺参数优化、生产流程仿真和能耗模拟。在虚拟环境中验证新工艺、预测瓶颈，以最低成本实现生产效率和资源利用率的最大化。',
        tags: ['数字孪生', '工艺优化', '生产仿真'],
    },
    {
        title: '基于多模态AI的质量管控',
        desc: '融合视觉、声学、振动等多源传感器数据，建立更精准、更鲁棒的质量检测与预测性维护模型。通过多模态信息交叉验证，有效应对单一数据源可能存在的干扰或对抗攻击，提升质检的准确性和系统的可靠性。',
        tags: ['多模态AI', '智能质检', '预测性维护'],
    },
    {
        title: '供应链风险预警与智能决策',
        desc: '利用大模型分析全球新闻、天气、物流和地缘政治等多维度数据，实时评估供应链中断风险，并提供动态的库存管理、供应商选择和物流路径优化建议，增强供应链的韧性与敏捷性。',
        tags: ['供应链分析', '风险预警', '智能决策'],
    }
]
</script>

<style scoped>
/* 小幅悬浮态（与站内一致） */
.panel {
  transition: transform .25s ease, box-shadow .25s ease;
}

.panel:hover {
  transform: translateY(-px);
}
</style>
```eof
