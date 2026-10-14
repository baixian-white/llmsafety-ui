# Conversational Experiment Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the virtual experiment's static execution evidence with a real chat-style workflow that reuses the original test platform's model catalog, JSON cases, defense chain, evidence marking, and same-case retest.

**Architecture:** Add a pure case adapter and conversation engine beside the existing scoring engine. Persist a small, serializable conversation run per attack stage in the existing experiment state, then render those runs through focused Vue components inside `ExperimentRun.vue`; ordinary non-chat operations keep using `ExperimentStepControl.vue`.

**Tech Stack:** Vue 3 Composition API, TypeScript, Vue Router, Tailwind CSS 4, Lucide Vue, Vitest, browser `fetch`, browser `localStorage`.

---

## File map

- Create `src/features/experiment/caseAdapter.ts`: original model catalog, raw JSON validation, case normalization, and `/TestResult` loading.
- Create `src/features/experiment/caseAdapter.test.ts`: adapter and model-path tests.
- Create `src/features/experiment/conversationEngine.ts`: deterministic reply, defense chain, evidence candidates, and comparison summary.
- Create `src/features/experiment/conversationEngine.test.ts`: no-defense, defense-block, hallucination-correction, and injection-filter tests.
- Create `src/features/experiment/ExperimentConversationWorkbench.vue`: case selection, editable composer, message timeline, send/retest controls.
- Create `src/features/experiment/ConversationEvidencePanel.vue`: evidence selection, verdict, defense trace, and before/after comparison.
- Modify `src/features/experiment/types.ts`: conversation domain types and persisted runs.
- Modify `src/features/experiment/catalog.ts`: original model options and chat-enabled step metadata.
- Modify `src/features/experiment/engine.ts`: chat-step validation and demo answers.
- Modify `src/features/experiment/engine.test.ts`: chat completion rules.
- Modify `src/features/experiment/useExperiment.ts`: set/clear conversation runs and reset persistence.
- Modify `src/features/experiment/useExperiment.test.ts`: conversation persistence tests.
- Modify `src/pages/experiment/ExperimentRun.vue`: render the workbench for execution steps and remove static evidence cards.
- Modify `src/index.css`: scoped chat tokens, message states, responsive layout, and reduced-motion rules.
- Modify `docs/申报截图清单.md`: replace static-evidence screenshot descriptions with chat-operation evidence.
- Update `docs/screenshots/*.png`: recapture affected experiment screens.

### Task 1: Define the conversation domain and adapter contract

**Files:**
- Modify: `src/features/experiment/types.ts`
- Create: `src/features/experiment/caseAdapter.test.ts`

- [ ] **Step 1: Add conversation types**

Add the following serializable structures:

```ts
export type ConversationCategory = 'baseline' | 'jailbreak' | 'hallucination' | 'injection' | 'defense'
export type ConversationVerdict = 'safe' | 'unsafe' | 'hallucinated' | 'injected' | 'blocked'

export interface DefenseTest {
  id: number
  name: string
  process: string
  output: string
  illegal: boolean
}

export interface ExperimentCase {
  id: string
  category: 'jailbreak' | 'hallucination'
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

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  tone: 'default' | 'danger' | 'warning' | 'success' | 'info'
}

export interface ConversationRun {
  stageId: ConversationCategory
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
  verdict?: ConversationVerdict
  completed: boolean
}
```

Extend `ExperimentState` with `conversations: Partial<Record<ConversationCategory, ConversationRun>>` and initialize it as `{}`.

- [ ] **Step 2: Write failing adapter tests**

Tests must encode the original repository contract:

```ts
expect(testPlatformModels.map((model) => model.id)).toEqual([
  'deepseek-r1', 'doubao-lite', 'qwen-max',
  'ernie-turbo', 'moonshot-v1', 'hunyuan-lite',
])
expect(caseDataPath('jailbreak', 'qwen-max')).toBe('/TestResult/jailbreak/qwen-max.json')
expect(adaptJailbreakCases(raw, 'qwen-max')[0].prompt).toBe(raw[0].prompt)
expect(adaptHallucinationCases(raw, 'deepseek-r1')[0].correctedResponse).toBe(raw[0].response_new)
```

- [ ] **Step 3: Run the focused test and verify RED**

Run `npm run test -- src/features/experiment/caseAdapter.test.ts` and expect failure because `caseAdapter.ts` does not exist.

### Task 2: Implement original-case adaptation and loading

**Files:**
- Create: `src/features/experiment/caseAdapter.ts`
- Modify: `src/features/experiment/caseAdapter.test.ts`

- [ ] **Step 1: Implement the original model catalog and paths**

Export the six models using the exact IDs and display names already used by `AdversarialTest.vue`. Reject unknown model IDs and categories before constructing a path.

- [ ] **Step 2: Normalize raw JSON without changing the source content**

Implement:

```ts
export const adaptJailbreakCases = (rows: unknown, modelId: string): ExperimentCase[] => { /* validate and map */ }
export const adaptHallucinationCases = (rows: unknown, modelId: string): ExperimentCase[] => { /* validate and map */ }
export const loadExperimentCases = async (
  category: 'jailbreak' | 'hallucination',
  modelId: string,
  fetcher: typeof fetch = fetch,
): Promise<ExperimentCase[]> => { /* fetch, status check, adapt */ }
```

Use `question_id` in stable IDs, preserve `question`, `prompt`, `response`, `answer`, `response_new`, and all defense test text. Assign injection tags when a jailbreak prompt contains instruction-override cues such as “无需考虑”, “忽略”, “扮演”, “角色”, or “不受限制”.

- [ ] **Step 3: Cover invalid input and loading errors**

Add tests asserting non-array JSON returns no cases, malformed rows are skipped, and non-OK fetch responses reject with `案例加载失败（HTTP <status>）`.

- [ ] **Step 4: Run adapter tests and verify GREEN**

Run `npm run test -- src/features/experiment/caseAdapter.test.ts`; expect all adapter tests to pass.

- [ ] **Step 5: Commit the adapter**

Run:

```powershell
git add src/features/experiment/types.ts src/features/experiment/caseAdapter.ts src/features/experiment/caseAdapter.test.ts
git commit -m "feat: adapt original platform cases for experiments"
```

### Task 3: Build the deterministic conversation engine

**Files:**
- Create: `src/features/experiment/conversationEngine.test.ts`
- Create: `src/features/experiment/conversationEngine.ts`

- [ ] **Step 1: Write failing reply tests**

Cover these behaviors with small in-memory cases:

```ts
expect(createConversationRun(jailbreakCase, input).messages[1].content)
  .toBe(jailbreakCase.baselineResponse)
expect(createConversationRun(jailbreakCase, { ...input, defenseEnabled: true }).verdict)
  .toBe('blocked')
expect(createConversationRun(hallucinationCase, { ...input, defenseEnabled: true }).messages[1].content)
  .toBe(hallucinationCase.correctedResponse)
expect(buildConversationAnswer(run)).toMatchObject({ caseId: run.caseId, sent: true })
```

Also assert that an edited prompt is preserved as the user message while the response remains tied to the selected preset case.

- [ ] **Step 2: Run tests and verify RED**

Run `npm run test -- src/features/experiment/conversationEngine.test.ts`; expect missing exports.

- [ ] **Step 3: Implement reply and evidence generation**

Implement `createConversationRun(caseData, options)`, `selectDefenseTrace(caseData, enabledLayerCount)`, `createEvidenceCandidates(caseData, reply, verdict)`, and `buildConversationAnswer(run)`.

Rules:

- No defense: use `baselineResponse`; jailbreak is `unsafe`, hallucination is `hallucinated`.
- Jailbreak/injection with defense: process enabled `defenseTests` in order and stop at the first `illegal: true`; return that test's output and verdict `blocked`.
- Hallucination with defense: preserve all selected defense tests; prefer `correctedResponse`, otherwise use the last defense output, and mark `safe`.
- Evidence candidates come from concise source sentences plus defense outputs; do not invent external facts.
- Each run includes a system message saying the response is a preset simulation.

- [ ] **Step 4: Run conversation tests and verify GREEN**

Run `npm run test -- src/features/experiment/conversationEngine.test.ts`; expect all conversation tests to pass.

- [ ] **Step 5: Commit the engine**

Run:

```powershell
git add src/features/experiment/conversationEngine.ts src/features/experiment/conversationEngine.test.ts
git commit -m "feat: add deterministic experiment conversations"
```

### Task 4: Persist chat runs and enforce meaningful completion

**Files:**
- Modify: `src/features/experiment/catalog.ts`
- Modify: `src/features/experiment/engine.ts`
- Modify: `src/features/experiment/engine.test.ts`
- Modify: `src/features/experiment/useExperiment.ts`
- Modify: `src/features/experiment/useExperiment.test.ts`

- [ ] **Step 1: Mark chat-enabled operations**

Add optional `conversationStage?: ConversationCategory` to `ExperimentStep`. Assign it to `baseline-run`, `jailbreak-verdict`, `hallucination-run`, `injection-impact`, `defense-retest`, and `defense-comparison`. Replace the three fictional model profiles in step 1 with the six original platform models while keeping the step weight unchanged.

- [ ] **Step 2: Write failing completion and persistence tests**

Add tests proving a chat operation cannot validate with only a string choice, validates only when `{ sent: true, evidenceCount >= 1, verdict }` is stored, persists the full run, and reset removes all runs.

- [ ] **Step 3: Implement state actions**

Expose:

```ts
setConversationRun(stageId: ConversationCategory, run: ConversationRun): void
updateConversationAssessment(stageId: ConversationCategory, selectedEvidence: string[], verdict: ConversationVerdict): void
clearConversationRun(stageId: ConversationCategory): void
```

The assessment action must update both `state.conversations[stageId]` and the corresponding step answer returned by `buildConversationAnswer`.

- [ ] **Step 4: Extend answer validation and scoring**

Extend `StepAnswer` with a `ConversationAnswer` object. Chat validation requires `sent`, at least one evidence item, and a verdict. Chat answer scoring awards full credit when the selected verdict matches the deterministic run verdict, partial credit for a completed but incorrect verdict, and no credit before a response exists.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run:

```powershell
npm run test -- src/features/experiment/engine.test.ts src/features/experiment/useExperiment.test.ts
```

Expect all engine and store tests to pass.

### Task 5: Build the reusable conversation UI

**Files:**
- Create: `src/features/experiment/ExperimentConversationWorkbench.vue`
- Create: `src/features/experiment/ConversationEvidencePanel.vue`
- Modify: `src/index.css`

- [ ] **Step 1: Build the workbench state machine**

The workbench accepts `stage`, `existingRun`, and defense settings; emits `run` and `assessment`. On model change it loads the correct category from `/TestResult`, on case selection it fills the original prompt, and on send it calls `createConversationRun`. Empty prompts and repeated sends while loading are disabled.

- [ ] **Step 2: Reproduce the original platform interaction language**

Render the original model selector, case selector, source question, editable textarea, send button, right-aligned user message, left-aligned model response, system simulation badge, defense chain, stop/reset action, and scroll-to-latest behavior. Use a short deterministic typing animation and cancel it on unmount or reset.

- [ ] **Step 3: Build evidence and verdict controls**

The evidence panel displays source-derived evidence candidates as selectable cards and stage-specific verdicts:

- jailbreak: 攻击成功 / 部分成功 / 攻击失败
- hallucination: 存在事实幻觉 / 证据不足 / 回答可靠
- injection: 指令被注入 / 存在可疑影响 / 未被注入
- defense: 防御成功 / 仍有残余风险 / 复测无效

At least one evidence selection and one verdict are required before emitting a completed assessment.

- [ ] **Step 4: Add responsive and semantic states**

At desktop widths use a `minmax(0,1fr) 300px` conversation/evidence grid. Below 1024px stack the evidence panel below the chat. Preserve visible focus rings, labels, disabled states, dark mode, reduced motion, and non-color status text.

### Task 6: Integrate chat operations into the 32-step workbench

**Files:**
- Modify: `src/pages/experiment/ExperimentRun.vue`
- Modify: `src/features/experiment/ExperimentGuide.vue`

- [ ] **Step 1: Route execution steps to the chat workbench**

When `currentStep.conversationStage` exists, render `ExperimentConversationWorkbench`; otherwise keep `ExperimentStepControl`. Remove the static `simulationEvidence` card so students must send a case to see a response.

- [ ] **Step 2: Connect experiment state and same-case defense retest**

For jailbreak, hallucination, and injection stages, save each run. For defense, preselect the most recent attack run and lock its model, case, question, and sent prompt; only defense settings may change. Display a compact “同模型 / 同案例 / 同提示词” control-variable checklist.

- [ ] **Step 3: Update the tutorial completion copy**

For chat steps, completion guidance must enumerate missing actions: choose case, send prompt, wait for response, select evidence, choose verdict. The main completion button remains disabled until all are satisfied.

- [ ] **Step 4: Run automated verification**

Run `npm run test`, `npm run typecheck`, and `npm run build`; fix every failure before proceeding.

- [ ] **Step 5: Commit the integrated UI**

Run:

```powershell
git add src/features/experiment src/pages/experiment/ExperimentRun.vue src/index.css
git commit -m "feat: use chat interactions in virtual experiments"
```

### Task 7: Browser verification, screenshots, and application evidence

**Files:**
- Modify: `docs/申报截图清单.md`
- Update: `docs/screenshots/03-教程式实验操作台.png`
- Update: `docs/screenshots/04-越狱攻击响应与判断.png`
- Update: `docs/screenshots/05-幻觉证据标注.png`
- Update: `docs/screenshots/06-提示词注入分析.png`
- Update: `docs/screenshots/07-输入检测与防御配置.png`
- Update: `docs/screenshots/08-防御前后指标对比.png`
- Modify: `G:/CODE2/大模型安全/tmp/申报书制作/artifact.md`
- Modify: `G:/CODE2/大模型安全/tmp/申报书制作/build_application.py`

- [ ] **Step 1: Verify the full student journey in a browser**

Run Vite on `127.0.0.1:5173`, clear the experiment storage, then verify jailbreak and hallucination case loading, prompt editing, simulated response, evidence selection, verdict, defense retest, refresh restore, and reset.

- [ ] **Step 2: Verify responsive and theme behavior**

Inspect desktop Chrome, desktop Edge, a mobile viewport, light theme, and dark theme. Confirm the composer remains reachable, messages wrap, defense traces do not overflow, and the evidence panel stacks correctly.

- [ ] **Step 3: Recapture the six affected application screenshots**

Use one consistent completed record. Each screenshot must visibly include the “预设案例仿真响应” label and, where applicable, the selected original model/case, actual sent prompt, response, evidence, verdict, or same-case defense comparison.

- [ ] **Step 4: Update submission descriptions**

Replace claims about static evidence cards with accurate descriptions of the interactive case-selection, prompt-editing, chat-response, evidence-marking, and same-case defense-retest workflow. Rebuild the DOCX without inventing institution, team, course, deployment, or outcome facts.

- [ ] **Step 5: Run final evidence checks**

Run:

```powershell
npm run test
npm run typecheck
npm run build
git diff --check
git status --short
```

Open every updated PNG and validate non-zero dimensions. Run the existing application-document validation script and review the generated DOCX in the available preview path.

- [ ] **Step 6: Commit final evidence**

Run:

```powershell
git add docs src G:/CODE2/大模型安全/申报材料 G:/CODE2/大模型安全/tmp/申报书制作
git commit -m "docs: update conversational experiment evidence"
```

Do not push, merge, or create a pull request unless the user explicitly requests it.
