<template>
  <ExperimentLayout>
    <div class="grid gap-6 xl:grid-cols-[.72fr_1.28fr]">
      <aside class="space-y-6">
        <section class="experiment-card">
          <span class="experiment-section-kicker">实验任务书</span>
          <h1 class="mt-3 text-3xl font-black text-slate-950 dark:text-white">准备一次可复现的<br />大模型安全评测</h1>
          <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">你将作为大模型安全评测人员，对一个仿真模型完成风险识别、红队测试、防御加固、复测比较与安全结论。</p>
          <div class="mt-6 space-y-3">
            <div v-for="item in taskFacts" :key="item.label" class="flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/5">
              <component :is="item.icon" class="mt-0.5 size-4 shrink-0 text-violet-500" />
              <div><p class="text-xs text-slate-400">{{ item.label }}</p><p class="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-100">{{ item.value }}</p></div>
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-500/20 dark:bg-amber-950/20">
          <div class="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-200"><TriangleAlert class="size-5" /> 仿真与伦理边界</div>
          <ul class="mt-3 space-y-2 text-sm leading-6 text-amber-900/80 dark:text-amber-100/80">
            <li>• 模型响应来自预设案例与确定性规则，不连接真实模型。</li>
            <li>• 攻击载荷已经脱敏，不包含真实密钥、隐私或可直接滥用细节。</li>
            <li>• 实验数据仅保存在当前浏览器，可由学生主动清除。</li>
          </ul>
        </section>
      </aside>

      <section class="experiment-card">
        <div class="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/70 pb-5 dark:border-white/10">
          <div>
            <span class="experiment-section-kicker">实验前测 · 不计入32步</span>
            <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">建立初始知识水平记录</h2>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">完成8道题后，知识库将根据薄弱项推荐学习主题。</p>
          </div>
          <span class="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">{{ answeredCount }} / {{ pretestQuestions.length }}</span>
        </div>

        <div class="mt-6 space-y-6">
          <article v-for="(question, index) in pretestQuestions" :key="question.id" class="rounded-2xl border border-slate-200/80 p-4 dark:border-white/10">
            <div class="flex gap-3">
              <span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-black text-white dark:bg-white dark:text-slate-900">{{ index + 1 }}</span>
              <div class="min-w-0 flex-1">
                <h3 class="font-semibold leading-6 text-slate-900 dark:text-white">{{ question.question }}</h3>
                <div class="mt-3 grid gap-2 sm:grid-cols-3">
                  <button v-for="answer in question.options" :key="answer.value" class="rounded-xl border px-3 py-2.5 text-left text-sm transition" :class="state.pretestAnswers[question.id] === answer.value ? 'border-violet-500 bg-violet-50 text-violet-800 ring-2 ring-violet-500/10 dark:bg-violet-500/15 dark:text-violet-100' : 'border-slate-200 text-slate-600 hover:border-violet-300 dark:border-white/10 dark:text-slate-300'" @click="setPretestAnswer(question.id, answer.value)">
                    {{ answer.label }}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div v-if="state.pretestScore !== null" class="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-950/20">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div><p class="text-sm font-bold text-emerald-800 dark:text-emerald-200">前测得分 {{ state.pretestScore }} / 100</p><p class="mt-1 text-xs text-emerald-700/80 dark:text-emerald-200/70">推荐在实验过程中重点关注以下知识。</p></div>
            <CheckCircle2 class="size-8 text-emerald-500" />
          </div>
          <div class="mt-4 flex flex-wrap gap-2"><span v-for="topic in weakTopics" :key="topic" class="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm dark:bg-slate-900 dark:text-emerald-200">{{ topic }}</span></div>
        </div>

        <div class="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-5 dark:border-white/10">
          <p v-if="!allAnswered" class="text-sm text-amber-600 dark:text-amber-300">请完成全部前测题目后进入实验。</p>
          <p v-else class="text-sm text-slate-500 dark:text-slate-400">前测用于知识推荐，不影响实验总分。</p>
          <button class="experiment-primary-action disabled:cursor-not-allowed disabled:opacity-45" :disabled="!allAnswered" @click="finishPrepare">
            {{ state.pretestScore === null ? '提交前测并进入实验' : '进入实验操作台' }} <ArrowRight class="size-5" />
          </button>
        </div>
      </section>
    </div>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, CheckCircle2, Clock3, Database, FlaskConical, TriangleAlert, Users } from 'lucide-vue-next'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import { pretestQuestions } from '@/features/experiment/catalog'
import { useExperiment } from '@/features/experiment/useExperiment'

const router = useRouter()
const { state, setPretestAnswer, submitPretest, startExperiment } = useExperiment()
const answeredCount = computed(() => Object.keys(state.value.pretestAnswers).length)
const allAnswered = computed(() => answeredCount.value === pretestQuestions.length)
const weakTopics = computed(() => {
  const wrong = pretestQuestions.filter((question) => state.value.pretestAnswers[question.id] !== question.answer).map((question) => question.topic)
  return wrong.length ? [...new Set(wrong)] : ['综合攻防策略', '安全—可用性权衡']
})
const taskFacts = [
  { label: '适用专业', value: '网络空间安全、信息安全本科', icon: Users },
  { label: '实验结构', value: '七阶段 · 32个实质操作', icon: FlaskConical },
  { label: '建议时长', value: '2学时（约90分钟）', icon: Clock3 },
  { label: '实验数据', value: '预设案例库与规则驱动仿真', icon: Database },
]
const finishPrepare = async () => {
  if (!allAnswered.value) return
  if (state.value.pretestScore === null) submitPretest()
  startExperiment()
  await router.push('/experiment/run')
}
</script>
