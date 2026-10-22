import { describe, expect, it } from 'vitest'
import { experimentStages, experimentSteps } from './catalog'
import { buildDemoAnswers, calculateAbilityProfile, calculateMetrics, calculateScore, createInitialState, getStepFeedback, validateAnswer } from './engine'
import type { ConversationAnswer } from './types'

describe('three-stage student workflow', () => {
  it('requires only two attack tests and one defense retest, totaling 100 points', () => {
    expect(experimentStages.map(stage => stage.id)).toEqual(['jailbreak', 'hallucination', 'defense'])
    expect(experimentSteps.map(step => step.conversationStage)).toEqual(['jailbreak', 'hallucination', 'defense'])
    expect(experimentSteps.map(step => step.number)).toEqual([1, 2, 3])
    expect(experimentSteps.reduce((sum, step) => sum + step.weight, 0)).toBe(100)
    expect(experimentStages.reduce((sum, stage) => sum + stage.maxScore, 0)).toBe(100)
  })

  it('requires a sent case with evidence and the matching stage', () => {
    const answer = buildDemoAnswers()['jailbreak-verdict'] as ConversationAnswer
    expect(validateAnswer(experimentSteps[0], answer)).toBe(true)
    expect(validateAnswer(experimentSteps[0], '')).toBe(false)
    expect(validateAnswer(experimentSteps[0], { ...answer, evidenceCount: 0 })).toBe(false)
    expect(validateAnswer(experimentSteps[1], answer)).toBe(false)
  })

  it('requires at least one enabled defense layer to finish the defense task', () => {
    const answer = buildDemoAnswers()['defense-retest'] as ConversationAnswer
    expect(validateAnswer(experimentSteps[2], answer)).toBe(true)
    expect(validateAnswer(experimentSteps[2], { ...answer, selectedDefenseIds: [] })).toBe(false)
  })

  it('scores evidence-based judgments, including accurately identified defense failures', () => {
    const answer = buildDemoAnswers()['defense-retest'] as ConversationAnswer
    expect(getStepFeedback(experimentSteps[2], { ...answer, verdict: 'unsafe', expectedVerdict: 'unsafe' }).earnedPoints).toBe(40)
    expect(getStepFeedback(experimentSteps[2], { ...answer, verdict: 'unsafe' }).earnedPoints).toBeLessThan(40)
  })

  it('ignores hints and answers from removed stages', () => {
    const answers = buildDemoAnswers()
    const score = calculateScore(answers, { 'injection-run': 10, 'model-profile': 2 })
    expect(score.total).toBe(100)
    expect(score.completedSteps).toBe(3)
    expect(score.stageScores).toHaveLength(3)
    expect(calculateScore(answers, { 'jailbreak-verdict': 10 }).total).toBe(98.5)
    const profile = calculateAbilityProfile(answers, {})
    expect(profile).toHaveLength(5)
    expect(profile.every(item => item.score === 100 && item.stepIds.length > 0)).toBe(true)
  })

  it('creates a fresh configurable state', () => {
    const state = createInitialState()
    expect(state.version).toBe(2)
    expect(state.status).toBe('not-started')
    expect(state.defenseConfiguration).toEqual({ sourceStage: 'jailbreak', layerIds: [0, 1, 2] })
  })
})

describe('case comparison results', () => {
  it('does not assign results to tests that have not run', () => {
    const metrics = calculateMetrics({})
    expect(metrics.cases.every(item => item.before === null && item.after === null)).toBe(true)
    expect(metrics.conclusion).toBe('待完成防御复测')
  })

  it('shows a defense result only for the matching case, leaving the other risk untested', () => {
    const metrics = calculateMetrics(buildDemoAnswers())
    expect(metrics.cases[0]).toMatchObject({ before: 'unsafe', after: 'blocked' })
    expect(metrics.cases[1]).toMatchObject({ before: 'hallucinated', after: null })
    expect(metrics.enabledLayerCount).toBe(3)
    expect(metrics.conclusion).toBe('本案例防御有效')
  })

  it('reports remaining risk and rejects a comparison against a different case', () => {
    const answers = buildDemoAnswers()
    const defense = answers['defense-retest'] as ConversationAnswer
    answers['defense-retest'] = { ...defense, verdict: 'unsafe', expectedVerdict: 'unsafe' }
    expect(calculateMetrics(answers).conclusion).toBe('本案例仍存在风险')
    answers['defense-retest'] = { ...defense, caseId: 'different-case' }
    expect(calculateMetrics(answers).cases.every(item => item.after === null)).toBe(true)
  })
})
