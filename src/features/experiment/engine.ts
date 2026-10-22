import { experimentStages, experimentSteps } from './catalog'
import type {
  AbilityId,
  AbilityProfile,
  ExperimentState,
  ExperimentStep,
  FeedbackSeverity,
  ScoreSummary,
  SimulationMetrics,
  StepAnswer,
  StepFeedback,
  ConversationAnswer,
} from './types'

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))
const round = (value: number, digits = 1) => Number(value.toFixed(digits))

const hasValue = (answer: StepAnswer | undefined): boolean => {
  if (Array.isArray(answer)) return answer.length > 0
  if (typeof answer === 'string') return answer.trim().length > 0
  if (typeof answer === 'number') return Number.isFinite(answer)
  return Boolean(answer && typeof answer === 'object')
}

const isConversationAnswer = (answer: StepAnswer | undefined): answer is ConversationAnswer => {
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return false
  return answer.sent === true
    && typeof answer.caseId === 'string'
    && answer.caseId.length > 0
    && typeof answer.evidenceCount === 'number'
    && Number.isInteger(answer.evidenceCount)
    && answer.evidenceCount > 0
    && typeof answer.verdict === 'string'
    && typeof answer.expectedVerdict === 'string'
}

export const validateAnswer = (step: ExperimentStep, answer: StepAnswer | undefined): boolean => {
  if (!hasValue(answer)) return false

  if (step.conversationStage) {
    return isConversationAnswer(answer) && answer.stageId === step.conversationStage
      && (answer.sourceCategory === 'jailbreak' || answer.sourceCategory === 'hallucination')
      && (step.stageId === 'defense' || answer.sourceCategory === step.stageId)
      && (step.stageId !== 'defense' || (Array.isArray(answer.selectedDefenseIds) && answer.selectedDefenseIds.length > 0))
  }

  if (step.type === 'single') {
    return typeof answer === 'string' && Boolean(step.options?.some((item) => item.value === answer))
  }

  if (step.type === 'multi') {
    if (!Array.isArray(answer)) return false
    const available = new Set(step.options?.map((item) => item.value))
    const distinct = new Set(answer)
    return distinct.size === answer.length
      && answer.every((item) => available.has(item))
      && answer.length >= (step.minSelections ?? 1)
      && answer.length <= (step.maxSelections ?? step.options?.length ?? answer.length)
  }

  if (step.type === 'range') {
    return typeof answer === 'number'
      && answer >= (step.min ?? Number.NEGATIVE_INFINITY)
      && answer <= (step.max ?? Number.POSITIVE_INFINITY)
  }

  if (step.type === 'text') {
    return typeof answer === 'string' && answer.trim().length >= (step.minLength ?? 1)
  }

  return false
}

const answerRatio = (step: ExperimentStep, answer: StepAnswer | undefined): number => {
  if (!validateAnswer(step, answer)) return 0

  if (step.conversationStage && isConversationAnswer(answer)) {
    return answer.verdict === answer.expectedVerdict ? 1 : 0.48
  }

  if (step.type === 'single') {
    return step.options?.find((item) => item.value === answer)?.scoreRatio ?? 0
  }

  if (step.type === 'multi' && Array.isArray(answer)) {
    const selected = answer.map((value) => step.options?.find((item) => item.value === value)?.scoreRatio ?? 0)
    const expectedCount = step.maxSelections ?? step.minSelections ?? answer.length
    const completeness = Math.min(1, answer.length / Math.max(expectedCount, 1))
    return clamp((selected.reduce((sum, value) => sum + value, 0) / selected.length) * completeness, 0, 1)
  }

  if (step.type === 'range' && typeof answer === 'number') {
    const idealMin = step.idealMin ?? step.min ?? answer
    const idealMax = step.idealMax ?? step.max ?? answer
    if (answer >= idealMin && answer <= idealMax) return 1
    const fullSpan = Math.max((step.max ?? 100) - (step.min ?? 0), 1)
    const distance = answer < idealMin ? idealMin - answer : answer - idealMax
    return clamp(1 - distance / (fullSpan * 0.55), 0.2, 0.95)
  }

  if (step.type === 'text' && typeof answer === 'string') {
    const text = answer.trim()
    const lengthRatio = clamp(text.length / Math.max((step.minLength ?? 1) * 1.8, 1), 0, 1)
    const keywords = step.recommendedKeywords ?? []
    const keywordRatio = keywords.length
      ? keywords.filter((keyword) => text.includes(keyword)).length / Math.min(3, keywords.length)
      : 1
    return clamp(lengthRatio * 0.55 + Math.min(keywordRatio, 1) * 0.45, 0, 1)
  }

  return 0
}

const severityFromRatio = (ratio: number): FeedbackSeverity => {
  if (ratio >= 0.88) return 'success'
  if (ratio >= 0.65) return 'info'
  if (ratio >= 0.35) return 'warning'
  return 'danger'
}

export const getStepFeedback = (step: ExperimentStep, answer: StepAnswer): StepFeedback => {
  const ratio = answerRatio(step, answer)
  const selectedOptions = Array.isArray(answer)
    ? answer.map((value) => step.options?.find((item) => item.value === value)).filter(Boolean)
    : typeof answer === 'string' ? step.options?.filter((item) => item.value === answer) ?? [] : []
  const primary = selectedOptions.sort((a, b) => (b?.scoreRatio ?? 0) - (a?.scoreRatio ?? 0))[0]
  const earnedPoints = round(step.weight * ratio, 2)
  const severity = primary?.severity ?? severityFromRatio(ratio)

  const genericMessages: Record<ExperimentStep['type'], string> = {
    single: '选择已记录，系统已依据测试判据完成分析。',
    multi: '组合已记录，系统已检查覆盖范围与风险相关性。',
    range: `参数设置为 ${String(answer)}${step.unit ?? ''}，已进入确定性仿真计算。`,
    text: '改进建议已记录，系统已从完整性与措施覆盖度进行分析。',
  }

  const conversationMessage = isConversationAnswer(answer)
    ? answer.verdict === answer.expectedVerdict
      ? `已完成对话式测试，证据与预设案例判据一致，共标注 ${answer.evidenceCount} 条证据。`
      : `已完成对话式测试并标注 ${answer.evidenceCount} 条证据，但判定与预设案例证据不完全一致。`
    : undefined

  return {
    severity,
    title: ratio >= 0.88 ? '判断充分' : ratio >= 0.6 ? '可以继续优化' : '建议重新检查证据',
    message: conversationMessage ?? primary?.feedback ?? genericMessages[step.type],
    knowledge: step.knowledge,
    earnedPoints,
    maxPoints: step.weight,
  }
}

export const calculateMetrics = (answers: Record<string, StepAnswer>): SimulationMetrics => {
  const defense = answers['defense-retest']
  const validDefense = validateAnswer(experimentSteps[2], defense) && isConversationAnswer(defense) ? defense : undefined
  const cases: SimulationMetrics['cases'] = experimentSteps.slice(0, 2).map((step) => {
    const answer = answers[step.id]
    const before = isConversationAnswer(answer) ? answer : undefined
    const matched = before && validDefense?.caseId === before.caseId && validDefense.sourceCategory === before.sourceCategory
    return {
      category: step.stageId as 'jailbreak' | 'hallucination',
      title: step.stageId === 'jailbreak' ? '越狱攻击测试' : '幻觉风险测试',
      caseTitle: before?.caseTitle || '尚未完成案例测试',
      before: before?.expectedVerdict ?? null,
      after: matched ? validDefense.expectedVerdict : null,
    }
  })
  const tested = cases.find((item) => item.after !== null)
  const effective = tested?.after === 'blocked' || tested?.after === 'safe'
  return {
    cases,
    enabledLayerCount: tested ? validDefense?.selectedDefenseIds.length ?? 0 : 0,
    conclusion: tested ? effective ? '本案例防御有效' : '本案例仍存在风险' : '待完成防御复测',
    description: tested
      ? effective ? '所选案例的风险被阻断或事实错误得到纠正。该结果仅对应本次案例和防御组合。' : '已启用的防御层未能消除本案例风险，可以调整组合后再次复测。'
      : '选择已测案例、开启防御并保存证据与判定后，在此查看对照结果。',
  }
}

export const calculateScore = (
  answers: Record<string, StepAnswer>,
  hints: Record<string, number>,
): ScoreSummary => {
  const stepScores: Record<string, number> = {}
  let rawTotal = 0

  for (const step of experimentSteps) {
    const score = round(step.weight * answerRatio(step, answers[step.id]), 2)
    stepScores[step.id] = score
    rawTotal += score
  }

  const hintPenalty = round(Math.min(6, experimentSteps.reduce((sum, step) => sum + Math.min(Math.max(hints[step.id] ?? 0, 0), 2) * 0.75, 0)), 2)
  const stageScores = experimentStages.map((stage) => {
    const earned = experimentSteps
      .filter((step) => step.stageId === stage.id)
      .reduce((sum, step) => sum + (stepScores[step.id] ?? 0), 0)
    return { stageId: stage.id, title: stage.title, earned: round(earned, 1), max: stage.maxScore }
  })

  return {
    total: round(clamp(rawTotal - hintPenalty, 0, 100), 1),
    rawTotal: round(rawTotal, 1),
    hintPenalty,
    completedSteps: experimentSteps.filter((step) => validateAnswer(step, answers[step.id])).length,
    stageScores,
    stepScores,
  }
}

const abilityMeta: Record<AbilityId, { label: string; description: string }> = {
  'risk-identification': { label: '风险识别', description: '识别关键资产、风险类型与影响范围' },
  'attack-design': { label: '攻击设计', description: '构造合规、可复现的安全测试方案' },
  'response-analysis': { label: '响应分析', description: '依据证据判断越狱、幻觉与防御结果' },
  'defense-configuration': { label: '防御配置', description: '组合输入、指令和输出层防御措施' },
  'comprehensive-decision': { label: '综合决策', description: '权衡风险、可用性并形成测试结论' },
}

export const calculateAbilityProfile = (
  answers: Record<string, StepAnswer>,
  hints: Record<string, number>,
): AbilityProfile => {
  const score = calculateScore(answers, hints)
  return (Object.keys(abilityMeta) as AbilityId[]).map((abilityId) => {
    const steps = experimentSteps.filter((step) => {
      const abilities = Array.isArray(step.ability) ? step.ability : [step.ability]
      return abilities.includes(abilityId)
    })
    const earned = steps.reduce((sum, step) => sum + (score.stepScores[step.id] ?? 0), 0)
    const maximum = steps.reduce((sum, step) => sum + step.weight, 0)
    const hintCount = steps.reduce((sum, step) => sum + Math.min(hints[step.id] ?? 0, 2), 0)
    const hintAdjustment = Math.min(8, hintCount * 1.2)

    return {
      id: abilityId,
      ...abilityMeta[abilityId],
      score: round(clamp((earned / Math.max(maximum, 1)) * 100 - hintAdjustment), 0),
      stepIds: steps.map((step) => step.id),
    }
  })
}

const createSessionId = () => `SIM-${Date.now().toString(36).toUpperCase()}`

export const createInitialState = (): ExperimentState => ({
  version: 2,
  sessionId: createSessionId(),
  status: 'not-started',
  startedAt: null,
  completedAt: null,
  currentStepIndex: 0,
  answers: {},
  hints: {},
  completedStepIds: [],
  feedback: {},
  guideEnabled: true,
  elapsedSeconds: 0,
  conversations: {},
  defenseConfiguration: { sourceStage: 'jailbreak', layerIds: [0, 1, 2] },
})

export const getLearningRecommendations = (profile: AbilityProfile): string[] => {
  return [...profile]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((dimension) => {
      const messages: Record<AbilityId, string> = {
        'risk-identification': '复习关键资产识别、威胁建模与风险定级方法。',
        'attack-design': '加强攻击目标、变量控制和脱敏红队样本设计训练。',
        'response-analysis': '练习从响应证据中区分事实错误、护栏失效和任务劫持。',
        'defense-configuration': '比较输入检测、指令隔离和输出过滤的组合效果。',
        'comprehensive-decision': '加强安全收益、误拦截和残余风险的综合权衡。',
      }
      return messages[dimension.id]
    })
}

export const buildDemoAnswers = (): Record<string, StepAnswer> => {
  const answers: Record<string, StepAnswer> = {}
  for (const step of experimentSteps) {
    if (step.conversationStage) {
      const verdict = step.conversationStage === 'hallucination'
        ? 'hallucinated'
        : step.conversationStage === 'defense'
          ? 'blocked'
          : 'unsafe'
      answers[step.id] = {
        stageId: step.conversationStage,
        sourceCategory: step.conversationStage === 'hallucination' ? 'hallucination' : 'jailbreak',
        caseId: step.conversationStage === 'hallucination' ? 'demo-hallucination' : 'demo-jailbreak',
        caseTitle: step.conversationStage === 'hallucination' ? '事实核查演示案例' : '安全边界演示案例',
        selectedDefenseIds: step.conversationStage === 'defense' ? [0, 1, 2] : [],
        sent: true,
        evidenceCount: 2,
        verdict,
        expectedVerdict: verdict,
      }
    } else if (step.type === 'single') {
      answers[step.id] = [...(step.options ?? [])].sort((a, b) => b.scoreRatio - a.scoreRatio)[0]?.value ?? ''
    } else if (step.type === 'multi') {
      answers[step.id] = [...(step.options ?? [])]
        .sort((a, b) => b.scoreRatio - a.scoreRatio)
        .slice(0, step.maxSelections ?? step.minSelections ?? 1)
        .map((item) => item.value)
    } else if (step.type === 'range') {
      answers[step.id] = Math.round(((step.idealMin ?? step.min ?? 0) + (step.idealMax ?? step.max ?? 100)) / 2)
    } else {
      answers[step.id] = '对照相同的越狱和幻觉案例，比较各防御层的检测记录与最终回答。'
    }
  }
  return answers
}
