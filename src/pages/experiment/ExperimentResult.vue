<template>
  <ExperimentLayout>
    <div v-if="isDemo" class="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-950/30 dark:text-cyan-100">
      <span class="flex items-center gap-2"><BadgeInfo class="size-5" /> 当前展示为完整功能演示结果，不代表真实学生成绩或教学成效。</span>
      <RouterLink to="/experiment/prepare" class="font-bold underline underline-offset-4">开始自己的实验</RouterLink>
    </div>

    <section class="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
      <article class="overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl sm:p-9">
        <div class="flex items-center justify-between gap-3"><span class="rounded-full bg-white/10 px-3 py-1 text-xs">{{ isDemo ? '教学演示记录' : '本次实验结果' }}</span><ShieldCheck class="size-7 text-emerald-300" /></div>
        <p class="mt-10 text-sm uppercase tracking-[0.24em] text-slate-400">综合成绩</p>
        <div class="mt-2 flex items-end gap-3"><span class="text-8xl font-black tracking-tighter">{{ displayScore.total }}</span><span class="mb-3 text-xl text-slate-400">/ 100</span></div>
        <div class="mt-8 grid grid-cols-3 gap-3">
          <div v-for="stat in resultStats" :key="stat.label" class="rounded-2xl bg-white/[.07] p-3"><p class="text-xl font-black">{{ stat.value }}</p><p class="mt-1 text-[11px] text-slate-400">{{ stat.label }}</p></div>
        </div>
        <div class="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
          <p class="text-xs font-bold uppercase tracking-wider text-amber-300">安全测试结论</p>
          <p class="mt-2 text-2xl font-black">整改后通过</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">防御策略显著降低了越狱和注入成功率，但仍需控制正常内容误拦截，并复核提示泄露残余风险。</p>
        </div>
      </article>

      <article class="experiment-card">
        <div class="flex flex-wrap items-end justify-between gap-4"><div><span class="experiment-section-kicker">过程评价</span><h1 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">七阶段成绩与扣分依据</h1></div><span class="experiment-chip"><ListChecks class="size-4" /> {{ displayScore.completedSteps }} / 32 步</span></div>
        <div class="mt-6 space-y-4">
          <div v-for="stage in displayScore.stageScores" :key="stage.stageId">
            <div class="mb-2 flex items-center justify-between gap-3 text-sm"><span class="font-semibold text-slate-700 dark:text-slate-200">{{ stage.title }}</span><span class="text-slate-500">{{ stage.earned }} / {{ stage.max }}</span></div>
            <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div class="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400" :style="{ width: `${stage.earned / stage.max * 100}%` }"></div></div>
          </div>
        </div>
        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5"><p class="text-xs text-slate-400">原始步骤得分</p><p class="mt-1 text-xl font-black text-slate-900 dark:text-white">{{ displayScore.rawTotal }}</p></div>
          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5"><p class="text-xs text-slate-400">教学提示影响</p><p class="mt-1 text-xl font-black text-slate-900 dark:text-white">-{{ displayScore.hintPenalty }}</p></div>
        </div>
      </article>
    </section>

    <section class="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
      <article class="experiment-card">
        <div class="flex items-center justify-between gap-3"><div><span class="experiment-section-kicker">防御复测</span><h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">防御前后指标对比</h2></div><TrendingDown class="size-7 text-emerald-500" /></div>
        <div class="mt-6"><MetricComparison :metrics="displayMetrics" /></div>
      </article>
      <article class="experiment-card">
        <span class="experiment-section-kicker">综合风险矩阵</span>
        <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">概率 × 影响</h2>
        <div class="mt-6 grid grid-cols-[auto_repeat(3,1fr)] gap-2 text-center text-xs">
          <span></span><span class="py-2 text-slate-400">低影响</span><span class="py-2 text-slate-400">中影响</span><span class="py-2 text-slate-400">高影响</span>
          <template v-for="row in riskRows" :key="row.label">
            <span class="flex items-center pr-2 text-right font-semibold text-slate-500">{{ row.label }}</span>
            <span v-for="(cell, index) in row.cells" :key="index" class="flex aspect-square items-center justify-center rounded-xl font-bold" :class="cell.class">{{ cell.label }}</span>
          </template>
        </div>
        <div class="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800 dark:border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-100">当前落点：<strong>高概率 × 高影响</strong>（防御前）。完成多层防御后，残余风险降至中概率 × 中影响，仍需整改复核。</div>
      </article>
    </section>

    <section class="mt-5 experiment-card">
      <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><span class="experiment-section-kicker">知识库学习建议</span><h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">依据过程得分形成可追溯建议</h2><div class="mt-4 grid gap-3 md:grid-cols-3"><div v-for="(item, index) in displayRecommendations" :key="item" class="rounded-2xl border border-slate-200/80 p-4 dark:border-white/10"><span class="flex size-7 items-center justify-center rounded-lg bg-violet-100 text-xs font-black text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{{ index + 1 }}</span><p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ item }}</p></div></div></div>
        <RouterLink to="/experiment/report" class="experiment-primary-action whitespace-nowrap">查看能力画像与报告 <ArrowRight class="size-5" /></RouterLink>
      </div>
    </section>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, BadgeInfo, ListChecks, ShieldCheck, TrendingDown } from 'lucide-vue-next'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import MetricComparison from '@/features/experiment/MetricComparison.vue'
import { buildDemoAnswers, calculateAbilityProfile, calculateMetrics, calculateScore, getLearningRecommendations } from '@/features/experiment/engine'
import { useExperiment } from '@/features/experiment/useExperiment'

const { state } = useExperiment()
const isDemo = computed(() => state.value.status !== 'completed')
const demoAnswers = buildDemoAnswers()
const displayAnswers = computed(() => isDemo.value ? demoAnswers : state.value.answers)
const displayHints = computed(() => isDemo.value ? { 'hallucination-evidence': 1, 'defense-balance': 1 } : state.value.hints)
const displayScore = computed(() => calculateScore(displayAnswers.value, displayHints.value))
const displayMetrics = computed(() => calculateMetrics(displayAnswers.value))
const displayProfile = computed(() => calculateAbilityProfile(displayAnswers.value, displayHints.value))
const displayRecommendations = computed(() => getLearningRecommendations(displayProfile.value))
const resultStats = computed(() => [
  { value: `${displayScore.value.completedSteps}`, label: '有效操作' },
  { value: `${Math.round(displayMetrics.value.jailbreakSuccessRate)}%`, label: '防御后越狱率' },
  { value: `${Math.round(displayMetrics.value.usabilityScore)}%`, label: '正常可用性' },
])
const riskRows = [
  { label: '高概率', cells: [{ label: '中', class: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200' }, { label: '高', class: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-200' }, { label: '极高', class: 'bg-rose-500 text-white ring-4 ring-rose-500/15' }] },
  { label: '中概率', cells: [{ label: '低', class: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200' }, { label: '中', class: 'bg-amber-100 text-amber-700 ring-4 ring-violet-500/15 dark:bg-amber-500/15 dark:text-amber-200' }, { label: '高', class: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-200' }] },
  { label: '低概率', cells: [{ label: '低', class: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200' }, { label: '低', class: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200' }, { label: '中', class: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200' }] },
]
</script>
