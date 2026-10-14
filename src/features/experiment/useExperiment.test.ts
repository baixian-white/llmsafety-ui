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

  it('requires a new assessment after the same conversation stage is sent again', () => {
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
    const firstRun = createConversationRun(caseData, {
      stageId: 'jailbreak',
      sentPrompt: '第一次发送',
      defenseEnabled: false,
    })
    store.setConversationRun('jailbreak', firstRun)
    store.updateConversationAssessment('jailbreak', [firstRun.evidenceCandidates[0]], 'unsafe')
    store.state.value.completedStepIds.push('jailbreak-verdict')
    store.state.value.feedback['jailbreak-verdict'] = {
      severity: 'success',
      title: '已完成',
      message: '旧一轮对话已经完成判定。',
      knowledge: '旧知识反馈',
      earnedPoints: 4,
      maxPoints: 4,
    }
    expect(store.state.value.answers['jailbreak-verdict']).toBeDefined()

    const secondRun = createConversationRun(caseData, {
      stageId: 'jailbreak',
      sentPrompt: '第二次发送',
      defenseEnabled: false,
    })
    store.setConversationRun('jailbreak', secondRun)

    expect(store.state.value.answers['jailbreak-verdict']).toBeUndefined()
    expect(store.state.value.completedStepIds).not.toContain('jailbreak-verdict')
    expect(store.state.value.feedback['jailbreak-verdict']).toBeUndefined()
    expect(store.state.value.conversations.jailbreak?.sentPrompt).toBe('第二次发送')
  })

  it('invalidates a saved defense retest when an upstream attack conversation changes', () => {
    const store = createExperimentStore(storage)
    const caseData: ExperimentCase = {
      id: 'jailbreak-qwen-max-1',
      category: 'jailbreak',
      modelId: 'qwen-max',
      title: '原平台注入案例',
      question: '原始问题',
      prompt: '原始提示词',
      baselineResponse: '原始模型回答',
      defenseTests: [],
      tags: ['原平台案例', '指令覆盖'],
    }
    const attackRun = createConversationRun(caseData, {
      stageId: 'injection',
      sentPrompt: '攻击提示词一',
      defenseEnabled: false,
    })
    store.setConversationRun('injection', attackRun)
    const defenseRun = createConversationRun(caseData, {
      stageId: 'defense',
      sentPrompt: attackRun.sentPrompt,
      defenseEnabled: true,
    })
    store.setConversationRun('defense', defenseRun)
    store.updateConversationAssessment('defense', [defenseRun.evidenceCandidates[0]], 'unsafe')
    expect(store.state.value.answers['defense-retest']).toBeDefined()

    const changedAttackRun = createConversationRun(caseData, {
      stageId: 'injection',
      sentPrompt: '攻击提示词二',
      defenseEnabled: false,
    })
    store.setConversationRun('injection', changedAttackRun)

    expect(store.state.value.conversations.defense).toBeUndefined()
    expect(store.state.value.answers['defense-retest']).toBeUndefined()
  })

  it('drops a stale defense retest while restoring persisted browser state', () => {
    const store = createExperimentStore(storage)
    const caseData: ExperimentCase = {
      id: 'jailbreak-qwen-max-1',
      category: 'jailbreak',
      modelId: 'qwen-max',
      title: '原平台注入案例',
      question: '原始问题',
      prompt: '原始提示词',
      baselineResponse: '原始模型回答',
      defenseTests: [],
      tags: ['原平台案例', '指令覆盖'],
    }
    const attackRun = createConversationRun(caseData, {
      stageId: 'injection',
      sentPrompt: '攻击提示词一',
      defenseEnabled: false,
    })
    store.setConversationRun('injection', attackRun)
    store.updateConversationAssessment('injection', [attackRun.evidenceCandidates[0]], 'injected')
    const defenseRun = createConversationRun(caseData, {
      stageId: 'defense',
      sentPrompt: attackRun.sentPrompt,
      defenseEnabled: true,
    })
    store.setConversationRun('defense', defenseRun)
    store.updateConversationAssessment('defense', [defenseRun.evidenceCandidates[0]], 'unsafe')

    const stale = JSON.parse(storage.getItem(EXPERIMENT_STORAGE_KEY) || '{}')
    stale.conversations.injection.sentPrompt = '后来修改的攻击提示词'
    stale.completedStepIds.push('defense-retest')
    stale.feedback['defense-retest'] = {
      severity: 'success',
      title: '已完成',
      message: '旧防御复测已经完成。',
      knowledge: '旧知识反馈',
      earnedPoints: 3.3,
      maxPoints: 3.3,
    }
    stale.status = 'completed'
    stale.completedAt = '2026-10-14T12:00:00.000Z'
    stale.currentStepIndex = 31
    storage.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify(stale))

    const restored = createExperimentStore(storage)
    expect(restored.state.value.conversations.defense).toBeUndefined()
    expect(restored.state.value.answers['defense-retest']).toBeUndefined()
    expect(restored.state.value.completedStepIds).not.toContain('defense-retest')
    expect(restored.state.value.feedback['defense-retest']).toBeUndefined()
    expect(restored.state.value.status).toBe('in-progress')
    expect(restored.state.value.completedAt).toBeNull()
    expect(restored.state.value.currentStepIndex).toBe(25)

    const normalized = JSON.parse(storage.getItem(EXPERIMENT_STORAGE_KEY) || '{}')
    expect(normalized.conversations.defense).toBeUndefined()
    expect(normalized.answers['defense-retest']).toBeUndefined()
    expect(normalized.completedStepIds).not.toContain('defense-retest')
    expect(normalized.feedback['defense-retest']).toBeUndefined()
    expect(normalized.status).toBe('in-progress')
    expect(normalized.completedAt).toBeNull()
    expect(normalized.currentStepIndex).toBe(25)
  })
})
