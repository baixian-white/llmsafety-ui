import { beforeEach, describe, expect, it } from 'vitest'
import { createExperimentStore, EXPERIMENT_STORAGE_KEY } from './useExperiment'
import { createConversationRun } from './conversationEngine'
import { jailbreakCase, hallucinationCase } from './testFixtures'
import type { ConversationStage } from './types'

class MemoryStorage implements Storage {
  private values = new Map<string, string>()
  get length() { return this.values.size }
  clear() { this.values.clear() }
  getItem(key: string) { return this.values.get(key) ?? null }
  key(index: number) { return [...this.values.keys()][index] ?? null }
  removeItem(key: string) { this.values.delete(key) }
  setItem(key: string, value: string) { this.values.set(key, value) }
}

type Store = ReturnType<typeof createExperimentStore>
const assess = (store: Store, stage: ConversationStage) => {
  const source = store.state.value.defenseConfiguration.sourceStage
  const data = stage === 'hallucination' || (stage === 'defense' && source === 'hallucination') ? hallucinationCase : jailbreakCase
  const run = createConversationRun(data, { stageId: stage, sentPrompt: data.prompt, defenseEnabled: stage === 'defense', selectedDefenseIds: store.state.value.defenseConfiguration.layerIds })
  store.setConversationRun(stage, run)
  store.updateConversationAssessment(stage, [run.evidenceCandidates[0]], run.expectedVerdict)
  return run
}
const completeAttacks = (store: Store) => {
  assess(store, 'jailbreak')
  expect(store.completeCurrentStep()).toBe(true)
  assess(store, 'hallucination')
  expect(store.completeCurrentStep()).toBe(true)
}

describe('student progress and defense configuration', () => {
  let storage: Storage
  beforeEach(() => { storage = new MemoryStorage() })

  it('starts directly at jailbreak and blocks completion and navigation before assessment', () => {
    const store = createExperimentStore(storage)
    expect(store.currentStage.value.id).toBe('jailbreak')
    expect(store.goToStep(1)).toBe(false)
    expect(store.completeCurrentStep()).toBe(false)
    const run = createConversationRun(jailbreakCase, { stageId: 'jailbreak', sentPrompt: jailbreakCase.prompt, defenseEnabled: false })
    store.setConversationRun('jailbreak', run)
    expect(store.completeCurrentStep()).toBe(false)
    store.updateConversationAssessment('jailbreak', ['not a candidate'], 'unsafe')
    expect(store.completeCurrentStep()).toBe(false)
  })

  it('finishes after two attacks and one configured defense, and survives reload', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    expect(store.currentStage.value.id).toBe('defense')
    store.setDefenseConfiguration({ sourceStage: 'jailbreak', layerIds: [1] })
    assess(store, 'defense')
    expect(store.completeCurrentStep()).toBe(true)
    expect(store.state.value.status).toBe('completed')
    expect(store.progress.value).toBe(100)
    expect(store.score.value.total).toBe(100)
    const restored = createExperimentStore(storage)
    expect(restored.state.value.status).toBe('completed')
    expect(restored.state.value.defenseConfiguration.layerIds).toEqual([1])
    expect(restored.state.value.conversations.defense?.selectedDefenseIds).toEqual([1])
    expect(restored.score.value.total).toBe(100)
  })

  it('allows either previously tested case to be selected for defense', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    store.setDefenseConfiguration({ sourceStage: 'hallucination', layerIds: [0] })
    assess(store, 'defense')
    expect(store.metrics.value.cases[1].after).toBe('safe')
    expect(store.metrics.value.cases[0].after).toBeNull()
    expect(store.completeCurrentStep()).toBe(true)
    expect(createExperimentStore(storage).state.value.defenseConfiguration.sourceStage).toBe('hallucination')
  })

  it('permits an all-off comparison but requires an enabled layer to finish', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    store.setDefenseConfiguration({ sourceStage: 'jailbreak', layerIds: [] })
    assess(store, 'defense')
    expect(store.state.value.conversations.defense?.defenseEnabled).toBe(false)
    expect(store.completeCurrentStep()).toBe(false)
    expect(store.state.value.status).toBe('in-progress')
  })

  it('invalidates completed defense results when a layer changes, while keeping both attacks', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    assess(store, 'defense')
    store.completeCurrentStep()
    store.setDefenseConfiguration({ sourceStage: 'jailbreak', layerIds: [0] })
    expect(store.state.value.status).toBe('in-progress')
    expect(store.state.value.completedAt).toBeNull()
    expect(store.state.value.currentStepIndex).toBe(2)
    expect(store.state.value.completedStepIds).toEqual(['jailbreak-verdict', 'hallucination-run'])
    expect(store.state.value.answers['defense-retest']).toBeUndefined()
    expect(store.state.value.feedback['defense-retest']).toBeUndefined()
    expect(store.state.value.conversations.defense).toBeUndefined()
    expect(store.completeCurrentStep()).toBe(false)
    expect(createExperimentStore(storage).state.value.defenseConfiguration.layerIds).toEqual([0])
  })

  it('invalidates defense evidence when switching the source case', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    assess(store, 'defense')
    store.setDefenseConfiguration({ sourceStage: 'hallucination', layerIds: [0, 1, 2] })
    expect(store.state.value.conversations.defense).toBeUndefined()
    expect(store.state.value.answers['defense-retest']).toBeUndefined()
  })

  it('invalidates attack and defense results when an attack is rerun', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    assess(store, 'defense')
    store.completeCurrentStep()
    const newRun = createConversationRun(jailbreakCase, { stageId: 'jailbreak', sentPrompt: 'changed prompt', defenseEnabled: false })
    store.setConversationRun('jailbreak', newRun)
    expect(store.state.value.currentStepIndex).toBe(0)
    expect(store.state.value.answers['jailbreak-verdict']).toBeUndefined()
    expect(store.state.value.answers['defense-retest']).toBeUndefined()
    expect(store.state.value.conversations.defense).toBeUndefined()
    expect(store.state.value.status).toBe('in-progress')
    expect(store.canCompleteCurrentStep.value).toBe(false)
  })

  it('rejects a defense run that does not match the source or switches', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    const wrong = createConversationRun(jailbreakCase, { stageId: 'defense', sentPrompt: 'wrong prompt', defenseEnabled: true })
    store.setConversationRun('defense', wrong)
    expect(store.state.value.conversations.defense).toBeUndefined()
    store.setConversationRun('defense', { ...wrong, sentPrompt: jailbreakCase.prompt, selectedDefenseIds: [0] })
    expect(store.state.value.conversations.defense).toBeUndefined()
  })

  it('drops stale defense records on restore and persists the repair', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    assess(store, 'defense')
    store.completeCurrentStep()
    const stale = JSON.parse(storage.getItem(EXPERIMENT_STORAGE_KEY)!)
    stale.conversations.jailbreak.sentPrompt = 'changed after defense'
    storage.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify(stale))
    const restored = createExperimentStore(storage)
    expect(restored.state.value.conversations.defense).toBeUndefined()
    expect(restored.state.value.answers['defense-retest']).toBeUndefined()
    expect(restored.state.value.currentStepIndex).toBe(2)
    expect(restored.state.value.status).toBe('in-progress')
    expect(JSON.parse(storage.getItem(EXPERIMENT_STORAGE_KEY)!).conversations.defense).toBeUndefined()
  })

  it('migrates legacy progress by retained task IDs, never by the obsolete numeric index', () => {
    const store = createExperimentStore(storage)
    completeAttacks(store)
    assess(store, 'defense')
    const legacy = JSON.parse(storage.getItem(EXPERIMENT_STORAGE_KEY)!)
    legacy.version = 1
    legacy.currentStepIndex = 31
    legacy.status = 'completed'
    legacy.completedStepIds.push('model-profile', 'injection-run', 'defense-retest', 'final-conclusion')
    legacy.answers['injection-run'] = 'old injection answer'
    legacy.hints['injection-run'] = 20
    legacy.conversations.injection = { ...legacy.conversations.jailbreak, stageId: 'injection' }
    delete legacy.defenseConfiguration
    for (const run of Object.values(legacy.conversations) as Array<Record<string, unknown>>) delete run.selectedDefenseIds
    storage.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify(legacy))
    const restored = createExperimentStore(storage)
    expect(restored.state.value.version).toBe(2)
    expect(restored.currentStep.value.id).toBe('defense-retest')
    expect(restored.state.value.completedStepIds).toEqual(['jailbreak-verdict', 'hallucination-run'])
    expect(restored.state.value.answers['injection-run']).toBeUndefined()
    expect(Object.keys(restored.state.value.conversations)).toEqual(['jailbreak', 'hallucination'])
    expect(restored.score.value.hintPenalty).toBe(0)
    expect(restored.score.value.total).toBe(60)
    expect(restored.state.value.status).toBe('in-progress')
    expect(restored.restoreWarning.value).toContain('精简')
  })

  it('returns legacy students without attack evidence to the first required test', () => {
    storage.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify({ version: 1, sessionId: 'old', currentStepIndex: 18, status: 'in-progress', answers: { 'model-profile': 'qwen-max' }, completedStepIds: ['model-profile'], conversations: {} }))
    const store = createExperimentStore(storage)
    expect(store.currentStep.value.id).toBe('jailbreak-verdict')
    expect(store.progress.value).toBe(0)
  })

  it('persists hints, resets records and recovers invalid snapshots', () => {
    const store = createExperimentStore(storage)
    store.useHint()
    store.setGuideEnabled(false)
    expect(createExperimentStore(storage).state.value.hints['jailbreak-verdict']).toBe(1)
    store.resetExperiment()
    expect(store.state.value.answers).toEqual({})
    expect(store.state.value.status).toBe('not-started')
    storage.setItem(EXPERIMENT_STORAGE_KEY, '{invalid')
    expect(createExperimentStore(storage).restoreWarning.value).toContain('无法恢复')
    storage.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify({ version: 99 }))
    expect(createExperimentStore(storage).restoreWarning.value).toContain('版本')
  })
})
