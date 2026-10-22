<template>
  <article class="report-record rounded-2xl border border-slate-200 p-5 dark:border-white/10 sm:p-6">
    <div class="report-keep-together flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <p class="text-xs font-bold text-violet-600 dark:text-violet-300">{{ record.title }}</p>
        <h4 class="mt-2 break-words text-lg font-bold text-slate-900 dark:text-white">{{ record.run?.caseTitle ?? '尚未选择案例' }}</h4>
        <p v-if="record.run" class="mt-2 break-words text-xs leading-6 text-slate-500 dark:text-slate-400">模型：{{ record.modelLabel }}<br />案例编号：{{ record.run.caseId }}</p>
      </div>
      <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">{{ record.status }}</span>
    </div>

    <template v-if="record.run">
      <div class="mt-5 space-y-5">
        <div>
          <p class="report-label">案例问题</p>
          <p class="report-transcript mt-2">{{ record.run.question }}</p>
        </div>
        <div>
          <p class="report-label">{{ record.stageId === 'defense' ? '复测提示词（与攻击测试一致）' : '实际发送的提示词' }}</p>
          <p class="report-transcript mt-2 rounded-xl bg-slate-50 p-4 dark:bg-white/5">{{ record.run.sentPrompt }}</p>
        </div>
        <div class="report-response-grid grid gap-4" :class="baselineResponse !== undefined ? 'lg:grid-cols-2' : ''">
          <div v-if="baselineResponse !== undefined" class="min-w-0">
            <p class="report-label">防御前模型回答</p>
            <p class="report-transcript mt-2 rounded-xl border border-amber-200 p-4 dark:border-amber-500/20">{{ baselineResponse || '未记录模型回答' }}</p>
          </div>
          <div class="min-w-0">
            <p class="report-label">{{ record.stageId === 'defense' ? '防御后模型回答' : '模型完整回答' }}</p>
            <p class="report-transcript mt-2 rounded-xl border border-slate-200 p-4 dark:border-white/10">{{ record.response || '未记录模型回答' }}</p>
          </div>
        </div>
        <div>
          <p class="report-label">学生选取的证据 · {{ record.run.selectedEvidence.length }} 条</p>
          <ol v-if="record.run.selectedEvidence.length" class="mt-2 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li v-for="(evidence, index) in record.run.selectedEvidence" :key="index" class="whitespace-pre-wrap break-words">{{ evidence }}</li>
          </ol>
          <p v-else class="mt-2 text-sm text-slate-500">尚未保存证据。</p>
        </div>
        <div class="report-keep-together rounded-xl bg-slate-50 p-4 dark:bg-white/5">
          <dl class="grid gap-4 text-sm sm:grid-cols-2">
            <div><dt class="text-xs text-slate-500">学生判定</dt><dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ record.run.verdict ? reportVerdictLabels[record.run.verdict] : '尚未判定' }}</dd></div>
            <div><dt class="text-xs text-slate-500">案例判据</dt><dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ reportVerdictLabels[record.run.expectedVerdict] }}</dd></div>
          </dl>
          <p v-if="record.feedback" class="mt-3 border-t border-slate-200 pt-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">阶段得分：{{ record.feedback.earnedPoints }} / {{ record.feedback.maxPoints }}。{{ record.feedback.message }}</p>
        </div>
      </div>
    </template>
    <p v-else class="mt-4 text-sm leading-7 text-slate-500">完成此阶段后，提示词、模型回答、证据和判定会自动收录到报告。</p>
  </article>
</template>

<script setup lang="ts">
import { reportVerdictLabels, type ExperimentReportRecord } from './report'

defineProps<{ record: ExperimentReportRecord; baselineResponse?: string }>()
</script>
