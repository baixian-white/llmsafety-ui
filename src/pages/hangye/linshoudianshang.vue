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
      <section class="relative flex flex-col items-center justify-center text-center h-130 px-6">
        <div aria-hidden="true" class="absolute inset-0 z-0">
          <!-- 背景图 -->
          <div
            class="bg-cover absolute inset-0 bg-[url('/hangye/linshoudianshang/p1.webp')] bg-no-repeat bg-right md:bg-center opacity-90">
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
            零售与电商
          </h1>
          <p class="mt-6 text-gray-700 dark:text-gray-300 z-10">
            AI 驱动个性化推荐、智能定价与运营自动化，提升转化与复购；同时需关注隐私合规、算法偏见、内容安全与账户风控等问题。
          </p>

          <div class="mt-8 flex flex-col items-center gap-6">
            <!-- 关键应用 -->
            <div class="flex flex-col items-center gap-4">
              <a href="#benefits" class="btn-primary z-10">关键应用</a>
              <div class="flex flex-wrap justify-center gap-2 text-xs">
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">个性化推荐</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">动态定价/促销</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">需求预测与库存</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">视觉搜索/AR
                  试穿</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">智能客服与营销</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">欺诈与风控</span>
              </div>
            </div>

            <!-- 潜在风险 -->
            <div class="flex flex-col items-center gap-4">
              <a href="#risks" class="btn-primary z-10">潜在风险</a>
              <div class="flex flex-wrap justify-center gap-2 text-xs">
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">隐私与合规</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">算法偏见</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">内容与品牌安全</span>
                <span
                  class="rounded-full px-3 py-1 border border-gray-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">账户与支付风险</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- 好处 (栅格卡片) -->
      <section id="benefits" class="py-16 md:py-20 bg-gray-50/60 dark:bg-white/5">
        <div class="container mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-semibold text-center">AI 在零售与电商中的关键应用</h2>
          <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(b, i) in benefits" :key="i" class="panel p-6 hover:shadow-xl transition-shadow">
              <h3 class="text-lg font-medium">{{ b.title }}</h3>
              <p class="mt-3 text-gray-600 dark:text-gray-400">{{ b.desc }}</p>
              <ul v-if="b.tags?.length" class="mt-4 flex flex-wrap gap-2 text-xs">
                <li v-for="t in b.tags" :key="t"
                  class="px-2 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
                  {{ t }}</li>
              </ul>
              <p class="mt-4 text-xs text-blue-600 hover:underline">
                <a :href="b.link" target="_blank" rel="noopener">来源：{{ b.label }}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 风险（悬停/聚焦弹出详情） -->
      <section id="risks" class="py-16 md:py-20 container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-semibold">潜在风险</h2>
        <div class="mt-8 grid md:grid-cols-2 gap-6">
          <div v-for="(r, idx) in risks" :key="idx" class="relative group">
            <button type="button"
              class="panel p-6 w-full text-left border-border focus:outline-none focus:ring-2 ring-[var(--purple)] rounded-2xl"
              @click="activeRisk === idx ? activeRisk = null : activeRisk = idx" @mouseenter="activeRisk = idx"
              @mouseleave="activeRisk = null" @focus="activeRisk = idx" @blur="activeRisk = null">
              <div class="font-medium text-base">{{ r.title }}</div>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ r.desc }}</p>
              <div class="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2m1 14v2h-2v-2zm0-10v8h-2V6z" />
                </svg>
                悬停/聚焦/点击 查看详情
              </div>
            </button>
            <div class="absolute z-20 left-0 right-0 md:left-auto md:right-0 md:w-[520px] mt-2"
              v-show="activeRisk === idx">
              <div class="panel p-5 shadow-xl border border-gray-200 dark:border-white/10">
                <div class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <div class="font-semibold mb-1">通俗解释</div>
                  <p>{{ r.detail }}</p>
                  <div class="font-semibold mt-3 mb-1">举个例子</div>
                  <p>{{ r.example }}</p>
                </div>
                <div
                  class="absolute -top-2 right-6 w-3 h-3 rotate-45 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 真实案例 -->
      <section id="cases" class="py-16 md:py-20 bg-gray-50 dark:bg-black/20">
        <div class="container mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-semibold mb-8">真实案例</h2>
          <div class="grid gap-6">
            <div v-for="(c, i) in cases" :key="i"
              class="panel p-6 flex flex-col md:flex-row items-start gap-6 hover:shadow-xl">
              <div class="flex-1">
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ c.type }}</div>
                <h3 class="text-lg font-semibold mt-1">
                  <a :href="c.link" target="_blank" class="hover:text-blue-600 dark:hover:text-blue-400">{{ c.title
                  }}</a>
                </h3>
                <p class="mt-3 text-gray-600 dark:text-gray-400">{{ c.summary }}</p>
                <ul class="mt-4 flex flex-wrap gap-2 text-xs">
                  <li v-for="t in c.tags" :key="t"
                    class="px-2 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
                    {{ t }}</li>
                </ul>
                <div class="mt-4">
                  <a :href="c.link" target="_blank"
                    class="text-sm text-blue-600 hover:underline dark:text-blue-400">阅读更多 →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 解决方案 -->
      <section id="solution" class="py-16 md:py-20 container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-center">零售与电商行业大模型安全解决方案</h2>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            针对零售电商领域对个性化体验、运营效率和品牌安全的核心诉求，我们提供一套端到端的AI解决方案，旨在最大化用户生命周期价值，同时全面防范内容、交易与合规风险。
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
import { ref } from 'vue'

type Benefit = {
  title: string
  desc: string
  tags: string[]
  label: string
  link: string
}
type Risk = { title: string; desc: string; detail: string; example: string }
type Case = { type: string; title: string; summary: string; tags: string[]; link: string }
type Solution = { title: string; desc: string; tags: string[]; }

const activeRisk = ref<number | null>(null)

// 关键应用（含可点击来源链接）
const benefits: Benefit[] = [
  {
    title: '个性化推荐',
    desc: '利用行为与画像进行实时个性化推荐，提高转化率与客单价。',
    tags: ['实时推荐', '召回与排序', 'A/B 实验'],
    label: 'Amazon Personalize',
    link: 'https://aws.amazon.com/personalize/'
  },
  {
    title: '动态定价与促销优化',
    desc: '根据需求、库存与竞争对手动态定价，自动匹配优惠策略。',
    tags: ['价格弹性', '竞品监测', 'ROI 优化'],
    label: 'McKinsey – Pricing with AI',
    link: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/power-and-potential-of-pricing-with-ai'
  },
  {
    title: '需求预测与库存优化',
    desc: 'AI 预测品类需求波动，指导补货节奏并降低缺货/滞销。',
    tags: ['时序预测', '补货计划', '供应链协同'],
    label: 'Google Cloud Retail – Demand Forecasting',
    link: 'https://cloud.google.com/solutions/retail'
  },
  {
    title: '视觉搜索与 AR 试穿',
    desc: '支持拍照找同款、AR 试穿/试摆，减少决策成本并提升转化。',
    tags: ['图像检索', '多模态', 'AR 体验'],
    label: 'Shopify – AR & 3D',
    link: 'https://www.shopify.com/retail/ar'
  },
  {
    title: '智能客服与营销自动化',
    desc: 'AI 助手承接高频问答、生成导购话术与 EDM，降低人力成本。',
    tags: ['客服机器人', '文案生成', '自动化运营'],
    label: 'Zendesk – AI for CX',
    link: 'https://www.zendesk.com/blog/ai-customer-experience/'
  },
  {
    title: '欺诈检测与账户风控',
    desc: '识别盗刷、薅券、羊毛党与虚假交易，降低损失与风控误杀。',
    tags: ['反作弊', '风控规则', '异常检测'],
    label: 'Stripe Radar',
    link: 'https://stripe.com/radar'
  }
]

// 潜在风险（悬停/聚焦弹出解释与例子）
const risks: Risk[] = [
  {
    title: '隐私与合规',
    desc: '收集与使用消费者数据须遵从 GDPR/隐私政策，避免过度画像与数据泄露。',
    detail: '电商会采集浏览、购买、地理位置等数据训练模型。若未征得同意或保护不当，容易引发合规与信任危机。',
    example: '如在埋点日志中保留了明文手机号、地址并外泄，可能造成针对性诈骗与品牌受损。'
  },
  {
    title: '算法偏见',
    desc: '推荐/定价可能对特定人群产生不公平影响，造成舆论与合规风险。',
    detail: '训练数据分布失衡会把“少数用户”的偏好学成异常，定价或曝光机会出现系统性差异。',
    example: '同城用户因历史画像不同而被算法长期推荐高价商品，引发“个性化价格歧视”的质疑。'
  },
  {
    title: '内容与品牌安全',
    desc: '生成式内容可能出现侵权、虚假宣传或不当用语，伤害品牌形象。',
    detail: 'AI 自动生成商品图文/评价摘要，如无校对与过滤，容易产生夸大或不当内容。',
    example: '营销 AI 输出“疗效”类敏感表述导致被平台处罚或被消费者投诉。'
  },
  {
    title: '账户与支付风险',
    desc: '黑产利用撞库、养号、批量下单和盗刷券码牟利，冲击利润与风控。',
    detail: '模型放宽阈值或规则被绕过时，异常账号会批量套券、刷单或盗刷支付方式。',
    example: '大促期间新客券被羊毛党脚本批量领取并转卖，造成活动预算失控。'
  }
]

// 真实案例（尽量选公开、可信来源）
const cases: Case[] = [
  {
    "type": "AI假图治理",
    "title": "“卖家秀”失真，淘宝首次针对AI假图出台措施",
    "summary": "淘宝发布针对 AI 生成商品图片的治理规则，严禁存在材质错位、效果夸张、抠图贴图感等失真情况，并采取识别模型、“源头拦截”、存量清理与提示标识等多项措施，已拦截近10万张 AI 假图，保障消费者知情权与平台真实性。 ",
    "link": "https://www.21jingji.com/article/20250330/herald/e01c2c00e35889697690ca9cae940415.html",
    "tags": ["AI假图", "消费者保护", "平台治理"]
  },
  {
    "type": "AI 合规风险管理",
    "title": "AI 赋能零售——创新中的合规风险管理",
    "summary": "生成式 AI 在零售行业被广泛用于营销文案和商品图像生成，但同时也带来合规挑战。文章建议企业构建风险治理机制，比如参照“德勤高可信人工智能框架”开展模型备案、识别角色责任并设计治理体系。 ",
    "link": "https://www.kwm.com/cn/zh/insights/latest-thinking/compliance-risk-management-for-ai-innovation-in-retail.html",
    "tags": ["AI 合规", "风险治理", "生成式 AI"]
  },
    {
    "type": "AI驱动欺诈风险",
    "title": "大模型技术催生新型欺诈交易",
    "summary": "报道指出，跨境电商领域的欺诈者开始利用 AI 大模型分析消费行为，构建虚假账户实施欺诈交易，给卖家造成显著损失，平台防范形势严峻。",
    "link": "https://www.21jingji.com/article/20240606/herald/32c01b42a88981092ad8853d41325a57.html",
    "tags": ["AI欺诈", "虚假账户", "跨境电商"]
  },
  {
    "type": "数据安全与平台治理",
    "title": "AI+消费兴起下的电商隐私挑战",
    "summary": "随着消费者越来越依赖 AI 推荐系统购物，行业面临数据隐私、算法偏差和就业替代风险。部分企业可能存在过度收集用户数据和未经授权使用问题，需要完善监管与安全保护机制。",
    "link": "https://swt.guizhou.gov.cn/hdjl/rdhy/202503/t20250313_87157146.html",
    "tags": ["数据隐私", "算法偏差", "推荐系统"]
  },
  {
    "type": "AI 安全漏洞威胁",
    "title": "AI chatbot 用户须警惕——黑客将恶意代码藏入 LLM 生成图像",
    "summary": "研究人员揭露一项新型安全威胁：攻击者可将隐藏指令嵌入图像，利用大模型处理图像时缩小下采样引发解释，诱使 AI 执行未授权操作，例如盗取日历数据。该漏洞对 Gemini CLI、Vertex AI Studio 等平台构成隐患，需要多层防护策略应对。 ",
    "link": "https://www.techradar.com/pro/security/ai-chatbot-users-beware-hackers-are-now-hiding-malware-in-the-images-served-up-by-llms",
    "tags": ["LLM 安全", "图像攻击", "多模态风险"]
  },
  {
    "type": "电商高峰期 AI 攻击威胁",
    "title": "零售商需警惕节假日 AI 驱动的 Bot 攻击",
    "summary": "报道称在购物高峰期，零售商每天遭遇超过 56 万次 AI 驱动的欺诈访问，包括虚假订单与用户信息盗窃，恶意 Bot 攻击变得更难检测。呼吁行业加强安全防护与威胁情报共享。 ",
    "link": "https://www.axios.com/newsletters/axios-codebook-737e23e0-aaaf-11ef-89ca-bbf78119bd11",
    "tags": ["Bot 攻击", "高峰安全", "威胁共享"]
  },
  {
    "type": "LLM 偏见与幻觉",
    "title": "AI 幻觉现象威胁电商品牌信任",
    "summary": "报道指出 Generative AI 可能出现“幻觉”（hallucinations）——例如推荐无关商品、产生不准确信息等，这些错误容易侵蚀用户信任。企业应采取人类审查、使用特定小模型、透明提示等策略缓解风险。 ",
    "link": "https://www.voguebusiness.com/story/technology/fashion-or-fantasy-ai-hallucinations-explained",
    "tags": ["幻觉风险", "品牌信任", "AI 校验"]
  }
]


const solutions: Solution[] = [
    {
        title: '超个性化推荐与营销自动化',
        desc: '融合用户的隐式与显式反馈，构建实时更新的用户画像，提供超越协同过滤的“千人千面”购物体验。结合AIGC能力，自动生成高点击率的营销文案、邮件和落地页，实现营销全流程的智能化与效率提升。',
        tags: ['用户画像', 'AIGC营销', '实时推荐'],
    },
    {
        title: '全渠道库存与供应链优化',
        desc: '利用时序预测模型，精准预测各SKU在不同区域、不同时间的需求量，自动生成补货与调拨建议。打通线上线下库存，实现“一盘货”管理，最大化库存周转率，同时降低缺货与积压风险。',
        tags: ['需求预测', '智能补货', '库存优化'],
    },
    {
        title: 'AIGC内容生成与品牌安全监控',
        desc: '提供从商品详情页、直播脚本到用户评论分析的AIGC内容服务，大幅降低内容生产成本。同时部署实时内容安全监控系统，自动过滤不合规、侵权或有损品牌形象的UGC/AIGC内容，保护品牌声誉。',
        tags: ['AIGC内容', '品牌安全', '评论分析'],
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
