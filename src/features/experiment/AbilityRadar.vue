<template>
  <div class="grid items-center gap-6 md:grid-cols-[minmax(260px,1fr)_minmax(220px,.8fr)]">
    <div class="relative mx-auto aspect-square w-full max-w-[360px]">
      <svg viewBox="0 0 320 320" class="size-full overflow-visible" role="img" aria-label="五维能力画像雷达图">
        <g transform="translate(160 160)">
          <polygon v-for="level in [1, .75, .5, .25]" :key="level" :points="polygonFor(Array(5).fill(level * 100))" fill="none" stroke="currentColor" class="text-slate-200 dark:text-slate-700" stroke-width="1" />
          <line v-for="(_, index) in profile" :key="`axis-${index}`" x1="0" y1="0" :x2="axisPoint(index).x" :y2="axisPoint(index).y" stroke="currentColor" class="text-slate-200 dark:text-slate-700" />
          <polygon :points="polygonFor(profile.map((item) => item.score))" fill="rgba(124,58,237,.24)" stroke="#7c3aed" stroke-width="3" />
          <circle v-for="(point, index) in scorePoints" :key="index" :cx="point.x" :cy="point.y" r="4" fill="#7c3aed" stroke="white" stroke-width="2" />
          <text v-for="(item, index) in profile" :key="item.id" :x="labelPoint(index).x" :y="labelPoint(index).y" text-anchor="middle" dominant-baseline="middle" class="fill-slate-600 text-[12px] font-semibold dark:fill-slate-300">{{ item.label }}</text>
        </g>
      </svg>
    </div>
    <div class="space-y-3">
      <div v-for="item in profile" :key="item.id" class="rounded-xl border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-semibold text-slate-800 dark:text-white">{{ item.label }}</span>
          <span class="text-lg font-black text-violet-600 dark:text-violet-300">{{ item.score }}</span>
        </div>
        <p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AbilityProfile } from './types'

const props = defineProps<{ profile: AbilityProfile }>()
const radius = 112
const angle = (index: number) => -Math.PI / 2 + index * (Math.PI * 2 / 5)
const point = (index: number, value: number, customRadius = radius) => ({
  x: Math.cos(angle(index)) * customRadius * (value / 100),
  y: Math.sin(angle(index)) * customRadius * (value / 100),
})
const polygonFor = (values: number[]) => values.map((value, index) => {
  const p = point(index, value)
  return `${p.x},${p.y}`
}).join(' ')
const axisPoint = (index: number) => point(index, 100)
const labelPoint = (index: number) => point(index, 100, 143)
const scorePoints = computed(() => props.profile.map((item, index) => point(index, item.score)))
</script>
