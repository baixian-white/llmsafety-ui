<template>
  <ExperimentLayout>
    <section class="experiment-hero overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 px-6 py-10 shadow-2xl shadow-violet-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 sm:px-10 lg:px-14 lg:py-16">
      <div class="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div class="mb-6 flex flex-wrap gap-2">
            <span class="experiment-chip"><Orbit class="size-3.5" /> 未来信息</span>
            <span class="experiment-chip"><Layers3 class="size-3.5" /> 综合设计型</span>
            <span class="experiment-chip"><GraduationCap class="size-3.5" /> 网络空间安全 / 信息安全</span>
          </div>
          <p class="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-violet-600 dark:text-violet-300">LLM Safety Virtual Simulation</p>
          <h1 class="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            大模型安全攻防与<br /><span class="text-grad">可信评测虚拟仿真实验</span>
          </h1>
          <p class="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            以大模型上线前安全测试流程为任务原型，通过预设案例与确定性仿真规则，完成越狱、幻觉、提示词注入、防御加固和复测评价，形成可追溯的安全评测报告。
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/experiment/prepare" class="experiment-primary-action">
              <PlayCircle class="size-5" /> {{ state.status === 'not-started' ? '开始实验' : '继续实验' }}
            </RouterLink>
            <RouterLink to="/experiment/dashboard" class="experiment-secondary-action">
              <LayoutDashboard class="size-5" /> 查看教师演示看板
            </RouterLink>
          </div>
          <p class="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            <Info class="mt-0.5 size-4 shrink-0 text-violet-500" />
            本实验全部模型响应为预设案例的虚拟仿真输出，不调用真实在线大模型；不同操作将产生不同反馈、指标与评分。
          </p>
        </div>

        <div class="relative mx-auto w-full max-w-xl">
          <div class="absolute -inset-8 rounded-full bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-cyan-400/20 blur-3xl"></div>
          <div class="relative rounded-[1.8rem] border border-white/70 bg-slate-950 p-5 text-white shadow-2xl dark:border-white/10">
            <div class="mb-5 flex items-center justify-between">
              <div class="flex gap-1.5"><span class="size-2.5 rounded-full bg-rose-400"></span><span class="size-2.5 rounded-full bg-amber-400"></span><span class="size-2.5 rounded-full bg-emerald-400"></span></div>
              <span class="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">虚拟仿真操作台</span>
            </div>
            <div class="grid gap-3 sm:grid-cols-[.7fr_1.3fr]">
              <div class="space-y-2 rounded-2xl bg-white/5 p-3">
                <div v-for="(stage, index) in experimentStages" :key="stage.id" class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs" :class="index === 2 ? 'bg-violet-500/20 text-violet-200' : 'text-slate-400'">
                  <span class="flex size-5 items-center justify-center rounded-full text-[10px]" :class="index < 2 ? 'bg-emerald-500/20 text-emerald-300' : index === 2 ? 'bg-violet-500 text-white' : 'bg-white/5'">{{ index < 2 ? '✓' : index + 1 }}</span>{{ stage.shortTitle }}
                </div>
              </div>
              <div class="rounded-2xl bg-white/[.07] p-4">
                <div class="flex items-center justify-between text-xs text-slate-400"><span>越狱攻击测试</span><span>12 / 32</span></div>
                <div class="mt-2 h-1.5 rounded-full bg-white/10"><div class="h-full w-[38%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"></div></div>
                <div class="mt-4 rounded-xl border border-violet-400/30 bg-violet-500/10 p-3">
                  <p class="text-xs font-semibold text-violet-200">当前任务 · 判定攻击是否成功</p>
                  <p class="mt-2 text-[11px] leading-5 text-slate-400">依据模型响应中的护栏失效证据完成判断，而不是只看是否出现拒答字样。</p>
                </div>
                <div class="mt-3 grid grid-cols-3 gap-2">
                  <div v-for="label in ['攻击成功', '部分成功', '攻击失败']" :key="label" class="rounded-lg border border-white/10 bg-white/5 px-2 py-3 text-center text-[10px] text-slate-400 first:border-violet-400/50 first:bg-violet-500/15 first:text-violet-200">{{ label }}</div>
                </div>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-3">
              <div v-for="stat in heroStats" :key="stat.label" class="rounded-xl bg-white/5 p-3 text-center"><p class="text-xl font-black">{{ stat.value }}</p><p class="mt-1 text-[10px] text-slate-400">{{ stat.label }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-8 grid gap-4 md:grid-cols-3">
      <article v-for="item in outcomes" :key="item.title" class="experiment-card">
        <span class="experiment-icon"><component :is="item.icon" class="size-5" /></span>
        <h2 class="mt-5 text-lg font-bold text-slate-900 dark:text-white">{{ item.title }}</h2>
        <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{{ item.description }}</p>
      </article>
    </section>

    <section class="mt-8 experiment-card !p-0 overflow-hidden">
      <div class="border-b border-slate-200/70 px-6 py-5 dark:border-white/10 sm:px-8">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">Seven-stage route</p>
        <h2 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">七阶段、32个实质性交互操作</h2>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">每一步都要求选择、配置、判断或提交证据，页面加载与单纯点击“下一步”不计入实验步骤。</p>
      </div>
      <div class="grid gap-px bg-slate-200/70 dark:bg-white/10 md:grid-cols-2 xl:grid-cols-7">
        <article v-for="stage in experimentStages" :key="stage.id" class="relative bg-white/90 p-5 dark:bg-slate-950/90">
          <div class="flex items-center justify-between"><span class="flex size-9 items-center justify-center rounded-xl text-sm font-black text-white" :style="{ backgroundColor: stage.accent }">{{ stage.index }}</span><span class="text-xs font-semibold text-slate-400">{{ stage.maxScore }}分</span></div>
          <h3 class="mt-4 font-bold text-slate-900 dark:text-white">{{ stage.title }}</h3>
          <p class="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ stage.description }}</p>
          <p class="mt-4 text-xs font-semibold text-violet-600 dark:text-violet-300">{{ stageStepCount(stage.id) }} 个操作</p>
        </article>
      </div>
    </section>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { BrainCircuit, FileCheck2, GraduationCap, Info, Layers3, LayoutDashboard, Orbit, PlayCircle, Route, ShieldCheck } from 'lucide-vue-next'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import { experimentStages, experimentSteps } from '@/features/experiment/catalog'
import { useExperiment } from '@/features/experiment/useExperiment'
import type { StageId } from '@/features/experiment/types'

const { state } = useExperiment()
const heroStats = [
  { value: '7', label: '实验阶段' },
  { value: '32', label: '实质操作' },
  { value: '100', label: '过程与结果总分' },
]
const outcomes = [
  { title: '攻防测试能力', description: '从攻击目标、样本和参数出发，复现越狱、幻觉与提示词注入风险。', icon: ShieldCheck },
  { title: '证据分析能力', description: '依据仿真响应和参考材料形成可追溯的风险判断，而非凭主观印象评分。', icon: BrainCircuit },
  { title: '综合决策能力', description: '比较防御收益与正常内容误拦截，输出风险等级、测试结论和整改建议。', icon: FileCheck2 },
]
const stageStepCount = (stageId: StageId) => experimentSteps.filter((step) => step.stageId === stageId).length
</script>
