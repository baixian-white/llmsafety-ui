<template>
  <ExperimentLayout>
    <div v-if="restoreWarning" class="mb-5 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-950/30 dark:text-amber-100">
      <TriangleAlert class="size-5 shrink-0" /> {{ restoreWarning }}
    </div>

    <header class="experiment-card mb-5 !p-4 sm:!p-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex min-w-0 items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 font-black text-white">{{ currentStage.index }}</span>
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">{{ currentStage.title }}</p>
            <h1 class="truncate text-lg font-black text-slate-950 dark:text-white sm:text-xl">{{ currentStep.title }}</h1>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="experiment-stat-pill"><Clock3 class="size-4" /> {{ formattedTime }}</span>
          <span class="experiment-stat-pill"><ListChecks class="size-4" /> {{ currentStep.number }} / {{ experimentSteps.length }}</span>
          <span class="experiment-stat-pill"><Award class="size-4" /> {{ score.total }} 分</span>
          <button class="experiment-stat-pill hover:border-violet-300 hover:text-violet-600 dark:hover:text-violet-300" @click="setGuideEnabled(true)"><CircleHelp class="size-4" /> 实验指导</button>
        </div>
      </div>
      <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div class="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 transition-all duration-500" :style="{ width: `${Math.max(progress, currentStep.number / experimentSteps.length * 100)}%` }"></div></div>
    </header>

    <div class="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)_310px]">
      <aside class="experiment-card h-fit !p-3 xl:sticky xl:top-20">
        <p class="px-2 pb-3 pt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">实验阶段</p>
        <div class="flex gap-2 overflow-x-auto pb-1 xl:block xl:space-y-1 xl:overflow-visible">
          <button
            v-for="stage in experimentStages"
            :key="stage.id"
            class="flex min-w-[170px] items-center gap-3 rounded-xl px-3 py-3 text-left transition xl:w-full xl:min-w-0"
            :class="stage.id === currentStage.id ? 'bg-violet-50 text-violet-800 dark:bg-violet-500/15 dark:text-violet-100' : stageCompleted(stage.id) ? 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5' : 'cursor-not-allowed text-slate-400'"
            :disabled="!canVisitStage(stage.id)"
            @click="visitStage(stage.id)"
          >
            <span class="flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-black text-white" :style="{ backgroundColor: stage.id === currentStage.id || stageCompleted(stage.id) ? stage.accent : '#94a3b8' }">
              <Check v-if="stageCompleted(stage.id)" class="size-4" />
              <span v-else>{{ stage.index }}</span>
            </span>
            <span class="min-w-0"><span class="block truncate text-sm font-semibold">{{ stage.title }}</span><span class="mt-0.5 block text-[11px] opacity-60">{{ stageProgress(stage.id) }}</span></span>
          </button>
        </div>
        <div class="mt-4 rounded-xl bg-slate-950 p-4 text-white dark:bg-black/40">
          <p class="text-[11px] uppercase tracking-wider text-slate-400">本地自动保存</p>
          <p class="mt-2 flex items-center gap-2 text-xs text-emerald-300"><CloudCog class="size-4" /> 已保存至当前浏览器</p>
        </div>
      </aside>

      <section class="min-w-0 space-y-5">
        <ExperimentGuide
          :open="state.guideEnabled"
          :step-number="currentStep.number"
          :total="experimentSteps.length"
          :title="currentStep.title"
          :instruction="currentStep.instruction"
          @close="setGuideEnabled(false)"
        />

        <article class="experiment-card relative overflow-hidden" :class="state.guideEnabled ? 'ring-4 ring-violet-500/10' : ''">
          <div class="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-gradient-to-bl from-violet-500/10 to-transparent"></div>
          <div class="relative">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span class="experiment-section-kicker">实质操作 {{ currentStep.number }}</span>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ currentStep.title }}</h2>
                <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{{ currentStep.instruction }}</p>
              </div>
              <span class="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">{{ currentStep.weight }} 分</span>
            </div>

            <div class="mt-6">
              <ExperimentConversationWorkbench
                v-if="currentStep.conversationStage"
                :key="currentStep.id"
                :stage="currentStep.conversationStage"
                :initial-model-id="selectedExperimentModel"
                :existing-run="currentConversation"
                :retest-source="currentStep.conversationStage === 'defense' ? latestAttackRun : undefined"
                :defense-layer-count="defenseLayerCount"
                @model-change="syncExperimentModel"
                @run="saveConversationRun"
                @assessment="saveConversationAssessment"
                @reset="resetConversationRun"
              />
              <ExperimentStepControl v-else :step="currentStep" :model-value="currentAnswer" @update:model-value="updateAnswer" />
            </div>

            <div v-if="pendingFeedback" class="mt-6 rounded-2xl border p-4" :class="feedbackClass">
              <div class="flex items-start gap-3">
                <CheckCircle2 v-if="pendingFeedback.severity === 'success'" class="mt-0.5 size-5 shrink-0" />
                <Info v-else class="mt-0.5 size-5 shrink-0" />
                <div>
                  <div class="flex flex-wrap items-center gap-2"><h3 class="font-bold">{{ pendingFeedback.title }}</h3><span class="rounded-full bg-white/60 px-2 py-0.5 text-xs dark:bg-black/20">本步 {{ pendingFeedback.earnedPoints }} / {{ pendingFeedback.maxPoints }} 分</span></div>
                  <p class="mt-2 text-sm leading-6">{{ pendingFeedback.message }}</p>
                  <p class="mt-2 text-xs leading-5 opacity-80">知识提示：{{ pendingFeedback.knowledge }}</p>
                </div>
              </div>
            </div>

            <div class="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-5 dark:border-white/10">
              <button class="experiment-secondary-action !px-4 disabled:cursor-not-allowed disabled:opacity-40" :disabled="currentStep.number === 1" @click="back"><ArrowLeft class="size-4" /> 上一步</button>
              <div class="flex flex-wrap items-center gap-2">
                <button class="experiment-link-button" @click="showKnowledge = !showKnowledge"><BookOpen class="size-4" /> {{ showKnowledge ? '收起原理' : '查看原理' }}</button>
                <button class="experiment-link-button" @click="requestHint"><Lightbulb class="size-4" /> 使用提示（{{ state.hints[currentStep.id] ?? 0 }}）</button>
                <button class="experiment-primary-action disabled:cursor-not-allowed disabled:opacity-45" :disabled="!canCompleteCurrentStep" @click="submitStep">
                  {{ pendingFeedback ? (isLastStep ? '完成实验并查看结果' : '确认反馈并继续') : '完成当前操作' }} <ArrowRight class="size-4" />
                </button>
              </div>
            </div>
          </div>
        </article>

        <article v-if="showKnowledge" class="rounded-2xl border border-cyan-200 bg-cyan-50/80 p-5 dark:border-cyan-500/20 dark:bg-cyan-950/20">
          <div class="flex items-start gap-3"><BookMarked class="mt-0.5 size-5 shrink-0 text-cyan-600 dark:text-cyan-300" /><div><h3 class="font-bold text-cyan-900 dark:text-cyan-100">知识库辅助</h3><p class="mt-2 text-sm leading-6 text-cyan-900/75 dark:text-cyan-100/75">{{ currentStep.knowledge }}</p><p class="mt-2 text-xs text-cyan-700 dark:text-cyan-300">工作任务映射：{{ currentStep.taskMapping }}</p></div></div>
        </article>

        <article v-if="currentStage.id === 'defense'" class="experiment-card">
          <div class="flex items-center justify-between gap-3"><div><span class="experiment-section-kicker">实时复测预览</span><h2 class="mt-2 text-xl font-black text-slate-950 dark:text-white">策略变化将同时影响安全与可用性</h2></div><Gauge class="size-7 text-violet-500" /></div>
          <div class="mt-5"><MetricComparison :metrics="metrics" /></div>
        </article>
      </section>

      <aside class="space-y-5 xl:sticky xl:top-20 xl:h-fit">
        <section class="experiment-card !p-5">
          <p class="experiment-section-kicker">当前任务</p>
          <h2 class="mt-2 font-bold text-slate-900 dark:text-white">{{ currentStep.taskMapping }}</h2>
          <div class="mt-4 space-y-3 text-sm">
            <div class="rounded-xl bg-slate-50 p-3 dark:bg-white/5"><p class="text-xs text-slate-400">完成条件</p><p class="mt-1 font-medium text-slate-700 dark:text-slate-200">{{ completionHint }}</p></div>
            <div class="rounded-xl bg-slate-50 p-3 dark:bg-white/5"><p class="text-xs text-slate-400">知识作用</p><p class="mt-1 leading-6 text-slate-600 dark:text-slate-300">匹配当前操作的判据、原理与纠错建议。</p></div>
          </div>
        </section>
        <section class="experiment-card !p-5">
          <div class="flex items-center justify-between"><p class="experiment-section-kicker">操作记录</p><History class="size-4 text-slate-400" /></div>
          <div class="mt-4 space-y-3">
            <div v-for="item in recentCompleted" :key="item.id" class="flex gap-3 text-sm">
              <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"><Check class="size-3" /></span>
              <div><p class="font-medium text-slate-700 dark:text-slate-200">{{ item.title }}</p><p class="mt-0.5 text-xs text-slate-400">已记录并评分</p></div>
            </div>
            <p v-if="!recentCompleted.length" class="text-sm text-slate-400">完成操作后将在此显示最近记录。</p>
          </div>
        </section>
      </aside>
    </div>
  </ExperimentLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, Award, BookMarked, BookOpen, Check, CheckCircle2, CircleHelp, Clock3, CloudCog, Gauge, History, Info, Lightbulb, ListChecks, TriangleAlert } from 'lucide-vue-next'
import ExperimentGuide from '@/features/experiment/ExperimentGuide.vue'
import ExperimentLayout from '@/features/experiment/ExperimentLayout.vue'
import ExperimentStepControl from '@/features/experiment/ExperimentStepControl.vue'
import ExperimentConversationWorkbench from '@/features/experiment/ExperimentConversationWorkbench.vue'
import MetricComparison from '@/features/experiment/MetricComparison.vue'
import { experimentStages, experimentSteps } from '@/features/experiment/catalog'
import { getStepFeedback } from '@/features/experiment/engine'
import { useExperiment } from '@/features/experiment/useExperiment'
import type { ConversationRun, ConversationVerdict, StageId, StepAnswer, StepFeedback } from '@/features/experiment/types'

const router = useRouter()
const {
  state, restoreWarning, currentStep, currentStage, canCompleteCurrentStep, progress, score, metrics,
  startExperiment, setAnswer, completeCurrentStep, goBack, goToStep, useHint, setGuideEnabled, addElapsedSeconds,
  setConversationRun, updateConversationAssessment, clearConversationRun,
} = useExperiment()

const pendingFeedback = ref<StepFeedback | null>(null)
const showKnowledge = ref(false)
const currentAnswer = computed(() => state.value.answers[currentStep.value.id])
const isLastStep = computed(() => currentStep.value.number === experimentSteps.length)
const formattedTime = computed(() => {
  const seconds = state.value.elapsedSeconds
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
})
const currentConversation = computed(() => currentStep.value.conversationStage ? state.value.conversations[currentStep.value.conversationStage] : undefined)
const selectedExperimentModel = computed(() => typeof state.value.answers['model-profile'] === 'string' ? state.value.answers['model-profile'] : 'deepseek-r1')
const latestAttackRun = computed(() => state.value.conversations.injection || state.value.conversations.jailbreak || state.value.conversations.hallucination || state.value.conversations.baseline)
const defenseLayerCount = computed(() => {
  const configured = ['input-detection', 'prompt-protection', 'output-filter'].filter((id) => Boolean(state.value.answers[id])).length
  return Math.max(1, configured)
})
const recentCompleted = computed(() => state.value.completedStepIds.slice(-4).reverse().map((id) => experimentSteps.find((step) => step.id === id)).filter((step): step is typeof experimentSteps[number] => Boolean(step)))
const completionHint = computed(() => {
  if (currentStep.value.conversationStage) {
    const run = currentConversation.value
    if (!run) return '选择原平台案例，编辑提示词并点击发送'
    if (!run.messages.some((item) => item.role === 'assistant')) return '等待仿真模型完成响应'
    if (!run.selectedEvidence.length) return '从模型回复和防御链中至少选择1条证据'
    if (!run.verdict) return '根据证据作出安全判定并保存'
    return '对话、证据和安全判定均已记录'
  }
  if (currentStep.value.type === 'multi') return `选择 ${currentStep.value.minSelections ?? 1}—${currentStep.value.maxSelections ?? currentStep.value.options?.length} 项`
  if (currentStep.value.type === 'range') return '主动调整参数滑块并形成有效数值'
  if (currentStep.value.type === 'text') return `提交不少于 ${currentStep.value.minLength} 字的建议`
  return '选择一项并依据系统反馈确认判断'
})
const feedbackClass = computed(() => ({
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-100',
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-500/20 dark:bg-blue-950/20 dark:text-blue-100',
  warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-100',
  danger: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-100',
}[pendingFeedback.value?.severity ?? 'info']))

const updateAnswer = (answer: StepAnswer) => {
  pendingFeedback.value = null
  setAnswer(answer)
}
const syncExperimentModel = (modelId: string) => {
  if (!state.value.completedStepIds.includes('model-profile')) setAnswer(modelId, 'model-profile')
}
const saveConversationRun = (run: ConversationRun) => {
  pendingFeedback.value = null
  setConversationRun(run.stageId, run)
}
const saveConversationAssessment = (evidence: string[], verdict: ConversationVerdict) => {
  const stage = currentStep.value.conversationStage
  if (!stage) return
  pendingFeedback.value = null
  updateConversationAssessment(stage, evidence, verdict)
}
const resetConversationRun = () => {
  const stage = currentStep.value.conversationStage
  if (!stage) return
  pendingFeedback.value = null
  clearConversationRun(stage)
}
const requestHint = () => {
  useHint()
  showKnowledge.value = true
}
const submitStep = async () => {
  if (!canCompleteCurrentStep.value) return
  if (!pendingFeedback.value) {
    pendingFeedback.value = getStepFeedback(currentStep.value, currentAnswer.value!)
    return
  }
  const last = isLastStep.value
  if (!completeCurrentStep()) return
  pendingFeedback.value = null
  showKnowledge.value = false
  if (last) await router.push('/experiment/result')
}
const back = () => { pendingFeedback.value = null; goBack() }
const stageSteps = (stageId: StageId) => experimentSteps.filter((step) => step.stageId === stageId)
const stageCompleted = (stageId: StageId) => stageSteps(stageId).every((step) => state.value.completedStepIds.includes(step.id))
const stageProgress = (stageId: StageId) => `${stageSteps(stageId).filter((step) => state.value.completedStepIds.includes(step.id)).length} / ${stageSteps(stageId).length} 步`
const canVisitStage = (stageId: StageId) => {
  const first = experimentSteps.findIndex((step) => step.stageId === stageId)
  const firstIncomplete = experimentSteps.findIndex((step) => !state.value.completedStepIds.includes(step.id))
  return first <= (firstIncomplete === -1 ? experimentSteps.length - 1 : firstIncomplete)
}
const visitStage = (stageId: StageId) => {
  const index = experimentSteps.findIndex((step) => step.stageId === stageId)
  if (goToStep(index)) pendingFeedback.value = null
}

let timer: number | undefined
onMounted(() => {
  startExperiment()
  timer = window.setInterval(() => addElapsedSeconds(10), 10_000)
})
onBeforeUnmount(() => { if (timer) window.clearInterval(timer) })
</script>
