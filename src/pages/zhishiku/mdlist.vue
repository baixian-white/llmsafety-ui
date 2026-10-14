<!-- src/pages/zhishiku/KnowledgeList.vue -->
<template>
  <!-- 主容器：网格背景 + 主题色 -->
  <div
    class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark relative"
  >
    <!-- 深色霓虹背景 -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- 头部 -->
      <header class="text-center mb-10 md:mb-14 animate-fade-in-down">
        <h1 class="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-3">
          知识库
        </h1>
        <p class="text-base md:text-lg text-indigo-500 font-semibold tracking-wider">
          大模型安全常见工具及框架
        </p>
      </header>

      <!-- 搜索 -->
      <section class="max-w-5xl mx-auto mb-8 animate-fade-in-up" style="animation-delay: 80ms;">
        <div class="panel flex">
          <input
            v-model.trim="q"
            type="text"
            class="input-like flex-1"
            placeholder="搜索标题（例如：安全、越狱、RAG）"
          />
        </div>
      </section>

      <!-- 列表 -->
      <section class="max-w-5xl mx-auto">
        <ul class="space-y-4">
          <li
            v-for="(item, i) in visibleList"
            :key="item.id"
            class="p-5 md:p-6 bg-white/70 dark:bg-white/5 rounded-xl border border-gray-200/80 dark:border-white/10 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="flex flex-col gap-3">
              <!-- 标题（点击跳转） -->
              <RouterLink
                :to="item.to"
                class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white hover:underline underline-offset-4 decoration-indigo-400"
              >
                <span class="inline-flex items-center gap-2">
                  <span class="size-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"></span>
                  {{ item.title }}
                  <span
                    v-if="i === 0"
                    class="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20"
                  >重点</span>
                </span>
              </RouterLink>

              <!-- 描述 -->
              <p class="text-gray-600 dark:text-gray-300 leading-7">
                {{ item.desc }}
              </p>

              <!-- 标签 -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(t, ti) in item.tags"
                  :key="ti"
                  class="px-2.5 py-1 text-xs rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20"
                ># {{ t }}</span>
              </div>

              <!-- 操作 -->
              <div class="pt-1">
                <RouterLink
                  :to="item.to"
                  class="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300 hover:underline underline-offset-4"
                >
                  阅读全文
                  <svg class="size-4" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </RouterLink>
              </div>
            </div>
          </li>
        </ul>

        <!-- 空状态 -->
        <div v-if="visibleList.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-16">
          没有符合条件的条目。
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Item = {
  id: string
  title: string
  desc: string
  category: string
  date: string
  readmin?: number
  tags: string[]
  to: string
}

const items = ref<Item[]>([
  {
    id: '1',
    title: '常见大模型安全框架',
    desc: '从评测、对齐、防护、监控到合规的全链路框架，适合产品落地前后的体系化建设。',
    category: '框架',
    date: '2025-08-29',
    readmin: 10,
    tags: ['大模型安全', '安全框架', '全链路防护', '多方协同'],
    to: '/zhishiku/md/md1',
  },
{
  id: '2',
  title: 'LLM 安全评测数据集汇总：探索大语言模型的安全挑战与解决方案',
  desc: '随着大语言模型在各个领域的广泛应用，如何科学评估其安全性成为重要议题。本文汇总了 149 个代表性的 LLM 安全评测数据集，帮助研究人员和开发者提升模型的安全性。',
  category: '数据集',
  date: '2025-08-18',
  readmin: 6,
  tags: ['LLM安全', '安全评测', '数据集', '大语言模型'],
  to: '/zhishiku/md/md2',
},
{
  id: '3',
  title: ' 全面解析：AI 风险图谱与15项安全防控（参考 Google SAIF 2025）',
  desc: 'Google在2025年提出的SAIF框架详细列出了AI生命周期中的15大风险点，并为每个风险提供了具体的防控措施。本文将深入解读这些风险，并为AI的安全防护提供实践指南。',
  category: 'AI安全',
  date: '2025-08-20',
  readmin: 8,
  tags: ['AI安全', 'SAIF', '安全防控', '风险管理'],
  to: '/zhishiku/md/md3',
},
{
  id: '4',
  title: '28 种大模型越狱技术综述与对比',
  desc: '本文系统梳理了28种大语言模型（LLM）常见的越狱攻击手法，并提供最小可读案例，帮助理解攻击形态及防护对策。',
  category: 'AI安全',
  date: '2025-08-25',
  readmin: 7,
  tags: ['LLM安全', '越狱攻击', '防护措施', '攻击方法'],
  to: '/zhishiku/md/md4',
},
{
  id: '5',
  title: ' 面向 AI 安全的防御框架：MITRE ATLAS 中的 26 种关键措施',
  desc: 'MITRE在2025年提出的26条AI安全防御措施为全球AI产业提供了系统化的安全防护方案，涵盖了数据、模型、供应链等各环节的防护建议。',
  category: 'AI安全',
  date: '2025-08-28',
  readmin: 7,
  tags: ['AI安全', '防御措施', 'MITRE', 'ATLAS框架'],
  to: '/zhishiku/md/md5',
},
{
  id: '6',
  title: '大模型安全工具开源大全：攻防博弈下的AI“武器库',
  desc: '在生成式AI迅速走向产业化的今天，如何保护大模型的安全成为至关重要的话题。本文汇总了最具代表性的开源安全工具，帮助开发者应对潜在的风险。',
  category: '大模型安全',
  date: '2025-08-15',
  readmin: 8,
  tags: ['大模型安全', '开源工具', '攻防博弈', 'AI安全'],
  to: '/zhishiku/md/md6',
},

{
  id: '7',
  title: 'Google提出的AI Agent纵深安全体系：从风险识别到动态防御的新范式',
  desc: 'Google在2025年提出了一套AI Agent安全框架，结合风险识别、原则约束和多层防御策略，为智能体的安全应用奠定了基础。本文深入解读了两大核心风险、三大安全原则和双层防御策略。',
  category: 'AI安全',
  date: '2025-08-30',
  readmin: 8,
  tags: ['AI安全', '智能体', 'AI Agent', '动态防御'],
  to: '/zhishiku/md/md7',
},
{
  id: '8',
  title: 'AI 攻击策略研究：15 种典型方法解析',
  desc: 'MITRE ATLAS框架详细归纳了针对AI系统的15个关键攻击阶段，为防御者提供了“红蓝对抗清单”，帮助应对AI领域日益复杂的安全挑战。',
  category: 'AI安全',
  date: '2025-09-01',
  readmin: 8,
  tags: ['AI安全', 'MITRE ATLAS', '攻击策略', '网络安全'],
  to: '/zhishiku/md/md8',
}

])

/** 搜索逻辑：只匹配标题 */
const q = ref<string>('')

const visibleList = computed(() => {
  if (!q.value) return items.value
  const s = q.value.toLowerCase()
  return items.value.filter(it => it.title.toLowerCase().includes(s))
})
</script>

<style scoped>
@reference "../../index.css"; 

/* 背景网格（和详情页一致） */
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

/* 动画（和详情页一致） */
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp   { from { opacity: 0; transform: translateY(20px); }  to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { opacity: 0; animation: fadeInDown 0.8s ease-out forwards; }
.animate-fade-in-up   { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
.animation-delay-4000 { animation-delay: 4s; }
</style>
