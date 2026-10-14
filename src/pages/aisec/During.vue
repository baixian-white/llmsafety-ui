<template>
  <div class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark">
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[520px] h-[520px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <header class="text-center mb-16 md:mb-20 animate-fade-in-down">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">事中 · 检测与处置</span>
          <span class="bg-gradient-to-r from-amber-500 to-rose-500 text-transparent bg-clip-text">实时防护</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          监测 · 告警 · 拦截 · 熔断：把风险控制在“发生当下”。
        </p>
      </header>

      <!-- 搜索过滤 -->
      <section class="panel bg-white/70 dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg p-4 sm:p-5 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="flex items-center gap-3">
          <input v-model="q" type="text" placeholder="搜索（监控、输出审核、OPA、灰度、编排…）"
                 class="w-[22rem] max-w-full px-3 py-2 rounded-md bg-white/90 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 focus:outline-none" />
          <button class="btn-ghost" @click="reset">重置</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="t in allTags" :key="t" class="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-white/10"
                  :class="[selected.has(t) ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-400/40' : 'text-gray-600 dark:text-gray-300']"
                  @click="toggle(t)"># {{ t }}</button>
          <button class="btn-ghost" @click="downloadCSV">导出 CSV</button>
        </div>
      </section>

      <!-- 四大域 -->
      <ToolSection :icon="Activity" title="实时监测与告警" note="日志 / 指标 / 链路" :items="filtered(monitoring)" />
      <ToolSection :icon="Filter"   title="输入 / 输出安全防护" note="Prompt 过滤 · 输出审核 · 毒性检测" :items="filtered(ioProtect)" />
      <ToolSection :icon="KeyRound" title="调用与访问控制" note="限流 · 鉴权 · 零信任 · 策略即代码" :items="filtered(rateAccess)" />
      <ToolSection :icon="RefreshCw" title="自动化处置与回退" note="熔断 · 回退 · 灰度 · 流程编排" :items="filtered(automation)" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineComponent, h } from 'vue'
import { Activity, Filter, KeyRound, RefreshCw, ExternalLink } from 'lucide-vue-next'

type Tool = { title: string; desc: string; tags: string[]; link?: string; imageUrl?: string; vendor?: string }

/* 数据：详细介绍 + 配图（均为线上直链） */
const monitoring: Tool[] = [
  {
    title: 'OpenTelemetry + Prometheus/Grafana',
    desc: '统一采集 traces/metrics/logs 打点，跟踪模型调用链（embedding→rerank→LLM），设置阈值触发告警与 Webhook。',
    tags: ['监控','可观测性','告警','Trace'],
    link: 'https://opentelemetry.io',
    imageUrl: 'https://opentelemetry.io/img/logos/opentelemetry-horizontal-color.png',
    vendor: 'CNCF'
  },
  {
    title: 'Elastic Stack (ELK)',
    desc: '集中式日志采集与检索，构建上下文/用户画像，配合规则自动发现越权与异常模式。',
    tags: ['日志','检索','可视化','异常检测'],
    link: 'https://www.elastic.co/elastic-stack',
    imageUrl: '/kuangjiagongju/logos/elastic stack.png',
    vendor: 'Elastic'
  },
  {
    title: 'Loki + Tempo',
    desc: '低成本日志与追踪方案，按标签聚合日志快速定位问题，结合 Tempo 链路回放查看攻击路径。',
    tags: ['日志','追踪','成本友好'],
    link: 'https://grafana.com/oss/loki/',
    imageUrl: '/kuangjiagongju/logos/grafana.png',
    vendor: 'Grafana Labs'
  }
]

const ioProtect: Tool[] = [
  {
    title: 'NeMo Guardrails',
    desc: '在对话“中间层”实现意图/槽位/流程护栏，对敏感指令与注入技巧进行识别与拒绝，支持自定义策略。',
    tags: ['输入过滤','流程护栏','Prompt 注入'],
    link: 'https://github.com/NVIDIA/NeMo-Guardrails',
    imageUrl: '/kuangjiagongju/logos/nivida.png',
    vendor: 'NVIDIA'
  },
  {
    title: 'LangChain Guardrails',
    desc: '规则+语义双重检查，对不当/有害/泄密输出进行重写或阻断，可插装到 Router/Chain 中。',
    tags: ['输出审核','语义检查','泄密防护'],
    link: 'https://github.com/guardrails-ai/guardrails',
    imageUrl: '/kuangjiagongju/logos/Guardrails Al.png',
    vendor: 'Guardrails'
  },
  {
    title: 'Perspective / Moderation API',
    desc: '不当内容评分（仇恨/辱骂/暴力/成人等），可作为最后一道“内容闸门”。',
    tags: ['内容安全','毒性检测','阈值拦截'],
    link: 'https://perspectiveapi.com',
    imageUrl: '/kuangjiagongju/logos/Perspective.svg',
    vendor: 'Google Jigsaw'
  }
]

const rateAccess: Tool[] = [
  {
    title: 'API Gateway（Kong / NGINX / Gloo）',
    desc: '统一入口实现 JWT/OIDC 鉴权、限流、黑白名单、审计日志；为 LLM 推理加上“边界”。',
    tags: ['访问控制','限流','鉴权','审计'],
    link: 'https://nginx.org',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Nginx_logo.svg',
    vendor: 'Various'
  },
  {
    title: 'Zero Trust（BeyondCorp）',
    desc: '“不默认信任”理念，基于身份/设备/上下文动态授权，减少密钥泄露与横向移动风险。',
    tags: ['零信任','动态授权','边界'],
    link: 'https://cloud.google.com/beyondcorp',
    imageUrl: '/kuangjiagongju/logos/BeyondCorp.png',
    vendor: 'Google'
  },
  {
    title: 'OPA / Gatekeeper',
    desc: '策略即代码（Rego），统一管理访问/资源/路由策略，配合 CI/CD 做策略测试与回归。',
    tags: ['策略','治理','Rego','合规'],
    link: 'https://www.openpolicyagent.org',
    imageUrl: '/kuangjiagongju/logos/Open Policy Agent.png',
    vendor: 'CNCF'
  }
]

const automation: Tool[] = [
  {
    title: '熔断 / 回退策略',
    desc: '当越狱/泄密风险命中时，自动断路或降级为安全模板，应答“拒绝+帮助性提示”，并记录审计。',
    tags: ['熔断','回退','模板应答'],
    imageUrl: '/kuangjiagongju/logos/熔断.png'
  },
  {
    title: '灰度 / 特征开关（Feature Flag）',
    desc: '对高风险场景启用“安全强审模式”，快速切换模型/提示模板/路由策略，兼顾可用与安全。',
    tags: ['灰度','开关','风控'],
    link: 'https://launchdarkly.com',
    imageUrl: '/kuangjiagongju/logos/PostHog.png',
    vendor: 'LaunchDarkly'
  },
  {
    title: '流程编排（Argo / Temporal）',
    desc: '把“检测→处置→通知→复盘任务”串成工作流，避免漏报与长尾，支持重试与补偿。',
    tags: ['编排','自动化','SLA'],
    link: 'https://temporal.io',
    imageUrl: '/kuangjiagongju/logos/Temporal.png',
    vendor: 'Temporal'
  }
]

/* 搜索/过滤/导出 */
const q = ref(''); const selected = ref<Set<string>>(new Set())
const allTags = computed(() => {
  const s = new Set<string>()
  ;[...monitoring, ...ioProtect, ...rateAccess, ...automation].forEach(i => i.tags.forEach(s.add, s))
  return Array.from(s).sort()
})
const match = (it: Tool) => {
  const txt = (it.title + ' ' + it.desc + ' ' + it.tags.join(' ')).toLowerCase()
  const okQ = !q.value.trim() || txt.includes(q.value.trim().toLowerCase())
  const okT = selected.value.size===0 || it.tags.some(t => selected.value.has(t))
  return okQ && okT
}
const filtered = (l: Tool[]) => l.filter(match)
const toggle = (t: string) => selected.value.has(t) ? selected.value.delete(t) : selected.value.add(t)
const reset = () => { q.value=''; selected.value.clear() }

function toCSV(rows: Tool[]){
  const esc=(v:any)=>`"${String(v??'').replace(/"/g,'""')}"`
  const header=['名称','简介','标签','链接','厂商'].join(',')
  const body=rows.map(r=>[esc(r.title),esc(r.desc),esc(r.tags.join('、')),esc(r.link??''),esc(r.vendor??'')].join(',')).join('\r\n')
  return header+'\r\n'+body
}
function downloadText(filename:string, content:string, mime='text/csv;charset=utf-8', withBOM=true){
  const blob=new Blob([withBOM?'\uFEFF'+content:content],{type:mime})
  const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
}
function downloadCSV(){
  const rows=[...filtered(monitoring), ...filtered(ioProtect), ...filtered(rateAccess), ...filtered(automation)]
  const csv=toCSV(rows); const dateStr=new Date().toISOString().slice(0,10)
  downloadText(`事中_工具清单_${dateStr}.csv`, csv)
}

/* 分组组件复用（标题图标 + 彩色标签 + 配图） */
const tagClass = (t: string) => {
  const s = t.toLowerCase()
  if (s.includes('监控') || s.includes('trace')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
  if (s.includes('输出') || s.includes('毒性') || s.includes('过滤')) return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
  if (s.includes('零信任') || s.includes('鉴权') || s.includes('策略')) return 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200'
  if (s.includes('熔断') || s.includes('灰度') || s.includes('编排')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
  return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
}

const ToolSection = defineComponent({
  name: 'ToolSection',
  props: { title: String, note: String, items: Array as () => Tool[], icon: Object },
  setup(props){
    return () => h('section', { class: 'space-y-4 animate-fade-in-up' }, [
      h('header', { class: 'flex items-center gap-3' }, [
        h(props.icon as any, { class: 'w-6 h-6 text-amber-500' }),
        h('h2', { class: 'text-xl md:text-2xl font-semibold' }, props.title),
        props.note ? h('span', { class: 'text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-400/30' }, props.note) : null
      ]),
      h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
        (props.items || []).map((it, i) => h('div',
          {
            key: it.title + i,
            class: 'bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-rose-500/30 hover:-translate-y-2 transition-all duration-300 flex items-stretch overflow-hidden'
          },
          [
            h('div', { class: 'p-6 flex flex-col flex-grow' }, [
              h('div', { class: 'flex items-center gap-2 mb-2' }, [
                h('h3', { class: 'text-lg font-bold text-gray-900 dark:text-white' }, it.title),
                it.vendor ? h('span', { class: 'text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100 border border-gray-200/60 dark:border-white/10' }, it.vendor) : null
              ]),
              h('div', { class: 'flex flex-wrap items-center gap-2 mb-3' },
                it.tags.map(t => h('span', { class: `inline-block px-2 py-1 text-[11px] font-semibold rounded-full ${tagClass(t)}` }, t))
              ),
              h('p', { class: 'text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow leading-relaxed' }, it.desc),
              it.link ? h('a', { href: it.link, target: '_blank', rel: 'noopener', class: 'inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-500 transition' }, [
                '查看官网/Repo', h(ExternalLink, { class: 'ml-1 h-4 w-4' })
              ]) : null
            ]),
            h('div', { class: 'w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0 m-4' }, [
              it.imageUrl ? h('img', { src: it.imageUrl, alt: it.title, class: 'w-full h-full object-contain rounded-md bg-gray-50 dark:bg-gray-800 p-2' }) :
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
.bg-grid-pattern-light{background-image:linear-gradient(rgba(0,0,0,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.05) 1px,transparent 1px);background-size:2rem 2rem}
.bg-grid-pattern-dark{background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:2rem 2rem}
@keyframes fadeInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.animate-fade-in-down{opacity:0;animation:fadeInDown .8s ease-out forwards}
.animate-fade-in-up{opacity:0;animation:fadeInUp .8s ease-out forwards}
.animation-delay-4000{animation-delay:4s}
</style>
