<template>
  <div
    class="relative w-full bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark"
    :class="fitEnabled ? 'overflow-hidden' : 'min-h-screen overflow-y-auto'"
    :style="fitEnabled ? { height: `${viewportH}px` } : undefined">

    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block">
      <div
        class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-300/20 rounded-full filter blur-3xl animate-pulse">
      </div>
      <div
        class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000">
      </div>
    </div>

    <div :class="fitEnabled ? 'fit-wrap' : ''" :style="fitEnabled ? { top: `${navH}px` } : undefined">

      <main class="relative z-10 flex flex-col"
        :class="fitEnabled ? 'fit-stage px-8 pt-2 pb-6' : 'min-h-screen px-4 sm:px-6 md:px-8 lg:px-24 pt-24 pb-8'"
        :style="fitEnabled ? stageStyle : undefined">

      <header class="text-center mb-8 animate-fade-in-down">
        <h1
          class="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2">
          人工智能安全测试平台
        </h1>
        <p class="text-base md:text-lg text-purple-500 font-semibold tracking-wider">
          测试人工智能对攻击的防御能力
        </p>
      </header>

      <!--
        lg:grid-rows-[minmax(0,1fr)]：把行高钉死为 section 高度。
        默认隐式行是 auto，会被对话内容撑高，导致消息区永远不溢出、滚动条失效。
        非缩放模式（矮屏）下 section 没有确定高度，给个设计稿高度，内容区内部滚动。
      -->
      <section
        class="w-full mx-auto grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-[minmax(0,1fr)] gap-3 animate-fade-in-up"
        :class="fitEnabled ? 'flex-1 min-h-0' : 'shrink-0 lg:h-[840px]'">

        <div class="lg:col-span-1 flex flex-col gap-4 lg:h-full min-h-0 overflow-y-auto custom-scrollbar">

          <Card
            class="bg-white gap-2 dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 shadow-lg rounded-xl flex-shrink-0 h-auto flex flex-col justify-start">
            <CardHeader class="pb-1">
              <CardTitle class="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <Icon icon="mdi:robot" class="w-5 h-5 text-purple-500" />
                测试模型
              </CardTitle>
            </CardHeader>
            <CardContent class="p-3 md:p-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
                <div v-for="model in models" :key="model.id" @click="selectedModel = model.id"
                  class="p-2 md:p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all duration-200 space-x-3"
                  :class="selectedModel === model.id
                    ? 'border-purple-400 dark:border-purple-400 bg-purple-500 text-white shadow-md'
                    : 'border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-800/30'">
                  <div class="flex-1 text-left min-w-0">
                    <div class="text-base md:text-sm font-bold truncate" :title="model.name">
                      {{ model.name }}
                    </div>
                    <div class="text-xs md:text-md opacity-80 truncate font-mono"
                      :class="selectedModel === model.id ? '' : 'text-gray-500 dark:text-gray-400'"
                      :title="model.version">
                      {{ model.version }}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            class="bg-white gap-2 dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 shadow-lg rounded-xl flex-1 flex flex-col min-h-0 justify-start">
            <CardHeader class="pb-1 flex-shrink-0">
              <CardTitle class="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <Icon icon="mdi:sword" class="w-5 h-5 text-red-500" />
                攻击类型
              </CardTitle>
            </CardHeader>
            <CardContent class="p-3 md:p-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
                <Card v-for="attack in attackTypes" :key="attack.id" @click="selectedAttack = attack.id"
                  class="p-0 rounded-lg cursor-pointer"
                  :class="selectedAttack === attack.id
                    ? 'border-purple-500 dark:border-purple-400 bg-purple-500 text-white shadow-md'
                    : 'border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-800/30'">
                  <CardContent class="p-4 flex items-center gap-3">
                    <div class="flex-1 min-w-0">
                      <div class="text-base md:text-sm font-bold truncate" :title="attack.name">{{ attack.name }}</div>
                      <div class="text-xs md:text-[12px] opacity-80 truncate" :title="attack.description">{{
                        attack.description }}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>


        <div class="lg:col-span-4">
          <Card
            class="bg-white pt-0 gap-0 dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 shadow-lg flex flex-col h-[75vh] min-h-[520px] lg:h-full lg:min-h-0">

            <CardHeader class="rounded-t-xl py-4 flex-shrink-0 transition-colors duration-300" :class="isDefenseActive
              ? 'bg-blue-100/50 dark:bg-blue-900/20'
              : ''">
              <div class="flex items-center justify-between gap-4 px-4 mb-3">
                <CardTitle
                  class="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 flex-shrink-0">
                  <Icon icon="mdi:chat-processing" class="w-6 h-6"
                    :class="isDefenseActive ? 'text-blue-500' : 'text-purple-600'" />
                  人工智能对话测试
                </CardTitle>

                <div class="flex items-center gap-3 min-w-0">
                  <div class="text-center text-md font-semibold text-gray-600 dark:text-gray-400 font-mono truncate">
                    <span v-if="selectedModel && selectedAttack">
                      {{models.find(m => m.id === selectedModel)?.name}} · {{attackTypes.find(a => a.id ===
                      selectedAttack)?.name}}
                    </span>
                    <span v-else>请选择模型和攻击类型</span>
                  </div>

                  <!-- 刷新：清空对话并重置所有选择，效果等同刷新页面但不重新加载 -->
                  <Button variant="outline" size="sm" @click="resetPage" title="清空对话并重置所有选择（无需刷新网页）"
                    class="shrink-0 gap-1.5 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-white/20 hover:text-purple-600 hover:border-purple-400 dark:hover:text-purple-300">
                    <Icon icon="mdi:refresh" class="w-4 h-4" />
                    刷新
                  </Button>
                </div>
              </div>

              <div class="px-4">
                <div 
                  @click="isDefensePanelOpen = !isDefensePanelOpen"
                  class="defense-toggle-bar"
                  :class="{ 'active': isDefenseActive, 'open': isDefensePanelOpen }"
                >
                  <div class="flex items-center gap-3">
                    <Icon icon="mdi:shield-crown-outline" class="w-5 h-5" />
                    <span class="font-semibold text-sm">安全防御策略</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="defense-status-badge text-sm" :class="{ 'active': isDefenseActive }">
                      <span v-if="selectedAttack === 'jailbreak'">依赖选择</span>
                      <span v-else-if="selectedAttack === 'adversarial-examples'">整体开关</span>
                      <template v-if="selectedAttack">
                        <span class="mx-1 opacity-50">|</span>
                        <span>{{ isDefenseActive ? `已开启` : '已关闭' }}</span>
                      </template>
                      <span v-else>请先选择攻击类型</span>
                    </div>
                    <Icon icon="mdi:chevron-down" class="w-5 h-5 transition-transform duration-300" :class="{ 'rotate-180': isDefensePanelOpen }" />
                  </div>
                </div>

                <div class="defense-panel" :class="{ 'open': isDefensePanelOpen }">
                  <div class="defense-panel-content">
                    <div class="flex items-center justify-center gap-3 md:gap-10">
                      <div v-for="(d, index) in defenses" :key="d.id" 
                        @click="toggleDefense(d.id)"
                        @mouseenter="onDefenseHover(d.id)" 
                        @mouseleave="onDefenseLeave()"
                        class="defense-card"
                        :class="getDefenseCardClass(d)"
                        :style="{ transitionDelay: isDefensePanelOpen ? `${index * 50}ms` : '0ms' }"
                        :disabled="!selectedAttack">
                          <div class="defense-flow-badge-v3" :class="getDefenseBadgeClass(d)">
                            {{ d.flow }}
                          </div>
                          <Icon :icon="d.icon" class="defense-icon" :class="getDefenseIconClass(d)" />
                          <div class="defense-name">{{ d.name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </CardHeader>

            <CardContent class="flex-1 p-4 overflow-hidden flex flex-col min-h-0 border-t border-gray-200 dark:border-white/10">

              <div ref="messagesContainer" @scroll="onMessagesScroll"
                class="flex-1 overflow-y-auto custom-scrollbar mb-4 min-h-0 px-3 md:px-0">

                <div v-if="messages.length === 0"
                  class="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                  <div class="text-4xl mb-3">
                    <Icon icon="mdi:thought-bubble-outline" class="w-10 h-10" />
                  </div>
                  <p class="text-sm">选择模型和攻击类型后，输入测试内容开始对话</p>
                  <p class="text-xs mt-2">系统会模拟对抗性攻击并显示模型响应</p>
                </div>

                <div v-else class="space-y-5 md:space-y-4">
                  <div v-for="(message, index) in messages" :key="index">
                    <div class="flex gap-3" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">

                      <template v-if="message.role === 'assistant' && !message.isSystem">
                        <div v-if="index === 0 || messages[index - 1].role === 'user' || messages[index - 1].isSystem"
                          class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                          AI
                        </div>
                        <div v-else class="w-8 h-8 flex-shrink-0"></div>
                      </template>
                      <div v-else-if="message.isSystem" class="w-8 h-8 flex-shrink-0"></div>

                      <div class="flex flex-col gap-1 max-w-[85%] md:max-w-[70%]"
                        :class="message.role === 'user' ? 'items-end' : ''">

                        <div v-if="!message.isSystem && message.role === 'user'"
                          class="flex items-center gap-2 mb-1 max-w-[70%]"
                          :class="message.role === 'user' ? 'justify-end w-full' : 'justify-start'">
                          <span class="text-[10px] font-semibold text-gray-600 dark:text-gray-400">用户</span>
                          <span class="text-[9px] text-gray-400 dark:text-gray-500">{{ message.time }}</span>
                        </div>
                        <div v-if="message.originalQuestion" class="max-w-sm">
                          <div
                            class="text-xs px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 text-purple-900 dark:text-purple-200">
                            <strong class="text-purple-700 dark:text-purple-300">原始提问：</strong>
                            <span class="text-purple-800 dark:text-purple-100">{{ message.originalQuestion }}</span>
                          </div>
                        </div>
                        <div v-if="message.role !== 'user'" class="flex items-center gap-2 mb-1"
                          :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
                          <span class="text-[10px] font-semibold text-gray-600 dark:text-gray-400">
                            {{ message.isSystem ? '系统' : 'AI' }}
                          </span>
                          <span class="text-[9px] text-gray-400 dark:text-gray-500">{{ message.time }}</span>
                        </div>

                        <div class="px-4 py-3 md:py-2.5 rounded-2xl text-sm leading-relaxed" :class="message.isSystem
                          ? message.isWarning
                            ? 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 text-red-900 dark:text-red-100 rounded-bl-sm border border-red-300 dark:border-red-600 shadow-sm shadow-red-200/50 dark:shadow-red-900/30'
                            : message.isCorrection
                              ? 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-900 dark:text-orange-100 rounded-bl-sm border border-orange-300 dark:border-orange-600 shadow-sm shadow-orange-200/50 dark:shadow-orange-900/30'
                              : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100 border border-yellow-300 dark:border-yellow-700 rounded-lg px-3 py-2 text-xs'
                          : message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-br-sm'
                            : message.isWarning
                              ? 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 text-red-900 dark:text-red-100 rounded-bl-sm border border-red-300 dark:border-red-600 shadow-sm shadow-red-200/50 dark:shadow-red-900/30'
                              : message.isCorrectionSystem
                                ? 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-900 dark:text-orange-100 rounded-bl-sm border border-orange-300 dark:border-orange-600 shadow-sm shadow-orange-200/50 dark:shadow-orange-900/30'
                                : message.isCorrection
                                  ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-900 dark:text-blue-100 rounded-bl-sm border border-blue-300 dark:border-blue-600 shadow-sm'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'">

                          <div v-if="message.defenseFlow && message.defenseFlow.statuses.length > 0">
                            <div class="defense-thinking-toggle"
                              @click="message.defenseFlow.isCollapsed = !message.defenseFlow.isCollapsed">
                              <span class="defense-thinking-icon"
                                :class="{ 'is-collapsed': message.defenseFlow.isCollapsed }">
                                <svg fill="currentColor" viewBox="0 0 20 20" class="w-3 h-3">
                                  <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                                </svg>
                              </span>
                              <span class="defense-thinking-title flex items-center">
                                <Icon v-if="message.defenseFlow && message.defenseFlow.isRunning" icon="mdi:autorenew"
                                  class="w-4 h-4 icon-spin mr-2" />
                                <Icon v-else-if="message.defenseFlow && message.defenseFlow.finalDecision === 'pass'"
                                  icon="mdi:shield-check" class="w-4 h-4 text-green-600 mr-2" />
                                <Icon v-else-if="message.defenseFlow && message.defenseFlow.finalDecision === 'blocked'"
                                  icon="mdi:shield-alert" class="w-4 h-4 text-red-600 mr-2" />
                                <Icon v-else icon="mdi:shield-outline" class="w-4 h-4 mr-2" />
                                安全检测流程
                              </span>
                              <span class="defense-thinking-loader" v-if="message.defenseFlow.isRunning">
                                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                              </span>
                            </div>

                            <div v-show="!message.defenseFlow.isCollapsed" class="defense-thinking-steps">
                              <div
                                v-for="(status, s_index) in message.defenseFlow.statuses.slice(0, message.defenseFlow.visibleSteps)"
                                :key="status.id" class="step-item" :class="status.status">
                                <div class="step-connector">

                                  <div class="step-icon-wrapper"
                                    :class="[status.status, status.corrected ? 'corrected' : '']">
                                    <Icon v-if="status.status === 'running'" :icon="'mdi:autorenew'"
                                      class="w-4 h-4 icon-spin" />

                                    <Icon
                                      v-else-if="status.corrected && (status.attackType === 'adversarial-examples' || (message.defenseFlow && message.defenseFlow.attackType === 'adversarial-examples'))"
                                      :icon="'mdi:information-outline'" class="w-4 h-4" />
                                    <Icon v-else-if="status.status === 'pass'" :icon="'mdi:check-circle-outline'"
                                      class="w-4 h-4" />
                                    <Icon
                                      v-else-if="status.status === 'blocked' && ((status.attackType && status.attackType !== 'adversarial-examples') || (message.defenseFlow && message.defenseFlow.attackType && message.defenseFlow.attackType !== 'adversarial-examples'))"
                                      :icon="'mdi:close-circle-outline'" class="w-4 h-4" />
                                    <Icon
                                      v-else-if="status.status === 'blocked' && ((status.attackType && status.attackType === 'adversarial-examples') || (message.defenseFlow && message.defenseFlow.attackType === 'adversarial-examples'))"
                                      :icon="'mdi:lightbulb-on-outline'" class="w-4 h-4" />
                                    <Icon v-else :icon="'mdi:clock-outline'" class="w-4 h-4" />
                                  </div>
                                  <div v-if="s_index < message.defenseFlow.visibleSteps - 1" class="step-line"></div>
                                </div>
                                <div class="step-content">
                                  <strong class="step-name">{{ status.name }}</strong>
                                  <div v-if="status.process" class="step-process">{{ status.process }}</div>

                                  <div
                                    v-if="status.output && (((status.attackType || (message.defenseFlow && message.defenseFlow.attackType)) !== 'adversarial-examples') || status.illegal === true)"
                                    class="step-output" :class="[status.status, status.corrected ? 'corrected' : '']">
                                    <strong>结论:</strong> <span>{{ status.output }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <hr class="defense-divider" />
                          </div>

                          <span v-if="message.content === '正在分析并生成响应'" class="flex items-center gap-2">
                            <span class="inline-block animate-pulse">
                              <Icon icon="mdi:robot" class="w-4 h-4 text-yellow-500" />
                            </span>
                            <span>{{ message.content }}</span>
                          </span>

                          <div v-else :class="(() => {
                            if (message.role === 'user') return 'prose-user'

                            if (message.isSystem) {
                              if (message.isWarning) return 'system-warning prose prose-sm'
                              return 'system-correction prose prose-sm'
                            }
                            return 'prose prose-sm dark:prose-invert max-w-none'
                          })()" v-html="renderMarkdown(message.content)">
                          </div>

                        </div>
                      </div>


                      <div v-if="message.role === 'user'"
                        class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                        U
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 用户上翻查看历史时会停止自动跟随，此按钮一键回到最新内容。
                     h-0 的 sticky 容器贴在滚动区底边，不占布局高度 -->
                <div class="sticky bottom-0 h-0">
                  <button v-show="!autoFollow && messages.length > 0" type="button" @click="jumpToLatest"
                    class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
                    <Icon icon="mdi:arrow-down" class="w-4 h-4" />
                    回到最新
                  </button>
                </div>
              </div>


              <div class="border-t border-gray-200 dark:border-white/10 pt-4 space-y-3">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      选择测试案例 ({{ availableCases.length }} / {{ allCases.length }})
                    </label>
                    <span v-if="selectedAttack" class="text-xs px-2 py-1 rounded-full font-medium"
                      :class="selectedAttack === 'jailbreak'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-700'">
                      {{attackTypes.find(a => a.id === selectedAttack)?.name}}
                    </span>
                  </div>
                  <div class="relative">

                    <div class="relative">
                      <div role="button" tabindex="0" @click="dropdownOpen = !dropdownOpen"
                        @keydown.enter.prevent="dropdownOpen = !dropdownOpen"
                        :class="allCases.length === 0 ? 'opacity-60 cursor-not-allowed' : ''"
                        class="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white transition-all cursor-pointer font-medium flex items-center justify-between">
                        <div class="min-w-0 text-left">

                          <div class="text-sm font-medium line-clamp-2"
                            :title="selectedCase ? selectedCase.question : ''">
                            {{ selectedCase ? selectedCase.question : (allCases.length === 0 ? '请先选择模型和攻击类型' :
                            (availableCases.length === 0 ? '当前防御组合无可用案例' : '-- 请选择攻击测试案例 --')) }}
                          </div>
                        </div>
                        <svg class="w-5 h-5 text-purple-500 dark:text-purple-400 ml-2" fill="currentColor"
                          viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </div>


                      <div v-show="dropdownOpen"
                        class="absolute z-50 bottom-full mb-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg max-h-[480px] overflow-auto">

                        <div>
                          <template v-if="filteredCases.length === 0">
                            <div class="px-4 py-3 text-sm text-gray-500">无匹配案例</div>
                          </template>
                          <template v-else>

                            <div v-for="testCase in filteredCases" :key="testCase.id"
                              @click.prevent="chooseCase(testCase.id)"
                              class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                              <div class="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2"
                                :title="testCase.question">{{ testCase.question }}</div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg class="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div v-if="selectedCaseId"
                  class="bg-gradient-to-r from-purple-50 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-700/50">
                  <div class="text-xs text-gray-700 dark:text-gray-400 space-y-2">
                    <div v-if="selectedAttack === 'jailbreak'">
                      <strong class="text-gray-900 dark:text-white">原始提问：</strong>
                      <p class="mt-1 text-gray-700 dark:text-gray-300">{{ selectedCase?.question }}</p>
                    </div>
                    <div v-else>
                      <strong class="text-gray-900 dark:text-white">问题：</strong>
                      <p class="mt-1 text-gray-700 dark:text-gray-300">{{ selectedCase?.question }}</p>
                      <div class="mt-2 pt-2 border-t border-purple-200 dark:border-purple-700">
                        <div class="inline-block">
                          <strong class="text-blue-900 dark:text-blue-200">✓ 答案指正：</strong>
                          <span
                            class="answer-preview text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-200 dark:border-blue-700">
                            {{ selectedCase?.answer }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex gap-2">
                  <Textarea v-model="testInput" :placeholder="selectedCaseId ? '内容已准备，点击测试开始' : '请先选择上方测试案例...'"
                    disabled
                    class="flex-1 min-h-[80px] max-h-[120px] text-sm bg-gray-100 dark:bg-gray-800/30 border-gray-200 dark:border-white/10 resize-none rounded-lg cursor-not-allowed opacity-60" />
                  <Button @click="isTestiing ? stopStreaming() : runTest()"
                    :disabled="!isTestiing && (!selectedModel || !selectedAttack || !selectedCase)"
                    :class="isTestiing
                      ? 'self-end bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-8 rounded-lg shadow-lg shadow-red-500/30 transition-all duration-300'
                      : 'self-end bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold px-6 py-8 rounded-lg shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'">
                    <span v-if="!isTestiing" class="flex flex-col items-center">
                      <Icon icon="mdi:send" class="text-white w-6 h-6 mb-1" />
                      <span class="text-xs">测试</span>
                    </span>
                    <span v-else class="flex flex-col items-center">
                      <Icon icon="mdi:stop" class="text-white w-6 h-6 mb-1" />
                      <span class="text-xs">停止</span>
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

/* ------------------------------------------------------------------
 * 整页等比缩放适配（大屏 / 高分屏 / 浏览器缩放都铺满一屏，不出滚动条）
 *
 * 思路：以 BASE_W x BASE_H 作为设计稿尺寸，整块内容按
 * scale = min(可用宽/BASE_W, 可用高/BASE_H) 等比缩放；
 * 再把舞台的逻辑宽高反算回可用区域（带上限），让缩放后正好铺满，
 * 不留上下/左右黑边。宽度不足 lg 断点时退回普通响应式流。
 * ------------------------------------------------------------------ */
const NAV_FALLBACK_H = 56 // 顶部固定导航条高度兜底值（TopNavBar h-14）
const BASE_W = 1600       // 设计稿宽
const BASE_H = 980        // 设计稿高（>= 左栏两张卡 + 标题的自然高度，保证不被裁切）
const MAX_W = 2000        // 舞台逻辑宽上限，避免超宽屏把内容拉得过散
const MAX_H = 1200        // 舞台逻辑高上限
const FIT_MIN_W = 1024    // 小于 lg 断点不启用缩放，走普通流
const FIT_MIN_H = 520
const MIN_SCALE = 0.6     // 缩放比低于此值时字太小，改用普通滚动布局（平板横屏等矮视口）

const fitEnabled = ref(false)
const fitScale = ref(1)
const viewportH = ref(0)
const navH = ref(NAV_FALLBACK_H)
const stageW = ref(BASE_W)
const stageH = ref(BASE_H)

// 导航栏被「手动」隐藏时把那部分高度让回给内容。
// 注意不能跟随滚动自动隐藏（navbar-hidden）：回退到滚动布局时，往下滚会自动隐藏导航栏 →
// 可用高度变大、缩放比越过 MIN_SCALE → 切到一屏缩放布局、页面不再可滚、scrollY 归零 →
// 导航栏重新出现 → 又回退到滚动布局，如此循环导致页面闪烁且无法滚动（如浏览器缩放 150% 时）。
const measureNavH = () => {
  const header = document.querySelector('header')
  if (!header) return NAV_FALLBACK_H
  return header.classList.contains('navbar-manually-hidden') ? 0 : header.offsetHeight || NAV_FALLBACK_H
}

const stageStyle = computed(() => ({
  width: `${stageW.value}px`,
  height: `${stageH.value}px`,
  transform: `translate(-50%, -50%) scale(${fitScale.value})`,
}))

const updateFit = () => {
  // 用 clientWidth/Height：不含滚动条，避免开关滚动条时来回抖动
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  viewportH.value = vh
  navH.value = measureNavH()

  if (vw < FIT_MIN_W || vh < FIT_MIN_H) {
    fitEnabled.value = false
    return
  }

  const availW = vw
  const availH = vh - navH.value
  const scale = Math.min(availW / BASE_W, availH / BASE_H)

  // 可用区域太小时，硬塞进一屏会让文字小到看不清，此时宁可回退到滚动布局
  if (scale < MIN_SCALE) {
    fitEnabled.value = false
    return
  }

  fitScale.value = scale
  stageW.value = Math.min(availW / scale, MAX_W)
  stageH.value = Math.min(availH / scale, MAX_H)
  fitEnabled.value = true
}

let navObserver: MutationObserver | null = null

onMounted(() => {
  updateFit()
  window.addEventListener('resize', updateFit)
  window.addEventListener('orientationchange', updateFit)

  // 监听导航栏显示/隐藏，重新计算可用高度
  const header = document.querySelector('header')
  if (header) {
    navObserver = new MutationObserver(updateFit)
    navObserver.observe(header, { attributes: true, attributeFilter: ['class'] })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFit)
  window.removeEventListener('orientationchange', updateFit)
  navObserver?.disconnect()
  navObserver = null
})

const isDefensePanelOpen = ref(false)

const isDefenseActive = computed(() => selectedDefenses.value.length > 0)

// (Markdown 渲染器 - 用于 *最终* AI 回答)
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
})
const renderMarkdown = (text: string): string => {
  // 不要在渲染前把换行替换为 <br />，这会破坏 Markdown 的块级结构（表格/列表/标题等）
  const html = md.render(text || '')
  return DOMPurify.sanitize(html)
}

// ... (models, attackTypes, allCases, isLoadingCases, hoveredDefenses, selectedDefenses 不变) ...
const models = ref([
  { id: 'deepseek-r1', name: 'DeepSeek', version: 'deepseek-r1' },
  { id: 'doubao-lite', name: '豆包', version: 'doubao-lite' },
  { id: 'qwen-max', name: '通义千问', version: 'qwen-max' },
  { id: 'ernie-turbo', name: '文心一言', version: 'ernie-turbo' },
  { id: 'moonshot-v1', name: 'Kimi', version: 'moonshot-v1' },
  { id: 'hunyuan-lite', name: '混元', version: 'hunyuan-lite' },
])
const attackTypes = ref([
  {
    id: 'jailbreak',
    name: '违法内容生成',
    description: '通过精心设计的提示词绕过模型的安全限制'
  },
  { 
    id: 'adversarial-examples', 
    name: '虚假内容生成', 
    description: '构建陷阱问题使模型产生错误的输出' 
  },
])
const allCases = ref<Array<any>>([])
const isLoadingCases = ref(false)
const hoveredDefenses = ref<number[]>([]);
const selectedDefenses = ref<number[]>([])

// (DefenseStatus type)
type DefenseStatus = {
  id: number, 
  name: string, 
  status: 'pending' | 'running' | 'pass' | 'blocked', 
  process?: string, 
  output?: string, 
  illegal?: boolean, 
  corrected?: boolean,
  _fullProcess?: string, 
  _fullOutput?: string,
  attackType?: string
}
// (DefenseFlow type)
type DefenseFlow = {
  statuses: Array<DefenseStatus>;
  isCollapsed: boolean;
  isRunning: boolean;
  finalDecision: 'pending' | 'pass' | 'blocked';
  visibleSteps: number;
  attackType?: string;
}

// ... (defenses computed, toggleDefense, onDefenseHover, onDefenseLeave, getDefenseCardClass, getDefenseBadgeClass, availableCases computed 不变) ...
const defenses = computed(() => {
  // use Iconify mdi icons (consistent theme)
  if (selectedAttack.value === 'adversarial-examples') {
    return [
      { id: 0, name: '知识层', icon: 'mdi:book-open-page-variant', flow: '①' },
      { id: 1, name: '推理层', icon: 'mdi:brain', flow: '②' },
      { id: 2, name: '输出层', icon: 'mdi:bullhorn', flow: '③' }
    ]
  }
  return [
    { id: 0, name: '输入层', icon: 'mdi:download-box', flow: '①' },
    { id: 1, name: '模型层', icon: 'mdi:shield-check', flow: '②' },
    { id: 2, name: '输出层', icon: 'mdi:upload', flow: '③' }
  ]
})
const toggleDefense = (id: number) => {
  if (selectedAttack.value === 'adversarial-examples') {
    if (selectedDefenses.value.length > 0) {
      selectedDefenses.value = []
    } else {
      selectedDefenses.value = [0, 1, 2]
    }
    return
  }
  if (selectedAttack.value === 'jailbreak') {
    const currentSet = new Set(selectedDefenses.value)
    if (currentSet.has(id)) {
      currentSet.delete(id)
      if (id === 0) {
        currentSet.delete(1)
        currentSet.delete(2)
      } else if (id === 1) {
        currentSet.delete(2)
      }
    } else {
      currentSet.add(id)
      if (id === 1) {
        currentSet.add(0)
      } else if (id === 2) {
        currentSet.add(0)
        currentSet.add(1)
      }
    }
    selectedDefenses.value = Array.from(currentSet).sort((a, b) => a - b)
  }
}
const onDefenseHover = (id: number) => {
  if (selectedAttack.value === 'adversarial-examples') {
    hoveredDefenses.value = [0, 1, 2];
    return;
  }
  if (selectedAttack.value === 'jailbreak') {
    if (id === 0) hoveredDefenses.value = [0];
    else if (id === 1) hoveredDefenses.value = [0, 1];
    else if (id === 2) hoveredDefenses.value = [0, 1, 2];
    return;
  }
  hoveredDefenses.value = [];
}
const onDefenseLeave = () => {
  hoveredDefenses.value = [];
}
const getDefenseCardClass = (d: any) => {
  let isSelected = false;
  if (selectedAttack.value === 'adversarial-examples') {
    isSelected = selectedDefenses.value.length > 0;
  } else if (selectedAttack.value === 'jailbreak') {
    isSelected = selectedDefenses.value.includes(d.id);
  }
  const isHovered = hoveredDefenses.value.includes(d.id);

  const classes = [];
  if (isSelected) classes.push('selected');
  if (isHovered) classes.push('hovered');
  if (!selectedAttack.value) classes.push('disabled');
  
  return classes.join(' ');
}
const getDefenseBadgeClass = (d: any) => {
  let isSelected = false;
  if (selectedAttack.value === 'adversarial-examples') {
    isSelected = selectedDefenses.value.length > 0;
  } else if (selectedAttack.value === 'jailbreak') {
    isSelected = selectedDefenses.value.includes(d.id);
  }
  const isHovered = hoveredDefenses.value.includes(d.id);

  if (isSelected) return 'selected';
  if (isHovered) return 'hovered';
  return '';
}
// Determine icon color: white when card is selected (to contrast purple background), gray otherwise
const getDefenseIconClass = (d: any) => {
  let isSelected = false;
  if (selectedAttack.value === 'adversarial-examples') {
    isSelected = selectedDefenses.value.length > 0;
  } else if (selectedAttack.value === 'jailbreak') {
    isSelected = selectedDefenses.value.includes(d.id);
  }
  return isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300';
}
const availableCases = computed(() => {
  if (
    selectedAttack.value !== 'jailbreak' || 
    selectedDefenses.value.length === 0 ||
    (selectedDefenses.value.length === 1 && selectedDefenses.value[0] === 0)
  ) {
    return allCases.value
  }
  const defenseSet = new Set(selectedDefenses.value)
  return allCases.value.filter(caseData => {
    if (!caseData.tests || !Array.isArray(caseData.tests)) {
      return true;
    }
    if (defenseSet.has(1) && !defenseSet.has(2)) {
      const test0 = caseData.tests.find((t: any) => t.id === 0)
      return !test0 || test0.illegal === false
    }
    if (defenseSet.has(2)) {
      const test0 = caseData.tests.find((t: any) => t.id === 0)
      const test1 = caseData.tests.find((t: any) => t.id === 1)
      return (!test0 || test0.illegal === false) && 
             (!test1 || test1.illegal === false)
    }
    return true 
  })
})

// ... (streamDefenseField, runDefenses, loadCasesForSelection 不变) ...
const streamDefenseField = async (
  fullText: string,
  status: DefenseStatus,
  field: 'process' | 'output'
) => {
  if (!fullText) return
  isStreaming.value = true
  const chars = fullText.split('')
  status[field] = ''
  
  for (let i = 0; i < chars.length; i++) {
    if (!isStreaming.value) break
    status[field] += chars[i]
    if(field === 'process' || field === 'output') await scrollToBottom(false)
    // reduce delay to speed up printing (5-15ms)
    const delay = Math.random() * 50 + 5; // (5-15ms)
    await new Promise(res => setTimeout(res, delay))
  }
  isStreaming.value = false
}
const runDefenses = async (caseData: any, defenseFlow: DefenseFlow) => {
  try {
    console.log('runDefenses:start', { selectedDefenses: selectedDefenses.value, tests: caseData.tests })
  } catch (e) { }

  const sortedIds = selectedDefenses.value.slice().sort((a, b) => a - b)

  defenseFlow.statuses = sortedIds.map(id => {
    let test = caseData?.tests?.find((t: any) => t.id === id)
    let defenseName = "未知防御";
    const currentDefenseSet = defenses.value;
    defenseName = currentDefenseSet.find(d => d.id === id)?.name || `防御 ${id}`
    if (!test) {
      const desiredName = currentDefenseSet.find(d => d.id === id)?.name
      if (desiredName) {
        test = caseData?.tests?.find((t: any) => (t.name || '').trim().startsWith(desiredName.trim()))
      }
    }
    return {
      id,
      name: test?.name || defenseName,
      status: 'pending' as const,
      process: '', output: '',
      _fullProcess: test?.process || '', _fullOutput: test?.output || '',
      illegal: Object.prototype.hasOwnProperty.call(test || {}, 'illegal') ? test.illegal : undefined,
      attackType: defenseFlow.attackType || selectedAttack.value
    }
  })
  defenseFlow.visibleSteps = 0;
  defenseFlow.isCollapsed = false;
  await scrollToBottom();

  let anyBlocked = false
  const blockedOutputs: string[] = []

  for (let i = 0; i < defenseFlow.statuses.length; i++) {
    defenseFlow.visibleSteps = i + 1;
    await new Promise(res => setTimeout(res, 350)); 

    const s = defenseFlow.statuses[i];
    s.status = 'running';
    await scrollToBottom(false);
    
    await new Promise(res => setTimeout(res, Math.random() * 300 + 200));
    await streamDefenseField(s._fullProcess || '正在检测...', s, 'process')

    if (Object.prototype.hasOwnProperty.call(s, 'illegal') && s.illegal === true) {
      // 如果是幻觉率测试且检测到 illegal === true ，将其标记为“修正”（corrected），显示修正输出但不阻断
      if (selectedAttack.value === 'adversarial-examples') {
        s.status = 'pass'
        s.corrected = true
        // show the correction output for hallucination steps
        await streamDefenseField(s._fullOutput || '已修正', s, 'output')
      } else {
        // 默认行为：标记为阻断并显示输出
        s.status = 'blocked'
        anyBlocked = true
        await streamDefenseField(s._fullOutput || '检测到风险', s, 'output')
        if (s._fullOutput) blockedOutputs.push(s._fullOutput)
        if (selectedAttack.value === 'jailbreak') {
            defenseFlow.isRunning = false
            defenseFlow.finalDecision = 'blocked'
            await scrollToBottom()
            return { blocked: true, output: blockedOutputs.join('\n\n') }
        }
      }
    } else {
      s.status = 'pass'
      // 对于幻觉率测试且未检测到 illegal（即 illegal === false），不显示每一步的 output（仅显示通过的图标）
      if (selectedAttack.value !== 'adversarial-examples') {
        await streamDefenseField(s._fullOutput || '通过', s, 'output')
      }
    }
  }
  defenseFlow.isRunning = false
  defenseFlow.finalDecision = anyBlocked ? 'blocked' : 'pass'
  await scrollToBottom()
  return { blocked: anyBlocked, output: blockedOutputs.join('\n\n') }
}
const loadCasesForSelection = async () => {
  if (!selectedModel.value || !selectedAttack.value) {
    allCases.value = []
    return
  }
  // 记录本次请求对应的选择；请求回来时选择已变（切换或刷新），结果作废
  const requestKey = `${selectedModel.value}|${selectedAttack.value}`
  isLoadingCases.value = true
  allCases.value = []
  const loadedCases: any[] = [] 
  try {
    if (selectedAttack.value === 'jailbreak') {
      const response = await fetch(`/TestResult/jailbreak/${selectedModel.value}.json?t=${Date.now()}`)
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            loadedCases.push({
              id: `jailbreak-${index}`,
              title: item.question?.substring(0, 30) || '未知问题',
              question: item.question,
              prompt: item.prompt,
              answer: item.response,
              type: 'jailbreak',
              model: selectedModel.value,
              tests: item.tests
            })
          })
        }
      }
    } else {
      const modelForHalluc = selectedModel.value || 'deepseek-r1'
      try {
        const response = await fetch(`/TestResult/halluc/${modelForHalluc}.json?t=${Date.now()}`)
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              loadedCases.push({
                id: `adversarial-${index}`,
                question: item.question,
                response: item.response,
                answer: item.answer,
                response_new: item.response_new,
                type: 'adversarial-examples',
                model: modelForHalluc,
                question_id: item.question_id,
                tests: Array.isArray(item.tests) ? item.tests : undefined
              })
            })
          }
        }
      } catch (err) { }
    }
  } catch (error) {
    console.warn(`加载案例失败:`, error)
  }
  if (requestKey !== `${selectedModel.value}|${selectedAttack.value}`) return
  allCases.value = loadedCases
  isLoadingCases.value = false
}


// ... (状态管理) ...
const selectedModel = ref('')
const selectedAttack = ref('')
const testInput = ref('')
const selectedCaseId = ref('')
const selectedCase = ref<any>(null)
const isTestiing = ref(false)
const isStreaming = ref(false)
// 当前正在运行的测试 run id（用于在取消时清理对应的系统消息）
const currentRunId = ref<number | null>(null)

// (messages ref type)
// [R1] 修改 Message 类型定义
const messages = ref<Array<{ 
  role: string, 
  content: string, 
  time: string, 
  model?: string, 
  isCorrection?: boolean, // (Blue) 防御成功
  isSystem?: boolean, 
  isWarning?: boolean, // (Red) 攻击成功
  isCorrectionSystem?: boolean, // (Orange) [R1 NEW] 攻击成功（幻觉）
  originalQuestion?: string,
  defenseFlow?: DefenseFlow,
  runId?: number
}>>([])

// ... (messagesContainer, scrollToBottom, stopStreaming, onCaseChange, watch, getCurrentTime, streamText 不变) ...
const messagesContainer = ref<HTMLElement | null>(null)

// 是否自动跟随最新内容：用户上翻查看历史时关闭，回到底部附近时恢复
const autoFollow = ref(true)
const NEAR_BOTTOM_PX = 60
let lastScrollTop = 0

const onMessagesScroll = () => {
  const el = messagesContainer.value
  if (!el) return
  const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  if (distanceToBottom <= NEAR_BOTTOM_PX) {
    autoFollow.value = true
  } else if (el.scrollTop < lastScrollTop) {
    // 只把「向上滚」视为用户意图；程序滚到底部（含平滑动画过程中）scrollTop 只增不减，不会误关跟随
    autoFollow.value = false
  }
  lastScrollTop = el.scrollTop
}

/** force：无视跟随状态强制滚到底部（用户发起新一轮测试、点「回到最新」时） */
const scrollToBottom = async (smooth = true, force = false) => {
  if (force) autoFollow.value = true
  if (!autoFollow.value) return
  await nextTick()
  const el = messagesContainer.value
  // nextTick 期间用户可能已经上翻，再确认一次
  if (!el || !autoFollow.value) return
  try {
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' })
  } catch (e) {
    el.scrollTop = el.scrollHeight
  }
}
const jumpToLatest = () => scrollToBottom(true, true)
const stopStreaming = () => {
  isStreaming.value = false
  isTestiing.value = false
  // 清理当前 run 下可能已添加的系统提示（如“答案指正”“安全警告”）并停止对应的 defenseFlow
  if (currentRunId.value) {
    // 移除属于当前 run 的系统消息
    messages.value = messages.value.filter(m => !(m.runId === currentRunId.value && m.isSystem))
    // 停止对应消息中的 defenseFlow 的运行状态（如果存在）
    for (const m of messages.value) {
      if (m.runId === currentRunId.value && m.defenseFlow) {
        m.defenseFlow.isRunning = false
      }
    }
    // 清空当前 run id
    currentRunId.value = null
  }
}
const onCaseChange = () => {
  if (selectedCaseId.value) {
    const testCase = availableCases.value.find((tc: any) => tc.id === selectedCaseId.value) 
    if (testCase) {
      selectedCase.value = testCase
      testInput.value = selectedAttack.value === 'jailbreak'
        ? testCase.prompt
        : testCase.question
    }
  } else {
    selectedCase.value = null
    testInput.value = ''
  }
}
// Custom dropdown state for improved selector UI
const dropdownOpen = ref(false)
// 简化：不需要搜索，直接展示 availableCases
const filteredCases = computed(() => availableCases.value)
const chooseCase = (id: string) => {
  selectedCaseId.value = id
  onCaseChange()
  dropdownOpen.value = false
}

// 刷新：清空对话并把所有选择恢复到初始状态，效果等同刷新页面但不重新加载
const resetPage = () => {
  // 先作废进行中的测试：stopStreaming 会清掉 currentRunId，runTest 后续的异步步骤据此自动退出
  stopStreaming()
  messages.value = []
  autoFollow.value = true

  selectedModel.value = ''
  selectedAttack.value = ''
  selectedCaseId.value = ''
  selectedCase.value = null
  testInput.value = ''
  // allCases 不在这里清：选择变为空时 watch 会自动清空；手动清反而会在「选择未变」时导致案例丢失
  selectedDefenses.value = []
  hoveredDefenses.value = []

  isDefensePanelOpen.value = false
  dropdownOpen.value = false
}
watch([() => selectedModel.value, () => selectedAttack.value], () => {
  selectedCaseId.value = ''
  selectedCase.value = null
  testInput.value = ''
  selectedDefenses.value = [] 
  allCases.value = []
  loadCasesForSelection()
})
watch(availableCases, (newCases) => {
  if (selectedCaseId.value) {
    const stillExists = newCases.some(c => c.id === selectedCaseId.value);
    if (!stillExists) {
      selectedCaseId.value = '';
      selectedCase.value = null;
      testInput.value = '';
    }
  }
});
const getCurrentTime = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}
const streamText = async (text: string, messageIndex: number) => {
  isStreaming.value = true
  const words = text.split('')
  messages.value[messageIndex].content = '' 
  
  for (let i = 0; i < words.length; i++) {
    if (!isStreaming.value) break
    messages.value[messageIndex].content += words[i]
    await scrollToBottom(false)
    const delay = Math.random() * 15 + 5
    await new Promise(resolve => setTimeout(resolve, delay))
  }
  isStreaming.value = false
}


// [R1] 重构 runTest 逻辑
const runTest = async () => {
  if (!selectedCase.value) return
  isTestiing.value = true
  const currentCase = selectedCase.value

  // 1. 添加用户消息
  // runId 标识本轮测试：停止、刷新或开始新一轮后 currentRunId 会变，本轮后续的异步步骤据此作废
  const runId = Date.now()
  currentRunId.value = runId
  messages.value.push({
    role: 'user',
    content: selectedAttack.value === 'jailbreak'
      ? currentCase.prompt
      : currentCase.question,
    time: getCurrentTime(),
    originalQuestion: selectedAttack.value === 'jailbreak' ? currentCase.question : undefined,
    runId: currentRunId.value
  })
  // 用户主动发起新一轮：即使之前上翻过，也强制回到底部并恢复跟随
  await scrollToBottom(true, true)
  selectedCase.value = null
  selectedCaseId.value = ''

  let defenseResult = { blocked: false, output: '' }
  let defenseFlowData: DefenseFlow | undefined = undefined

  // 2. 准备 AI 消息 (包括空的 DefenseFlow)
  if (selectedDefenses.value.length > 0 && currentCase) {
    // make the defenseFlow reactive so runDefenses mutations are immediately observed by the template
    defenseFlowData = reactive({
      statuses: [],
      isCollapsed: false,
      isRunning: true,
      finalDecision: 'pending',
      visibleSteps: 0,
      attackType: selectedAttack.value
    }) as DefenseFlow
  }
  
  const messageIndex = messages.value.length
  messages.value.push({
    role: 'assistant',
    content: '正在分析并生成响应', // 默认内容，此时为灰色气泡
    time: getCurrentTime(),
    model: models.value.find(m => m.id === selectedModel.value)?.name || '',
    defenseFlow: defenseFlowData,
    // [R1] 移除所有在流式传输前设置的颜色
    isCorrection: false, 
    isWarning: false,
    isCorrectionSystem: false,
    runId: currentRunId.value
  })
  await scrollToBottom()

  // 3. 运行防御
  if (defenseFlowData) {
    defenseResult = await runDefenses(currentCase, defenseFlowData)
  } else {
    const thinkingDelay = Math.random() * 400 + 800
    await new Promise(resolve => setTimeout(resolve, thinkingDelay))
  }
  // 防御流程/思考延迟可能持续数秒，期间被停止或刷新则不再继续（避免往新对话里写内容）
  if (currentRunId.value !== runId) return

  // 4. 获取最终回复文本
  let responseText = ''
  let showedCorrectedResponse = false // 标记是否使用了 response_new

  // 只有在启用了防御策略（selectedDefenses.length > 0）时，才优先使用 response_new 作为最终模型回答
  const defensesEnabled = selectedDefenses.value && selectedDefenses.value.length > 0
  if (defensesEnabled && currentCase.response_new) {
    responseText = currentCase.response_new
    showedCorrectedResponse = true
  } else if (selectedAttack.value === 'adversarial-examples') {
    // 若未启用防御策略或没有 response_new，按原始 response 返回（保持与以前一致）
    responseText = currentCase.response
  } else {
    // 提示词注入回退逻辑
    if (defenseResult.blocked) {
      responseText = defenseResult.output || '检测到非法内容，已阻止生成回复。'
    } else {
      responseText = currentCase.answer
    }
  }
  
  // 5. 流式输出最终回复 (此时气泡仍为灰色)
  await streamText(responseText || "（模型未提供响应）", messageIndex)

  // [R1 优化] 6. 回答完毕后，根据防御和攻击结果设置气泡颜色
  // 确保在流式传输停止后（即 isTestiing 仍为 true）才应用样式
  if (currentRunId.value === runId) { 
    const msg = messages.value[messageIndex]
    const defenseWasOn = selectedDefenses.value.length > 0
    
    // 判定防御是否成功 (Blue)
    // 防御成功 = (Jailbreak 阻断) 或 (Adversarial 触发了修正并使用了 response_new)
    const defenseSucceeded = defenseResult.blocked || (selectedAttack.value === 'adversarial-examples' && showedCorrectedResponse)

    // 判定攻击是否成功 (Red / Orange)
    // 攻击成功 = (Jailbreak 未被阻断)
    const attackSucceeded_Jailbreak = selectedAttack.value === 'jailbreak' && !defenseResult.blocked
    // 攻击成功 = (Adversarial 未显示修正答案)
    const attackSucceeded_Hallucination = selectedAttack.value === 'adversarial-examples' && !showedCorrectedResponse

    if (defenseWasOn && defenseSucceeded) {
      // 2.B: 防御开启，且检测到问题 (illegal=true) -> 防御色 (Blue)
      msg.isCorrection = true // Blue
    
    } else if (attackSucceeded_Jailbreak) {
      // 1.A / 2.A (Jailbreak):
      // 1.A: 防御关闭，攻击成功 -> 警告色 (Red)
      // 2.A: 防御开启，但防御失败 (illegal=false)，攻击成功 -> 警告色 (Red)
      msg.isWarning = true // Red
    
    } else if (attackSucceeded_Hallucination) {
      // 1.B / 2.A (Hallucination):
      // 1.B: 防御关闭，攻击成功 -> 修正色 (Orange)
      // 2.A: 防御开启，但防御失败 (illegal=false)，攻击成功 -> 修正色 (Orange)
      msg.isCorrectionSystem = true // Orange
    
    } else {
      // 2.A (Safe): 防御开启，未检测到问题，且模型回答正确 -> 保持灰色
      // (Do nothing, leave gray)
    }
  }

  // 7. 添加系统标注
  // (注意：这部分逻辑现在是独立的，系统标注消息会*在*变色的 AI 气泡*下方*出现)
  if (selectedAttack.value === 'jailbreak' && !defenseResult.blocked) {
    await new Promise(resolve => setTimeout(resolve, 500))
    // 如果测试已被取消（stopStreaming 将 isTestiing 设为 false），则不再添加系统提示
    if (currentRunId.value === runId) {
      messages.value.push({
        role: 'system',
        content: `安全警告：模型回答了不应该回答的内容，存在安全风险`,
        time: getCurrentTime(),
        isWarning: true,
        isSystem: true,
        runId: currentRunId.value
      })
      await scrollToBottom()
    }
  }

  if (selectedAttack.value === 'adversarial-examples' && !showedCorrectedResponse) {
    await new Promise(resolve => setTimeout(resolve, 500))
    // 如果测试已被取消（stopStreaming 将 isTestiing 设为 false），则不再添加系统提示
    if (currentRunId.value === runId) {
      messages.value.push({
        role: 'system',
        content: `答案指正：${currentCase.answer}`,
        time: getCurrentTime(),
        isCorrection: true, // 系统消息的 isCorrection 是 Orange
        isSystem: true,
        runId: currentRunId.value
      })
      await scrollToBottom()
    }
  }

  // 只结束属于自己的这一轮，避免旧轮次收尾时把新一轮的「停止」按钮状态改掉
  if (currentRunId.value === runId) isTestiing.value = false
}
</script>

<style scoped>
/* 整页等比缩放适配：舞台在导航条下方的可用区域内居中并按 scale 铺满 */
.fit-wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  /* top 由脚本按导航条高度设置 */
}

.fit-stage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  /* width / height / transform 由脚本按视口计算 */
}

/* ... (已有样式 .font-sans 到 .answer-preview 不变) ... */
.font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
.bg-grid-pattern-light { background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px); background-size: 2rem 2rem; }
.bg-grid-pattern-dark { background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 2rem 2rem; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { opacity: 0; animation: fadeInDown 0.8s ease-out forwards; }
.animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
.animation-delay-4000 { animation-delay: 4s; }
.prose-user { color: white; }
.prose-user p, .prose-user li, .prose-user blockquote { color: white; }
.prose-user strong { color: white; }
.prose-user code { color: #f3e8ff; background-color: rgba(255, 255, 255, 0.15); }
  .prose-user a { color: #e9d5ff; }
.prose-correction { color: #1e40af; }
.dark .prose-correction { color: #93c5fd; }
.prose-correction p { color: inherit; margin: 0; }
.prose-correction strong { color: inherit; }
.system-correction { color: #b45309; font-weight: 600; }
.dark .system-correction { color: #fbbf24; font-weight: 600; }
.system-correction p { display: inline; margin: 0; }
.system-warning { color: #991b1b; font-weight: 600; }
.dark .system-warning { color: #fca5a5; font-weight: 600; }
.system-warning p { display: inline; margin: 0; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(156, 163, 175, 0.7); }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
.answer-preview { display: -webkit-box; -webkit-box-orient: vertical; line-clamp: 2; -webkit-line-clamp: 2; overflow: hidden; text-overflow: ellipsis; }
@media (min-width: 768px) { .answer-preview { display: inline-block; line-clamp: none; -webkit-line-clamp: unset; overflow: visible; text-overflow: clip; } }

/* --- Defense Panel (Collapsible) --- */
.defense-toggle-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #374151;
  transition: all 0.3s ease;
}
.dark .defense-toggle-bar {
  background-color: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}
.defense-toggle-bar:hover {
  border-color: #d1d5db;
  background-color: #e5e7eb;
}
.dark .defense-toggle-bar:hover {
  border-color: #4b5563;
  background-color: #374151;
}
.defense-toggle-bar.active {
  background-color: #eff6ff;
  border-color: #93c5fd;
  color: #1e40af;
}
.dark .defense-toggle-bar.active {
  background-color: #1e3a8a;
  border-color: #3b82f6;
  color: #dbeafe;
}
.defense-toggle-bar.open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.defense-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
.dark .defense-panel {
  background-color: rgba(23, 30, 44, 0.7);
  border-color: #374151;
}
.defense-panel.open {
  max-height: 300px; /* Adjust as needed */
  border: 1px solid #e5e7eb;
}
.defense-panel-content {
  padding: 16px;
}

.defense-card {
  flex: 1;
  max-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 8px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s, transform 0.3s;
  opacity: 0;
  transform: translateY(10px);
}
.defense-panel.open .defense-card {
  opacity: 1;
  transform: translateY(0);
}

.dark .defense-card {
  background-color: #1f2937;
  border-color: #374151;
}
.defense-card.disabled {
  cursor: not-allowed;
  opacity: 0.6 !important; /* Ensure disabled style overrides transition */
}
.defense-card.hovered:not(.disabled) {
  transform: translateY(-4px) !important;
  box-shadow: 0 8px meditative-shadow;
  border-color: #93c5fd;
  background-color: #eff6ff;
}
.dark .defense-card.hovered:not(.disabled) {
  background-color: #1e3a8a;
  border-color: #3b82f6;
  box-shadow: 0 8px 20px -5px rgba(59, 130, 246, 0.3);
}
.defense-card.selected {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
  border-color: transparent;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 15px -5px rgba(59, 130, 246, 0.6);
}
.dark .defense-card.selected {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  box-shadow: 0 6px 15px -5px rgba(59, 130, 246, 0.4);
}
.defense-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}
.defense-card.hovered .defense-icon {
  transform: scale(1.1);
}
.defense-name {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}
.defense-card.selected .defense-name {
  color: white;
}
.defense-flow-badge-v3 {
  position: absolute;
  top: 6px;
  left: 6px;
  font-size: 10px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
  background-color: #e5e7eb;
  color: #4b5563;
  transition: all 0.3s ease;
}
.dark .defense-flow-badge-v3 {
  background-color: #4b5563;
  color: #d1d5db;
}
.defense-card.hovered .defense-flow-badge-v3 {
  background-color: #dbeafe;
  color: #2563eb;
  transform: scale(1.1);
}
.defense-card.selected .defense-flow-badge-v3 {
  background-color: white;
  color: #2563eb;
  transform: scale(1.1);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

/* --- 深度思考 (垂直流) 样式 (不变) --- */
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.icon-spin { display: inline-block; animation: spin 1.2s linear infinite; }
@keyframes thinking-dots {
  0%, 100% { opacity: 0; transform: translateY(0); }
  33% { opacity: 1; transform: translateY(-2px); }
  66% { opacity: 0; transform: translateY(0); }
}
.defense-thinking-loader { display: inline-flex; gap: 1px; margin-left: 6px; }
.defense-thinking-loader .dot { width: 4px; height: 4px; border-radius: 50%; background-color: currentColor; animation: thinking-dots 1.5s infinite; }
.defense-thinking-loader .dot:nth-child(2) { animation-delay: 0.25s; }
.defense-thinking-loader .dot:nth-child(3) { animation-delay: 0.5s; }
.defense-thinking-toggle { display: flex; align-items: center; cursor: pointer; padding: 4px 6px; margin: -4px 0 8px -6px; border-radius: 6px; transition: background-color 0.2s; color: #4b5563; }
.dark .defense-thinking-toggle { color: #d1d5db; }
.defense-thinking-toggle:hover { background-color: rgba(0,0,0,0.05); }
.dark .defense-thinking-toggle:hover { background-color: rgba(255,255,255,0.08); }
.defense-thinking-title { font-size: 13px; font-weight: 600; margin-left: 4px; }
.defense-thinking-icon { transition: transform 0.3s ease; color: #9ca3af; }
.defense-thinking-icon.is-collapsed { transform: rotate(-90deg); }
.defense-thinking-steps { position: relative; padding-left: 4px; margin-top: 4px; overflow: hidden; }

/* 步骤渐入动画 (不变) */
.step-item {
  display: flex;
  position: relative;
  gap: 12px;
  padding-bottom: 12px;
  opacity: 0;
  transform: translateY(10px);
  animation: stepFadeIn 0.35s ease forwards; 
}
@keyframes stepFadeIn {
  to { opacity: 1; transform: translateY(0); }
}

.step-connector { position: relative; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; }
.step-icon-wrapper { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; z-index: 2; transition: all 0.3s; }
.step-line { position: absolute; top: 24px; bottom: -12px; left: 50%; transform: translateX(-50%); width: 2px; background-color: #e5e7eb; z-index: 1; }
.dark .step-line { background-color: #374151; }
.step-content { flex: 1; min-width: 0; padding-bottom: 4px; }
.step-name { font-weight: 600; font-size: 13px; color: #1f2937; }
.dark .step-name { color: #f3f4f6; }

/* [!!! MODIFIED 1 !!!] (优化 1) 纯文本样式 */
.step-process {
  font-size: 13px;
  color: #4b5563;
  margin-top: 4px;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap; /* 关键: 保证换行符和流式更新 */
}
.dark .step-process { color: #d1d5db; }

.step-output {
  font-size: 13px;
  margin-top: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid;
  line-height: 1.5;
  word-break: break-word;
}
/* [!!! MODIFIED 1 !!!] (优化 1) 纯文本样式 */
.step-output span {
  white-space: pre-wrap; /* 关键: 保证换行符和流式更新 */
  display: inline; /* 保持和 strong 一行 */
  vertical-align: middle; /* 垂直对齐 */
}
.step-output strong {
  font-weight: 600;
  margin-right: 4px;
  vertical-align: middle;
}

/* ... (状态样式 不变) ... */
.step-icon-wrapper.pending { background-color: #f3f4f6; color: #6b7280; }
.dark .step-icon-wrapper.pending { background-color: #374151; color: #9ca3af; }
.step-icon-wrapper.running { background-color: #dbeafe; color: #3b82f6; }
.dark .step-icon-wrapper.running { background-color: #1e3a8a; color: #93c5fd; }
.step-icon-wrapper.pass { background-color: #d1fae5; color: #059669; }
.dark .step-icon-wrapper.pass { background-color: #064e3b; color: #a7f3d0; }
.step-output.pass { background-color: #f0fdf4; border-color: #a7f3d0; color: #065f46; }
.dark .step-output.pass { background-color: #064e3b; border-color: #059669; color: #d1fae5; }
.step-name.pass { color: #059669; }
.dark .step-name.pass { color: #a7f3d0; }
.step-icon-wrapper.blocked { background-color: #fee2e2; color: #dc2626; }
.dark .step-icon-wrapper.blocked { background-color: #7f1d1d; color: #fca5a5; }
.step-output.blocked { background-color: #fef2f2; border-color: #fca5a5; color: #b91c1c; }
.dark .step-output.blocked { background-color: #7f1d1d; border-color: #b91c1c; color: #fee2e2; }
.step-name.blocked { color: #dc2626; }
.dark .step-name.blocked { color: #fca5a5; }
/* 幻觉修正（corrected）样式：使用蓝色圈与蓝色背景 */
.step-icon-wrapper.corrected { background-color: #dbeafe; color: #1e40af; }
.dark .step-icon-wrapper.corrected { background-color: #1e3a8a; color: #93c5fd; }
.step-output.corrected { background-color: #eff6ff; border-color: #bfdbfe; color: #1e40af; }
.dark .step-output.corrected { background-color: #0b1220; border-color: #1e3a8a; color: #93c5fd; }
.step-name.corrected { color: #1e40af; }
.dark .step-name.corrected { color: #93c5fd; }
.defense-divider { border-color: rgba(0,0,0,0.1); margin: 12px 0 10px; }
.dark .defense-divider { border-color: rgba(255,255,255,0.1); }
</style>