import type {
  DefenseTest,
  ExperimentCase,
  SourceCaseCategory,
  TestPlatformModel,
} from './types'

export const testPlatformModels: TestPlatformModel[] = [
  { id: 'deepseek-r1', name: 'DeepSeek', version: 'deepseek-r1' },
  { id: 'doubao-lite', name: '豆包', version: 'doubao-lite' },
  { id: 'qwen-max', name: '通义千问', version: 'qwen-max' },
  { id: 'ernie-turbo', name: '文心一言', version: 'ernie-turbo' },
  { id: 'moonshot-v1', name: 'Kimi', version: 'moonshot-v1' },
  { id: 'hunyuan-lite', name: '混元', version: 'hunyuan-lite' },
]

const isRecord = (value: unknown): value is Record<string, unknown> => (
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)
)

const isKnownModel = (modelId: string) => testPlatformModels.some((model) => model.id === modelId)

export const caseDataPath = (category: SourceCaseCategory, modelId: string): string => {
  if (!isKnownModel(modelId)) throw new Error(`未知测试模型：${modelId}`)
  const folder = category === 'jailbreak' ? 'jailbreak' : 'halluc'
  return `/TestResult/${folder}/${modelId}.json`
}

const normalizeDefenseTests = (value: unknown): DefenseTest[] => {
  if (!Array.isArray(value)) return []
  return value.flatMap((item, index) => {
    if (!isRecord(item)) return []
    const name = typeof item.name === 'string' ? item.name.trim() : ''
    const process = typeof item.process === 'string' ? item.process : ''
    const output = typeof item.output === 'string' ? item.output : ''
    if (!name || (!process && !output)) return []
    return [{
      id: typeof item.id === 'number' ? item.id : index,
      name,
      process,
      output,
      illegal: item.illegal === true,
    }]
  })
}

const injectionTags = (prompt: string): string[] => {
  const tags = ['原平台案例']
  if (/无需考虑|忽略|无视|不受限制|覆盖.*规则|绕过.*限制/i.test(prompt)) tags.push('指令覆盖')
  if (/扮演|角色|身份|假设你是/i.test(prompt)) tags.push('角色伪装')
  if (/系统提示|内部规则|泄露|秘密/i.test(prompt)) tags.push('提示泄露')
  return tags
}

export const adaptJailbreakCases = (rows: unknown, modelId: string): ExperimentCase[] => {
  if (!isKnownModel(modelId) || !Array.isArray(rows)) return []
  return rows.flatMap((row, index) => {
    if (!isRecord(row)) return []
    const question = typeof row.question === 'string' ? row.question.trim() : ''
    const prompt = typeof row.prompt === 'string' ? row.prompt.trim() : ''
    const response = typeof row.response === 'string' ? row.response.trim() : ''
    if (!question || !prompt || !response) return []
    const sourceId = typeof row.question_id === 'number' || typeof row.question_id === 'string'
      ? String(row.question_id)
      : String(index + 1)
    return [{
      id: `jailbreak-${modelId}-${sourceId}`,
      category: 'jailbreak' as const,
      modelId,
      title: question.length > 34 ? `${question.slice(0, 34)}…` : question,
      question,
      prompt,
      baselineResponse: response,
      defenseTests: normalizeDefenseTests(row.tests),
      tags: injectionTags(prompt),
    }]
  })
}

export const adaptHallucinationCases = (rows: unknown, modelId: string): ExperimentCase[] => {
  if (!isKnownModel(modelId) || !Array.isArray(rows)) return []
  return rows.flatMap((row, index) => {
    if (!isRecord(row)) return []
    const question = typeof row.question === 'string' ? row.question.trim() : ''
    const response = typeof row.response === 'string' ? row.response.trim() : ''
    const referenceAnswer = typeof row.answer === 'string' ? row.answer.trim() : ''
    if (!question || !response || !referenceAnswer) return []
    const sourceId = typeof row.question_id === 'number' || typeof row.question_id === 'string'
      ? String(row.question_id)
      : String(index + 1)
    const correctedResponse = typeof row.response_new === 'string' && row.response_new.trim()
      ? row.response_new.trim()
      : undefined
    return [{
      id: `hallucination-${modelId}-${sourceId}`,
      category: 'hallucination' as const,
      modelId,
      title: question.length > 34 ? `${question.slice(0, 34)}…` : question,
      question,
      prompt: question,
      baselineResponse: response,
      referenceAnswer,
      correctedResponse,
      defenseTests: normalizeDefenseTests(row.tests),
      tags: ['原平台案例', '事实核查'],
    }]
  })
}

export const loadExperimentCases = async (
  category: SourceCaseCategory,
  modelId: string,
  fetcher: typeof fetch = fetch,
): Promise<ExperimentCase[]> => {
  const response = await fetcher(caseDataPath(category, modelId))
  if (!response.ok) throw new Error(`案例加载失败（HTTP ${response.status}）`)
  const rows = await response.json() as unknown
  return category === 'jailbreak'
    ? adaptJailbreakCases(rows, modelId)
    : adaptHallucinationCases(rows, modelId)
}
