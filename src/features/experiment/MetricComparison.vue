<template>
  <div class="space-y-4">
    <div v-for="item in metrics.cases" :key="item.category" class="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
      <div class="flex flex-wrap items-center justify-between gap-2"><p class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ item.title }}</p><span class="text-xs text-slate-400">{{ item.after ? '已完成同案例复测' : '尚未复测' }}</span></div>
      <p class="mt-2 break-words text-xs leading-5 text-slate-500 dark:text-slate-400">{{ item.caseTitle }}</p>
      <div class="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div class="rounded-xl bg-slate-50 p-3 dark:bg-white/5"><p class="text-[11px] text-slate-400">防御前</p><p class="mt-1 font-semibold" :class="tone(item.before)">{{ label(item.before) }}</p></div>
        <div class="rounded-xl bg-slate-50 p-3 dark:bg-white/5"><p class="text-[11px] text-slate-400">防御后</p><p class="mt-1 font-semibold" :class="tone(item.after)">{{ label(item.after) }}</p></div>
      </div>
    </div>
    <p class="text-xs leading-5 text-slate-500 dark:text-slate-400">对照来自已保存的案例响应和判定；只反映本案例，未复测的类型不作防御结论。</p>
  </div>
</template>

<script setup lang="ts">
import type { ConversationVerdict, SimulationMetrics } from './types'

defineProps<{ metrics: SimulationMetrics }>()
const labels: Record<ConversationVerdict, string> = {
  safe: '回答已纠正', blocked: '风险已拦截', unsafe: '存在越狱风险', hallucinated: '存在事实幻觉',
  partial: '部分改善', uncertain: '证据不足', 'residual-risk': '仍有残余风险',
}
const label = (verdict: ConversationVerdict | null) => verdict ? labels[verdict] : '待测试'
const tone = (verdict: ConversationVerdict | null) => !verdict ? 'text-slate-400' : verdict === 'safe' || verdict === 'blocked' ? 'text-cyan-700 dark:text-cyan-300' : 'text-amber-700 dark:text-amber-300'
</script>
