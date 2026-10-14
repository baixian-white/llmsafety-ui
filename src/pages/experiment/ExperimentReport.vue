<template>
  <ExperimentLayout>
    <div v-if="isDemo" class="no-print mb-5 flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-950/30 dark:text-cyan-100"><BadgeInfo class="size-5" /> 当前为教学演示报告，不代表真实学生成绩。</div>

    <div class="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
      <div><span class="experiment-section-kicker">实验成果</span><h1 class="mt-2 text-3xl font-black text-slate-950 dark:text-white">能力画像与实验报告</h1></div>
      <div class="flex gap-2"><RouterLink to="/experiment/result" class="experiment-secondary-action"><ArrowLeft class="size-4" /> 返回结果</RouterLink><button class="experiment-primary-action" @click="printReport"><Printer class="size-4" /> 打印 / 另存为PDF</button></div>
    </div>

    <article class="print-report overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-950">
      <header class="relative overflow-hidden bg-slate-950 px-7 py-9 text-white sm:px-10">
        <div class="absolute -right-20 -top-20 size-64 rounded-full bg-violet-500/25 blur-3xl"></div>
        <div class="relative flex flex-wrap items-start justify-between gap-6">
          <div><p class="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Virtual Simulation Experiment Report</p><h2 class="mt-3 text-3xl font-black">大模型安全攻防与可信评测<br />虚拟仿真实验报告</h2><p class="mt-4 text-sm text-slate-400">报告编号：{{ reportId }} · 数据类型：{{ isDemo ? '教学演示数据' : '学生本地实验记录' }}</p></div>
          <div class="rounded-2xl bg-white/10 px-6 py-4 text-center"><p class="text-xs text-slate-400">综合成绩</p><p class="mt-1 text-5xl font-black">{{ displayScore.total }}</p><p class="text-xs text-slate-400">满分100</p></div>
        </div>
      </header>

      <div class="space-y-8 p-7 sm:p-10">
        <section>
          <h3 class="report-heading"><FileText class="size-5" /> 一、实验基本信息</h3>
          <div class="mt-4 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 text-sm dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
            <div v-for="item in reportMeta" :key="item.label" class="bg-white p-4 dark:bg-slate-950"><p class="text-xs text-slate-400">{{ item.label }}</p><p class="mt-1 font-semibold text-slate-800 dark:text-slate-100">{{ item.value }}</p></div>
          </div>
        </section>

        <section>
          <h3 class="report-heading"><Route class="size-5" /> 二、实验过程与阶段成绩</h3>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="stage in displayScore.stageScores" :key="stage.stageId" class="rounded-xl border border-slate-200 p-4 dark:border-white/10"><p class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ stage.title }}</p><p class="mt-2 text-2xl font-black text-violet-600 dark:text-violet-300">{{ stage.earned }}<span class="text-sm text-slate-400"> / {{ stage.max }}</span></p></div>
          </div>
        </section>

        <section>
          <h3 class="report-heading"><ShieldCheck class="size-5" /> 三、防御复测结果</h3>
          <div class="mt-5"><MetricComparison :metrics="displayMetrics" /></div>
          <p class="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-white/5 dark:text-slate-300">复测结论：多层防御显著降低越狱、注入和有害内容通过风险；严格策略同时提高正常内容误拦截率，需继续调节阈值并使用相同样本回归验证。</p>
        </section>

        <section>
          <h3 class="report-heading"><ScanSearch class="size-5" /> 四、五维能力画像</h3>
          <div class="mt-4 rounded-2xl bg-slate-50 p-5 dark:bg-white/[.03]"><AbilityRadar :profile="displayProfile" /></div>
        </section>

        <section class="grid gap-6 lg:grid-cols-2">
          <div><h3 class="report-heading"><ClipboardCheck class="size-5" /> 五、测试结论</h3><div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-950/20"><p class="text-xl font-black text-amber-900 dark:text-amber-100">整改后通过</p><p class="mt-2 text-sm leading-7 text-amber-900/75 dark:text-amber-100/75">完成提示词保护、输入语义检测和输出分级审核的残余问题整改后，使用本报告记录的同一测试集再次复核。</p></div></div>
          <div><h3 class="report-heading"><Lightbulb class="size-5" /> 六、学习与改进建议</h3><ol class="mt-4 space-y-3"><li v-for="(item, index) in displayRecommendations" :key="item" class="flex gap-3 rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300"><span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{{ index + 1 }}</span>{{ item }}</li></ol></div>
        </section>

        <footer class="border-t border-slate-200 pt-5 text-xs leading-5 text-slate-400 dark:border-white/10">说明：本报告由平台根据学生实验过程、预设案例仿真结果和规则驱动评分自动汇总。模型响应不来自实时在线大模型。</footer>
      </div>
    </article>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, BadgeInfo, ClipboardCheck, FileText, Lightbulb, Printer, Route, ScanSearch, ShieldCheck } from 'lucide-vue-next'
import AbilityRadar from '@/features/experiment/AbilityRadar.vue'
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
const reportId = computed(() => isDemo.value ? 'DEMO-2026-001' : state.value.sessionId)
const reportMeta = computed(() => [
  { label: '学习对象', value: isDemo.value ? '演示学生' : '当前实验学生' },
  { label: '适用专业', value: '网络空间安全、信息安全' },
  { label: '实验类型', value: '综合设计型虚拟仿真实验' },
  { label: '实验方向', value: '未来信息' },
  { label: '实验步骤', value: `${displayScore.value.completedSteps} 个实质性交互操作` },
  { label: '仿真方式', value: '预设案例库与确定性规则' },
  { label: '实验用时', value: isDemo.value ? '78分钟' : `${Math.max(1, Math.round(state.value.elapsedSeconds / 60))}分钟` },
  { label: '报告日期', value: new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(new Date()) },
])
const printReport = () => window.print()
</script>
