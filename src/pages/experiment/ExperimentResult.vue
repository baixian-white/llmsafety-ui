<template>
  <ExperimentLayout>
    <div class="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-950/30 dark:text-cyan-100">
      <span class="flex items-center gap-2"><BadgeInfo class="size-5 shrink-0" />{{ report.isComplete ? '实验报告已自动生成，包含完整攻防记录、证据及成绩。' : '实验尚未完成，当前显示本人的已完成阶段成绩。' }}</span>
      <RouterLink :to="report.isComplete ? '/experiment/report' : '/experiment/run'" class="experiment-primary-action">{{ report.isComplete ? '查看完整报告' : '继续实验' }}<ArrowRight class="size-4" /></RouterLink>
    </div>

    <section class="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
      <article class="overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl sm:p-9">
        <div class="flex items-center justify-between gap-3"><span class="rounded-full bg-white/10 px-3 py-1 text-xs">{{ report.isComplete ? '本次实验结果' : '实验进行中' }}</span><ShieldCheck class="size-7 text-emerald-300" /></div>
        <p class="mt-10 text-sm uppercase tracking-[0.24em] text-slate-400">{{ report.isComplete ? '综合成绩' : '已完成阶段得分' }}</p>
        <div class="mt-2 flex items-end gap-3"><span class="text-8xl font-black tracking-tighter">{{ displayScore.total }}</span><span class="mb-3 text-xl text-slate-400">/ 100</span></div>
        <div class="mt-8 grid grid-cols-3 gap-3">
          <div v-for="stat in resultStats" :key="stat.label" class="rounded-2xl bg-white/[.07] p-3"><p class="text-xl font-black">{{ stat.value }}</p><p class="mt-1 text-[11px] text-slate-400">{{ stat.label }}</p></div>
        </div>
        <div class="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
          <p class="text-xs font-bold uppercase tracking-wider text-amber-300">安全测试结论</p>
          <p class="mt-2 text-2xl font-black">{{ displayMetrics.conclusion }}</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">{{ displayMetrics.description }}</p>
        </div>
      </article>

      <article class="experiment-card">
        <div class="flex flex-wrap items-end justify-between gap-4"><div><span class="experiment-section-kicker">过程评价</span><h1 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">三个阶段的测试成绩</h1></div><span class="experiment-chip"><ListChecks class="size-4" /> {{ displayScore.completedSteps }} / {{ experimentSteps.length }} 项</span></div>
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
        <div class="flex items-center justify-between gap-3"><div><span class="experiment-section-kicker">防御复测</span><h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">案例防御前后对比</h2></div><TrendingDown class="size-7 text-emerald-500" /></div>
        <div class="mt-6"><MetricComparison :metrics="displayMetrics" /></div>
      </article>
      <article class="experiment-card">
        <span class="experiment-section-kicker">{{ report.isComplete ? '实验完成' : '实验进度' }}</span>
        <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ report.isComplete ? '从攻击到防御的记录已汇总' : '完成攻防后自动汇总报告' }}</h2>
        <div class="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <p>实验包含越狱攻击、幻觉风险两类测试，以及一组同模型、同案例、同提示词的防御复测。</p>
          <p v-if="report.defense.confirmed">复测时开启了 <strong class="text-cyan-700 dark:text-cyan-300">{{ displayMetrics.enabledLayerCount }} 层</strong>防御。每阶段的证据与判定计入成绩，防御未拦截风险也可以依据真实结果完成分析。</p>
          <p>{{ report.isComplete ? '实验报告已自动生成，可直接查看或打印。' : `已完成 ${report.completedCount} / ${experimentSteps.length} 个阶段，报告草稿会随实验进度更新。` }}</p>
        </div>
      </article>
    </section>

    <section class="mt-5 experiment-card">
      <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><span class="experiment-section-kicker">知识库学习建议</span><h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">依据过程得分形成可追溯建议</h2><div class="mt-4 grid gap-3 md:grid-cols-3"><div v-for="(item, index) in displayRecommendations" :key="item" class="rounded-2xl border border-slate-200/80 p-4 dark:border-white/10"><span class="flex size-7 items-center justify-center rounded-lg bg-violet-100 text-xs font-black text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{{ index + 1 }}</span><p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ item }}</p></div></div></div>
        <RouterLink to="/experiment/report" class="experiment-primary-action whitespace-nowrap">{{ report.isComplete ? '查看完整实验报告' : '查看报告草稿' }} <ArrowRight class="size-5" /></RouterLink>
      </div>
    </section>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, BadgeInfo, ListChecks, ShieldCheck, TrendingDown } from 'lucide-vue-next'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import MetricComparison from '@/features/experiment/MetricComparison.vue'
import { experimentSteps } from '@/features/experiment/catalog'
import { buildExperimentReport } from '@/features/experiment/report'
import { useExperiment } from '@/features/experiment/useExperiment'

const { state } = useExperiment()
const report = computed(() => buildExperimentReport(state.value))
const displayScore = computed(() => report.value.score)
const displayMetrics = computed(() => report.value.metrics)
const displayRecommendations = computed(() => report.value.recommendations)
const resultStats = computed(() => [
  { value: `${displayScore.value.completedSteps}`, label: '有效操作' },
  { value: `${displayMetrics.value.cases.filter(item => item.before).length}`, label: '攻击测试案例' },
  { value: `${displayMetrics.value.enabledLayerCount}`, label: '开启防御层数' },
])
</script>
