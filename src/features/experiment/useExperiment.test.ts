import { beforeEach, describe, expect, it } from 'vitest'
import { createExperimentStore, EXPERIMENT_STORAGE_KEY } from './useExperiment'
import { createConversationRun } from './conversationEngine'
import type { ExperimentCase } from './types'

class MemoryStorage implements Storage {
  private values = new Map<string, string>()
  get length() { return this.values.size }
  clear() { this.values.clear() }
  getItem(key: string) { return this.values.get(key) ?? null }
  key(index: number) { return [...this.values.keys()][index] ?? null }
  removeItem(key: string) { this.values.delete(key) }
  setItem(key: string, value: string) { this.values.set(key, value) }
}

describe('experiment store persistence', () => {
  let storage: Storage

  beforeEach(() => {
    storage = new MemoryStorage()
  })

  it('starts at the first operation and persists a valid answer', () => {
    const store = createExperimentStore(storage)

    expect(store.currentStep.value.number).toBe(1)
    store.startExperiment()
    store.setAnswer('deepseek-r1')
    expect(store.canCompleteCurrentStep.value).toBe(true)
    store.completeCurrentStep()

    const restored = createExperimentStore(storage)
    expect(restored.state.value.answers['model-profile']).toBe('deepseek-r1')
    expect(restored.state.value.currentStepIndex).toBe(1)
    expect(restored.state.value.completedStepIds).toContain('model-profile')
  })

  it('does not advance when the current operation is incomplete', () => {
    const store = createExperimentStore(storage)
    store.startExperiment()

    expect(store.completeCurrentStep()).toBe(false)
    expect(store.state.value.currentStepIndex).toBe(0)
  })

  it('records hint use and can reopen the guide', () => {
    const store = createExperimentStore(storage)
    store.useHint()
    store.setGuideEnabled(false)
    store.setGuideEnabled(true)

    expect(store.state.value.hints['model-profile']).toBe(1)
    expect(store.state.value.guideEnabled).toBe(true)
  })

  it('resets persisted progress', () => {
    const store = createExperimentStore(storage)
    store.startExperiment()
    store.setAnswer('deepseek-r1')
    store.completeCurrentStep()
    store.resetExperiment()

    expect(store.state.value.answers).toEqual({})
    expect(store.state.value.currentStepIndex).toBe(0)
    expect(store.state.value.status).toBe('not-started')
  })

  it('recovers from invalid saved JSON without crashing', () => {
    storage.setItem(EXPERIMENT_STORAGE_KEY, '{invalid json')
    const store = createExperimentStore(storage)

    expect(store.state.value.currentStepIndex).toBe(0)
    expect(store.restoreWarning.value).toContain('无法恢复')
  })

  it('rejects a snapshot from an unsupported version', () => {
    storage.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify({ version: 99, answers: {} }))
    const store = createExperimentStore(storage)

    expect(store.state.value.version).toBe(1)
    expect(store.restoreWarning.value).toContain('版本')
  })

  it('persists a completed chat run and clears it on reset', () => {
    const store = createExperimentStore(storage)
    const caseData: ExperimentCase = {
      id: 'jailbreak-qwen-max-1',
      category: 'jailbreak',
      modelId: 'qwen-max',
      title: '原平台越狱案例',
      question: '原始问题',
      prompt: '原始提示词',
      baselineResponse: '原始模型回答',
      defenseTests: [],
      tags: ['原平台案例'],
    }
    const run = createConversationRun(caseData, {
      stageId: 'jailbreak',
      sentPrompt: '学生编辑后的提示词',
      defenseEnabled: false,
    })

    store.setConversationRun('jailbreak', run)
    store.updateConversationAssessment('jailbreak', [run.evidenceCandidates[0]], 'unsafe')

    const restored = createExperimentStore(storage)
    expect(restored.state.value.conversations.jailbreak?.sentPrompt).toBe('学生编辑后的提示词')
    expect(restored.state.value.answers['jailbreak-verdict']).toMatchObject({
      sent: true,
      evidenceCount: 1,
      verdict: 'unsafe',
    })

    restored.resetExperiment()
    expect(restored.state.value.conversations).toEqual({})
  })
})
