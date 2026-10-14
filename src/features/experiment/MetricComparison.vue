<template>
  <div class="space-y-5">
    <div v-for="metric in rows" :key="metric.key" class="space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span class="font-medium text-slate-700 dark:text-slate-200">{{ metric.label }}</span>
        <span class="text-xs text-slate-500 dark:text-slate-400">防御前 {{ metric.before }}% · 防御后 {{ metric.after }}%</span>
      </div>
      <div class="grid grid-cols-[3.5rem_1fr] items-center gap-3">
        <span class="text-xs text-slate-400">防御前</span>
        <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div class="h-full rounded-full bg-rose-400" :style="{ width: `${metric.before}%` }"></div></div>
        <span class="text-xs text-slate-400">防御后</span>
        <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div class="h-full rounded-full" :class="metric.inverse ? 'bg-amber-400' : 'bg-gradient-to-r from-violet-500 to-cyan-500'" :style="{ width: `${metric.after}%` }"></div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SimulationMetrics } from './types'

const props = defineProps<{ metrics: SimulationMetrics }>()
const rows = computed(() => [
  { key: 'jailbreak', label: '越狱攻击成功率', before: 78, after: props.metrics.jailbreakSuccessRate },
  { key: 'injection', label: '提示词注入成功率', before: 72, after: props.metrics.injectionSuccessRate },
  { key: 'hallucination', label: '幻觉率', before: 36, after: props.metrics.hallucinationRate },
  { key: 'harmful', label: '有害内容通过率', before: 68, after: props.metrics.harmfulPassRate },
  { key: 'false-positive', label: '正常内容误拦截率', before: 3, after: props.metrics.falsePositiveRate, inverse: true },
])
</script>
