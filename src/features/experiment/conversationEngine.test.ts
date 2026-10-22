import { describe, expect, it } from 'vitest'
import { buildConversationAnswer, createConversationRun, isMatchingRetestRun, selectDefenseTrace } from './conversationEngine'
import { jailbreakCase, hallucinationCase } from './testFixtures'
import type { ExperimentCase } from './types'

const retest = (data: ExperimentCase, ids: number[]) => createConversationRun(data, { stageId: 'defense', sentPrompt: data.prompt, defenseEnabled: true, selectedDefenseIds: ids })
const reply = (run: ReturnType<typeof retest>) => run.messages.find(message => message.role === 'assistant')?.content

describe('case-based defense execution', () => {
  it('preserves the prompt and original response for attack tests', () => {
    const run = createConversationRun(jailbreakCase, { stageId: 'jailbreak', sentPrompt: '编辑过的提示词', defenseEnabled: false })
    expect(run.sentPrompt).toBe('编辑过的提示词')
    expect(reply(run)).toBe(jailbreakCase.baselineResponse)
    expect(run.selectedDefenseIds).toEqual([])
  })

  it('executes only selected layers in order and stops at the first jailbreak block', () => {
    const run = retest(jailbreakCase, [2, 0, 1])
    expect(run.selectedDefenseIds).toEqual([0, 1, 2])
    expect(run.defenseTrace.map(test => test.id)).toEqual([0, 1])
    expect(reply(run)).toBe(jailbreakCase.defenseTests[1].output)
    expect(run.expectedVerdict).toBe('blocked')
    expect(selectDefenseTrace(jailbreakCase, [2]).map(test => test.id)).toEqual([2])
    expect(reply(retest(jailbreakCase, [2]))).toBe(jailbreakCase.defenseTests[2].output)
  })

  it('reports the actual risk when the enabled layer does not block', () => {
    const run = retest(jailbreakCase, [0])
    expect(run.expectedVerdict).toBe('unsafe')
    expect(reply(run)).toBe(jailbreakCase.baselineResponse)
  })

  it.each([jailbreakCase, hallucinationCase])('uses the unchanged response with all switches off: $category', data => {
    const run = retest(data, [])
    expect(run.defenseEnabled).toBe(false)
    expect(run.defenseTrace).toEqual([])
    expect(reply(run)).toBe(data.baselineResponse)
    expect(run.expectedVerdict).toBe(data.category === 'jailbreak' ? 'unsafe' : 'hallucinated')
  })

  it('uses a selected hallucination layer output, reserving the full correction for the full chain', () => {
    const single = retest(hallucinationCase, [0])
    expect(reply(single)).toBe(hallucinationCase.defenseTests[0].output)
    expect(single.expectedVerdict).toBe('safe')
    expect(reply(retest(hallucinationCase, [0, 1, 2]))).toBe(hallucinationCase.correctedResponse)
    expect(retest(hallucinationCase, [0, 1, 2]).defenseTrace).toHaveLength(3)
  })

  it('does not invent a correction when enabled layers have no correction evidence', () => {
    const run = retest(hallucinationCase, [2])
    expect(run.expectedVerdict).toBe('hallucinated')
    expect(reply(run)).toBe(hallucinationCase.baselineResponse)
    expect(reply(retest({ ...hallucinationCase, defenseTests: [] }, [0, 1, 2]))).toBe(hallucinationCase.baselineResponse)
  })

  it('ignores duplicate, invalid and unavailable defense IDs', () => {
    const run = retest({ ...jailbreakCase, defenseTests: [jailbreakCase.defenseTests[0]] }, [-1, 0, 0, 2, 3, 1.5])
    expect(run.selectedDefenseIds).toEqual([0])
    expect(run.defenseTrace).toHaveLength(1)
  })

  it('matches retests against model, category, case, prompt and layer configuration', () => {
    const source = createConversationRun(jailbreakCase, { stageId: 'jailbreak', sentPrompt: jailbreakCase.prompt, defenseEnabled: false })
    const run = retest(jailbreakCase, [0, 1])
    expect(isMatchingRetestRun(run, source, [1, 0])).toBe(true)
    expect(isMatchingRetestRun(run, source, [0])).toBe(false)
    for (const change of [{ modelId: 'other' }, { caseId: 'other' }, { sentPrompt: 'different' }, { sourceCategory: 'hallucination' as const }]) {
      expect(isMatchingRetestRun(run, { ...source, ...change })).toBe(false)
    }
  })

  it('requires evidence and a verdict and records the chosen layers in the answer', () => {
    const run = retest(jailbreakCase, [1])
    expect(() => buildConversationAnswer(run)).toThrow()
    run.selectedEvidence = [run.evidenceCandidates[0]]
    run.verdict = 'blocked'
    run.completed = true
    expect(buildConversationAnswer(run)).toMatchObject({ stageId: 'defense', sourceCategory: 'jailbreak', selectedDefenseIds: [1], evidenceCount: 1, verdict: 'blocked' })
  })
})
