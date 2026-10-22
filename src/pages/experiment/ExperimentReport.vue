<template>
  <ExperimentLayout>
    <div class="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <span class="experiment-section-kicker">实验成果</span>
        <h1 class="mt-2 text-3xl font-black text-slate-950 dark:text-white">{{ report.isComplete ? '实验报告已生成' : '实验报告草稿' }}</h1>
        <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{{ report.isComplete ? '攻防过程、证据与成绩已自动汇总，可直接打印或另存为 PDF。' : '已记录的实验内容会实时汇总；完成攻击与防御后自动生成正式报告。' }}</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <RouterLink :to="report.isComplete ? '/experiment/result' : '/experiment/run'" class="experiment-secondary-action"><ArrowLeft class="size-4" />{{ report.isComplete ? '查看实验结果' : '继续实验' }}</RouterLink>
        <button class="experiment-primary-action" @click="printReport"><Printer class="size-4" />{{ report.isComplete ? '打印 / 导出 PDF' : '打印草稿' }}</button>
      </div>
    </div>

    <article class="print-report overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-950">
      <header class="report-keep-together bg-slate-950 px-7 py-9 text-white sm:px-10">
        <div class="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Virtual Simulation Experiment Report</p>
            <h2 class="mt-3 text-3xl font-black leading-tight">大模型安全攻防与可信评测<br />虚拟仿真实验报告</h2>
            <p class="mt-4 break-words text-sm text-slate-400">报告编号：{{ report.id }} · {{ report.isComplete ? '正式报告' : '草稿 · 实验尚未完成' }}</p>
          </div>
          <div class="rounded-2xl bg-white/10 px-6 py-4 text-center"><p class="text-xs text-slate-400">{{ report.isComplete ? '综合成绩' : '已完成阶段得分' }}</p><p class="mt-1 text-5xl font-black">{{ report.score.total }}</p><p class="text-xs text-slate-400">满分 100</p></div>
        </div>
      </header>

      <div class="report-body space-y-9 p-7 sm:p-10">
        <section>
          <h3 class="report-heading"><FileText class="size-5" />一、实验概况与成绩</h3>
          <dl class="report-keep-together mt-4 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 text-sm dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
            <div v-for="item in reportMeta" :key="item.label" class="min-w-0 bg-white p-4 dark:bg-slate-950"><dt class="text-xs text-slate-500">{{ item.label }}</dt><dd class="mt-1 break-words font-semibold text-slate-800 dark:text-slate-100">{{ item.value }}</dd></div>
          </dl>
          <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">实验目标：识别越狱攻击与事实幻觉，依据模型响应选取证据，再对一个已测案例开启防御并复测，比较防御前后的结果。</p>
          <div class="report-keep-together mt-4 grid gap-3 sm:grid-cols-3">
            <div v-for="(stage, index) in report.score.stageScores" :key="stage.stageId" class="rounded-xl border border-slate-200 p-4 dark:border-white/10">
              <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ stage.title }}</p>
              <p class="mt-2 text-2xl font-black text-violet-600 dark:text-violet-300">{{ stage.earned }}<span class="text-sm text-slate-400"> / {{ stage.max }}</span></p>
              <p class="mt-2 text-xs text-slate-500">{{ report.records[index].status }}</p>
            </div>
          </div>
          <p class="mt-3 text-xs leading-6 text-slate-500">阶段原始得分 {{ report.score.rawTotal }} 分；教学提示扣分 {{ report.score.hintPenalty }} 分；{{ report.isComplete ? '最终成绩' : '当前计分' }} {{ report.score.total }} 分。阶段评分依据学生判定与案例证据的一致性。</p>
        </section>

        <section>
          <h3 class="report-heading"><MessagesSquare class="size-5" />二、攻击测试与证据记录</h3>
          <div class="mt-4 space-y-5"><ExperimentReportRecord v-for="record in report.attacks" :key="record.stageId" :record="record" /></div>
        </section>

        <section>
          <h3 class="report-heading"><ShieldCheck class="size-5" />三、安全防御配置与复测</h3>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">复测对象：{{ state.defenseConfiguration.sourceStage === 'jailbreak' ? '越狱攻击案例' : '幻觉风险案例' }}。{{ report.defense.run ? '本次复测开启' : '当前配置开启' }} {{ report.enabledLayerCount }} 层防御。复测使用与攻击阶段相同的模型、案例和提示词。</p>
          <div class="report-keep-together mt-4 grid gap-3 sm:grid-cols-3">
            <div v-for="layer in report.layers" :key="layer.id" class="rounded-xl border p-4" :class="layer.enabled ? 'border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/10' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5'">
              <p class="text-sm font-bold text-slate-900 dark:text-white">{{ layer.name }} · {{ layer.enabled ? '已开启' : '未开启' }}</p>
              <p class="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">{{ layer.description }}</p>
              <p class="mt-2 text-xs font-semibold text-violet-700 dark:text-violet-300">{{ layer.status }}</p>
            </div>
          </div>
          <ExperimentReportRecord class="mt-5" :record="report.defense" :baseline-response="report.baselineResponse" />
          <div v-if="report.defense.run" class="mt-5 space-y-4">
            <h4 class="report-label">逐层执行记录</h4>
            <article v-for="trace in report.defense.run.defenseTrace" :key="trace.id" class="rounded-xl border border-slate-200 p-5 dark:border-white/10">
              <h4 class="font-bold text-slate-800 dark:text-slate-100">{{ trace.name }}</h4>
              <p class="mt-1 text-xs font-semibold text-violet-700 dark:text-violet-300">{{ report.layers.find(layer => layer.id === trace.id)?.status }}</p>
              <p class="report-label mt-4">检测过程</p><p class="report-transcript mt-2">{{ trace.process || '案例未提供检测过程。' }}</p>
              <p class="report-label mt-4">防御层输出</p><p class="report-transcript mt-2">{{ trace.output || '案例未提供该层输出。' }}</p>
            </article>
            <p v-if="!report.defense.run.defenseTrace.length" class="text-sm text-slate-500">本次未执行防御层。</p>
          </div>
        </section>

        <section>
          <h3 class="report-heading"><ClipboardCheck class="size-5" />四、前后对比与实验结论</h3>
          <div class="report-keep-together mt-4"><MetricComparison :metrics="report.metrics" /></div>
          <div class="report-keep-together mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-950/20">
            <p class="text-xl font-black text-amber-900 dark:text-amber-100">{{ report.metrics.conclusion }}</p>
            <p class="mt-2 text-sm leading-7 text-amber-900/80 dark:text-amber-100/80">{{ report.metrics.description }}</p>
          </div>
        </section>

        <section class="report-keep-together">
          <h3 class="report-heading"><ScanSearch class="size-5" />五、能力画像</h3>
          <div class="mt-4 rounded-2xl bg-slate-50 p-5 dark:bg-white/[.03]"><AbilityRadar :profile="report.profile" /></div>
        </section>

        <section>
          <h3 class="report-heading"><Lightbulb class="size-5" />六、学习与改进建议</h3>
          <ol class="mt-4 space-y-3"><li v-for="(item, index) in report.recommendations" :key="item" class="report-keep-together flex gap-3 rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300"><span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{{ index + 1 }}</span>{{ item }}</li></ol>
        </section>

        <footer class="border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500 dark:border-white/10">说明：本报告依据当前学生在本浏览器保存的实验记录自动生成。模型回答与防御记录来自预设案例仿真，成绩依据案例判据计算；测试结论仅适用于本次案例及防御组合。</footer>
      </div>
    </article>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, ClipboardCheck, FileText, Lightbulb, MessagesSquare, Printer, ScanSearch, ShieldCheck } from 'lucide-vue-next'
import AbilityRadar from '@/features/experiment/AbilityRadar.vue'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import ExperimentReportRecord from '@/features/experiment/ExperimentReportRecord.vue'
import MetricComparison from '@/features/experiment/MetricComparison.vue'
import { experimentSteps } from '@/features/experiment/catalog'
import { buildExperimentReport } from '@/features/experiment/report'
import { useExperiment } from '@/features/experiment/useExperiment'

const { state } = useExperiment()
const report = computed(() => buildExperimentReport(state.value))
const formatDate = (value: string | null) => {
  if (!value || !Number.isFinite(Date.parse(value))) return '尚未记录'
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(value))
}
const reportMeta = computed(() => [
  { label: '实验记录', value: '当前学生 · 本地实验记录' },
  { label: '完成进度', value: `${report.value.completedCount} / ${experimentSteps.length} 个阶段` },
  { label: '开始时间', value: formatDate(state.value.startedAt) },
  { label: '报告生成时间', value: report.value.isComplete ? formatDate(report.value.completedAt) : '待完成攻防实验后生成' },
  { label: '实验用时', value: `${Math.floor(state.value.elapsedSeconds / 60)} 分 ${state.value.elapsedSeconds % 60} 秒` },
  { label: '测试范围', value: '越狱攻击测试、幻觉风险测试及一组防御复测' },
])
const printReport = () => window.print()
</script>
