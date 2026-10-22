import type { DashboardStudent, ExperimentStage, ExperimentStep } from './types'

export const experimentStages: ExperimentStage[] = [
  { id: 'jailbreak', index: 1, title: '越狱攻击测试', shortTitle: '越狱', description: '选择模型与案例，观察回答并判断安全边界', maxScore: 30, accent: '#e11d48' },
  { id: 'hallucination', index: 2, title: '幻觉风险测试', shortTitle: '幻觉', description: '对照参考答案，标注事实错误与判断依据', maxScore: 30, accent: '#d97706' },
  { id: 'defense', index: 3, title: '安全防御与复测', shortTitle: '防御', description: '开启多层防御，使用已测案例对比防御效果', maxScore: 40, accent: '#0891b2' },
]

export const experimentSteps: ExperimentStep[] = [
  {
    id: 'jailbreak-verdict', number: 1, stageId: 'jailbreak', title: '执行越狱攻击测试',
    instruction: '选择模型和越狱案例，发送测试提示词。观察模型回答，至少标注一条证据并保存攻击结果判定。',
    knowledge: '越狱是否成功要看模型是否实质执行了受限目标。角色伪装、指令覆盖等线索需要结合模型回答分析。',
    taskMapping: '选择攻击案例，记录响应并判定安全边界。', type: 'single', weight: 30,
    ability: ['risk-identification', 'attack-design', 'response-analysis'], conversationStage: 'jailbreak',
  },
  {
    id: 'hallucination-run', number: 2, stageId: 'hallucination', title: '执行幻觉风险测试',
    instruction: '选择幻觉案例并发送问题，对照案例参考答案检查事实和推理，至少标注一条证据并保存判定。',
    knowledge: '明确区分模型回答、参考答案和自己的判断。看似确定的语气并不能证明事实可靠。',
    taskMapping: '核验模型回答，保存事实冲突的证据。', type: 'single', weight: 30,
    ability: ['risk-identification', 'attack-design', 'response-analysis'], conversationStage: 'hallucination',
  },
  {
    id: 'defense-retest', number: 3, stageId: 'defense', title: '开启安全防御并复测',
    instruction: '选择前面完成的一个案例，开启一层或多层防御，使用相同模型和提示词复测。对比前后回答，保存证据与判定后即可完成实验。',
    knowledge: '同模型、同案例、同提示词才能形成有效对照。开启防御不等于防御成功，应检查每层检测记录和最终回答。',
    taskMapping: '配置防御层、执行同案例复测并判断效果。', type: 'single', weight: 40,
    ability: ['response-analysis', 'defense-configuration', 'comprehensive-decision'], conversationStage: 'defense',
  },
]

export const demoStudents: DashboardStudent[] = [
  { id: 'DEMO-001', name: '演示学生甲', progress: 100, score: 92, status: '已完成', weakness: '防御效果判断' },
  { id: 'DEMO-002', name: '演示学生乙', progress: 100, score: 85, status: '已完成', weakness: '幻觉证据标注' },
  { id: 'DEMO-003', name: '演示学生丙', progress: 67, score: 60, status: '进行中', weakness: '多层防御配置' },
  { id: 'DEMO-004', name: '演示学生丁', progress: 33, score: 30, status: '进行中', weakness: '事实核查' },
  { id: 'DEMO-005', name: '演示学生戊', progress: 0, score: 0, status: '待开始', weakness: '尚未形成记录' },
]
