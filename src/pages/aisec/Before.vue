<template>
  <!-- 主容器：网格背景 + 渐变光斑 -->
  <div class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark">
    <!-- 背景装饰（深色可见） -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[560px] h-[560px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[560px] h-[560px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- 头部 -->
      <header class="text-center mb-16 md:mb-20 animate-fade-in-down">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">事前 · 预防</span>
          <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">安全设计</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          把安全“设计进去”：数据隐私、对齐治理、威胁建模、红队准备，让风险发生概率降到最低。
        </p>
      </header>

      <!-- 搜索 & 标签过滤 -->
      <section class="panel bg-white/70 dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg p-4 sm:p-5 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="flex items-center gap-3">
          <input v-model="q" type="text"
                 placeholder="搜索（例如：差分隐私、联邦学习、模型卡、Guardrails）"
                 class="w-[22rem] max-w-full px-3 py-2 rounded-md bg-white/90 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 focus:outline-none" />
          <button class="btn-ghost" @click="reset">重置</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="t in allTags" :key="t"
                  class="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-white/10 transition"
                  :class="[selected.has(t) ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-400/40' : 'text-gray-600 dark:text-gray-300']"
                  @click="toggle(t)"># {{ t }}</button>
          <button class="btn-ghost" @click="downloadCSV">导出 CSV</button>
        </div>
      </section>

      <!-- 分组：四大域 -->
      <div class="space-y-12">
        <ToolSection
          :icon="Shield"
          title="数据安全与隐私"
          note="差分隐私（DP）、联邦学习（FL）、加密计算（HE/TEE）"
          :items="filtered(dataPrivacy)"
        />
        <ToolSection
          :icon="Lock"
          title="安全设计与对齐"
          note="RLHF/RLAIF、模型卡、访问控制与对话护栏"
          :items="filtered(alignmentAccess)"
        />
        <ToolSection
          :icon="FileSearch"
          title="威胁建模与标准"
          note="MITRE ATLAS、NIST AI RMF、SDL 安全开发生命周期"
          :items="filtered(threatStandards)"
        />
        <ToolSection
          :icon="Swords"
          title="红队测试准备"
          note="对抗评测工具链与越狱脆弱性评估"
          :items="filtered(redteamPrep)"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineComponent, h } from 'vue'
import { Shield, Lock, FileSearch, Swords, ExternalLink } from 'lucide-vue-next'

type Tool = {
  title: string
  desc: string
  tags: string[]
  link?: string
  imageUrl?: string
  vendor?: string
}

/* ---------- 数据（配图+详细介绍，均为线上图片直链） ---------- */
const dataPrivacy: Tool[] = [
  {
    title: 'TensorFlow Privacy',
    desc: 'Google 开源的差分隐私训练库，基于 DP-SGD 实现剪裁与噪声注入，提供隐私预算 (ε, δ) 追踪，适用于图像/NLP 等多任务微调与从零训练。',
    tags: ['差分隐私','训练','DP-SGD','隐私预算'],
    link: 'https://github.com/tensorflow/privacy',
    // TF 官方 logo（Wikimedia）
    imageUrl: '/kuangjiagongju/logos/tensorflow.png',
    vendor: 'Google'
  },
  {
    title: 'Opacus (PyTorch)',
    desc: 'Meta 推出的 PyTorch 差分隐私训练库，侧重易用与性能。提供 per-sample 梯度、Accountant 预算器、兼容大多数优化器。',
    tags: ['差分隐私','PyTorch','Accountant'],
    link: 'https://opacus.ai',
    // PyTorch 官方 logo（Wikimedia）
    imageUrl: '/kuangjiagongju/logos/pytorch.png',
    vendor: 'Meta'
  },
  {
    title: 'TensorFlow Federated',
    desc: '联邦学习研究与原型平台，支持跨设备/跨机构数据协同训练，数据不出域。可结合差分隐私与安全聚合降低泄露风险。',
    tags: ['联邦学习','跨域训练','安全聚合'],
    link: 'https://www.tensorflow.org/federated',
    // 使用 TensorFlow 品牌主标识（清晰度高）
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg',
    vendor: 'Google'
  },
  {
    title: 'FATE',
    desc: '微众开源联邦学习框架，提供横向/纵向 FL、联邦特征工程、纵向联邦 XGBoost 等，支持多方安全计算与生产部署。',
    tags: ['联邦学习','多方计算','工程化'],
    link: 'https://github.com/FederatedAI/FATE',
    // FATE 参考其 GitHub 项目页（可替换为贵司内置素材）
    imageUrl: '/kuangjiagongju/logos/FedAI.png',
    vendor: 'WeBank'
  },
  {
    title: 'Microsoft SEAL',
    desc: '广泛应用的同态加密库（BFV/CKKS），在密文上直接计算，适合隐私推理与加密聚合；可与 FL、TEE 组合构建端到端隐私方案。',
    tags: ['同态加密','加密计算','CKKS'],
    link: 'https://github.com/microsoft/SEAL',
    // 微软品牌标识（Wikimedia）
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    vendor: 'Microsoft'
  },
  {
    title: 'HElib',
    desc: 'IBM 维护的 HE 库，提供 BGV 等方案；在批处理与性能上有成熟实践，可用于隐私查询、加密特征变换等安全设计场景。',
    tags: ['同态加密','BGV','隐私查询'],
    link: 'https://github.com/homenc/HElib',
    // IBM 品牌标识（Wikimedia）
    imageUrl: '/kuangjiagongju/logos/homenc.png',
    vendor: 'IBM'
  }
]

const alignmentAccess: Tool[] = [
  {
    title: 'TRL (Transformer RL)',
    desc: 'Hugging Face 维护的 RLHF/RLAIF 训练工具包，支持 PPO/DPO 等算法，快速把人类反馈、规范策略融入指令微调与对齐训练。',
    tags: ['对齐','RLHF','RLAIF','指令微调'],
    link: 'https://github.com/huggingface/trl',
    // Hugging Face 官方 Logo（Wikimedia）
    imageUrl: '/kuangjiagongju/logos/hugging face.png',
    vendor: 'Hugging Face'
  },
  {
    title: 'Model Card Toolkit',
    desc: '以“模型卡”记录用途边界、已知风险、数据来源与评测指标，增强透明度与可审计性，便于在合规与安全评审时留痕。',
    tags: ['模型卡','透明度','治理'],
    link: 'https://github.com/tensorflow/model-card-toolkit',
    // 采用 TensorFlow 主标识
    imageUrl: '/kuangjiagongju/logos/tensorflow.png',
    vendor: 'Google'
  },
  {
    title: 'OAuth 2.0 + API Gateway',
    desc: '以 OAuth2/OIDC 鉴权配合网关（Kong/Nginx 等）实现准入、配额、速率限制、黑白名单、审计留痕，形成访问边界与最小权限。',
    tags: ['访问控制','鉴权','最小权限','速率限制'],
    link: 'https://oauth.net/2/',
    // 这里选用 NGINX 官方 Logo（Wikimedia），亦可改为 Kong（下行注释给出）
    imageUrl: '/kuangjiagongju/logos/oauth.png',
    // 备选（Kong 向量 Logo）：https://www.vectorlogo.zone/logos/konghq/konghq-icon.svg
    vendor: 'IETF / Gateway'
  },
  {
    title: 'NeMo Guardrails',
    desc: '对话流程护栏与意图/实体校验，支持 Prompt 正则与语义规则，缓解 Prompt 注入、越狱与指令劫持。',
    tags: ['Guardrails','Prompt 注入','越狱防护'],
    link: 'https://github.com/NVIDIA/NeMo-Guardrails',
    // 使用 NVIDIA 标识（适合作为 NeMo 家族通用品牌）
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
    vendor: 'NVIDIA'
  },
  {
    title: 'Guardrails (LLM I/O 约束)',
    desc: '输入/输出规则与 LLM 语义检查结合，对有害/泄密内容进行阻断或重写，提供扩展钩子便于集成审计与打点。',
    tags: ['输入过滤','输出审核','策略钩子'],
    link: 'https://github.com/guardrails-ai/guardrails',
    // 使用通用“护栏/盾牌”风格图示可替换；此处采用 HF 表情/生态图标亦可
    imageUrl: '/kuangjiagongju/logos/Guardrails Al.png',
    vendor: 'Community'
  }
]

const threatStandards: Tool[] = [
  {
    title: 'MITRE ATLAS',
    desc: '针对 AI 的攻击战术/技术/程序（TTP）知识库，配合威胁建模梳理攻击面与防守缺口，类似于 ATT&CK 在网络安全中的角色。',
    tags: ['威胁建模','TTP','知识库'],
    link: 'https://atlas.mitre.org',
    // MITRE 官方 Logo（Wikimedia）
    imageUrl: '/kuangjiagongju/logos/mitre atlas.svg',
    vendor: 'MITRE'
  },
  {
    title: 'NIST AI RMF',
    desc: '可信 AI 风险管理框架，从有效性、安全性、公平/可解释等维度提出实践指南，可映射到组织治理与工程流程。',
    tags: ['框架','治理','可信AI'],
    link: 'https://www.nist.gov/itl/ai-risk-management-framework',
    // NIST 官方 Logo（Wikimedia）
    imageUrl: '/kuangjiagongju/logos/nist.png',
    vendor: 'NIST'
  },
  {
    title: 'Microsoft SDL',
    desc: '安全开发生命周期：从威胁建模、代码审计到发布门禁（security gates），确保安全需求在工程环节落地。',
    tags: ['SDL','工程流程','发布门禁'],
    link: 'https://www.microsoft.com/en-us/securityengineering/sdl',
    // 微软品牌标识
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    vendor: 'Microsoft'
  }
]

const redteamPrep: Tool[] = [
  {
    title: 'Microsoft Counterfit',
    desc: '自动化对抗攻击与评测工具包，支持黑/白盒模式，适合在上线前构建红队脚本与基线得分。',
    tags: ['红队','对抗测试','自动化'],
    link: 'https://github.com/Azure/counterfit',
    // 微软品牌标识
    imageUrl: '/kuangjiagongju/logos/Microsoft Azure.png',
    vendor: 'Microsoft'
  },
  {
    title: 'IBM ART',
    desc: '对抗鲁棒性工具箱，提供 FGSM/PGD/C&W 等攻击与防御算法，支持图像、文本与表格场景的鲁棒性评估。',
    tags: ['鲁棒性','攻击/防御','评测'],
    link: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox',
    // IBM 品牌标识
    imageUrl: '/kuangjiagongju/logos/trusted-AI.png',
    vendor: 'IBM / LF AI & Data'
  },
  {
    title: 'JailbreakBench / AdvBench',
    desc: '大模型越狱脆弱性评测集合，覆盖对抗后缀、角色扮演、翻译绕过等手法，用于测量越狱成功率与防御效果。',
    tags: ['越狱','评测集','对抗后缀'],
    link: 'https://github.com/JailbreakBench/jailbreakbench',
    // 采用通用安全/研究配图可替换；此处占位使用 NIST Logo（可后续替换为 CAIS 官方素材）
    imageUrl: '/kuangjiagongju/logos/jailbreakbench.png',
    vendor: 'CAIS'
  }
]

/* ---------- 搜索/过滤/导出 ---------- */
const q = ref(''); const selected = ref<Set<string>>(new Set())
const allTags = computed(() => {
  const s = new Set<string>()
  ;[...dataPrivacy, ...alignmentAccess, ...threatStandards, ...redteamPrep].forEach(i => i.tags.forEach(s.add, s))
  return Array.from(s).sort()
})
const match = (it: Tool) => {
  const txt = (it.title + ' ' + it.desc + ' ' + it.tags.join(' ')).toLowerCase()
  const okQ = !q.value.trim() || txt.includes(q.value.trim().toLowerCase())
  const okT = selected.value.size === 0 || it.tags.some(t => selected.value.has(t))
  return okQ && okT
}
const filtered = (list: Tool[]) => list.filter(match)
const toggle = (t: string) => selected.value.has(t) ? selected.value.delete(t) : selected.value.add(t)
const reset = () => { q.value = ''; selected.value.clear() }
function toCSV(rows: Tool[]) {
  const esc = (v:any)=>`"${String(v??'').replace(/"/g,'""')}"`
  const header = ['名称','简介','标签','链接','厂商'].join(',')
  const body = rows.map(r => [esc(r.title), esc(r.desc), esc(r.tags.join('、')), esc(r.link??''), esc(r.vendor??'')].join(',')).join('\r\n')
  return header+'\r\n'+body
}
function downloadText(filename:string, content:string, mime='text/csv;charset=utf-8', withBOM=true) {
  const blob = new Blob([withBOM? '\uFEFF'+content : content], {type: mime})
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
}
function downloadCSV(){
  const rows = [...filtered(dataPrivacy), ...filtered(alignmentAccess), ...filtered(threatStandards), ...filtered(redteamPrep)]
  const csv = toCSV(rows); const dateStr = new Date().toISOString().slice(0,10)
  downloadText(`事前_工具清单_${dateStr}.csv`, csv)
}

/* ---------- 本地分组组件（图标+彩色标签+配图） ---------- */
const tagClass = (t: string) => {
  const s = t.toLowerCase()
  if (s.includes('隐私') || s.includes('dp')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200'
  if (s.includes('联邦') || s.includes('fl')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
  if (s.includes('加密') || s.includes('he')) return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
  if (s.includes('对齐') || s.includes('rl')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
  if (s.includes('越狱') || s.includes('对抗')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
  if (s.includes('治理') || s.includes('框架') || s.includes('标准')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
  return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
}

const ToolSection = defineComponent({
  name: 'ToolSection',
  props: {
    title: { type: String, required: true },
    note: { type: String, default: '' },
    items: { type: Array as () => Tool[], required: true },
    icon: { type: Object, required: true }
  },
  setup(props){
    return () => h('section', { class: 'animate-fade-in-up', style: 'animation-delay:120ms' }, [
      h('header', { class: 'flex items-center gap-3 mb-4' }, [
        h(props.icon as any, { class: 'w-6 h-6 text-indigo-500' }),
        h('h2', { class: 'text-xl md:text-2xl font-semibold' }, props.title),
        props.note ? h('span', { class: 'text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-400/30' }, props.note) : null
      ]),
      h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
        (props.items || []).map((it, i) => h('div',
          {
            key: it.title + i,
            class: 'bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/30 hover:-translate-y-2 transition-all duration-300 flex items-stretch overflow-hidden'
          },
          [
            // 左：文字
            h('div', { class: 'p-6 flex flex-col flex-grow' }, [
              h('div', { class: 'flex items-center gap-2 mb-2' }, [
                h('h3', { class: 'text-lg font-bold text-gray-900 dark:text-white' }, it.title),
                it.vendor ? h('span', { class: 'text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100 border border-gray-200/60 dark:border-white/10' }, it.vendor) : null
              ]),
              h('div', { class: 'flex flex-wrap items-center gap-2 mb-3' },
                it.tags.map(t => h('span', { class: `inline-block px-2 py-1 text-[11px] font-semibold rounded-full ${tagClass(t)}` }, t))
              ),
              h('p', { class: 'text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow leading-relaxed' }, it.desc),
              it.link ? h('a', { href: it.link, target: '_blank', rel: 'noopener', class: 'inline-flex items-center text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition' }, [
                '查看官网/Repo', h(ExternalLink, { class: 'ml-1 h-4 w-4' })
              ]) : null
            ]),
            // 右：配图
            h('div', { class: 'w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0 m-4' }, [
              it.imageUrl ? h('img', {
                src: it.imageUrl,
                alt: it.title,
                class: 'w-full h-full object-contain rounded-md bg-gray-50 dark:bg-gray-800 p-2'
              }) :
                h('div', { class: 'w-full h-full rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-400' }, 'No Image')
            ])
          ]
        ))
      )
    ])
  }
})
</script>

<style scoped>
/* 背景网格 */
.bg-grid-pattern-light {
  background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}
.bg-grid-pattern-dark {
  background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}
/* 动画 */
@keyframes fadeInDown { from {opacity: 0; transform: translateY(-20px);} to {opacity: 1; transform: translateY(0);} }
@keyframes fadeInUp { from {opacity: 0; transform: translateY(20px);} to {opacity: 1; transform: translateY(0);} }
.animate-fade-in-down { opacity:0; animation: fadeInDown .8s ease-out forwards; }
.animate-fade-in-up   { opacity:0; animation: fadeInUp   .8s ease-out forwards; }
.animation-delay-4000 { animation-delay: 4s; }
</style>
