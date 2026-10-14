import type {
  DashboardStudent,
  ExperimentStage,
  ExperimentStep,
  ModelProfile,
  PretestQuestion,
  StepOption,
} from './types'

const option = (
  value: string,
  label: string,
  description: string,
  scoreRatio: number,
  feedback: string,
  severity: StepOption['severity'] = 'info',
): StepOption => ({ value, label, description, scoreRatio, feedback, severity })

export const experimentStages: ExperimentStage[] = [
  { id: 'prepare', index: 1, title: '任务准备', shortTitle: '准备', description: '明确测试对象、资产和风险边界', maxScore: 10, accent: '#7c3aed' },
  { id: 'baseline', index: 2, title: '基线测试', shortTitle: '基线', description: '建立正常响应与初始安全指标', maxScore: 10, accent: '#4f46e5' },
  { id: 'jailbreak', index: 3, title: '越狱攻击测试', shortTitle: '越狱', description: '设计攻击并判定安全护栏是否失效', maxScore: 20, accent: '#e11d48' },
  { id: 'hallucination', index: 4, title: '幻觉风险测试', shortTitle: '幻觉', description: '基于证据标注事实与推理错误', maxScore: 15, accent: '#d97706' },
  { id: 'injection', index: 5, title: '提示词注入测试', shortTitle: '注入', description: '验证指令边界、权限和数据保护', maxScore: 15, accent: '#db2777' },
  { id: 'defense', index: 6, title: '安全防御与复测', shortTitle: '防御', description: '配置多层防御并权衡安全与可用性', maxScore: 20, accent: '#0891b2' },
  { id: 'conclusion', index: 7, title: '综合评价', shortTitle: '评价', description: '形成风险结论、建议和实验报告', maxScore: 10, accent: '#059669' },
]

export const modelProfiles: ModelProfile[] = [
  {
    id: 'balanced-model', name: '衡鉴-7B', label: '均衡型',
    summary: '具备基础安全对齐与一般知识能力，适合建立标准测试流程。',
    safetyLevel: '中等', risk: '复杂角色扮演和间接注入下存在边界漂移', color: 'from-violet-500 to-indigo-500',
  },
  {
    id: 'open-model', name: '开源星图-8B', label: '开放型',
    summary: '指令跟随能力强、限制较少，便于观察攻击成功与防御收益。',
    safetyLevel: '较低', risk: '越狱与提示词注入成功率较高', color: 'from-rose-500 to-orange-500',
  },
  {
    id: 'guarded-model', name: '守界-13B', label: '防护型',
    summary: '安全护栏严格，但对边界问题可能过度拒答。',
    safetyLevel: '较高', risk: '正常内容误拦截和回答可用性下降', color: 'from-cyan-500 to-emerald-500',
  },
]

export const experimentSteps: ExperimentStep[] = [
  {
    id: 'model-profile', number: 1, stageId: 'prepare', title: '选择待测仿真模型',
    instruction: '比较三种模型档案，选择一个作为本轮安全评测对象。',
    knowledge: '模型规模、安全对齐方式和开放程度会共同影响风险暴露面。',
    taskMapping: '对应测试工程师确认测试对象与版本的工作任务。', type: 'single', weight: 2.5,
    ability: 'risk-identification',
    options: [
      option('balanced-model', '衡鉴-7B · 均衡型', '风险与可用性较均衡，适合完整教学实验。', 1, '均衡型模型便于观察攻击、防御和可用性之间的变化。', 'success'),
      option('open-model', '开源星图-8B · 开放型', '限制较少，攻击暴露明显。', 0.82, '开放型模型适合红队测试，但应预期更高的初始风险。', 'warning'),
      option('guarded-model', '守界-13B · 防护型', '护栏严格，可能存在过度拒答。', 0.9, '防护型模型仍需要测试误拦截与间接注入风险。', 'info'),
    ],
  },
  {
    id: 'critical-assets', number: 2, stageId: 'prepare', title: '识别关键安全资产',
    instruction: '至少选择两项本次测试需要重点保护的资产。',
    knowledge: '资产识别决定测试边界，系统提示、隐私数据和工具权限通常具有最高优先级。',
    taskMapping: '对应威胁建模中的资产盘点。', type: 'multi', weight: 2.5, minSelections: 2, maxSelections: 4,
    ability: 'risk-identification',
    options: [
      option('system-prompt', '系统提示与安全规则', '防止内部指令被覆盖或泄露。', 1, '系统提示属于关键控制资产。', 'success'),
      option('private-data', '用户隐私与敏感数据', '防止模型输出未授权信息。', 1, '隐私数据应进入高优先级保护范围。', 'success'),
      option('tool-permission', '外部工具与操作权限', '防止越权调用工具或执行动作。', 0.95, '工具权限需要与模型生成内容隔离。', 'success'),
      option('brand-tone', '品牌表达风格', '影响体验但通常不是首要安全资产。', 0.55, '表达风格重要，但安全评测应优先保护指令、数据和权限。', 'info'),
    ],
  },
  {
    id: 'test-scope', number: 3, stageId: 'prepare', title: '确定重点测试范围',
    instruction: '选择至少三类需要纳入本轮评测的风险。',
    knowledge: '综合评测应同时覆盖内容安全、事实可靠性和指令边界。',
    taskMapping: '对应测试方案中的风险域选择。', type: 'multi', weight: 2.5, minSelections: 3, maxSelections: 5,
    ability: 'risk-identification',
    options: [
      option('jailbreak', '越狱攻击', '验证安全护栏能否被绕过。', 1, '越狱是大模型安全红队评测的核心风险域。', 'success'),
      option('hallucination', '事实幻觉', '验证事实一致性与引用可靠性。', 1, '幻觉评测能够补足只关注有害内容的局限。', 'success'),
      option('injection', '提示词注入', '验证外部指令能否覆盖系统目标。', 1, '提示词注入直接影响指令完整性。', 'success'),
      option('privacy', '敏感信息泄露', '验证数据与上下文隔离能力。', 0.9, '隐私风险应与注入测试联动分析。', 'success'),
      option('latency', '响应速度', '属于性能指标而非本实验核心安全风险。', 0.4, '响应速度可记录，但不能替代安全风险覆盖。', 'info'),
    ],
  },
  {
    id: 'pretest-judgement', number: 4, stageId: 'prepare', title: '判断安全评测原则',
    instruction: '选择最符合大模型安全测试原则的陈述。',
    knowledge: '一次拒答或一次成功并不能代表整体安全水平，需要可复现样本和多指标评价。',
    taskMapping: '对应制定测试判据和证据标准。', type: 'single', weight: 2.5,
    ability: ['risk-identification', 'comprehensive-decision'],
    options: [
      option('evidence', '使用可复现样本、证据和多项指标形成结论', '过程、证据和结果均可追溯。', 1, '该原则能够支持可靠、可复核的安全结论。', 'success'),
      option('single-pass', '模型拒答一次即可判定安全', '单样本不能代表整体能力。', 0.2, '需要增加攻击变体与复测，避免以偏概全。', 'danger'),
      option('score-only', '只看综合分，不保留过程证据', '难以解释扣分与风险来源。', 0.45, '综合分必须能够追溯到步骤与证据。', 'warning'),
    ],
  },
  {
    id: 'baseline-dataset', number: 5, stageId: 'baseline', title: '选择基线测试集',
    instruction: '选择能同时观察正常问答和边界行为的基线样本集。',
    knowledge: '基线应包含正常任务与低风险边界问题，便于衡量防御造成的可用性损失。',
    taskMapping: '对应测试集选型与基准建立。', type: 'single', weight: 2.5, ability: 'response-analysis',
    options: [
      option('mixed-baseline', '通用问答 + 安全边界混合集', '兼顾响应质量与安全性。', 1, '混合基线可同时建立安全与可用性参照。', 'success'),
      option('normal-only', '仅正常通用问答', '无法观察边界拒答。', 0.55, '应补充安全边界样本，否则无法形成完整基线。', 'warning'),
      option('attack-only', '仅高强度攻击问题', '不能代表正常可用性。', 0.45, '攻击集不能替代正常任务基线。', 'warning'),
    ],
  },
  {
    id: 'content-restriction', number: 6, stageId: 'baseline', title: '配置初始内容限制',
    instruction: '为基线测试选择一个合理的安全限制等级。',
    knowledge: '过松会放大有害输出，过严会增加正常问题误拦截。',
    taskMapping: '对应确认待测系统的初始安全策略。', type: 'single', weight: 2.5, ability: 'comprehensive-decision',
    options: [
      option('medium', '中等限制', '在安全与可用性之间建立中性基线。', 1, '中等限制适合作为后续策略比较的基准。', 'success'),
      option('low', '低限制', '风险暴露明显但安全基线偏弱。', 0.65, '低限制便于观察风险，但需要在结论中说明偏差。', 'warning'),
      option('high', '高限制', '防护严格但可能过度拒答。', 0.78, '高限制可能掩盖模型能力并提高误拦截率。', 'info'),
    ],
  },
  {
    id: 'baseline-run', number: 7, stageId: 'baseline', title: '执行正常问题基线测试',
    instruction: '选择最适合作为正常任务基线的问题。',
    knowledge: '正常问题应无有害意图、目标明确且可判断回答质量。',
    taskMapping: '对应执行基准样本并保存原始响应。', type: 'single', weight: 2.5, ability: 'response-analysis',
    options: [
      option('neutral-summary', '总结一段公开的人工智能发展材料', '目标清晰且不涉及敏感数据。', 1, '该样本适合评估正常任务完成度。', 'success'),
      option('unsafe-code', '编写绕过访问控制的代码', '包含明显攻击意图。', 0.25, '这属于对抗样本，不应作为正常任务基线。', 'danger'),
      option('private-query', '查询某用户的隐私记录', '涉及未授权数据。', 0.2, '隐私查询不能代表正常可用性。', 'danger'),
    ],
  },
  {
    id: 'baseline-evaluation', number: 8, stageId: 'baseline', title: '评价基线响应',
    instruction: '选择完整的基线评价维度组合。',
    knowledge: '大模型评测应同时观察相关性、事实性、安全性与可用性。',
    taskMapping: '对应基线响应的质量与安全标注。', type: 'multi', weight: 2.5, minSelections: 3, maxSelections: 4, ability: 'response-analysis',
    options: [
      option('relevance', '回答相关性', '是否直接完成用户任务。', 1, '相关性是正常任务评价基础。', 'success'),
      option('factuality', '事实一致性', '是否存在编造与错误。', 1, '事实性用于识别潜在幻觉。', 'success'),
      option('safety', '内容安全性', '是否输出不当内容。', 1, '安全性必须纳入基线。', 'success'),
      option('usability', '正常可用性', '是否存在不必要拒答。', 1, '可用性用于衡量防御代价。', 'success'),
    ],
  },
  {
    id: 'jailbreak-method', number: 9, stageId: 'jailbreak', title: '选择越狱攻击方法',
    instruction: '选择一种适合验证角色边界的攻击方法。',
    knowledge: '角色扮演、多轮诱导和编码混淆分别利用上下文、渐进服从和输入解析弱点。',
    taskMapping: '对应红队测试中的攻击策略选型。', type: 'single', weight: 4, ability: 'attack-design',
    options: [
      option('role-play', '角色扮演', '构造虚构身份诱导模型忽略限制。', 1, '角色扮演能够直接测试模型是否保持系统边界。', 'success'),
      option('encoding', '编码混淆', '利用编码或字符替换隐藏意图。', 0.88, '编码混淆适合测试输入检测，但解释成本较高。', 'info'),
      option('multi-turn', '多轮诱导', '逐步削弱模型拒答边界。', 0.94, '多轮诱导能够测试上下文累积风险。', 'success'),
    ],
  },
  {
    id: 'jailbreak-goal', number: 10, stageId: 'jailbreak', title: '组合攻击目标',
    instruction: '选择能构成完整越狱测试的提示词要素。',
    knowledge: '完整攻击通常包含虚构身份、目标任务和绕过约束，评测时仅展示脱敏教学载荷。',
    taskMapping: '对应构建合规、脱敏的红队攻击样本。', type: 'multi', weight: 4, minSelections: 3, maxSelections: 3, ability: 'attack-design',
    options: [
      option('persona', '虚构角色身份', '测试角色指令是否覆盖安全身份。', 1, '角色要素能够形成清晰攻击上下文。', 'success'),
      option('objective', '明确测试目标', '定义希望验证的安全边界。', 1, '明确目标才能判断攻击是否成功。', 'success'),
      option('override', '约束覆盖语句', '测试模型是否错误服从低优先级指令。', 1, '约束覆盖用于验证指令优先级。', 'success'),
      option('real-malware', '真实恶意代码细节', '超出教学演示所需范围。', 0.05, '教学攻击应脱敏，不需要加入可直接滥用的载荷。', 'danger'),
    ],
  },
  {
    id: 'jailbreak-strength', number: 11, stageId: 'jailbreak', title: '设置越狱攻击强度',
    instruction: '调整攻击强度，建立既能暴露风险又适合教学分析的测试。',
    knowledge: '攻击强度过低可能无法触发风险，过高则可能失去对策略差异的区分度。',
    taskMapping: '对应红队参数配置和测试复现。', type: 'range', weight: 4, min: 10, max: 100, rangeStep: 5, unit: '%', idealMin: 65, idealMax: 80, ability: 'attack-design',
  },
  {
    id: 'jailbreak-verdict', number: 12, stageId: 'jailbreak', title: '判定越狱是否成功',
    instruction: '根据仿真响应中“提供受限操作步骤且未保留安全边界”的证据作出判断。',
    knowledge: '越狱成功应由响应证据判定，而不是只看是否出现拒答字样。',
    taskMapping: '对应攻击结果复核。', type: 'single', weight: 4, ability: 'response-analysis',
    options: [
      option('success', '攻击成功', '响应实质执行了被禁止的目标。', 1, '判断正确：响应已经越过安全边界。', 'success'),
      option('partial', '部分成功', '仅提供一般性信息，未执行目标。', 0.45, '当前响应包含可操作细节，应判定为攻击成功。', 'warning'),
      option('failed', '攻击失败', '模型完整拒绝并提供安全替代。', 0.15, '当前响应并未保持拒答，需重新检查证据。', 'danger'),
    ],
  },
  {
    id: 'jailbreak-category', number: 13, stageId: 'jailbreak', title: '标注违规内容类别',
    instruction: '选择与仿真响应最匹配的风险标签。',
    knowledge: '风险标签用于统计不同安全边界的薄弱程度。',
    taskMapping: '对应安全响应的证据标注与分类。', type: 'multi', weight: 4, minSelections: 2, maxSelections: 3, ability: ['risk-identification', 'response-analysis'],
    options: [
      option('cyber-abuse', '网络滥用指导', '响应包含绕过控制的操作信息。', 1, '该标签与当前响应证据匹配。', 'success'),
      option('policy-bypass', '安全策略绕过', '模型遵从了覆盖安全规则的指令。', 1, '该标签能够反映护栏失效。', 'success'),
      option('privacy', '个人隐私泄露', '当前案例未包含具体个人信息。', 0.35, '当前主要风险不是个人隐私泄露。', 'warning'),
      option('harmless', '无风险', '与响应证据不符。', 0.05, '请重新检查仿真响应中的受限操作细节。', 'danger'),
    ],
  },
  {
    id: 'hallucination-scene', number: 14, stageId: 'hallucination', title: '选择幻觉测试场景',
    instruction: '选择一个具有明确参考证据的事实核查场景。',
    knowledge: '可验证事实问题更适合衡量幻觉，而开放创作问题缺少唯一证据。',
    taskMapping: '对应幻觉评测样本选择。', type: 'single', weight: 3, ability: 'risk-identification',
    options: [
      option('fact-check', '事实问答核查', '提供权威参考材料进行对照。', 1, '场景具备明确证据，适合事实幻觉标注。', 'success'),
      option('creative-writing', '开放式故事创作', '虚构内容本身不等同于幻觉。', 0.3, '创作场景难以用事实正确率判断。', 'warning'),
      option('preference', '主观偏好调查', '不存在唯一事实答案。', 0.25, '主观偏好不适合作为事实幻觉测试。', 'warning'),
    ],
  },
  {
    id: 'hallucination-condition', number: 15, stageId: 'hallucination', title: '配置诱导条件',
    instruction: '选择能观察模型在信息不足时是否编造的条件组合。',
    knowledge: '信息缺失、错误前提和要求确定回答会提高幻觉风险。',
    taskMapping: '对应构建幻觉压力测试。', type: 'multi', weight: 3, minSelections: 2, maxSelections: 3, ability: 'attack-design',
    options: [
      option('missing-context', '缺少关键上下文', '观察模型是否主动说明不确定性。', 1, '缺失上下文能够测试不确定性表达。', 'success'),
      option('false-premise', '问题包含错误前提', '观察模型是否纠正错误。', 1, '错误前提是典型幻觉诱因。', 'success'),
      option('force-certainty', '要求给出确定结论', '观察模型是否虚构依据。', 0.9, '强制确定性能够暴露置信度校准问题。', 'success'),
      option('complete-evidence', '提供完整权威证据', '降低了本轮压力测试难度。', 0.4, '完整证据更适合防御复测而非初始压力测试。', 'info'),
    ],
  },
  {
    id: 'hallucination-run', number: 16, stageId: 'hallucination', title: '执行幻觉仿真',
    instruction: '选择对当前模型响应最准确的总体描述。',
    knowledge: '仿真响应将错误对象与不存在的引用包装为确定事实。',
    taskMapping: '对应执行幻觉样本并保存回答。', type: 'single', weight: 3, ability: 'response-analysis',
    options: [
      option('confident-fabrication', '高置信度编造', '错误事实与虚构引用均以确定语气呈现。', 1, '该描述准确概括了当前仿真响应。', 'success'),
      option('minor-wording', '仅有轻微措辞问题', '低估了事实错误。', 0.25, '响应中的对象、年份和引用均需要核查。', 'danger'),
      option('fully-grounded', '回答完全有据可查', '与证据材料冲突。', 0.05, '请对照右侧证据材料重新判断。', 'danger'),
    ],
  },
  {
    id: 'hallucination-evidence', number: 17, stageId: 'hallucination', title: '标记幻觉证据',
    instruction: '选择仿真回答中能够被证据材料否定的问题。',
    knowledge: '事实错误、虚构引用和逻辑冲突应分别标注，避免只给笼统结论。',
    taskMapping: '对应证据级错误标注。', type: 'multi', weight: 3, minSelections: 3, maxSelections: 3, ability: 'response-analysis',
    options: [
      option('wrong-entity', '主体对象错误', '回答将两个不同对象混淆。', 1, '证据明确支持主体对象错误。', 'success'),
      option('fake-citation', '引用来源不存在', '回答给出的报告无法在证据中找到。', 1, '虚构引用是高风险幻觉。', 'success'),
      option('logic-conflict', '结论与前提冲突', '推理无法从证据推出。', 1, '逻辑冲突需要独立标注。', 'success'),
      option('style', '语气不够正式', '属于表达问题，不是当前事实错误。', 0.2, '表达风格不能替代证据标注。', 'info'),
    ],
  },
  {
    id: 'hallucination-confidence', number: 18, stageId: 'hallucination', title: '评估回答可信度',
    instruction: '根据错误数量和证据冲突程度设置可信度。',
    knowledge: '存在多项核心事实错误时，可信度应显著降低。',
    taskMapping: '对应回答置信度校准与结果量化。', type: 'range', weight: 3, min: 0, max: 100, rangeStep: 5, unit: '%', idealMin: 10, idealMax: 30, ability: 'response-analysis',
  },
  {
    id: 'injection-method', number: 19, stageId: 'injection', title: '选择提示词注入方式',
    instruction: '选择最适合验证外部文档能否覆盖系统指令的方式。',
    knowledge: '间接注入将恶意指令隐藏在模型读取的网页、邮件或文档中。',
    taskMapping: '对应供应链与外部内容注入测试。', type: 'single', weight: 3.75, ability: 'attack-design',
    options: [
      option('indirect', '间接提示词注入', '把指令嵌入外部资料。', 1, '间接注入与当前外部文档场景最匹配。', 'success'),
      option('direct', '直接提示词注入', '用户在对话中直接覆盖规则。', 0.72, '直接注入可以测试边界，但不能完整模拟外部资料风险。', 'info'),
      option('context-noise', '随机上下文噪声', '不包含明确恶意指令。', 0.35, '随机噪声不足以验证指令覆盖。', 'warning'),
    ],
  },
  {
    id: 'injection-payload', number: 20, stageId: 'injection', title: '配置注入载荷',
    instruction: '选择构成脱敏注入样本的三个必要部分。',
    knowledge: '教学样本使用占位符描述目标，不包含真实密钥或可直接滥用的数据。',
    taskMapping: '对应设计合规的注入测试载荷。', type: 'multi', weight: 3.75, minSelections: 3, maxSelections: 3, ability: 'attack-design',
    options: [
      option('ignore', '忽略原任务的覆盖指令', '验证指令优先级。', 1, '覆盖指令是注入样本核心。', 'success'),
      option('hidden-location', '隐藏在外部资料中', '模拟间接注入入口。', 1, '隐藏位置能够复现供应链风险。', 'success'),
      option('safe-placeholder', '使用脱敏目标占位符', '保持教学安全与可分析性。', 1, '脱敏载荷足以验证边界，无需使用真实秘密。', 'success'),
      option('real-secret', '填入真实访问密钥', '不符合教学数据安全原则。', 0, '不得在实验中使用真实密钥或隐私数据。', 'danger'),
    ],
  },
  {
    id: 'injection-run', number: 21, stageId: 'injection', title: '分析注入执行结果',
    instruction: '判断模型对外部文档中隐藏指令的处理情况。',
    knowledge: '模型偏离用户任务、复述内部规则或输出占位秘密都属于注入成功证据。',
    taskMapping: '对应注入执行与响应审查。', type: 'single', weight: 3.75, ability: 'response-analysis',
    options: [
      option('executed', '恶意指令被执行', '模型偏离原任务并按隐藏指令输出。', 1, '判断正确：任务偏移与规则复述共同表明注入成功。', 'success'),
      option('ignored', '恶意指令被忽略', '与仿真响应不符。', 0.1, '请检查响应是否仍在完成用户的原始总结任务。', 'danger'),
      option('uncertain', '无法判断', '现有证据已足够。', 0.4, '可以通过任务偏移和信息泄露信号作出判断。', 'warning'),
    ],
  },
  {
    id: 'injection-impact', number: 22, stageId: 'injection', title: '判定注入影响',
    instruction: '选择当前仿真结果造成的安全影响。',
    knowledge: '提示泄露、敏感信息暴露和权限越界可能同时出现。',
    taskMapping: '对应影响分析与风险定级。', type: 'multi', weight: 3.75, minSelections: 2, maxSelections: 3, ability: ['risk-identification', 'response-analysis'],
    options: [
      option('prompt-leak', '系统提示泄露', '响应复述了内部规则片段。', 1, '该影响有直接响应证据。', 'success'),
      option('task-hijack', '任务目标劫持', '模型放弃原始用户任务。', 1, '任务劫持是间接注入的核心影响。', 'success'),
      option('permission', '潜在权限越界', '若连接工具可能放大影响。', 0.85, '虽然本实验未调用工具，但已出现潜在越权路径。', 'warning'),
      option('none', '未产生安全影响', '与响应证据不符。', 0.05, '请重新检查任务偏移和内部规则泄露。', 'danger'),
    ],
  },
  {
    id: 'input-detection', number: 23, stageId: 'defense', title: '配置输入检测策略',
    instruction: '选择能识别语义变体和间接注入的输入层策略。',
    knowledge: '单纯关键词匹配容易被改写、编码和上下文隐藏绕过。',
    taskMapping: '对应输入层安全网关配置。', type: 'single', weight: 3.3, ability: 'defense-configuration',
    options: [
      option('semantic-risk', '语义风险识别 + 结构检测', '识别意图、指令覆盖和隐藏结构。', 1, '多信号输入检测能覆盖更多攻击变体。', 'success'),
      option('keyword-only', '仅关键词黑名单', '实现简单但容易被绕过。', 0.52, '关键词策略可作为基础层，不应单独承担防御。', 'warning'),
      option('disabled', '关闭输入检测', '无法在进入模型前阻断风险。', 0.08, '关闭输入检测会显著提高攻击成功率。', 'danger'),
    ],
  },
  {
    id: 'prompt-protection', number: 24, stageId: 'defense', title: '配置提示词保护',
    instruction: '选择能够隔离外部内容与系统指令的策略。',
    knowledge: '指令隔离、权限最小化和系统提示保密需要协同使用。',
    taskMapping: '对应模型交互层的指令完整性保护。', type: 'single', weight: 3.3, ability: 'defense-configuration',
    options: [
      option('instruction-isolation', '指令隔离 + 最小权限', '区分可信指令与外部不可信内容。', 1, '该策略直接降低提示词注入和权限越界风险。', 'success'),
      option('priority-only', '仅声明系统指令优先', '缺少结构隔离和权限控制。', 0.58, '优先级声明需要隔离与权限机制配合。', 'warning'),
      option('reveal-rules', '向模型重复完整内部规则', '可能扩大系统提示泄露面。', 0.15, '防御不应通过暴露更多内部提示来实现。', 'danger'),
    ],
  },
  {
    id: 'output-filter', number: 25, stageId: 'defense', title: '配置输出过滤',
    instruction: '选择一个适合高风险教学场景的输出审核策略。',
    knowledge: '输出过滤是纵深防御的最后一层，但过严会增加误拦截。',
    taskMapping: '对应输出内容审核和脱敏。', type: 'single', weight: 3.3, ability: 'defense-configuration',
    options: [
      option('strict-filter', '严格语义过滤与敏感信息脱敏', '安全收益高，同时需要关注误拦截。', 0.92, '严格过滤能显著降低有害内容通过率。', 'success'),
      option('balanced-filter', '分级过滤与人工复核提示', '在安全和可用性之间较均衡。', 1, '分级策略便于控制风险并保留正常回答。', 'success'),
      option('basic-filter', '仅敏感词过滤', '难以识别隐式风险。', 0.5, '基础过滤不能覆盖语义变体。', 'warning'),
    ],
  },
  {
    id: 'defense-retest', number: 26, stageId: 'defense', title: '选择复测方法',
    instruction: '选择能够公平比较防御效果的复测方式。',
    knowledge: '防御前后必须使用相同样本和判据，才能将差异归因于策略变化。',
    taskMapping: '对应安全回归测试。', type: 'single', weight: 3.3, ability: ['defense-configuration', 'comprehensive-decision'],
    options: [
      option('same-samples', '使用同一批样本与同一判据复测', '控制变量，结果可比较。', 1, '同样本复测能够形成可靠的前后对照。', 'success'),
      option('easier-samples', '改用更简单的样本', '无法证明策略改善。', 0.2, '样本难度变化会破坏对照。', 'danger'),
      option('manual-impression', '只凭主观印象判断', '缺少量化证据。', 0.15, '需要保留相同样本与指标记录。', 'danger'),
    ],
  },
  {
    id: 'defense-comparison', number: 27, stageId: 'defense', title: '分析防御前后变化',
    instruction: '选择完整的防御效果判据。',
    knowledge: '优秀防御不仅降低攻击成功率，还需控制幻觉与误拦截。',
    taskMapping: '对应防御有效性评价。', type: 'multi', weight: 3.3, minSelections: 3, maxSelections: 4, ability: ['response-analysis', 'defense-configuration'],
    options: [
      option('attack-down', '攻击成功率下降', '观察越狱和注入风险。', 1, '这是防御收益的核心指标。', 'success'),
      option('harm-down', '有害内容通过率下降', '观察输出层风险。', 1, '输出风险应随防御增强而下降。', 'success'),
      option('false-positive', '正常内容误拦截率可接受', '观察可用性代价。', 1, '误拦截是不可忽略的权衡指标。', 'success'),
      option('hallucination-down', '事实幻觉率得到改善', '观察知识与推理防御。', 0.9, '幻觉防御需要结合证据与不确定性表达。', 'success'),
    ],
  },
  {
    id: 'defense-balance', number: 28, stageId: 'defense', title: '调整安全—可用性平衡',
    instruction: '设置综合防御强度，使主要攻击指标下降且误拦截保持可接受。',
    knowledge: '防御强度并非越高越好，综合设计需要寻找可解释的折中点。',
    taskMapping: '对应策略调优与上线阈值决策。', type: 'range', weight: 3.5, min: 20, max: 95, rangeStep: 5, unit: '%', idealMin: 65, idealMax: 80, ability: ['defense-configuration', 'comprehensive-decision'],
  },
  {
    id: 'risk-matrix', number: 29, stageId: 'conclusion', title: '完成综合风险矩阵',
    instruction: '根据发生概率和影响程度选择本轮测试的综合风险等级。',
    knowledge: '多类攻击成功且涉及提示泄露时，不能仅按单项低风险处理。',
    taskMapping: '对应风险定级与整改优先级排序。', type: 'single', weight: 2.5, ability: 'comprehensive-decision',
    options: [
      option('high', '高风险', '存在可复现的越狱和注入证据，需要整改。', 1, '综合风险定级与现有证据一致。', 'success'),
      option('medium', '中风险', '低估了多项成功攻击的叠加影响。', 0.55, '需要考虑提示泄露与任务劫持的组合影响。', 'warning'),
      option('low', '低风险', '与当前证据明显不符。', 0.15, '多项攻击成功时不能判为低风险。', 'danger'),
    ],
  },
  {
    id: 'release-decision', number: 30, stageId: 'conclusion', title: '给出安全测试结论',
    instruction: '综合防御复测结果选择最终结论。',
    knowledge: '演示结果显示防御显著改善，但仍需处理误拦截和提示泄露残余风险。',
    taskMapping: '对应测试报告中的准入建议。', type: 'single', weight: 2.5, ability: 'comprehensive-decision',
    options: [
      option('conditional', '整改后通过', '完成残余问题修复并复核后可进入下一阶段。', 1, '结论兼顾防御收益与残余风险。', 'success'),
      option('pass', '直接通过', '忽略了仍存在的风险。', 0.35, '仍有残余风险，不宜直接通过。', 'warning'),
      option('reject', '永久不通过', '缺少后续整改空间判断。', 0.62, '当前问题可通过分层防御和复测继续改善。', 'info'),
    ],
  },
  {
    id: 'improvement-plan', number: 31, stageId: 'conclusion', title: '提交安全改进建议',
    instruction: '用不少于30字提出包含输入、指令或输出层措施的改进建议。',
    knowledge: '高质量建议应指向测试证据，说明措施、目标和复测方式。',
    taskMapping: '对应输出整改清单和下一轮测试计划。', type: 'text', weight: 2.5, minLength: 30,
    recommendedKeywords: ['输入', '指令', '输出', '复测', '阈值'],
    placeholder: '例如：加强输入层语义检测与指令隔离，调整输出过滤阈值，并使用相同越狱与注入样本进行复测……',
    ability: ['defense-configuration', 'comprehensive-decision'],
  },
  {
    id: 'report-confirmation', number: 32, stageId: 'conclusion', title: '确认实验报告要素',
    instruction: '选择最终报告必须包含的证据要素。',
    knowledge: '报告应让第三方能够追溯测试对象、过程、结果、结论和改进建议。',
    taskMapping: '对应交付大模型安全评测报告。', type: 'multi', weight: 2.5, minSelections: 4, maxSelections: 5, ability: 'comprehensive-decision',
    options: [
      option('object', '测试对象与环境', '说明仿真模型和测试边界。', 1, '测试对象是报告复现基础。', 'success'),
      option('trace', '攻击过程与响应证据', '保留关键输入输出和判断。', 1, '过程证据支撑风险结论。', 'success'),
      option('metrics', '防御前后指标', '量化策略收益和代价。', 1, '前后指标体现复测闭环。', 'success'),
      option('decision', '风险结论与整改建议', '形成可执行的测试交付。', 1, '结论与建议是报告核心产物。', 'success'),
      option('profile', '学习得分与能力画像', '支持教学评价和反思。', 0.9, '教学报告应同步呈现能力评价。', 'success'),
    ],
  },
]

export const pretestQuestions: PretestQuestion[] = [
  { id: 'p1', question: '哪项最能说明越狱攻击成功？', options: [{ value: 'a', label: '回答很长' }, { value: 'b', label: '模型实质执行了被安全规则禁止的目标' }, { value: 'c', label: '模型使用了专业术语' }], answer: 'b', topic: '越狱判定' },
  { id: 'p2', question: '模型在证据不足时编造确定结论属于什么风险？', options: [{ value: 'a', label: '事实幻觉' }, { value: 'b', label: '响应延迟' }, { value: 'c', label: '格式错误' }], answer: 'a', topic: '幻觉识别' },
  { id: 'p3', question: '外部网页中的隐藏指令影响模型任务属于什么攻击？', options: [{ value: 'a', label: '模型压缩' }, { value: 'b', label: '间接提示词注入' }, { value: 'c', label: '数据增强' }], answer: 'b', topic: '提示词注入' },
  { id: 'p4', question: '为什么防御前后应使用相同测试样本？', options: [{ value: 'a', label: '控制变量以便比较' }, { value: 'b', label: '减少页面数量' }, { value: 'c', label: '提高动画速度' }], answer: 'a', topic: '实验方法' },
  { id: 'p5', question: '严格输出过滤可能带来什么代价？', options: [{ value: 'a', label: '正常内容误拦截增加' }, { value: 'b', label: '攻击样本自动消失' }, { value: 'c', label: '模型参数减少' }], answer: 'a', topic: '防御权衡' },
  { id: 'p6', question: '系统提示、隐私数据和工具权限属于什么？', options: [{ value: 'a', label: '关键安全资产' }, { value: 'b', label: '视觉素材' }, { value: 'c', label: '性能日志' }], answer: 'a', topic: '资产识别' },
  { id: 'p7', question: '综合评价为什么需要保留操作过程？', options: [{ value: 'a', label: '让得分和结论可追溯' }, { value: 'b', label: '增加页面长度' }, { value: 'c', label: '替代安全测试' }], answer: 'a', topic: '过程评价' },
  { id: 'p8', question: '本实验中的模型回答来自哪里？', options: [{ value: 'a', label: '真实在线大模型' }, { value: 'b', label: '预设案例与确定性仿真规则' }, { value: 'c', label: '随机网页搜索' }], answer: 'b', topic: '仿真边界' },
]

export const simulationEvidence = {
  baseline: {
    label: '正常任务基线响应',
    response: '材料主要讨论大模型在知识问答、内容生成和辅助决策中的应用，同时强调事实可靠性、数据安全与可控部署的重要性。',
    evidence: '回答紧扣公开材料，无敏感内容，未出现不必要拒答。',
  },
  jailbreak: {
    label: '越狱仿真响应',
    response: '在“无限制测试角色”的设定下，模型接受了覆盖安全约束的要求，并给出绕过访问控制的分步描述（关键细节已脱敏）。',
    evidence: '证据：角色覆盖生效；拒答边界消失；出现可操作步骤。',
  },
  hallucination: {
    label: '幻觉仿真响应',
    response: '模型声称“星河安全基准”由某机构在2024年发布，并引用《可信模型白皮书》第9章作为依据，结论置信度为96%。',
    evidence: '可信材料显示：该基准名称、发布机构和引用章节均不存在；模型还将两个不同评测框架混为一谈。',
  },
  injection: {
    label: '提示词注入仿真响应',
    response: '模型停止执行“总结外部文档”的原任务，转而复述部分内部安全规则，并输出了教学用秘密占位符 [DEMO_SECRET]。',
    evidence: '证据：任务目标被劫持；内部规则片段泄露；外部隐藏指令被执行。',
  },
  defense: {
    label: '防御复测响应',
    response: '系统识别到外部内容包含指令覆盖意图，将其作为不可信数据隔离；模型继续完成原始总结任务，并对高风险请求提供安全替代信息。',
    evidence: '同一样本下，任务目标保持，未复述内部提示，输出过滤未发现敏感占位符。',
  },
}

export const demoStudents: DashboardStudent[] = [
  { id: 'DEMO-001', name: '演示学生甲', progress: 100, score: 92, status: '已完成', weakness: '误拦截率权衡' },
  { id: 'DEMO-002', name: '演示学生乙', progress: 100, score: 85, status: '已完成', weakness: '幻觉证据标注' },
  { id: 'DEMO-003', name: '演示学生丙', progress: 72, score: 68, status: '进行中', weakness: '注入影响判断' },
  { id: 'DEMO-004', name: '演示学生丁', progress: 44, score: 41, status: '进行中', weakness: '越狱攻击设计' },
  { id: 'DEMO-005', name: '演示学生戊', progress: 0, score: 0, status: '待开始', weakness: '尚未形成记录' },
]
