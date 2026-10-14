<template>
  <div class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark">
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[520px] h-[520px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[520px] h-[520px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <header class="text-center mb-16 md:mb-20 animate-fade-in-down">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">事后 · 复盘与改进</span>
          <span class="bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">闭环强化</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">溯源 · 评估 · 更新 · 沉淀：把每次事件转化为进步的燃料。</p>
      </header>

      <!-- 搜索过滤 -->
      <section class="panel bg-white/70 dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg p-4 sm:p-5 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="flex items-center gap-3">
          <input v-model="q" type="text" placeholder="搜索（取证、合规、Evals、案例库…）"
                 class="w-[22rem] max-w-full px-3 py-2 rounded-md bg-white/90 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 focus:outline-none" />
          <button class="btn-ghost" @click="reset">重置</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="t in allTags" :key="t" class="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-white/10"
                  :class="[selected.has(t) ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-400/40' : 'text-gray-600 dark:text-gray-300']"
                  @click="toggle(t)"># {{ t }}</button>
          <button class="btn-ghost" @click="downloadCSV">导出 CSV</button>
        </div>
      </section>

      <!-- 四大域 -->
      <ToolSection :icon="History" title="事件溯源与取证" note="日志 / 链路 / 证据保全" :items="filtered(forensics)" />
      <ToolSection :icon="Scale" title="影响评估与合规" note="泄露范围 · 扩散程度 · 整改计划" :items="filtered(impactCompliance)" />
      <ToolSection :icon="RefreshCcw" title="规则与模型更新" note="黑名单库 · 提示词 · RLHF/RLAIF 回灌" :items="filtered(ruleModelUpdate)" />
      <ToolSection :icon="Library" title="知识库与案例沉淀" note="把战例转化为红队用例 / Evals" :items="filtered(knowledgeBase)" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineComponent, h } from 'vue'
import { History, Scale, RefreshCcw, Library, ExternalLink } from 'lucide-vue-next'

type Tool = { title: string; desc: string; tags: string[]; link?: string; imageUrl?: string; vendor?: string }

const forensics: Tool[] = [
  {
    title: '审计日志（自建/云原生）',
    desc: '保留请求体摘要、上下文、提示词与输出快照，标注风险等级与事件 ID，满足取证与复盘追溯。',
    tags: ['审计','取证','日志'],
    imageUrl: '/kuangjiagongju/logos/审计日志.png'
  },
  {
    title: 'Jaeger / Tempo',
    desc: '分布式追踪回放，定位异常调用链，结合 Tag 与采样策略放大可疑路径信号。',
    tags: ['追踪','溯源','链路'],
    link: 'https://www.jaegertracing.io',
    imageUrl: 'https://www.jaegertracing.io/img/jaeger-icon-reverse-color.svg',
    vendor: 'CNCF'
  },
  {
    title: 'WORM 不可篡改存储',
    desc: '对证据快照/导出报告进行写一次读多次存储，满足合规要求与取证有效性。',
    tags: ['合规','证据保全','WORM'],
    imageUrl: '/kuangjiagongju/logos/WORM不可篡改存储.png'
  }
]

const impactCompliance: Tool[] = [
  {
    title: '数据泄露影响评估表',
    desc: '枚举泄露对象/数据类别/范围/扩散路径/补救措施/复发概率，沉淀为结构化模板。',
    tags: ['影响评估','数据泄露','模板'],
    imageUrl: '/kuangjiagongju/logos/数据泄露.png'
  },
  {
    title: 'DLP（Data Loss Prevention）',
    desc: '基于指纹/模式/上下文的敏感信息检测与阻断，辅助量化扩散半径与命中率。',
    tags: ['DLP','泄露防护','检测'],
    link: 'https://cloud.google.com/dlp',
    imageUrl: '/kuangjiagongju/logos/Google Cloud.png',
    vendor: 'Google Cloud'
  },
  {
    title: '合规基线（NIST / ISO / 国内规范）',
    desc: '按条款逐项检查记录整改计划与负责人，生成留痕报告对接内审。',
    tags: ['合规','基线','整改计划'],
    imageUrl: '/kuangjiagongju/logos/ISO.png'
  }
]

const ruleModelUpdate: Tool[] = [
  {
    title: '黑名单库 / 提示模板库',
    desc: '更新敏感词、违规模式与拒答模板；对新型绕过手法建立规则签名。',
    tags: ['规则','模板','签名库'],
    imageUrl: '/kuangjiagongju/logos/黑名单库.png'
  },
  {
    title: '对齐策略迭代（RLHF/RLAIF）',
    desc: '把高风险样例转为标注数据回灌至人类反馈训练，提升对攻防样式的免疫力。',
    tags: ['对齐','RLHF','RLAIF','训练'],
    imageUrl: '/kuangjiagongju/logos/对齐策略.png'
  },
  {
    title: '评测集更新（AdvBench / JailbreakBench）',
    desc: '将真实事件样例抽象为可回放用例，持续回归评测，量化改进幅度。',
    tags: ['评测集','越狱','回归'],
    link: 'https://github.com/JailbreakBench/jailbreakbench',
    imageUrl: 'https://opengraph.githubassets.com/1/JailbreakBench/jailbreakbench'
  }
]

const knowledgeBase: Tool[] = [
  {
    title: '事故库 / 战例库',
    desc: '将“攻击向量—处置动作—复盘要点—证据链接”结构化入库，支撑培训与预案复用。',
    tags: ['知识库','红队','SOP'],
    imageUrl: '/kuangjiagongju/logos/事故库.png'
  },
  {
    title: 'Wiki / Notion / Confluence',
    desc: '跨团队共享 SOP、Playbook、FAQ 与分级响应流程，支撑快速入门与响应一致性。',
    tags: ['文档','协作','SOP'],
    imageUrl: '/kuangjiagongju/logos/WIKI.png',
    vendor: 'Atlassian / Notion'
  },
  {
    title: 'Evals / Red Teaming Playbook',
    desc: '将经验映射成可运行评测脚本（门禁项），CI 自动验证，避免回归带回旧风险。',
    tags: ['Evals','CI','门禁'],
    link: 'https://platform.openai.com/docs/guides/evals',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    vendor: 'OpenAI'
  }
]

/* 搜索/过滤/导出 */
const q = ref(''); const selected = ref<Set<string>>(new Set())
const allTags = computed(() => {
  const s = new Set<string>()
  ;[...forensics, ...impactCompliance, ...ruleModelUpdate, ...knowledgeBase].forEach(i => i.tags.forEach(s.add, s))
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
  const rows=[...filtered(forensics), ...filtered(impactCompliance), ...filtered(ruleModelUpdate), ...filtered(knowledgeBase)]
  const csv=toCSV(rows); const dateStr=new Date().toISOString().slice(0,10)
  downloadText(`事后_工具清单_${dateStr}.csv`, csv)
}

/* 分组组件（绿色主题） */
const tagClass = (t: string) => {
  const s=t.toLowerCase()
  if (s.includes('取证') || s.includes('审计') || s.includes('链路')) return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
  if (s.includes('合规') || s.includes('整改') || s.includes('基线')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
  if (s.includes('对齐') || s.includes('评测') || s.includes('门禁')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
  if (s.includes('知识库') || s.includes('sop') || s.includes('红队')) return 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200'
  return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
}

const ToolSection = defineComponent({
  name: 'ToolSection',
  props: { title: String, note: String, items: Array as () => Tool[], icon: Object },
  setup(props){
    return () => h('section', { class: 'space-y-4 animate-fade-in-up' }, [
      h('header', { class: 'flex items-center gap-3' }, [
        h(props.icon as any, { class: 'w-6 h-6 text-emerald-500' }),
        h('h2', { class: 'text-xl md:text-2xl font-semibold' }, props.title),
        props.note ? h('span', { class: 'text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30' }, props.note) : null
      ]),
      h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
        (props.items || []).map((it, i) => h('div',
          {
            key: it.title + i,
            class: 'bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-emerald-500/30 hover:-translate-y-2 transition-all duration-300 flex items-stretch overflow-hidden'
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
              it.link ? h('a', { href: it.link, target: '_blank', rel: 'noopener', class: 'inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition' }, [
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
