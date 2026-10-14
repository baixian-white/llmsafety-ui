<template>
  <div v-if="open" class="relative rounded-2xl border-2 border-violet-500 bg-violet-50/90 p-4 shadow-[0_0_0_5px_rgba(124,58,237,.12)] dark:bg-violet-950/50" role="status" aria-live="polite">
    <span class="absolute -left-2 -top-2 flex size-5">
      <span class="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60"></span>
      <span class="relative inline-flex size-5 rounded-full border-4 border-white bg-violet-600 dark:border-slate-900"></span>
    </span>
    <button class="absolute right-3 top-3 rounded-lg p-1 text-slate-500 transition hover:bg-white hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="关闭实验引导" @click="$emit('close')">
      <X class="size-4" />
    </button>
    <div class="pr-8">
      <div class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">
        <Sparkles class="size-4" /> 实验指导 · 第 {{ stepNumber }} / {{ total }} 步
      </div>
      <h3 class="text-base font-bold text-slate-900 dark:text-white">{{ title }}</h3>
      <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ instruction }}</p>
      <p class="mt-3 flex items-start gap-2 rounded-xl bg-white/80 px-3 py-2 text-xs leading-5 text-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
        <MousePointerClick class="mt-0.5 size-4 shrink-0 text-violet-500" />
        必须完成当前高亮区域的实际操作，才能进入下一步；单独点击引导不会计入实验步骤。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MousePointerClick, Sparkles, X } from 'lucide-vue-next'

defineProps<{ open: boolean; stepNumber: number; total: number; title: string; instruction: string }>()
defineEmits<{ close: [] }>()
</script>
