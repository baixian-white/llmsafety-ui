<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100/70 shadow-inner dark:border-white/10 dark:bg-slate-950/45">
    <div class="border-b border-slate-200 bg-white/85 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-900/85">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white"><MessagesSquare class="size-4" /></span>
          <div>
            <h3 class="text-sm font-black text-slate-900 dark:text-white">大模型安全对话测试台</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">复用原测试平台案例与响应逻辑</p>
          </div>
        </div>
        <span class="flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200">
          <Database class="size-3.5" /> 预设案例仿真响应
        </span>
      </div>

      <div class="mt-4 grid gap-3 sm:grid-cols-2" :class="stage === 'baseline' ? 'lg:grid-cols-3' : ''">
        <label class="block">
          <span class="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">待测模型</span>
          <select v-model="selectedModelId" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-950 dark:text-white" :disabled="Boolean(retestSource) || isGenerating" @change="onModelChange">
            <option v-for="model in testPlatformModels" :key="model.id" :value="model.id">{{ model.name }} · {{ model.version }}</option>
          </select>
        </label>
        <label v-if="stage === 'baseline'" class="block">
          <span class="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">测试类型</span>
          <select v-model="selectedCategory" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white" :disabled="isGenerating" @change="reloadCases">
            <option value="jailbreak">违法内容生成 / 越狱</option>
            <option value="hallucination">虚假内容生成 / 幻觉</option>
          </select>
        </label>
        <label class="block" :class="stage === 'baseline' ? '' : 'sm:col-span-1'">
          <span class="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">原平台测试案例</span>
          <select v-model="selectedCaseId" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-950 dark:text-white" :disabled="isLoadingCases || Boolean(retestSource) || isGenerating" @change="onCaseChange">
            <option value="">{{ isLoadingCases ? '正在加载原案例…' : '请选择案例' }}</option>
            <option v-for="item in visibleCases" :key="item.id" :value="item.id">{{ item.title }}</option>
          </select>
        </label>
      </div>

      <div v-if="retestSource" class="mt-3 grid gap-2 rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-xs text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-950/25 dark:text-cyan-100 sm:grid-cols-3">
        <span class="flex items-center gap-1.5"><LockKeyhole class="size-3.5" /> 同模型：{{ modelName }}</span>
        <span class="flex items-center gap-1.5"><LockKeyhole class="size-3.5" /> 同案例：{{ retestSource.caseTitle }}</span>
        <span class="flex items-center gap-1.5"><LockKeyhole class="size-3.5" /> 同提示词：已锁定</span>
      </div>
      <div v-if="loadError" class="mt-3 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-500/20 dark:bg-rose-950/25 dark:text-rose-200">
        <span class="flex items-center gap-2"><TriangleAlert class="size-4" />{{ loadError }}</span>
        <button class="font-bold underline" @click="reloadCases">重新加载</button>
      </div>
    </div>

    <div class="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,1fr)_300px]">
      <section class="min-w-0 bg-white dark:bg-slate-950/35">
        <div ref="messageViewport" class="h-[430px] overflow-y-auto p-4 sm:p-5">
          <div v-if="!activeRun" class="flex h-full flex-col items-center justify-center px-6 text-center">
            <span class="flex size-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"><Bot class="size-7" /></span>
            <h4 class="mt-4 font-black text-slate-900 dark:text-white">选择案例并发送测试提示词</h4>
            <p class="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">像使用真实大模型一样完成提问与观察；回答来自原平台预设案例，保证实验可重复。</p>
          </div>
          <div v-else class="space-y-4">
            <div class="mx-auto flex max-w-xl items-center justify-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
              <Info class="size-3.5" /> 预设案例仿真响应，不连接在线模型
            </div>
            <div v-for="item in activeRun.messages" :key="item.id" class="flex gap-3" :class="item.role === 'user' ? 'justify-end' : item.role === 'system' ? 'justify-center' : 'justify-start'">
              <span v-if="item.role === 'assistant'" class="mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white"><Bot class="size-4" /></span>
              <div v-if="item.role !== 'system'" class="max-w-[88%]">
                <p class="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400" :class="item.role === 'user' ? 'text-right' : ''">{{ item.role === 'user' ? '测试者' : modelName }}</p>
                <div
                  v-if="item.role === 'assistant'"
                  class="experiment-chat-markdown break-words rounded-2xl px-4 py-3 text-sm leading-6"
                  :class="messageClass(item)"
                  v-html="renderMarkdown(displayedAssistant)"
                ></div>
                <div v-else class="whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6" :class="messageClass(item)">{{ item.content }}</div>
              </div>
              <div v-else class="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] text-slate-500 dark:bg-white/5 dark:text-slate-400">{{ item.content }}</div>
              <span v-if="item.role === 'user'" class="mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-700"><User class="size-4" /></span>
            </div>

            <div v-if="activeRun.defenseTrace.length" class="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 dark:border-cyan-500/20 dark:bg-cyan-950/20">
              <div class="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-200"><ShieldCheck class="size-4" /> 原平台防御链</div>
              <div class="mt-3 space-y-3">
                <div v-for="(test, index) in activeRun.defenseTrace" :key="`${test.id}-${index}`" class="flex gap-3 text-xs leading-5 text-cyan-950 dark:text-cyan-100">
                  <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-cyan-600 font-black text-white">{{ index + 1 }}</span>
                  <div><p class="font-bold">{{ test.name }}</p><p class="mt-0.5 opacity-75">{{ test.process }}</p><p class="mt-1 font-semibold">{{ test.output }}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.025]">
          <div v-if="selectedCase" class="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900 dark:border-amber-500/20 dark:bg-amber-950/25 dark:text-amber-100">
            <span class="font-black">原始问题：</span>{{ selectedCase.question }}
          </div>
          <div class="flex items-end gap-3">
            <textarea v-model="prompt" rows="3" class="min-h-24 flex-1 resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950 dark:text-white" :disabled="!selectedCase || isGenerating || Boolean(retestSource)" placeholder="选择案例后可编辑测试提示词…"></textarea>
            <button v-if="isGenerating" type="button" class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-500/20" aria-label="停止生成" @click="stopGeneration"><Square class="size-4 fill-current" /></button>
            <button v-else type="button" class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0" :disabled="!selectedCase || !prompt.trim()" aria-label="发送测试提示词" @click="sendPrompt"><Send class="size-5" /></button>
          </div>
          <div class="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>{{ prompt.trim().length }} 字 · 可编辑后发送</span>
            <button v-if="activeRun" class="flex items-center gap-1 font-bold text-violet-600 hover:text-violet-700 dark:text-violet-300" @click="resetRun"><RotateCcw class="size-3.5" /> 清空本轮对话</button>
          </div>
        </div>
      </section>

      <ConversationEvidencePanel v-if="activeRun && !isGenerating" :run="activeRun" @assessment="emitAssessment" />
      <aside v-else class="border-l border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.025]">
        <div class="flex h-full min-h-64 flex-col items-center justify-center text-center text-sm text-slate-400">
          <LoaderCircle v-if="isGenerating" class="size-7 animate-spin text-violet-500" />
          <ClipboardList v-else class="size-7" />
          <p class="mt-3 font-semibold">{{ isGenerating ? '模型正在生成仿真响应…' : '发送提示词后在此标注证据' }}</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Bot, ClipboardList, Database, Info, LoaderCircle, LockKeyhole, MessagesSquare, RotateCcw, Send, ShieldCheck, Square, TriangleAlert, User } from 'lucide-vue-next'
import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import ConversationEvidencePanel from './ConversationEvidencePanel.vue'
import { loadExperimentCases, testPlatformModels } from './caseAdapter'
import { createConversationRun } from './conversationEngine'
import type { ConversationRun, ConversationStage, ConversationVerdict, ExperimentCase, SourceCaseCategory } from './types'

const props = defineProps<{
  stage: ConversationStage
  initialModelId?: string
  existingRun?: ConversationRun
  retestSource?: ConversationRun
  defenseLayerCount?: number
}>()
const emit = defineEmits<{
  run: [run: ConversationRun]
  assessment: [evidence: string[], verdict: ConversationVerdict]
  reset: []
  'model-change': [modelId: string]
}>()

const selectedModelId = ref(props.retestSource?.modelId || props.existingRun?.modelId || props.initialModelId || testPlatformModels[0].id)
const selectedCategory = ref<SourceCaseCategory>(props.retestSource?.sourceCategory || props.existingRun?.sourceCategory || (props.stage === 'hallucination' ? 'hallucination' : 'jailbreak'))
const cases = ref<ExperimentCase[]>([])
const selectedCaseId = ref(props.retestSource?.caseId || props.existingRun?.caseId || '')
const prompt = ref(props.retestSource?.sentPrompt || props.existingRun?.sentPrompt || '')
const activeRun = ref<ConversationRun | undefined>(props.existingRun)
const displayedAssistant = ref(props.existingRun?.messages.find((item) => item.role === 'assistant')?.content || '')
const isLoadingCases = ref(false)
const isGenerating = ref(false)
const loadError = ref('')
const messageViewport = ref<HTMLElement | null>(null)
let animationToken = 0
const markdown = new MarkdownIt({ breaks: true, linkify: true, typographer: true })
const renderMarkdown = (text: string) => DOMPurify.sanitize(markdown.render(text || ''))

const effectiveCategory = computed<SourceCaseCategory>(() => {
  if (props.retestSource) return props.retestSource.sourceCategory
  if (props.stage === 'hallucination') return 'hallucination'
  return selectedCategory.value
})
const visibleCases = computed(() => {
  if (props.stage !== 'injection') return cases.value
  const tagged = cases.value.filter((item) => item.tags.includes('指令覆盖') || item.tags.includes('角色伪装'))
  return tagged.length ? tagged : cases.value
})
const selectedCase = computed(() => cases.value.find((item) => item.id === selectedCaseId.value))
const modelName = computed(() => testPlatformModels.find((model) => model.id === selectedModelId.value)?.name || selectedModelId.value)

const scrollToLatest = async () => {
  await nextTick()
  if (messageViewport.value) messageViewport.value.scrollTop = messageViewport.value.scrollHeight
}

const reloadCases = async () => {
  animationToken += 1
  isGenerating.value = false
  loadError.value = ''
  isLoadingCases.value = true
  try {
    cases.value = await loadExperimentCases(effectiveCategory.value, selectedModelId.value)
    const lockedId = props.retestSource?.caseId || props.existingRun?.caseId
    if (lockedId && cases.value.some((item) => item.id === lockedId)) selectedCaseId.value = lockedId
    else if (!cases.value.some((item) => item.id === selectedCaseId.value)) selectedCaseId.value = ''
    onCaseChange(false)
  } catch (error) {
    cases.value = []
    loadError.value = error instanceof Error ? error.message : '案例加载失败，请稍后重试。'
  } finally {
    isLoadingCases.value = false
  }
}

const onModelChange = () => {
  selectedCaseId.value = ''
  prompt.value = ''
  activeRun.value = undefined
  emit('model-change', selectedModelId.value)
  void reloadCases()
}

const onCaseChange = (clearRun = true) => {
  const item = selectedCase.value
  if (item) prompt.value = props.retestSource?.sentPrompt || props.existingRun?.sentPrompt || item.prompt
  if (clearRun && activeRun.value?.caseId !== selectedCaseId.value) {
    activeRun.value = undefined
    displayedAssistant.value = ''
    emit('reset')
  }
}

const animateAssistant = async (fullText: string, token: number) => {
  displayedAssistant.value = ''
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced || fullText.length < 80) {
    displayedAssistant.value = fullText
    return
  }
  const chunkSize = Math.max(8, Math.ceil(fullText.length / 80))
  for (let index = 0; index < fullText.length; index += chunkSize) {
    if (token !== animationToken) return
    displayedAssistant.value = fullText.slice(0, index + chunkSize)
    await scrollToLatest()
    await new Promise((resolve) => window.setTimeout(resolve, 8))
  }
}

const sendPrompt = async () => {
  const item = selectedCase.value
  if (!item || !prompt.value.trim() || isGenerating.value) return
  const token = ++animationToken
  isGenerating.value = true
  const run = createConversationRun(item, {
    stageId: props.stage,
    sentPrompt: props.retestSource?.sentPrompt || prompt.value,
    defenseEnabled: props.stage === 'defense',
    enabledDefenseCount: props.defenseLayerCount ?? 3,
  })
  activeRun.value = run
  await scrollToLatest()
  const response = run.messages.find((message) => message.role === 'assistant')?.content || ''
  await animateAssistant(response, token)
  if (token !== animationToken) return
  isGenerating.value = false
  emit('run', run)
  await scrollToLatest()
}

const stopGeneration = () => {
  animationToken += 1
  isGenerating.value = false
  const response = activeRun.value?.messages.find((item) => item.role === 'assistant')?.content || ''
  displayedAssistant.value = response
  if (activeRun.value) emit('run', activeRun.value)
}

const resetRun = () => {
  animationToken += 1
  isGenerating.value = false
  activeRun.value = undefined
  displayedAssistant.value = ''
  if (!props.retestSource) prompt.value = selectedCase.value?.prompt || ''
  emit('reset')
}

const emitAssessment = (evidence: string[], verdict: ConversationVerdict) => {
  if (!activeRun.value) return
  activeRun.value.selectedEvidence = evidence
  activeRun.value.verdict = verdict
  activeRun.value.completed = evidence.length > 0
  emit('assessment', evidence, verdict)
}

const messageClass = (item: ConversationRun['messages'][number]) => {
  if (item.role === 'user') return 'rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/10'
  if (item.tone === 'danger') return 'rounded-bl-md border border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-500/20 dark:bg-rose-950/30 dark:text-rose-100'
  if (item.tone === 'warning') return 'rounded-bl-md border border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-500/20 dark:bg-amber-950/30 dark:text-amber-100'
  if (item.tone === 'success') return 'rounded-bl-md border border-cyan-200 bg-cyan-50 text-cyan-950 dark:border-cyan-500/20 dark:bg-cyan-950/30 dark:text-cyan-100'
  return 'rounded-bl-md bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
}

watch(() => props.initialModelId, (value) => {
  if (value && !props.retestSource && value !== selectedModelId.value) {
    selectedModelId.value = value
    void reloadCases()
  }
})

onMounted(() => { void reloadCases() })
onBeforeUnmount(() => { animationToken += 1 })
</script>
