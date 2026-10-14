<template>
  <div class="experiment-shell min-h-screen text-slate-800 transition-colors dark:text-slate-100">
    <div class="experiment-orb experiment-orb-one" aria-hidden="true"></div>
    <div class="experiment-orb experiment-orb-two" aria-hidden="true"></div>

    <main class="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-16 pt-20 sm:px-6 lg:px-8">
      <nav class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60" aria-label="虚拟仿真实验导航">
        <RouterLink to="/experiment" class="flex items-center gap-3">
          <span class="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
            <FlaskConical class="size-5" />
          </span>
          <span>
            <span class="block text-sm font-semibold text-slate-900 dark:text-white">大模型安全虚拟仿真实验</span>
            <span class="block text-xs text-slate-500 dark:text-slate-400">未来信息 · 综合设计型</span>
          </span>
        </RouterLink>
        <div class="flex flex-wrap items-center gap-1 text-sm">
          <RouterLink v-for="item in links" :key="item.to" :to="item.to" class="experiment-subnav-link" :class="{ active: route.path === item.to }">
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>

      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { FlaskConical } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()
const links = [
  { to: '/experiment', label: '实验概览' },
  { to: '/experiment/prepare', label: '实验准备' },
  { to: '/experiment/run', label: '实验操作' },
  { to: '/experiment/result', label: '实验结果' },
  { to: '/experiment/report', label: '实验报告' },
  { to: '/experiment/dashboard', label: '教师看板' },
]
</script>
