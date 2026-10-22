<template>
  <ExperimentLayout>
    <section class="experiment-card">
      <span class="experiment-section-kicker">实验说明</span>
      <h1 class="mt-3 text-3xl font-black text-slate-950 dark:text-white">完成两类测试，再开启防御复测</h1>
      <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">直接进入实验操作台即可开始。选择模型和案例，发送提示词，观察回答并保存证据。完成防御复测后自动汇总结果与报告。</p>
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <article v-for="stage in experimentStages" :key="stage.id" class="rounded-2xl border border-slate-200 p-5 dark:border-white/10">
          <span class="text-sm font-bold text-violet-600">{{ stage.index }} / {{ experimentStages.length }}</span>
          <h2 class="mt-2 font-bold text-slate-900 dark:text-white">{{ stage.title }}</h2>
          <p class="mt-2 text-sm leading-6 text-slate-500">{{ stage.description }}</p>
        </article>
      </div>
      <p class="mt-6 text-xs leading-6 text-slate-500">回答与防御记录来自原平台预设案例，用于可重复的教学仿真。实验进度保存在当前浏览器。</p>
      <RouterLink to="/experiment/run" class="experiment-primary-action mt-6">进入实验操作台 <ArrowRight class="size-4" /></RouterLink>
    </section>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import { experimentStages } from '@/features/experiment/catalog'
</script>
