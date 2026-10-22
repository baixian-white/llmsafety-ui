<template>
  <section class="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 dark:border-cyan-500/20 dark:bg-cyan-950/20" aria-label="安全防御策略">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 class="flex items-center gap-2 text-sm font-black text-cyan-950 dark:text-cyan-100"><ShieldCheck class="size-4" /> 安全防御策略 <span class="rounded-full bg-cyan-600 px-2 py-0.5 text-[11px] text-white">已开启 {{ selectedIds.length }} / 3 层</span></h4>
        <p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">点击开关组合防御。修改后重新发送，查看各层检测和最终回答。</p>
      </div>
      <div class="flex gap-3 text-xs font-bold text-cyan-700 dark:text-cyan-200">
        <button type="button" :disabled="disabled" class="rounded px-1 py-2 hover:underline disabled:opacity-40" @click="$emit('change', [...availableIds])">全部开启</button>
        <button type="button" :disabled="disabled" class="rounded px-1 py-2 hover:underline disabled:opacity-40" @click="$emit('change', [])">全部关闭</button>
      </div>
    </div>
    <div class="mt-4 grid gap-3 md:grid-cols-3">
      <label v-for="layer in defenseLayers[category]" :key="layer.id" class="flex min-w-0 cursor-pointer flex-col rounded-xl border p-4 transition" :class="selectedIds.includes(layer.id) ? 'border-cyan-500 bg-white shadow-sm dark:bg-cyan-950/50' : 'border-slate-200 bg-white/60 dark:border-white/10 dark:bg-slate-950/40'">
        <span class="flex items-center gap-2">
          <span class="flex size-7 items-center justify-center rounded-lg bg-cyan-100 text-xs font-black text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-200">{{ layer.id + 1 }}</span>
          <span class="flex-1 text-sm font-bold text-slate-800 dark:text-slate-100">{{ layer.name }}</span>
          <input type="checkbox" role="switch" :aria-label="`${layer.name}防御`" :checked="selectedIds.includes(layer.id)" :disabled="disabled || !availableIds.includes(layer.id)" class="peer sr-only" @change="toggle(layer.id)" />
          <span class="flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition peer-focus-visible:ring-4 peer-focus-visible:ring-cyan-500/25 peer-disabled:opacity-40" :class="selectedIds.includes(layer.id) ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'"><span class="size-5 rounded-full bg-white shadow transition-transform" :class="selectedIds.includes(layer.id) ? 'translate-x-4' : ''"></span></span>
        </span>
        <span class="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ layer.description }}</span>
        <span class="mt-3 text-[11px] font-bold" :class="selectedIds.includes(layer.id) ? 'text-cyan-700 dark:text-cyan-200' : 'text-slate-400'">{{ !availableIds.includes(layer.id) ? '此案例暂无该层记录' : selectedIds.includes(layer.id) ? '已开启' : '已关闭' }}</span>
      </label>
    </div>
    <p v-if="!selectedIds.length" class="mt-3 text-xs leading-5 text-amber-700 dark:text-amber-300">当前为无防御对照。完成本阶段需至少开启一层防御并重新测试。</p>
  </section>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
import { defenseLayers, normalizeDefenseIds } from './defenseLayers'
import type { SourceCaseCategory } from './types'

const props = defineProps<{ category: SourceCaseCategory; selectedIds: number[]; availableIds: number[]; disabled: boolean }>()
const emit = defineEmits<{ change: [ids: number[]] }>()
const toggle = (id: number) => emit('change', normalizeDefenseIds(props.selectedIds.includes(id) ? props.selectedIds.filter((item) => item !== id) : [...props.selectedIds, id]))
</script>
