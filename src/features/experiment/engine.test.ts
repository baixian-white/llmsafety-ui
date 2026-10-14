import { describe, expect, it } from 'vitest'
import { experimentStages, experimentSteps } from './catalog'
import {
  calculateAbilityProfile,
  calculateMetrics,
  calculateScore,
  createInitialState,
  getStepFeedback,
  validateAnswer,
} from './engine'
import type { StepAnswer } from './types'

describe('experiment catalog', () => {
  it('contains seven stages and exactly thirty-two meaningful operations', () => {
    expect(experimentStages).toHaveLength(7)
    expect(experimentSteps).toHaveLength(32)
    expect(experimentStages.reduce((sum, stage) => sum + stage.maxScore, 0)).toBe(100)

    const counts = experimentStages.map(
      (stage) => experimentSteps.filter((step) => step.stageId === stage.id).length,
    )
    expect(counts).toEqual([4, 4, 5, 5, 4, 6, 4])
  })
})

describe('answer validation and feedback', () => {
  const modelStep = () => experimentSteps.find((step) => step.id === 'model-profile')!

  it('rejects empty answers and accepts an available option', () => {
    expect(validateAnswer(modelStep(), '')).toBe(false)
    expect(validateAnswer(modelStep(), 'deepseek-r1')).toBe(true)
    expect(validateAnswer(modelStep(), 'unknown-model')).toBe(false)
  })

  it('returns different feedback for different choices', () => {
    const balanced = getStepFeedback(modelStep(), 'deepseek-r1')
    const open = getStepFeedback(modelStep(), 'ernie-turbo')

    expect(balanced.message).not.toBe(open.message)
    expect(balanced.earnedPoints).toBeGreaterThan(open.earnedPoints)
  })

  it('requires a sent conversation, evidence and verdict for chat operations', () => {
    const chatStep = experimentSteps.find((step) => step.id === 'jailbreak-verdict')!
    const completeAnswer = {
      stageId: 'jailbreak' as const,
      caseId: 'jailbreak-qwen-max-1',
      sent: true as const,
      evidenceCount: 1,
      verdict: 'unsafe' as const,
      expectedVerdict: 'unsafe' as const,
    }

    expect(chatStep.conversationStage).toBe('jailbreak')
    expect(validateAnswer(chatStep, 'success')).toBe(false)
    expect(validateAnswer(chatStep, { ...completeAnswer, evidenceCount: 0 })).toBe(false)
    expect(validateAnswer(chatStep, completeAnswer)).toBe(true)
    expect(getStepFeedback(chatStep, completeAnswer).earnedPoints).toBe(chatStep.weight)
    expect(getStepFeedback(chatStep, { ...completeAnswer, verdict: 'safe' }).earnedPoints)
      .toBeLessThan(chatStep.weight)
  })
})

describe('deterministic defense simulation', () => {
  const weakDefense: Record<string, StepAnswer> = {
    'input-detection': 'keyword-only',
    'prompt-protection': 'priority-only',
    'output-filter': 'basic-filter',
    'defense-balance': 35,
  }

  const strongDefense: Record<string, StepAnswer> = {
    'input-detection': 'semantic-risk',
    'prompt-protection': 'instruction-isolation',
    'output-filter': 'strict-filter',
    'defense-balance': 82,
  }

  it('reduces attack success while exposing an availability trade-off', () => {
    const weak = calculateMetrics(weakDefense)
    const strong = calculateMetrics(strongDefense)

    expect(weak.jailbreakSuccessRate).toBeGreaterThan(strong.jailbreakSuccessRate)
    expect(weak.injectionSuccessRate).toBeGreaterThan(strong.injectionSuccessRate)
    expect(weak.harmfulPassRate).toBeGreaterThan(strong.harmfulPassRate)
    expect(strong.falsePositiveRate).toBeGreaterThan(weak.falsePositiveRate)
    expect(strong.usabilityScore).toBeLessThan(weak.usabilityScore)
  })

  it('returns the same result for the same answer set', () => {
    expect(calculateMetrics(strongDefense)).toEqual(calculateMetrics(strongDefense))
  })
})

describe('score and ability profile', () => {
  it('starts with an empty traceable state', () => {
    const state = createInitialState()

    expect(state.version).toBe(1)
    expect(state.currentStepIndex).toBe(0)
    expect(state.answers).toEqual({})
    expect(state.status).toBe('not-started')
  })

  it('awards points for completed answers and applies a capped hint penalty', () => {
    const answers: Record<string, StepAnswer> = {
      'model-profile': 'deepseek-r1',
      'critical-assets': ['system-prompt', 'private-data'],
      'test-scope': ['jailbreak', 'hallucination', 'injection'],
    }
    const withoutHint = calculateScore(answers, {})
    const withHints = calculateScore(answers, {
      'model-profile': 10,
      'critical-assets': 10,
      'test-scope': 10,
    })

    expect(withoutHint.total).toBeGreaterThan(0)
    expect(withHints.total).toBeLessThan(withoutHint.total)
    expect(withoutHint.total - withHints.total).toBeLessThanOrEqual(6)
  })

  it('produces bounded ability dimensions from step scores', () => {
    const answers: Record<string, StepAnswer> = Object.fromEntries(
      experimentSteps
        .filter((step) => step.options?.length)
        .map((step) => [step.id, step.options![0].value]),
    )
    const profile = calculateAbilityProfile(answers, {})

    expect(profile).toHaveLength(5)
    for (const dimension of profile) {
      expect(dimension.score).toBeGreaterThanOrEqual(0)
      expect(dimension.score).toBeLessThanOrEqual(100)
      expect(dimension.stepIds.length).toBeGreaterThan(0)
    }
  })
})
