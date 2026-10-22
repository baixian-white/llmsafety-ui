import { describe, expect, it } from 'vitest'
import { buildExperimentReport } from './report'
import { createExperimentStore } from './useExperiment'
import { createConversationRun } from './conversationEngine'
import { jailbreakCase, hallucinationCase } from './testFixtures'
import type { ConversationStage, ConversationVerdict, ExperimentCase } from './types'

type Store = ReturnType<typeof createExperimentStore>
const assess = (store: Store, stageId: ConversationStage, data: ExperimentCase, verdict?: ConversationVerdict) => {
  const run = createConversationRun(data, {
    stageId, sentPrompt: data.prompt, defenseEnabled: stageId === 'defense',
    selectedDefenseIds: store.state.value.defenseConfiguration.layerIds,
  })
  store.setConversationRun(stageId, run)
  store.updateConversationAssessment(stageId, run.evidenceCandidates.slice(0, 2), verdict ?? run.expectedVerdict)
  return run
}
const completeAttacks = (store: Store, firstCase = jailbreakCase) => {
  assess(store, 'jailbreak', firstCase)
  expect(store.completeCurrentStep()).toBe(true)
  assess(store, 'hallucination', hallucinationCase)
  expect(store.completeCurrentStep()).toBe(true)
}

describe('automatic student experiment report', () => {
  it('shows an empty draft for a new student without substituting demo records', () => {
    const report = buildExperimentReport(createExperimentStore().state.value)
    expect(report.isComplete).toBe(false)
    expect(report.score.total).toBe(0)
    expect(report.completedCount).toBe(0)
    expect(report.records.every((record) => !record.run)).toBe(true)
    expect(report.metrics.cases.every((item) => item.before === null && item.after === null)).toBe(true)
  })

  it('keeps saved but unconfirmed responses in the draft without awarding final scores', () => {
    const store = createExperimentStore()
    assess(store, 'jailbreak', jailbreakCase)
    const report = buildExperimentReport(store.state.value)
    expect(report.attacks[0].response).toBe(jailbreakCase.baselineResponse)
    expect(report.attacks[0].status).toBe('待确认完成')
    expect(report.score.total).toBe(0)
    expect(report.isComplete).toBe(false)
  })

  it('produces a complete report from only three stages and retains full transcripts after reload', () => {
    const saved = new Map<string, string>()
    const storage: Storage = {
      get length() { return saved.size }, clear: () => saved.clear(),
      key: (index) => [...saved.keys()][index] ?? null, removeItem: (key) => { saved.delete(key) },
      getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => { saved.set(key, value) },
    }
    const store = createExperimentStore(storage)
    const longCase = { ...jailbreakCase, prompt: '学生的完整提示词\n保留换行与 <原始文本>。', baselineResponse: '一段完整的教学测试响应。\n'.repeat(100) }
    completeAttacks(store, longCase)
    store.useHint()
    assess(store, 'defense', longCase)
    expect(store.completeCurrentStep()).toBe(true)
    const report = buildExperimentReport(store.state.value)
    expect(report.isComplete).toBe(true)
    expect(report.completedCount).toBe(3)
    expect(report.score.total).toBe(99.3)
    expect(report.attacks[0].run?.sentPrompt).toBe(longCase.prompt)
    expect(report.attacks[0].response).toBe(longCase.baselineResponse)
    expect(report.baselineResponse).toBe(longCase.baselineResponse)
    expect(report.defense.run?.selectedEvidence.length).toBeGreaterThan(0)
    expect(report.defense.modelLabel).toContain('qwen-max')
    expect(report.completedAt).toBe(store.state.value.completedAt)
    expect(buildExperimentReport(createExperimentStore(storage).state.value)).toEqual(report)
  })

  it('distinguishes enabled layers from layers actually reached before early interception', () => {
    const store = createExperimentStore()
    completeAttacks(store)
    assess(store, 'defense', jailbreakCase)
    store.completeCurrentStep()
    const report = buildExperimentReport(store.state.value)
    expect(report.enabledLayerCount).toBe(3)
    expect(report.layers.map((layer) => layer.status)).toEqual(['未检出风险', '已拦截风险', '前序已拦截，未执行'])
    expect(report.defense.run?.defenseTrace).toHaveLength(2)
    expect(report.metrics.cases[1].after).toBeNull()
  })

  it('reports a hallucination correction only for the tested case and selected layer', () => {
    const store = createExperimentStore()
    completeAttacks(store)
    store.setDefenseConfiguration({ sourceStage: 'hallucination', layerIds: [0] })
    assess(store, 'defense', hallucinationCase)
    store.completeCurrentStep()
    const report = buildExperimentReport(store.state.value)
    expect(report.layers.map((layer) => layer.status)).toEqual(['发现并纠正事实风险', '未开启', '未开启'])
    expect(report.baselineResponse).toBe(hallucinationCase.baselineResponse)
    expect(report.defense.response).toBe(hallucinationCase.defenseTests[0].output)
    expect(report.metrics.cases[0].after).toBeNull()
    expect(report.metrics.cases[1].after).toBe('safe')
  })

  it('keeps failed defense outcomes and incorrect student verdicts visible in a completed report', () => {
    const store = createExperimentStore()
    completeAttacks(store)
    store.setDefenseConfiguration({ sourceStage: 'jailbreak', layerIds: [0] })
    assess(store, 'defense', jailbreakCase, 'blocked')
    store.completeCurrentStep()
    const report = buildExperimentReport(store.state.value)
    expect(report.isComplete).toBe(true)
    expect(report.defense.run?.verdict).toBe('blocked')
    expect(report.defense.run?.expectedVerdict).toBe('unsafe')
    expect(report.metrics.conclusion).toBe('本案例仍存在风险')
    expect(report.score.total).toBe(79.2)
  })

  it('returns to a draft without stale defense conclusions when configuration changes', () => {
    const store = createExperimentStore()
    completeAttacks(store)
    assess(store, 'defense', jailbreakCase)
    store.completeCurrentStep()
    store.setDefenseConfiguration({ sourceStage: 'hallucination', layerIds: [2] })
    const report = buildExperimentReport(store.state.value)
    expect(report.isComplete).toBe(false)
    expect(report.completedAt).toBeNull()
    expect(report.completedCount).toBe(2)
    expect(report.defense.run).toBeUndefined()
    expect(report.baselineResponse).toBeUndefined()
    expect(report.metrics.cases.every((item) => item.after === null)).toBe(true)
    expect(report.layers.map((layer) => layer.status)).toEqual(['未开启', '未开启', '待复测'])
  })
})
