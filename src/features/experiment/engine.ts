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
} from './types'

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))
const round = (value: number, digits = 1) => Number(value.toFixed(digits))

const hasValue = (answer: StepAnswer | undefined): boolean => {
  if (Array.isArray(answer)) return answer.length > 0
  if (typeof answer === 'string') return answer.trim().length > 0
  return Number.isFinite(answer)
}

export const validateAnswer = (step: ExperimentStep, answer: StepAnswer | undefined): boolean => {
  if (!hasValue(answer)) return false

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
    : step.options?.filter((item) => item.value === answer) ?? []
  const primary = selectedOptions.sort((a, b) => (b?.scoreRatio ?? 0) - (a?.scoreRatio ?? 0))[0]
  const earnedPoints = round(step.weight * ratio, 2)
  const severity = primary?.severity ?? severityFromRatio(ratio)

  const genericMessages: Record<ExperimentStep['type'], string> = {
    single: '选择已记录，系统已依据测试判据完成分析。',
    multi: '组合已记录，系统已检查覆盖范围与风险相关性。',
    range: `参数设置为 ${String(answer)}${step.unit ?? ''}，已进入确定性仿真计算。`,
    text: '改进建议已记录，系统已从完整性与措施覆盖度进行分析。',
  }

  return {
    severity,
    title: ratio >= 0.88 ? '判断充分' : ratio >= 0.6 ? '可以继续优化' : '建议重新检查证据',
    message: primary?.feedback ?? genericMessages[step.type],
    knowledge: step.knowledge,
    earnedPoints,
    maxPoints: step.weight,
  }
}

const defenseValue = (answers: Record<string, StepAnswer>, id: string, values: Record<string, number>) => {
  const answer = answers[id]
  return typeof answer === 'string' ? values[answer] ?? 0 : 0
}

export const calculateMetrics = (answers: Record<string, StepAnswer>): SimulationMetrics => {
  const input = defenseValue(answers, 'input-detection', {
    disabled: 0, 'keyword-only': 32, 'semantic-risk': 78,
  })
  const prompt = defenseValue(answers, 'prompt-protection', {
    'reveal-rules': 4, 'priority-only': 36, 'instruction-isolation': 82,
  })
  const output = defenseValue(answers, 'output-filter', {
    'basic-filter': 28, 'balanced-filter': 62, 'strict-filter': 88,
  })
  const balance = typeof answers['defense-balance'] === 'number' ? answers['defense-balance'] : 45
  const aggregate = input * 0.34 + prompt * 0.38 + output * 0.28
  const intensity = clamp((aggregate * 0.72 + balance * 0.28), 0, 100)
  const strictness = clamp(output * 0.46 + balance * 0.54, 0, 100)

  return {
    jailbreakSuccessRate: round(clamp(78 - intensity * 0.67, 8, 82)),
    injectionSuccessRate: round(clamp(72 - (input * 0.24 + prompt * 0.51 + balance * 0.12), 7, 78)),
    hallucinationRate: round(clamp(36 - (output * 0.1 + balance * 0.08), 16, 38)),
    harmfulPassRate: round(clamp(68 - (input * 0.16 + output * 0.45 + balance * 0.12), 5, 74)),
    falsePositiveRate: round(clamp(3 + strictness * 0.17, 3, 24)),
    usabilityScore: round(clamp(96 - strictness * 0.24, 68, 96)),
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

  const hintPenalty = round(Math.min(6, Object.values(hints).reduce((sum, count) => sum + Math.min(count, 2) * 0.75, 0)), 2)
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
  'response-analysis': { label: '响应分析', description: '依据证据判断越狱、幻觉与注入结果' },
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
  version: 1,
  sessionId: createSessionId(),
  status: 'not-started',
  startedAt: null,
  completedAt: null,
  currentStepIndex: 0,
  answers: {},
  hints: {},
  completedStepIds: [],
  feedback: {},
  pretestAnswers: {},
  pretestScore: null,
  guideEnabled: true,
  elapsedSeconds: 0,
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
    if (step.type === 'single') {
      answers[step.id] = [...(step.options ?? [])].sort((a, b) => b.scoreRatio - a.scoreRatio)[0]?.value ?? ''
    } else if (step.type === 'multi') {
      answers[step.id] = [...(step.options ?? [])]
        .sort((a, b) => b.scoreRatio - a.scoreRatio)
        .slice(0, step.maxSelections ?? step.minSelections ?? 1)
        .map((item) => item.value)
    } else if (step.type === 'range') {
      answers[step.id] = Math.round(((step.idealMin ?? step.min ?? 0) + (step.idealMax ?? step.max ?? 100)) / 2)
    } else {
      answers[step.id] = '加强输入层语义风险识别与指令隔离，优化输出过滤阈值，并使用相同越狱、幻觉和注入样本完成复测与残余风险确认。'
    }
  }
  return answers
}
