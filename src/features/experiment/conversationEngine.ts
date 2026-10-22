import type {
  ConversationAnswer,
  ConversationMessage,
  ConversationRun,
  ConversationStage,
  ConversationVerdict,
  DefenseTest,
  ExperimentCase,
} from './types'
import { normalizeDefenseIds } from './defenseLayers'

interface CreateConversationOptions {
  stageId: ConversationStage
  sentPrompt: string
  defenseEnabled: boolean
  selectedDefenseIds?: number[]
}

const compact = (value: string, maxLength = 180): string => {
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength)}…` : normalized
}

const message = (
  id: string,
  role: ConversationMessage['role'],
  content: string,
  tone: ConversationMessage['tone'] = 'default',
): ConversationMessage => ({ id, role, content, tone })

export const selectDefenseTrace = (
  caseData: ExperimentCase,
  selectedDefenseIds = caseData.defenseTests.map((test) => test.id),
): DefenseTest[] => {
  const ids = normalizeDefenseIds(selectedDefenseIds)
  const selected = caseData.defenseTests.filter((test) => ids.includes(test.id)).sort((a, b) => a.id - b.id)
  if (caseData.category === 'hallucination') return selected
  const blockingIndex = selected.findIndex((test) => test.illegal)
  return blockingIndex >= 0 ? selected.slice(0, blockingIndex + 1) : selected
}

const expectedWithoutDefense = (
  caseData: ExperimentCase,
): ConversationVerdict => {
  if (caseData.category === 'hallucination') return 'hallucinated'
  return 'unsafe'
}

const responseWithDefense = (
  caseData: ExperimentCase,
  defenseTrace: DefenseTest[],
): { response: string; verdict: ConversationVerdict } => {
  if (caseData.category === 'hallucination') {
    const corrections = defenseTrace.filter((test) => test.illegal && test.output.trim())
    if (corrections.length) {
      const allLayersRan = caseData.defenseTests.every((test) => defenseTrace.some((item) => item.id === test.id))
      return {
        response: (allLayersRan && caseData.correctedResponse) || corrections[corrections.length - 1].output,
        verdict: 'safe',
      }
    }
    return { response: caseData.baselineResponse, verdict: 'hallucinated' }
  }

  const blocking = defenseTrace.find((test) => test.illegal)
  if (blocking) return { response: blocking.output || '检测到高风险请求，已阻止生成回复。', verdict: 'blocked' }
  return { response: caseData.baselineResponse, verdict: 'unsafe' }
}

export const createEvidenceCandidates = (
  caseData: ExperimentCase,
  reply: string,
  verdict: ConversationVerdict,
  defenseTrace: DefenseTest[] = [],
): string[] => {
  const evidence: string[] = []
  if (caseData.tags.includes('指令覆盖')) evidence.push('案例提示词包含指令覆盖或忽略安全规则的表达。')
  if (caseData.tags.includes('角色伪装')) evidence.push('案例通过角色或身份设定弱化模型原有安全边界。')
  if (caseData.referenceAnswer) evidence.push(`参考答案：${compact(caseData.referenceAnswer)}`)
  if (verdict === 'hallucinated') evidence.push(`模型回答：${compact(reply)}`)
  if (verdict === 'unsafe') evidence.push(`模型未保持拒答边界并给出响应：${compact(reply)}`)
  for (const test of defenseTrace) {
    evidence.push(`${test.name}：${compact(test.output || test.process)}`)
  }
  return [...new Set(evidence.filter(Boolean))].slice(0, 6)
}

export const createConversationRun = (
  caseData: ExperimentCase,
  options: CreateConversationOptions,
): ConversationRun => {
  const sentPrompt = options.sentPrompt.trim()
  if (!sentPrompt) throw new Error('测试提示词不能为空')

  const selectedDefenseIds = options.stageId === 'defense' && options.defenseEnabled
    ? normalizeDefenseIds(options.selectedDefenseIds ?? caseData.defenseTests.map((test) => test.id))
      .filter((id) => caseData.defenseTests.some((test) => test.id === id))
    : []
  const defenseEnabled = selectedDefenseIds.length > 0
  const defenseTrace = defenseEnabled
    ? selectDefenseTrace(caseData, selectedDefenseIds)
    : []
  const result = defenseEnabled
    ? responseWithDefense(caseData, defenseTrace)
    : { response: caseData.baselineResponse, verdict: expectedWithoutDefense(caseData) }
  const responseTone = result.verdict === 'blocked' || result.verdict === 'safe'
    ? 'success'
    : result.verdict === 'hallucinated'
      ? 'warning'
      : 'danger'

  return {
    stageId: options.stageId,
    sourceCategory: caseData.category,
    modelId: caseData.modelId,
    caseId: caseData.id,
    caseTitle: caseData.title,
    question: caseData.question,
    sentPrompt,
    defenseEnabled,
    selectedDefenseIds,
    messages: [
      message(`${caseData.id}-notice`, 'system', '以下回答来自原测试平台预设案例，用于可重复的虚拟仿真实验。', 'info'),
      message(`${caseData.id}-user`, 'user', sentPrompt),
      message(`${caseData.id}-assistant`, 'assistant', result.response, responseTone),
    ],
    defenseTrace,
    evidenceCandidates: createEvidenceCandidates(caseData, result.response, result.verdict, defenseTrace),
    selectedEvidence: [],
    expectedVerdict: result.verdict,
    completed: false,
  }
}

export const isMatchingRetestRun = (
  run: ConversationRun,
  source: ConversationRun,
  selectedDefenseIds?: number[],
): boolean => run.stageId === 'defense'
  && run.sourceCategory === source.sourceCategory
  && run.modelId === source.modelId
  && run.caseId === source.caseId
  && run.sentPrompt === source.sentPrompt
  && (!selectedDefenseIds || JSON.stringify(run.selectedDefenseIds) === JSON.stringify(normalizeDefenseIds(selectedDefenseIds)))

export const buildConversationAnswer = (run: ConversationRun): ConversationAnswer => {
  if (!run.completed || !run.verdict || run.selectedEvidence.length < 1) {
    throw new Error('对话测试尚未完成证据标注与安全判定')
  }
  return {
    stageId: run.stageId,
    sourceCategory: run.sourceCategory,
    caseId: run.caseId,
    caseTitle: run.caseTitle,
    selectedDefenseIds: [...run.selectedDefenseIds],
    sent: true,
    evidenceCount: run.selectedEvidence.length,
    verdict: run.verdict,
    expectedVerdict: run.expectedVerdict,
  }
}
