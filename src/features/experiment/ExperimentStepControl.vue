<template>
  <div class="space-y-3">
    <template v-if="step.type === 'single'">
      <button
        v-for="item in step.options"
        :key="item.value"
        type="button"
        class="experiment-choice"
        :class="{ selected: modelValue === item.value }"
        :aria-pressed="modelValue === item.value"
        @click="emit('update:modelValue', item.value)"
      >
        <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2" :class="modelValue === item.value ? 'border-violet-600 bg-violet-600' : 'border-slate-300 dark:border-slate-600'">
          <span v-if="modelValue === item.value" class="size-2 rounded-full bg-white"></span>
        </span>
        <span class="text-left">
          <span class="block font-semibold text-slate-900 dark:text-white">{{ item.label }}</span>
          <span class="mt-1 block text-sm leading-5 text-slate-500 dark:text-slate-400">{{ item.description }}</span>
        </span>
      </button>
    </template>

    <template v-else-if="step.type === 'multi'">
      <button
        v-for="item in step.options"
        :key="item.value"
        type="button"
        class="experiment-choice"
        :class="{ selected: selectedValues.includes(item.value) }"
        :aria-pressed="selectedValues.includes(item.value)"
        @click="toggleValue(item.value)"
      >
        <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2" :class="selectedValues.includes(item.value) ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 dark:border-slate-600'">
          <Check v-if="selectedValues.includes(item.value)" class="size-3" stroke-width="3" />
        </span>
        <span class="text-left">
          <span class="block font-semibold text-slate-900 dark:text-white">{{ item.label }}</span>
          <span class="mt-1 block text-sm leading-5 text-slate-500 dark:text-slate-400">{{ item.description }}</span>
        </span>
      </button>
      <p class="text-xs text-slate-500 dark:text-slate-400">请选择 {{ step.minSelections ?? 1 }}—{{ step.maxSelections ?? step.options?.length }} 项，当前已选择 {{ selectedValues.length }} 项。</p>
    </template>

    <template v-else-if="step.type === 'range'">
      <div class="rounded-2xl border border-violet-200 bg-violet-50/70 p-5 dark:border-violet-500/20 dark:bg-violet-950/30">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">当前参数</p>
            <p class="mt-1 text-4xl font-black tracking-tight text-violet-600 dark:text-violet-300">{{ rangeValue }}<span class="ml-1 text-lg">{{ step.unit }}</span></p>
          </div>
          <p class="rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">建议区间 {{ step.idealMin }}—{{ step.idealMax }}{{ step.unit }}</p>
        </div>
        <input
          class="mt-6 w-full accent-violet-600"
          type="range"
          :min="step.min"
          :max="step.max"
          :step="step.rangeStep"
          :value="rangeValue"
          :aria-label="step.title"
          @input="updateRange"
        />
        <div class="mt-2 flex justify-between text-xs text-slate-400"><span>{{ step.min }}{{ step.unit }}</span><span>{{ step.max }}{{ step.unit }}</span></div>
      </div>
    </template>

    <template v-else>
      <textarea
        class="min-h-40 w-full resize-y rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm leading-7 text-slate-800 shadow-inner outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100"
        :placeholder="step.placeholder"
        :value="typeof modelValue === 'string' ? modelValue : ''"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      ></textarea>
      <div class="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>至少 {{ step.minLength }} 字，建议覆盖：{{ step.recommendedKeywords?.join('、') }}</span>
        <span>{{ typeof modelValue === 'string' ? modelValue.trim().length : 0 }} 字</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import type { ExperimentStep, StepAnswer } from './types'

const props = defineProps<{ step: ExperimentStep; modelValue?: StepAnswer }>()
const emit = defineEmits<{ 'update:modelValue': [value: StepAnswer] }>()

const selectedValues = computed(() => Array.isArray(props.modelValue) ? props.modelValue : [])
const rangeValue = computed(() => typeof props.modelValue === 'number' ? props.modelValue : (props.step.idealMin ?? props.step.min ?? 0))

const toggleValue = (value: string) => {
  const current = [...selectedValues.value]
  const index = current.indexOf(value)
  if (index >= 0) current.splice(index, 1)
  else if (current.length < (props.step.maxSelections ?? props.step.options?.length ?? 99)) current.push(value)
  emit('update:modelValue', current)
}

const updateRange = (event: Event) => emit('update:modelValue', Number((event.target as HTMLInputElement).value))
</script>
