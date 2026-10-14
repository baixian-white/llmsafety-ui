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

      <!-- Hero 一致 -->
      <section class="relative flex  flex-col items-center justify-center h-130 text-center px-6">
        <div aria-hidden="true" class="absolute inset-0 z-0">
          <!-- 背景图 -->
          <div
            class="bg-cover absolute inset-0 bg-[url('/hangye/jinrongfuwu/p1.webp')] bg-no-repeat bg-right md:bg-center opacity-90">
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
          <h1
            class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent z-10">
            金融服务
          </h1>
          <p class="mt-6 text-gray-700 dark:text-gray-300 z-10">
            AI 在金融领域加速风控、反欺诈与投研创新，但同时隐藏着数据安全、算法偏见与系统风险。
          </p>
          <div class="mt-8 flex flex-col items-center gap-6">
            <!-- 关键应用 -->
            <div class="flex flex-col items-center gap-4">
              <a href="#benefits" class="btn-primary z-10">关键应用</a>
              <div class="flex flex-wrap justify-center gap-2 text-xs">
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">智能风控</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">欺诈检测</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">量化投研</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">智能客服</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">风险合规</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">投融资分析</span>
              </div>
            </div>

            <!-- 潜在风险 -->
            <div class="flex flex-col items-center gap-4">
              <a href="#risks" class="btn-primary z-10">潜在风险</a>
              <div class="flex flex-wrap justify-center gap-2 text-xs">
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">数据安全</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">算法偏见</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">模型透明性</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">系统稳定性</span>
              </div>
            </div>
          </div>
        </div>


      </section>

      <!-- 好处 (栅格卡片) -->
      <section id="benefits" class="py-16 md:py-20 bg-gray-50/60 dark:bg-white/5">
        <div class="container mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-semibold text-center">
            AI 在金融中的关键应用
          </h2>
          <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(b, i) in benefits" :key="i" class="panel p-6 flex flex-col h-full hover:shadow-xl transition-shadow">
              <h3 class="text-lg font-medium">{{ b.title }}</h3>
              <p class="mt-3 text-gray-600 dark:text-gray-400">{{ b.desc }}</p>
              <ul class="mt-4 flex flex-wrap gap-2 text-xs" v-if="b.tags && b.tags.length">
                <li v-for="t in b.tags" :key="t"
                  class="px-2 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
                  {{ t }}
                </li>
              </ul>
              <p class="mt-auto pt-4 text-xs text-blue-600 hover:underline">
                <a :href="b.link" target="_blank" rel="noopener">来源：{{ b.label }}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 风险 -->
      <section id="risks" class="py-16 md:py-20 container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-semibold">潜在风险</h2>

        <div class="mt-8 grid md:grid-cols-2 gap-6">
          <!-- 每项风险：hover/focus 显示弹层；移动端支持点击展开 -->
          <div v-for="(r, idx) in risks" :key="idx" class="relative group">
            <!-- 卡片本体（可聚焦） -->
            <button type="button"
              class="panel p-6 w-full text-left border-border focus:outline-none focus:ring-2 ring-[var(--purple)] rounded-2xl"
              @click="activeRisk === idx ? activeRisk = null : activeRisk = idx" @mouseenter="activeRisk = idx"
              @mouseleave="activeRisk = null" @focus="activeRisk = idx" @blur="activeRisk = null">
              <div class="font-medium text-base">{{ r.title }}</div>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {{ r.desc }}
              </p>
              <div class="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2m1 14v2h-2v-2zm0-10v8h-2V6z" />
                </svg>
                悬停/聚焦/点击 查看详情
              </div>
            </button>

            <!-- 弹出详情层 -->
            <div class="absolute z-20 left-0 right-0 md:left-auto md:right-0 md:w-[520px] mt-2"
              v-show="activeRisk === idx">
              <div class="panel p-5 shadow-xl border border-gray-200 dark:border-white/10">
                <div class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <div class="font-semibold mb-1">通俗解释</div>
                  <p>{{ r.detail }}</p>

                  <div class="font-semibold mt-3 mb-1">举个例子</div>
                  <p>{{ r.example }}</p>
                </div>

                <!-- 小箭头（可选） -->
                <div
                  class="absolute -top-2 right-6 w-3 h-3 rotate-45 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- 案例 -->
      <section id="cases" class="py-16 md:py-20 bg-gray-50 dark:bg-black/20">
        <div class="container mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-semibold mb-8">真实案例</h2>
          <div class="grid gap-6">
            <div v-for="(c, i) in cases" :key="i"
              class="panel p-6 flex flex-col md:flex-row items-start gap-6 hover:shadow-xl">
              <div class="flex-1">
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ c.type }}</div>
                <!-- 标题可点击 -->
                <h3 class="text-lg font-semibold mt-1">
                  <a :href="c.link" target="_blank" class="hover:text-blue-600 dark:hover:text-blue-400">
                    {{ c.title }}
                  </a>
                </h3>
                <p class="mt-3 text-gray-600 dark:text-gray-400">{{ c.summary }}</p>
                <ul class="mt-4 flex flex-wrap gap-2 text-xs">
                  <li v-for="t in c.tags" :key="t"
                    class="px-2 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
                    {{ t }}
                  </li>
                </ul>
                <!-- 阅读更多 -->
                <div class="mt-4">
                  <a :href="c.link" target="_blank" class="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    阅读更多 →
                  </a>
                </div>
              </div>
        
            </div>
          </div>
        </div>
      </section>

      <!-- 解决方案 -->
      <section id="solution" class="py-16 md:py-20 container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-center">金融行业大模型安全解决方案</h2>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            在金融大模型应用的浪潮中，提示词注入攻击、模型输出的幻觉以及决策逻辑的黑箱问题，已成为阻碍技术落地、威胁金融安全的突出障碍。为了扫清这些障碍，我们从攻击的精准识别、幻觉的有效防控、决策的深度解析三个关键点入手，提出了一套针对性的金融行业解决方案，致力于保障模型应用的安全、可靠与透明。
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

type Benefit = {
  title: string
  desc: string
  tags: string[]
  label: string
  link: string
}

type Risk = {
  title: string
  desc: string
  detail: string
  example: string
}

type Solution = {
    title: string;
    desc: string;
    tags: string[];
}

import { ref } from 'vue'
const activeRisk = ref<number | null>(null)

type Case = {
  type: string
  title: string
  summary: string
  tags: string[]
  link: string
}

const benefits: Benefit[] = [
  {
    title: '智能风控',
    desc: 'AI 驱动模型提升市场风险预测的准确性和实时性。',
    tags: ['市场监测', '风险预警', '信用评估'],
    label: 'SSRN – AI 金融预测研究',
    link: 'https://ssrn.com/abstract=5097473'
  },
  {
    title: '欺诈检测',
    desc: 'Mastercard 利用生成式 AI 加速检测并显著减少误报。',
    tags: ['交易监控', '实时检测', '反洗钱'],
    label: 'Mastercard 新闻稿',
    link: 'https://www.mastercard.com/us/en/news-and-trends/press/2024/may/mastercard-accelerates-card-fraud-detection-with-generative-ai-technology.html'
  },
  {
    title: '量化投研',
    desc: 'AI 分析市场与舆情数据，为投资决策提供智能支持。',
    tags: ['舆情分析', '投资组合优化', '趋势预测'],
    label: 'Investopedia 报道',
    link: 'https://www.investopedia.com/using-ai-to-transform-investment-strategy-8778945'
  },
  {
    title: '风险合规',
    desc: 'AI 自动审查合同与监管文件，缩短合规审核时间约 40%。',
    tags: ['法规匹配', '合同审查', '审计追踪'],
    label: 'Deloitte 合规报告',
    link: 'https://www2.deloitte.com/'
  },
  {
    title: '智能客服',
    desc: 'AI 客服可解决 70%+ 高频金融问题，提升效率并节省人力成本。',
    tags: ['开户咨询', '理财问答', '贷款申请'],
    label: '行业实践报告',
    link: 'https://www.businessinsider.com/sc/how-ai-at-scale-is-shaping-the-future-of-commerce'
  },
  {
    title: '投融资分析',
    desc: 'AI 解读财报与资讯，为 IPO 和并购提供数据支撑。',
    tags: ['企业估值', '投融资决策', '并购分析'],
    label: '高盛应用案例',
    link: 'https://example.com/gs-ai-investment-analysis'
  }
]

const risks: Risk[] = [
  {
    title: '数据安全',
    desc: '敏感金融数据泄露可能引发大规模经济损失。',
    detail:
      '金融数据通常包含身份证件、账户流水、资产负债等高度敏感信息。一旦在模型训练或接口调用环节被泄露，容易造成身份盗用、账户被盗刷等连锁风险。',
    example:
      '例如，客服机器人将用户的完整银行卡号或短信验证码原样记录在日志里，日志被误传到公共仓库，攻击者即可据此进行盗刷。'
  },
  {
    title: '算法偏见',
    desc: '信贷模型若数据不均衡，可能导致决策歧视。',
    detail:
      '当训练数据对某些人群样本明显更少时，模型会把“少数情况”学成异常，进而在授信、风控等环节对这些群体给出系统性负面判断。',
    example:
      '例如，新就业人群或自由职业者的历史征信样本较少，模型可能默认其风险更高，导致同等条件下的授信额度更低、利率更高。'
  },
  {
    title: '模型透明性',
    desc: '黑箱模型难解释，增加监管挑战。',
    detail:
      '复杂模型（如深度网络、LLM）很难直接解释“为什么拒绝一个贷款”。缺乏可解释性会带来合规与申诉困难，也不利于发现隐藏的逻辑错误。',
    example:
      '例如，客户被拒贷后希望知道原因，却只能得到“模型评估风险较高”的笼统解释，既不利于客户申诉，也不满足监管的可解释性要求。'
  },
  {
    title: '系统稳定性',
    desc: '交易系统宕机或出错可能引发市场波动。',
    detail:
      'AI 组件接入风控、交易或客服主链路，如果出现服务雪崩、超时或模型异常输出，可能连带造成交易失败、延迟清算，甚至触发市场波动。',
    example:
      '例如，高峰时段智能风控服务故障，导致大批正常交易被“误拒”，商户与用户同时受影响，引发投诉与损失。'
  }
]

const cases: Case[] = [

  {
    type: 'AI算法偏见',
    title: 'AI 放贷模型可能造成歧视',
    summary: '普华永道指出，AI 放贷审批可能根据申请人的种族、地域、性别等因素做出决策，导致潜在的算法偏见。',
    tags: ['贷款审批', '系统偏见'],
    link: 'https://www.pwccn.com/zh/industries/telecommunications-media-and-technology/publications/risk-management-and-internal-audit-new-responsibilities-in-ai-era-oct2023.html'
  },
  {
    type: '模型透明性',
    title: '金融稳定委员会强调模型不可解释性风险',
    summary: 'FSB 报告指出，AI 模型复杂、训练资料来源不透明，增加了模型风险与治理难度。',
    tags: ['合规压力', '黑箱模型'],
    link: 'https://stli.iii.org.tw/article-detail.aspx?d=9286&no=64&tp=1'
  },
  {
    "type": "AI驱动网络攻击",
    "title": "金融业最易遭受 AI 驱动的网络攻击",
    "summary": "研究表明，金融领域是最容易受到 AI 网络攻击的行业，包括钓鱼、深伪和恶意软件。过去一年，45% 的金融机构报告遇到过此类攻击，显示出金融体系面临的严峻威胁。",
    "link": "https://www.businesswirechina.com/zh/news/60548.html",
    "tags": ["网络攻击", "深伪诈骗", "金融安全"]
  },
    {
    "type": "深伪与金融诈骗",
    "title": "AI 驱动的深伪伪装诈骗抬头",
    "summary": "诈骗者利用 AI 深伪冒充 CEO 或高管，诱骗员工转账或泄露敏感数据。2024 年，美国报告了超过 105,000 起深伪诈骗事件，仅一季度损失就超过 2 亿美元。",
    "link": "https://www.wsj.com/articles/ai-drives-rise-in-ceo-impersonator-scams-2bd675c4?utm_source=chatgpt.com",
    "tags": ["深伪攻击", "CEO欺诈", "身份冒充"]
  },
    {
    "type": "监管与合规风险",
    "title": "英国金融监管机构担忧 AI 发展速度超过监管",
    "summary": "英国金融监管局（FCA）警告，人工智能发展速度超过了金融监管规则的制定速度，AI 自动交易可能加剧市场波动和操纵风险，呼吁采取灵活的原则性监管方式。",
    "link": "https://www.thetimes.co.uk/article/ceo-summit-ai-developing-faster-than-market-regulator-can-make-rules-fca-warns-hccx5qvqv?utm_source=chatgpt.com",
    "tags": ["市场操纵", "监管滞后", "合规风险"]
  },
]

const solutions: Solution[] = [
    {
        title: '识别注入攻击',
        desc: '通过引入提示注入攻击识别机制，结合上下文语义分析与攻击样本库，对用户输入的提示词进行实时扫描与风险判别，识别是否存在操控模型行为的意图。一旦检测到潜在攻击，可触发拦截或替代响应机制，防止模型输出违规或误导性内容，从而保障金融系统的稳定性与合规性。',
        tags: ['注入攻击识别', '上下文分析', '风险拦截'],
    },
    {
        title: '输出内容的真实性监控',
        desc: '构建面向金融场景的幻觉监测试集与评测指标，对模型在财务解读、信息生成等任务中的幻觉倾向进行量化评估。同时，通过知识增强与事实核查模块，对模型输出进行实时验证，确保其基于真实、准确的金融数据生成内容，有效降低幻觉风险对投资判断和业务流程的影响。',
        tags: ['幻觉监测', '事实核查', '知识增强'],
    },
    {
        title: '实现决策步骤的透明化展示',
        desc: '引入可解释性分析工具，结合注意力机制、特征贡献度分析等方法，对模型输出的原因进行可视化呈现，帮助从业人员理解模型决策依据。通过生成因果链条或证据路径等解释内容，增强模型在信贷审批、风控判断、投研辅助等关键环节的可审计性与业务可信度，满足金融行业对模型透明化的要求。',
        tags: ['可解释性AI', '决策可视化', '模型审计'],
    }
]

</script>

<style scoped>
.panel {
  transition: transform .25s ease, box-shadow .25s ease;
}

.panel:hover {
  transform: translateY(-2px);
}
</style>
```eof
