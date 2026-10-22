import type { SourceCaseCategory } from './types'

export const defenseLayers = {
  jailbreak: [
    { id: 0, name: '输入层', description: '检查提示词中的攻击意图与风险表达。' },
    { id: 1, name: '模型层', description: '识别角色伪装，保持模型安全边界。' },
    { id: 2, name: '输出层', description: '审核生成内容，拦截高风险回答。' },
  ],
  hallucination: [
    { id: 0, name: '知识层', description: '检索参考知识，核验问题前提与事实。' },
    { id: 1, name: '推理层', description: '交叉验证回答，检查推理是否一致。' },
    { id: 2, name: '输出层', description: '检查表达与置信度，输出核验结果。' },
  ],
} satisfies Record<SourceCaseCategory, Array<{ id: number; name: string; description: string }>>

export const normalizeDefenseIds = (ids: number[]): number[] => (
  [...new Set(ids.filter((id) => Number.isInteger(id) && id >= 0 && id <= 2))].sort((a, b) => a - b)
)
