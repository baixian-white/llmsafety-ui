# LLM Safety Virtual Experiment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a submission-ready virtual simulation experiment module with 32 guided operations, deterministic preset responses, scoring, ability profiling, reporting, and a clearly labeled teacher demo dashboard.

**Architecture:** Keep the existing Vue application and add a data-driven experiment feature under `src/features/experiment`. Pure TypeScript modules define steps and calculate feedback, scores, metrics, and ability profiles; Vue pages render those outputs and persist a versioned state snapshot in `localStorage`. The feature uses existing Tailwind tokens and purple/indigo visual language, without a backend or real model API.

**Tech Stack:** Vue 3 Composition API, TypeScript, Vue Router, Tailwind CSS 4, Lucide Vue, Vitest, browser `localStorage`, SVG/CSS charts.

---

## File map

- `src/features/experiment/types.ts`: shared experiment, answer, score, metric, and report types.
- `src/features/experiment/catalog.ts`: seven stages, 32 step definitions, model profiles, cases, and demo data.
- `src/features/experiment/engine.ts`: pure validation, feedback, metric, scoring, profile, and recommendation functions.
- `src/features/experiment/useExperiment.ts`: versioned local persistence and experiment actions.
- `src/features/experiment/ExperimentLayout.vue`: shared background, page width, heading, and experiment navigation.
- `src/features/experiment/ExperimentGuide.vue`: spotlight-style tutorial hint and completion state.
- `src/features/experiment/ExperimentStepControl.vue`: data-driven input renderer for each step type.
- `src/features/experiment/MetricComparison.vue`: defense-before/after comparison bars.
- `src/features/experiment/AbilityRadar.vue`: accessible SVG radar chart.
- `src/pages/experiment/ExperimentHome.vue`: project overview and seven-stage route map.
- `src/pages/experiment/ExperimentPrepare.vue`: pre-test, simulation boundary, and resource recommendation.
- `src/pages/experiment/ExperimentRun.vue`: guided 32-step workbench.
- `src/pages/experiment/ExperimentResult.vue`: scoring, risk matrix, and metric summary.
- `src/pages/experiment/ExperimentReport.vue`: printable report and ability profile.
- `src/pages/experiment/ExperimentDashboard.vue`: teacher-facing demo statistics.
- `src/pages/NotFound.vue`: route fallback.
- `src/features/experiment/engine.test.ts`: engine unit tests.
- `src/features/experiment/useExperiment.test.ts`: persistence tests.
- `src/main.ts`: experiment routes, corrected editor route, and fallback route.
- `src/pages/TopNavBar.vue`: virtual experiment navigation link and router-safe mobile links.
- `src/pages/HomePage.vue`: prominent experiment call to action.
- `src/index.css`: shared experiment tokens, print rules, and reduced-motion behavior.
- `package.json`, `package-lock.json`: typecheck/test scripts and Vitest dependency.

### Task 1: Establish automated verification

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Add scripts and Vitest**

Add these scripts:

```json
{
  "typecheck": "vue-tsc --noEmit",
  "test": "vitest run"
}
```

Install Vitest as a development dependency with `npm install -D vitest` so the lock file remains synchronized.

- [ ] **Step 2: Run the baseline checks**

Run `npm run typecheck` and `npm run build`. Record existing failures separately from new experiment failures.

### Task 2: Define the experiment domain and failing engine tests

**Files:**
- Create: `src/features/experiment/types.ts`
- Create: `src/features/experiment/catalog.ts`
- Create: `src/features/experiment/engine.test.ts`

- [ ] **Step 1: Define explicit domain types**

Define `ExperimentStage`, `ExperimentStep`, `StepOption`, `StepAnswer`, `ExperimentState`, `SimulationMetrics`, `ScoreSummary`, and `AbilityProfile`. Each step must include `id`, `number`, `stageId`, `title`, `instruction`, `knowledge`, `taskMapping`, `type`, `weight`, `options` or numeric constraints, and feedback rules.

- [ ] **Step 2: Encode seven stages and 32 operations**

Create exactly 32 step definitions distributed `4, 4, 5, 5, 4, 6, 4` across the seven stages. Stage maximum scores must total 100 using `10, 10, 20, 15, 15, 20, 10`.

- [ ] **Step 3: Write failing engine tests**

Tests must assert:

```ts
expect(experimentSteps).toHaveLength(32)
expect(experimentStages.reduce((sum, stage) => sum + stage.maxScore, 0)).toBe(100)
expect(validateAnswer(modelStep, '')).toBe(false)
expect(validateAnswer(modelStep, 'balanced-model')).toBe(true)
expect(calculateMetrics(weakDefense).jailbreakSuccessRate)
  .toBeGreaterThan(calculateMetrics(strongDefense).jailbreakSuccessRate)
expect(calculateMetrics(strongDefense).falsePositiveRate)
  .toBeGreaterThan(calculateMetrics(weakDefense).falsePositiveRate)
```

- [ ] **Step 4: Run tests and confirm failure**

Run `npm run test -- src/features/experiment/engine.test.ts`; expect missing engine exports.

### Task 3: Implement deterministic simulation and scoring

**Files:**
- Create: `src/features/experiment/engine.ts`
- Modify: `src/features/experiment/engine.test.ts`

- [ ] **Step 1: Implement answer validation and option feedback**

`validateAnswer` must support `single`, `multi`, `range`, `evidence`, `decision`, and `text` inputs. `getStepFeedback` must return a severity, title, message, knowledge link label, and earned points.

- [ ] **Step 2: Implement defense metrics**

Use deterministic formulas with bounded values. Stronger input detection, prompt protection, output filtering, and risk thresholds reduce jailbreak/injection/harmful pass rates, while aggressive settings increase false positives.

- [ ] **Step 3: Implement scoring and profiles**

`calculateScore` sums step points by stage and applies a capped hint penalty. `calculateAbilityProfile` maps traceable step groups to risk identification, attack design, response analysis, defense configuration, and comprehensive decision scores.

- [ ] **Step 4: Run focused tests**

Run `npm run test -- src/features/experiment/engine.test.ts`; expect all engine tests to pass.

### Task 4: Implement versioned experiment state

**Files:**
- Create: `src/features/experiment/useExperiment.ts`
- Create: `src/features/experiment/useExperiment.test.ts`

- [ ] **Step 1: Write failing persistence tests**

Test that a fresh state starts at step one, a valid answer is saved, reload restores the answer, reset removes it, and invalid JSON falls back to a recoverable fresh state.

- [ ] **Step 2: Implement state actions**

Expose `state`, `currentStep`, `currentStage`, `setAnswer`, `completeCurrentStep`, `goBack`, `useHint`, `resetExperiment`, `finishExperiment`, `score`, `metrics`, and `abilityProfile`. Store under `llmsafety_virtual_experiment_v1`.

- [ ] **Step 3: Run persistence tests**

Run `npm run test -- src/features/experiment/useExperiment.test.ts`; expect all tests to pass.

### Task 5: Build shared experiment presentation components

**Files:**
- Create: `src/features/experiment/ExperimentLayout.vue`
- Create: `src/features/experiment/ExperimentGuide.vue`
- Create: `src/features/experiment/ExperimentStepControl.vue`
- Create: `src/features/experiment/MetricComparison.vue`
- Create: `src/features/experiment/AbilityRadar.vue`
- Modify: `src/index.css`

- [ ] **Step 1: Build the shared layout**

Use the existing grid background, purple/indigo gradients, glass panels, light/dark tokens, responsive widths, and consistent top padding below the fixed navigation.

- [ ] **Step 2: Build the tutorial guide**

Render a non-blocking dim layer, pulsing target frame, task bubble, progress text, close button, and “complete the current operation” message. The guide must not allow a page advance itself.

- [ ] **Step 3: Build the step control renderer**

Render accessible radio cards, checkboxes, sliders, evidence tags, decision cards, and text areas from `ExperimentStep`. Emit normalized `StepAnswer` values.

- [ ] **Step 4: Build charts without a chart dependency**

Use semantic HTML and CSS bars for metric comparison. Use an SVG polygon with visible axis labels and a textual score list for the ability radar.

- [ ] **Step 5: Add shared and print styles**

Add experiment background, glass card, status chip, guide pulse, print-only helpers, and reduced-motion overrides. A4 print must hide site navigation and action buttons.

### Task 6: Build the experiment entry and preparation flow

**Files:**
- Create: `src/pages/experiment/ExperimentHome.vue`
- Create: `src/pages/experiment/ExperimentPrepare.vue`

- [ ] **Step 1: Build the experiment home page**

Show project title, “未来信息 / 综合设计型 / 网络空间安全与信息安全” chips, objectives, seven-stage route, 32-operation fact, simulation disclosure, and start/continue actions.

- [ ] **Step 2: Build the preparation page**

Show task brief, preset-response disclosure, ethical notice, an eight-question pre-test, and deterministic knowledge recommendations. Save pre-test results before enabling entry to the workbench.

### Task 7: Build the guided 32-step workbench

**Files:**
- Create: `src/pages/experiment/ExperimentRun.vue`

- [ ] **Step 1: Build the workbench shell**

Create stage navigation, current task card, dynamic input, simulation feedback panel, knowledge panel, score/time/progress header, and previous/complete controls.

- [ ] **Step 2: Enforce meaningful completion**

Disable the complete button until `validateAnswer` succeeds. When clicked, show the option-specific feedback and earned points before advancing. Clicking a navigation stage may only visit completed stages or the current stage.

- [ ] **Step 3: Integrate the tutorial guide**

Open it automatically on first use, persist the preference, highlight the active task, and allow it to be reopened from the header.

- [ ] **Step 4: Add stage-specific simulation evidence**

For jailbreak, hallucination, injection, and defense stages show preset model responses, evidence excerpts, attack indicators, or metric previews derived from current answers. Always label responses as virtual simulation output.

### Task 8: Build results, report, and teacher dashboard

**Files:**
- Create: `src/pages/experiment/ExperimentResult.vue`
- Create: `src/pages/experiment/ExperimentReport.vue`
- Create: `src/pages/experiment/ExperimentDashboard.vue`

- [ ] **Step 1: Build results**

Render total score, stage scores, pass recommendation, risk matrix, deductions, learning recommendations, and defense metric comparison. If no completed state exists, render a consistent completed demo result with a visible demo badge.

- [ ] **Step 2: Build the printable report**

Render experiment metadata, step summary, key choices, before/after metrics, conclusion, recommendations, score table, and ability radar. Add `window.print()` action.

- [ ] **Step 3: Build the teacher demo dashboard**

Render fixed demonstration counts, distribution bars, stage averages, common errors, risk-type distribution, and sample student rows. Display “教学演示数据” near the title and within the summary region.

### Task 9: Integrate navigation, routes, home CTA, and fallback

**Files:**
- Modify: `src/main.ts`
- Modify: `src/pages/TopNavBar.vue`
- Modify: `src/pages/HomePage.vue`
- Create: `src/pages/NotFound.vue`

- [ ] **Step 1: Register experiment routes**

Add all six experiment routes, correct `/zhshiku/editor/:key` to `/zhishiku/editor/:key`, set scroll-to-top behavior, and add `/:pathMatch(.*)*` fallback.

- [ ] **Step 2: Add the navigation entry**

Add “虚拟仿真实验” before the existing test platform link. Replace mobile plain anchors with `RouterLink` so the SPA does not reload unnecessarily.

- [ ] **Step 3: Add a home call to action**

Add an experiment card or button near the primary home introduction using the same brand gradient and a concise “32步攻防评测” description.

- [ ] **Step 4: Build the 404 page**

Provide links to the home page, virtual experiment, and test platform.

### Task 10: Verify, repair, and capture evidence

**Files:**
- Modify: files implicated by compiler or runtime errors
- Create: `docs/申报截图清单.md`
- Create: `docs/screenshots/*.png`

- [ ] **Step 1: Run automated checks**

Run `npm run test`, `npm run typecheck`, and `npm run build`. Fix all new errors and any existing error that prevents a clean build.

- [ ] **Step 2: Run the application and inspect key routes**

Start Vite on `127.0.0.1:5173`. Inspect `/experiment`, `/experiment/prepare`, `/experiment/run`, `/experiment/result`, `/experiment/report`, and `/experiment/dashboard` at desktop and mobile viewports.

- [ ] **Step 3: Exercise the guided flow**

Verify invalid empty inputs cannot advance, valid inputs advance, tutorial state can be closed and reopened, page refresh restores state, reset clears state, and at least two defense configurations produce different metrics.

- [ ] **Step 4: Capture application evidence**

Capture consistent desktop screenshots of the experiment home, route map, preparation recommendation, tutorial highlight, jailbreak response, hallucination evidence, injection analysis, defense setup, metric comparison, results, ability profile/report, and teacher dashboard.

- [ ] **Step 5: Write the screenshot inventory**

For every image list filename, route, application-book section, claim supported, and whether data is simulated or demonstration data.

- [ ] **Step 6: Review repository changes**

Run `git diff --check`, `git status --short`, and inspect the final diff to ensure unrelated user work was not modified.
