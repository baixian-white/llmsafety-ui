import { experimentSteps } from './catalog'
import { testPlatformModels } from './caseAdapter'
import { buildConversationAnswer, isMatchingRetestRun } from './conversationEngine'
import { defenseLayers } from './defenseLayers'
import { calculateAbilityProfile, calculateMetrics, calculateScore, getLearningRecommendations, getStepFeedback, validateAnswer } from './engine'
import type { ConversationRun, ConversationVerdict, ExperimentState, StepAnswer } from './types'

export const reportVerdictLabels: Record<ConversationVerdict, string> = {
  safe: '回答已纠正', unsafe: '存在越狱风险', hallucinated: '存在事实幻觉',
  blocked: '风险已拦截', partial: '部分改善', uncertain: '证据不足', 'residual-risk': '仍有残余风险',
}

export const conversationResponse = (run?: ConversationRun): string => (
  run?.messages.filter((message) => message.role === 'assistant').map((message) => message.content).join('\n\n') ?? ''
)

// Derive the report from saved runs so edits and retests cannot leave a stale report behind.
export const buildExperimentReport = (state: ExperimentState) => {
  const source = state.conversations[state.defenseConfiguration.sourceStage]
  const defense = state.conversations.defense
  const matchingDefense = defense && source?.completed
    && isMatchingRetestRun(defense, source, state.defenseConfiguration.layerIds) ? defense : undefined
  const answers: Record<string, StepAnswer> = {}
  const hints: Record<string, number> = {}
  const records = experimentSteps.map((step) => {
    const run = step.stageId === 'defense' ? matchingDefense : state.conversations[step.stageId]
    const answer = run?.completed && run.verdict && run.selectedEvidence.length ? buildConversationAnswer(run) : undefined
    const confirmed = state.completedStepIds.includes(step.id) && validateAnswer(step, answer)
    if (confirmed && answer) {
      answers[step.id] = answer
      hints[step.id] = state.hints[step.id] ?? 0
    }
    const model = testPlatformModels.find((item) => item.id === run?.modelId)
    return {
      stageId: step.stageId,
      title: step.title,
      run,
      confirmed,
      status: confirmed ? '已完成' : run?.completed ? '待确认完成' : run ? '待保存证据与判定' : '尚未测试',
      modelLabel: model ? `${model.name} · ${model.version}` : run?.modelId ?? '尚未选择',
      response: conversationResponse(run),
      feedback: confirmed && answer ? getStepFeedback(step, answer) : undefined,
    }
  })
  const profile = calculateAbilityProfile(answers, hints)
  const layers = defenseLayers[state.defenseConfiguration.sourceStage].map((layer) => {
    const enabled = state.defenseConfiguration.layerIds.includes(layer.id)
    const trace = matchingDefense?.defenseTrace.find((item) => item.id === layer.id)
    const stoppedEarlier = matchingDefense?.sourceCategory === 'jailbreak'
      && matchingDefense.defenseTrace.some((item) => item.id < layer.id && item.illegal)
    return {
      ...layer,
      enabled,
      trace,
      status: !enabled ? '未开启'
        : !matchingDefense ? '待复测'
          : !trace ? stoppedEarlier ? '前序已拦截，未执行' : '无执行记录'
            : trace.illegal ? matchingDefense.sourceCategory === 'hallucination' ? '发现并纠正事实风险' : '已拦截风险'
              : '未检出风险',
    }
  })
  const isComplete = state.status === 'completed' && records.every((record) => record.confirmed)
  return {
    id: state.sessionId,
    isComplete,
    completedAt: isComplete ? state.completedAt : null,
    completedCount: records.filter((record) => record.confirmed).length,
    score: calculateScore(answers, hints),
    metrics: calculateMetrics(answers),
    profile,
    recommendations: getLearningRecommendations(profile),
    records,
    attacks: records.filter((record) => record.stageId !== 'defense'),
    defense: records[2],
    layers,
    enabledLayerCount: layers.filter((layer) => layer.enabled).length,
    baselineResponse: matchingDefense ? conversationResponse(source) : undefined,
  }
}

export type ExperimentReportRecord = ReturnType<typeof buildExperimentReport>['records'][number]
