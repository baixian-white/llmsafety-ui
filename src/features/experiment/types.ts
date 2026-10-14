export type StageId =
  | 'prepare'
  | 'baseline'
  | 'jailbreak'
  | 'hallucination'
  | 'injection'
  | 'defense'
  | 'conclusion'

export type AbilityId =
  | 'risk-identification'
  | 'attack-design'
  | 'response-analysis'
  | 'defense-configuration'
  | 'comprehensive-decision'

export type StepInputType = 'single' | 'multi' | 'range' | 'text'
export type StepAnswer = string | string[] | number
export type FeedbackSeverity = 'success' | 'info' | 'warning' | 'danger'

export interface ExperimentStage {
  id: StageId
  index: number
  title: string
  shortTitle: string
  description: string
  maxScore: number
  accent: string
}

export interface StepOption {
  value: string
  label: string
  description: string
  scoreRatio: number
  feedback: string
  severity?: FeedbackSeverity
}

export interface ExperimentStep {
  id: string
  number: number
  stageId: StageId
  title: string
  instruction: string
  knowledge: string
  taskMapping: string
  type: StepInputType
  weight: number
  ability: AbilityId | AbilityId[]
  options?: StepOption[]
  minSelections?: number
  maxSelections?: number
  min?: number
  max?: number
  rangeStep?: number
  unit?: string
  idealMin?: number
  idealMax?: number
  minLength?: number
  recommendedKeywords?: string[]
  placeholder?: string
}

export interface StepFeedback {
  severity: FeedbackSeverity
  title: string
  message: string
  knowledge: string
  earnedPoints: number
  maxPoints: number
}

export interface SimulationMetrics {
  jailbreakSuccessRate: number
  injectionSuccessRate: number
  hallucinationRate: number
  harmfulPassRate: number
  falsePositiveRate: number
  usabilityScore: number
}

export interface StageScore {
  stageId: StageId
  title: string
  earned: number
  max: number
}

export interface ScoreSummary {
  total: number
  rawTotal: number
  hintPenalty: number
  completedSteps: number
  stageScores: StageScore[]
  stepScores: Record<string, number>
}

export interface AbilityDimension {
  id: AbilityId
  label: string
  description: string
  score: number
  stepIds: string[]
}

export type AbilityProfile = AbilityDimension[]

export interface ExperimentState {
  version: 1
  sessionId: string
  status: 'not-started' | 'in-progress' | 'completed'
  startedAt: string | null
  completedAt: string | null
  currentStepIndex: number
  answers: Record<string, StepAnswer>
  hints: Record<string, number>
  completedStepIds: string[]
  feedback: Record<string, StepFeedback>
  pretestAnswers: Record<string, string>
  pretestScore: number | null
  guideEnabled: boolean
  elapsedSeconds: number
}

export interface ModelProfile {
  id: string
  name: string
  label: string
  summary: string
  safetyLevel: string
  risk: string
  color: string
}

export interface PretestQuestion {
  id: string
  question: string
  options: Array<{ value: string; label: string }>
  answer: string
  topic: string
}

export interface DashboardStudent {
  id: string
  name: string
  progress: number
  score: number
  status: '已完成' | '进行中' | '待开始'
  weakness: string
}

export type SourceCaseCategory = 'jailbreak' | 'hallucination'

export interface TestPlatformModel {
  id: string
  name: string
  version: string
}

export interface DefenseTest {
  id: number
  name: string
  process: string
  output: string
  illegal: boolean
}

export interface ExperimentCase {
  id: string
  category: SourceCaseCategory
  modelId: string
  title: string
  question: string
  prompt: string
  baselineResponse: string
  referenceAnswer?: string
  correctedResponse?: string
  defenseTests: DefenseTest[]
  tags: string[]
}

export type ConversationStage = 'baseline' | 'jailbreak' | 'hallucination' | 'injection' | 'defense'
export type ConversationVerdict = 'safe' | 'unsafe' | 'hallucinated' | 'injected' | 'blocked'
export type ConversationTone = 'default' | 'danger' | 'warning' | 'success' | 'info'

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  tone: ConversationTone
}

export interface ConversationRun {
  stageId: ConversationStage
  sourceCategory: SourceCaseCategory
  modelId: string
  caseId: string
  caseTitle: string
  question: string
  sentPrompt: string
  defenseEnabled: boolean
  messages: ConversationMessage[]
  defenseTrace: DefenseTest[]
  evidenceCandidates: string[]
  selectedEvidence: string[]
  expectedVerdict: ConversationVerdict
  verdict?: ConversationVerdict
  completed: boolean
}

export interface ConversationAnswer {
  stageId: ConversationStage
  caseId: string
  sent: true
  evidenceCount: number
  verdict: ConversationVerdict
  expectedVerdict: ConversationVerdict
}
