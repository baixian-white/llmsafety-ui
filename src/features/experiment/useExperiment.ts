import { computed, ref } from 'vue'
import { experimentStages, experimentSteps } from './catalog'
import { calculateAbilityProfile, calculateMetrics, calculateScore, createInitialState, getLearningRecommendations, getStepFeedback, validateAnswer } from './engine'
import { buildConversationAnswer, isMatchingRetestRun } from './conversationEngine'
import { normalizeDefenseIds } from './defenseLayers'
import type { ConversationRun, ConversationStage, ConversationVerdict, DefenseConfiguration, ExperimentState, StepAnswer } from './types'

// Keep the original key so existing students can migrate without losing their attack records.
export const EXPERIMENT_STORAGE_KEY = 'llmsafety_virtual_experiment_v1'
const stages: ConversationStage[] = ['jailbreak', 'hallucination', 'defense']
const verdicts: ConversationVerdict[] = ['safe', 'unsafe', 'hallucinated', 'blocked', 'partial', 'uncertain', 'residual-risk']
const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value)
const getBrowserStorage = (): Storage | undefined => {
  try { return typeof window !== 'undefined' ? window.localStorage : undefined } catch { return undefined }
}

const isSavedRun = (value: unknown, stage: ConversationStage): value is ConversationRun => {
  if (!isRecord(value)) return false
  return value.stageId === stage
    && (value.sourceCategory === 'jailbreak' || value.sourceCategory === 'hallucination')
    && (stage === 'defense' || value.sourceCategory === stage)
    && ['caseId', 'caseTitle', 'modelId', 'question', 'sentPrompt'].every((key) => typeof value[key] === 'string')
    && Array.isArray(value.messages) && value.messages.some((item) => isRecord(item) && item.role === 'assistant' && typeof item.content === 'string')
    && Array.isArray(value.defenseTrace) && Array.isArray(value.evidenceCandidates) && Array.isArray(value.selectedEvidence)
    && verdicts.includes(value.expectedVerdict as ConversationVerdict)
}

const clearConversationStageArtifacts = (state: ExperimentState, stageId: ConversationStage) => {
  const stepIndex = experimentSteps.findIndex((step) => step.conversationStage === stageId)
  if (stepIndex < 0) return
  const id = experimentSteps[stepIndex].id
  const hadResult = id in state.answers || state.completedStepIds.includes(id)
  delete state.answers[id]
  delete state.feedback[id]
  state.completedStepIds = state.completedStepIds.filter((stepId) => stepId !== id)
  if (hadResult) {
    state.currentStepIndex = Math.min(state.currentStepIndex, stepIndex)
    if (state.status === 'completed') {
      state.status = 'in-progress'
      state.completedAt = null
    }
  }
}

export const createExperimentStore = (storage: Storage | undefined = getBrowserStorage()) => {
  const restoreWarning = ref('')
  const loadState = (): ExperimentState => {
    try {
      const saved = storage?.getItem(EXPERIMENT_STORAGE_KEY)
      if (!saved) return createInitialState()
      const parsed: unknown = JSON.parse(saved)
      if (!isRecord(parsed) || ![1, 2].includes(Number(parsed.version))) {
        restoreWarning.value = '实验记录版本不兼容，已创建新的实验记录。'
        return createInitialState()
      }
      if (typeof parsed.sessionId !== 'string' || !Array.isArray(parsed.completedStepIds) || !isRecord(parsed.answers)) {
        throw new Error('Invalid saved experiment')
      }
      const restored = createInitialState()
      restored.sessionId = parsed.sessionId
      restored.startedAt = typeof parsed.startedAt === 'string' ? parsed.startedAt : null
      restored.elapsedSeconds = typeof parsed.elapsedSeconds === 'number' && Number.isFinite(parsed.elapsedSeconds) ? Math.max(0, parsed.elapsedSeconds) : 0
      restored.guideEnabled = parsed.guideEnabled !== false
      if (isRecord(parsed.defenseConfiguration)) {
        restored.defenseConfiguration = {
          sourceStage: parsed.defenseConfiguration.sourceStage === 'hallucination' ? 'hallucination' : 'jailbreak',
          layerIds: Array.isArray(parsed.defenseConfiguration.layerIds) ? normalizeDefenseIds(parsed.defenseConfiguration.layerIds) : [0, 1, 2],
        }
      }
      const savedRuns = isRecord(parsed.conversations) ? parsed.conversations : {}
      for (const stage of stages) {
        const run = savedRuns[stage]
        if (!isSavedRun(run, stage)) continue
        // Legacy defense results did not record the actual switches; they must be retested.
        if (stage === 'defense' && (parsed.version === 1 || !Array.isArray(run.selectedDefenseIds))) continue
        const normalized: ConversationRun = {
          ...run,
          selectedDefenseIds: stage === 'defense' ? normalizeDefenseIds(run.selectedDefenseIds) : [],
          selectedEvidence: [...new Set(run.selectedEvidence.filter((item) => typeof item === 'string' && run.evidenceCandidates.includes(item)))],
        }
        normalized.defenseEnabled = normalized.selectedDefenseIds.length > 0
        normalized.completed = Boolean(run.completed && normalized.selectedEvidence.length && run.verdict && verdicts.includes(run.verdict))
        restored.conversations[stage] = normalized
      }
      const defense = restored.conversations.defense
      const source = restored.conversations[restored.defenseConfiguration.sourceStage]
      if (defense && (!source?.completed || !isMatchingRetestRun(defense, source, restored.defenseConfiguration.layerIds))) {
        delete restored.conversations.defense
      }
      for (const step of experimentSteps) {
        const run = restored.conversations[step.stageId]
        if (run?.completed) {
          const answer = buildConversationAnswer(run)
          if (validateAnswer(step, answer)) {
            restored.answers[step.id] = answer
            if (parsed.completedStepIds.includes(step.id)) {
              restored.completedStepIds.push(step.id)
              restored.feedback[step.id] = getStepFeedback(step, answer)
            }
          }
        }
        const count = isRecord(parsed.hints) ? parsed.hints[step.id] : undefined
        if (typeof count === 'number' && Number.isFinite(count) && count > 0) restored.hints[step.id] = Math.floor(count)
      }
      const firstIncomplete = experimentSteps.findIndex((step) => !restored.completedStepIds.includes(step.id))
      const allComplete = firstIncomplete === -1
      const furthest = allComplete ? experimentSteps.length - 1 : firstIncomplete
      restored.currentStepIndex = parsed.version === 1 ? furthest : Math.min(furthest, Math.max(0, Number.isInteger(parsed.currentStepIndex) ? Number(parsed.currentStepIndex) : 0))
      restored.status = allComplete ? 'completed' : parsed.status === 'not-started' && !Object.keys(restored.conversations).length ? 'not-started' : 'in-progress'
      restored.completedAt = allComplete && typeof parsed.completedAt === 'string' ? parsed.completedAt : null
      if (parsed.version === 1) restoreWarning.value = '实验已精简为越狱、幻觉和防御三个阶段。已保留有效的攻击测试记录，请用新的防御开关完成复测。'
      try { storage?.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify(restored)) } catch { restoreWarning.value = '进度已恢复，但浏览器暂时无法保存更新。' }
      return restored
    } catch {
      restoreWarning.value = '实验记录无法恢复，已创建新的实验记录。'
      return createInitialState()
    }
  }

  const state = ref<ExperimentState>(loadState())
  const persist = () => {
    try { storage?.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify(state.value)) }
    catch { restoreWarning.value = '浏览器无法保存实验进度，请保持当前页面开启。' }
  }
  const currentStep = computed(() => experimentSteps[state.value.currentStepIndex] ?? experimentSteps[0])
  const currentStage = computed(() => experimentStages.find((stage) => stage.id === currentStep.value.stageId)!)
  const canCompleteCurrentStep = computed(() => {
    const step = currentStep.value
    const run = state.value.conversations[step.stageId]
    if (!run?.completed || !validateAnswer(step, state.value.answers[step.id])) return false
    if (step.stageId !== 'defense') return true
    const source = state.value.conversations[state.value.defenseConfiguration.sourceStage]
    return Boolean(source?.completed && isMatchingRetestRun(run, source, state.value.defenseConfiguration.layerIds))
  })
  const progress = computed(() => Math.round(state.value.completedStepIds.length / experimentSteps.length * 100))
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
    if (!experimentSteps.some((step) => step.id === stepId)) return
    state.value.answers[stepId] = answer
    startExperiment()
    persist()
  }
  const completeCurrentStep = () => {
    if (!canCompleteCurrentStep.value) return false
    if (experimentSteps.slice(0, state.value.currentStepIndex).some((step) => !state.value.completedStepIds.includes(step.id))) return false
    const step = currentStep.value
    state.value.feedback[step.id] = getStepFeedback(step, state.value.answers[step.id])
    if (!state.value.completedStepIds.includes(step.id)) state.value.completedStepIds.push(step.id)
    if (state.value.completedStepIds.length === experimentSteps.length) {
      state.value.status = 'completed'
      state.value.completedAt = new Date().toISOString()
    } else state.value.currentStepIndex = Math.min(state.value.currentStepIndex + 1, experimentSteps.length - 1)
    persist()
    return true
  }
  const goBack = () => { state.value.currentStepIndex = Math.max(0, state.value.currentStepIndex - 1); persist() }
  const goToStep = (index: number) => {
    const firstIncomplete = experimentSteps.findIndex((step) => !state.value.completedStepIds.includes(step.id))
    const furthest = firstIncomplete === -1 ? experimentSteps.length - 1 : firstIncomplete
    if (!Number.isInteger(index) || index < 0 || index > furthest) return false
    state.value.currentStepIndex = index
    persist()
    return true
  }
  const useHint = () => { const id = currentStep.value.id; state.value.hints[id] = (state.value.hints[id] ?? 0) + 1; persist() }
  const setGuideEnabled = (enabled: boolean) => { state.value.guideEnabled = enabled; persist() }
  const resetExperiment = () => { state.value = createInitialState(); restoreWarning.value = ''; persist() }
  const addElapsedSeconds = (seconds: number) => {
    if (state.value.status !== 'in-progress') return
    state.value.elapsedSeconds += Math.max(0, Math.round(seconds))
    persist()
  }
  const invalidateDefenseRetest = () => {
    delete state.value.conversations.defense
    clearConversationStageArtifacts(state.value, 'defense')
  }
  const setDefenseConfiguration = (configuration: DefenseConfiguration) => {
    const next = { sourceStage: configuration.sourceStage, layerIds: normalizeDefenseIds(configuration.layerIds) }
    if (JSON.stringify(next) === JSON.stringify(state.value.defenseConfiguration)) return
    invalidateDefenseRetest()
    state.value.defenseConfiguration = next
    persist()
  }
  const setConversationRun = (stageId: ConversationStage, run: ConversationRun) => {
    if (run.stageId !== stageId) return
    if (stageId === 'defense') {
      const source = state.value.conversations[state.value.defenseConfiguration.sourceStage]
      if (!source?.completed || !isMatchingRetestRun(run, source, state.value.defenseConfiguration.layerIds)) return
    } else invalidateDefenseRetest()
    clearConversationStageArtifacts(state.value, stageId)
    state.value.conversations[stageId] = { ...run, selectedEvidence: [], verdict: undefined, completed: false }
    startExperiment()
    persist()
  }
  const updateConversationAssessment = (stageId: ConversationStage, evidence: string[], verdict: ConversationVerdict) => {
    const run = state.value.conversations[stageId]
    if (!run || !verdicts.includes(verdict)) return
    clearConversationStageArtifacts(state.value, stageId)
    run.selectedEvidence = [...new Set(evidence.filter((item) => run.evidenceCandidates.includes(item)))]
    run.verdict = verdict
    run.completed = run.selectedEvidence.length > 0
    if (run.completed) {
      const step = experimentSteps.find((item) => item.stageId === stageId)!
      const answer = buildConversationAnswer(run)
      if (validateAnswer(step, answer)) state.value.answers[step.id] = answer
    }
    persist()
  }
  const clearConversationRun = (stageId: ConversationStage) => {
    delete state.value.conversations[stageId]
    clearConversationStageArtifacts(state.value, stageId)
    if (stageId !== 'defense') invalidateDefenseRetest()
    persist()
  }

  return { state, restoreWarning, currentStep, currentStage, canCompleteCurrentStep, progress, score, metrics, abilityProfile, recommendations,
    startExperiment, setAnswer, completeCurrentStep, goBack, goToStep, useHint, setGuideEnabled, resetExperiment, addElapsedSeconds,
    setConversationRun, updateConversationAssessment, clearConversationRun, setDefenseConfiguration }
}

let sharedStore: ReturnType<typeof createExperimentStore> | undefined
export const useExperiment = () => {
  sharedStore ??= createExperimentStore()
  return sharedStore
}
