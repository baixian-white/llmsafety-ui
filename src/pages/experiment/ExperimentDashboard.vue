<template>
  <ExperimentLayout>
    <div class="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div><div class="flex items-center gap-2"><span class="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-200">教学演示数据</span><span class="text-xs text-slate-400">不代表真实教学人数或成效</span></div><h1 class="mt-3 text-3xl font-black text-slate-950 dark:text-white">教师教学数据看板</h1><p class="mt-2 text-sm text-slate-500 dark:text-slate-400">用于展示未来的过程追踪、学习分析和教学干预能力。</p></div>
      <RouterLink to="/experiment" class="experiment-secondary-action"><ArrowLeft class="size-4" /> 返回实验首页</RouterLink>
    </div>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article v-for="item in summary" :key="item.label" class="experiment-card !p-5"><div class="flex items-center justify-between"><span class="experiment-icon !size-10"><component :is="item.icon" class="size-5" /></span><span class="text-xs font-semibold" :class="item.trendClass">{{ item.trend }}</span></div><p class="mt-5 text-3xl font-black text-slate-950 dark:text-white">{{ item.value }}</p><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ item.label }}</p></article>
    </section>

    <section class="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
      <article class="experiment-card">
        <div class="flex items-center justify-between"><div><span class="experiment-section-kicker">阶段表现</span><h2 class="mt-2 text-xl font-black text-slate-950 dark:text-white">三个阶段平均得分率</h2></div><BarChart3 class="size-6 text-violet-500" /></div>
        <div class="mt-6 space-y-4"><div v-for="item in stageAverages" :key="item.label"><div class="mb-2 flex justify-between text-sm"><span class="font-medium text-slate-700 dark:text-slate-200">{{ item.label }}</span><span class="text-slate-500">{{ item.value }}%</span></div><div class="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800"><div class="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400" :style="{ width: `${item.value}%` }"></div></div></div></div>
      </article>
      <article class="experiment-card">
        <div class="flex items-center justify-between"><div><span class="experiment-section-kicker">风险识别</span><h2 class="mt-2 text-xl font-black text-slate-950 dark:text-white">风险类型判断正确率</h2></div><ScanSearch class="size-6 text-cyan-500" /></div>
        <div class="mt-6 space-y-4"><div v-for="item in riskAccuracy" :key="item.label" class="flex items-center gap-4"><div class="relative flex size-14 shrink-0 items-center justify-center rounded-full" :style="{ background: `conic-gradient(${item.color} ${item.value * 3.6}deg, rgba(148,163,184,.16) 0)` }"><span class="flex size-10 items-center justify-center rounded-full bg-white text-xs font-black dark:bg-slate-950">{{ item.value }}%</span></div><div><p class="font-semibold text-slate-800 dark:text-slate-100">{{ item.label }}</p><p class="mt-1 text-xs text-slate-400">{{ item.note }}</p></div></div></div>
      </article>
    </section>

    <section class="mt-5 grid gap-5 xl:grid-cols-[.78fr_1.22fr]">
      <article class="experiment-card">
        <span class="experiment-section-kicker">高频薄弱点</span><h2 class="mt-2 text-xl font-black text-slate-950 dark:text-white">需要教师重点讲解</h2>
        <div class="mt-5 space-y-3"><div v-for="(item, index) in commonErrors" :key="item.label" class="rounded-2xl border border-slate-200 p-4 dark:border-white/10"><div class="flex justify-between gap-3"><div class="flex gap-3"><span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-xs font-black text-rose-700 dark:bg-rose-500/15 dark:text-rose-200">{{ index + 1 }}</span><div><p class="font-semibold text-slate-800 dark:text-slate-100">{{ item.label }}</p><p class="mt-1 text-xs text-slate-400">{{ item.advice }}</p></div></div><span class="text-sm font-black text-rose-500">{{ item.rate }}%</span></div></div></div>
      </article>
      <article class="experiment-card overflow-hidden !p-0">
        <div class="border-b border-slate-200 px-6 py-5 dark:border-white/10"><div class="flex items-center justify-between"><div><span class="experiment-section-kicker">过程追踪</span><h2 class="mt-2 text-xl font-black text-slate-950 dark:text-white">演示学生实验记录</h2></div><Users class="size-6 text-violet-500" /></div></div>
        <div class="overflow-x-auto"><table class="w-full min-w-[700px] text-left text-sm"><thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-400 dark:bg-white/5"><tr><th class="px-6 py-3">学生</th><th class="px-4 py-3">进度</th><th class="px-4 py-3">成绩</th><th class="px-4 py-3">状态</th><th class="px-4 py-3">当前薄弱点</th><th class="px-6 py-3">记录</th></tr></thead><tbody class="divide-y divide-slate-200 dark:divide-white/10"><tr v-for="student in demoStudents" :key="student.id" class="hover:bg-violet-50/50 dark:hover:bg-violet-500/5"><td class="px-6 py-4"><p class="font-semibold text-slate-800 dark:text-slate-100">{{ student.name }}</p><p class="text-xs text-slate-400">{{ student.id }}</p></td><td class="px-4 py-4"><div class="flex items-center gap-2"><div class="h-1.5 w-20 rounded-full bg-slate-100 dark:bg-slate-800"><div class="h-full rounded-full bg-violet-500" :style="{ width: `${student.progress}%` }"></div></div><span class="text-xs">{{ student.progress }}%</span></div></td><td class="px-4 py-4 font-black">{{ student.score || '—' }}</td><td class="px-4 py-4"><span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusClass(student.status)">{{ student.status }}</span></td><td class="px-4 py-4 text-slate-500 dark:text-slate-400">{{ student.weakness }}</td><td class="px-6 py-4"><button class="font-semibold text-violet-600 hover:underline dark:text-violet-300" @click="selectedStudent = student.name">查看轨迹</button></td></tr></tbody></table></div>
        <div v-if="selectedStudent" class="border-t border-violet-200 bg-violet-50 px-6 py-4 text-sm text-violet-800 dark:border-violet-500/20 dark:bg-violet-950/20 dark:text-violet-100">已选择 {{ selectedStudent }}：演示轨迹包含每步选项、得分、用时和提示次数。正式教学版需在取得真实授权后连接学生账号和服务端数据库。</div>
      </article>
    </section>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, BarChart3, CheckCircle2, Clock3, ScanSearch, Target, Users } from 'lucide-vue-next'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import { demoStudents } from '@/features/experiment/catalog'

const selectedStudent = ref('')
const summary = [
  { label: '演示学生数', value: '36', trend: '演示数据', trendClass: 'text-cyan-500', icon: Users },
  { label: '实验完成率', value: '83%', trend: '+12%', trendClass: 'text-emerald-500', icon: CheckCircle2 },
  { label: '平均成绩', value: '84.6', trend: '+4.8', trendClass: 'text-emerald-500', icon: Target },
  { label: '平均实验用时', value: '20min', trend: '演示数据', trendClass: 'text-violet-500', icon: Clock3 },
]
const stageAverages = [
  { label: '越狱攻击测试', value: 82 }, { label: '幻觉风险测试', value: 76 }, { label: '安全防御与复测', value: 80 },
]
const riskAccuracy = [
  { label: '越狱攻击', value: 89, color: '#7c3aed', note: '角色扮演证据判断较稳定' },
  { label: '事实幻觉', value: 74, color: '#f59e0b', note: '虚构引用仍易被漏标' },
]
const commonErrors = [
  { label: '只看已开启，忽略防御结果', rate: 42, advice: '结合各层检测与最终回答作出判定。' },
  { label: '未标记虚构引用', rate: 36, advice: '强化回答与证据逐项对照。' },
  { label: '更换案例后直接对比', rate: 31, advice: '保持模型、案例与提示词一致。' },
]
const statusClass = (status: string) => status === '已完成'
  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
  : status === '进行中'
    ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200'
    : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400'
</script>
