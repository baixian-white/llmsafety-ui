import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { experimentStages, experimentSteps, pretestQuestions } from './catalog'
import {
  buildDemoAnswers,
  calculateAbilityProfile,
  calculateMetrics,
  calculateScore,
  createInitialState,
  getLearningRecommendations,
  getStepFeedback,
  validateAnswer,
} from './engine'
import { buildConversationAnswer } from './conversationEngine'
import type {
  AbilityProfile,
  ExperimentStage,
  ExperimentState,
  ExperimentStep,
  ScoreSummary,
  SimulationMetrics,
  StepAnswer,
  ConversationRun,
  ConversationStage,
  ConversationVerdict,
} from './types'

export const EXPERIMENT_STORAGE_KEY = 'llmsafety_virtual_experiment_v1'

interface ExperimentStore {
  state: Ref<ExperimentState>
  restoreWarning: Ref<string>
  currentStep: ComputedRef<ExperimentStep>
  currentStage: ComputedRef<ExperimentStage>
  canCompleteCurrentStep: ComputedRef<boolean>
  progress: ComputedRef<number>
  score: ComputedRef<ScoreSummary>
  metrics: ComputedRef<SimulationMetrics>
  abilityProfile: ComputedRef<AbilityProfile>
  recommendations: ComputedRef<string[]>
  startExperiment: () => void
  setAnswer: (answer: StepAnswer, stepId?: string) => void
  completeCurrentStep: () => boolean
  goBack: () => void
  goToStep: (index: number) => boolean
  useHint: () => void
  setGuideEnabled: (enabled: boolean) => void
  setPretestAnswer: (questionId: string, answer: string) => void
  submitPretest: () => number
  resetExperiment: () => void
  finishExperiment: () => void
  loadDemoResult: () => void
  addElapsedSeconds: (seconds: number) => void
  setConversationRun: (stageId: ConversationStage, run: ConversationRun) => void
  updateConversationAssessment: (stageId: ConversationStage, evidence: string[], verdict: ConversationVerdict) => void
  clearConversationRun: (stageId: ConversationStage) => void
}

const isExperimentState = (value: unknown): value is ExperimentState => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<ExperimentState>
  return candidate.version === 1
    && typeof candidate.sessionId === 'string'
    && typeof candidate.currentStepIndex === 'number'
    && Boolean(candidate.answers && typeof candidate.answers === 'object')
    && Array.isArray(candidate.completedStepIds)
}

const getBrowserStorage = (): Storage | undefined => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : undefined
  } catch {
    return undefined
  }
}

export const createExperimentStore = (storage: Storage | undefined = getBrowserStorage()): ExperimentStore => {
  const restoreWarning = ref('')

  const loadState = (): ExperimentState => {
    if (!storage) return createInitialState()
    const saved = storage.getItem(EXPERIMENT_STORAGE_KEY)
    if (!saved) return createInitialState()

    try {
      const parsed = JSON.parse(saved) as unknown
      if (!parsed || typeof parsed !== 'object' || (parsed as { version?: number }).version !== 1) {
        restoreWarning.value = '实验记录版本不兼容，已为你创建新的实验记录。'
        return createInitialState()
      }
      if (!isExperimentState(parsed)) {
        restoreWarning.value = '实验记录无法恢复，已为你创建新的实验记录。'
        return createInitialState()
      }
      return {
        ...createInitialState(),
        ...parsed,
        conversations: parsed.conversations ?? {},
        currentStepIndex: Math.min(Math.max(parsed.currentStepIndex, 0), experimentSteps.length - 1),
      }
    } catch {
      restoreWarning.value = '实验记录无法恢复，已为你创建新的实验记录。'
      return createInitialState()
    }
  }

  const state = ref<ExperimentState>(loadState())
  const persist = () => {
    try {
      storage?.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify(state.value))
    } catch {
      restoreWarning.value = '浏览器无法保存实验进度，请保持当前页面开启。'
    }
  }

  const currentStep = computed(() => experimentSteps[state.value.currentStepIndex] ?? experimentSteps[0])
  const currentStage = computed(() => experimentStages.find((stage) => stage.id === currentStep.value.stageId) ?? experimentStages[0])
  const canCompleteCurrentStep = computed(() => validateAnswer(currentStep.value, state.value.answers[currentStep.value.id]))
  const progress = computed(() => Math.round((state.value.completedStepIds.length / experimentSteps.length) * 100))
  const score = computed(() => calculateScore(state.value.answers, state.value.hints))
  const metrics = computed(() => calculateMetrics(state.value.answers))
  const abilityProfile = computed(() => calculateAbilityProfile(state.value.answers, state.value.hints))
  const recommendations = computed(() => getLearningRecommendations(abilityProfile.value))

  const startExperiment = () => {
    if (state.value.status === 'not-started') {
      state.value.status = 'in-progress'
      state.value.startedAt = new Date().toISOString()
      persist()
    }
  }

  const setAnswer = (answer: StepAnswer, stepId = currentStep.value.id) => {
    state.value.answers[stepId] = answer
    if (state.value.status === 'not-started') startExperiment()
    persist()
  }

  const completeCurrentStep = () => {
    const step = currentStep.value
    const answer = state.value.answers[step.id]
    if (!validateAnswer(step, answer)) return false

    state.value.feedback[step.id] = getStepFeedback(step, answer)
    if (!state.value.completedStepIds.includes(step.id)) state.value.completedStepIds.push(step.id)

    if (state.value.currentStepIndex >= experimentSteps.length - 1) {
      state.value.status = 'completed'
      state.value.completedAt = new Date().toISOString()
    } else {
      state.value.currentStepIndex += 1
    }
    persist()
    return true
  }

  const goBack = () => {
    state.value.currentStepIndex = Math.max(0, state.value.currentStepIndex - 1)
    persist()
  }

  const goToStep = (index: number) => {
    if (index < 0 || index >= experimentSteps.length) return false
    const firstIncomplete = experimentSteps.findIndex((step) => !state.value.completedStepIds.includes(step.id))
    const furthestAllowed = firstIncomplete === -1 ? experimentSteps.length - 1 : firstIncomplete
    if (index > furthestAllowed) return false
    state.value.currentStepIndex = index
    persist()
    return true
  }

  const useHint = () => {
    const stepId = currentStep.value.id
    state.value.hints[stepId] = (state.value.hints[stepId] ?? 0) + 1
    persist()
  }

  const setGuideEnabled = (enabled: boolean) => {
    state.value.guideEnabled = enabled
    persist()
  }

  const setPretestAnswer = (questionId: string, answer: string) => {
    state.value.pretestAnswers[questionId] = answer
    persist()
  }

  const submitPretest = () => {
    const correct = pretestQuestions.filter((question) => state.value.pretestAnswers[question.id] === question.answer).length
    state.value.pretestScore = Math.round((correct / pretestQuestions.length) * 100)
    persist()
    return state.value.pretestScore
  }

  const resetExperiment = () => {
    state.value = createInitialState()
    restoreWarning.value = ''
    persist()
  }

  const finishExperiment = () => {
    state.value.status = 'completed'
    state.value.completedAt = state.value.completedAt ?? new Date().toISOString()
    state.value.completedStepIds = experimentSteps.map((step) => step.id)
    persist()
  }

  const loadDemoResult = () => {
    state.value = {
      ...createInitialState(),
      status: 'completed',
      startedAt: new Date(Date.now() - 78 * 60 * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      currentStepIndex: experimentSteps.length - 1,
      answers: buildDemoAnswers(),
      hints: { 'hallucination-evidence': 1, 'defense-balance': 1 },
      completedStepIds: experimentSteps.map((step) => step.id),
      pretestScore: 75,
      guideEnabled: false,
      elapsedSeconds: 78 * 60,
    }
    state.value.feedback = Object.fromEntries(
      experimentSteps.map((step) => [step.id, getStepFeedback(step, state.value.answers[step.id])]),
    )
    persist()
  }

  const addElapsedSeconds = (seconds: number) => {
    if (state.value.status !== 'in-progress') return
    state.value.elapsedSeconds += Math.max(0, Math.round(seconds))
    persist()
  }

  const setConversationRun = (stageId: ConversationStage, run: ConversationRun) => {
    state.value.conversations[stageId] = run
    if (state.value.status === 'not-started') startExperiment()
    persist()
  }

  const updateConversationAssessment = (
    stageId: ConversationStage,
    evidence: string[],
    verdict: ConversationVerdict,
  ) => {
    const run = state.value.conversations[stageId]
    if (!run) return
    run.selectedEvidence = [...new Set(evidence.filter(Boolean))]
    run.verdict = verdict
    run.completed = run.selectedEvidence.length > 0
    if (run.completed) {
      const step = experimentSteps.find((item) => item.conversationStage === stageId)
      if (step) state.value.answers[step.id] = buildConversationAnswer(run)
    }
    persist()
  }

  const clearConversationRun = (stageId: ConversationStage) => {
    delete state.value.conversations[stageId]
    for (const step of experimentSteps.filter((item) => item.conversationStage === stageId)) {
      delete state.value.answers[step.id]
    }
    persist()
  }

  return {
    state,
    restoreWarning,
    currentStep,
    currentStage,
    canCompleteCurrentStep,
    progress,
    score,
    metrics,
    abilityProfile,
    recommendations,
    startExperiment,
    setAnswer,
    completeCurrentStep,
    goBack,
    goToStep,
    useHint,
    setGuideEnabled,
    setPretestAnswer,
    submitPretest,
    resetExperiment,
    finishExperiment,
    loadDemoResult,
    addElapsedSeconds,
    setConversationRun,
    updateConversationAssessment,
    clearConversationRun,
  }
}

let sharedStore: ExperimentStore | undefined

export const useExperiment = (): ExperimentStore => {
  sharedStore ??= createExperimentStore()
  return sharedStore
}
