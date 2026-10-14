<template>
  <div class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block">
      <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <!-- 内容容器 -->
    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- 头部区域 -->
      <header class="text-center mb-8 animate-fade-in-down">
        <h1 class="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2">
          威胁情报分析平台
        </h1>
        <p class="text-base md:text-lg text-red-500 dark:text-red-400 font-semibold tracking-wider">
          实时监控 · 风险评估 · 智能预警
        </p>
      </header>

      <!-- 主要内容区域 -->
      <div class="max-w-7xl mx-auto animate-fade-in-up">
        <Card class="bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 shadow-2xl">
          <CardHeader class="border-b border-gray-200 dark:border-white/10">
            <div class="flex items-center justify-between">
              <CardTitle class="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <span class="text-2xl">🛡️</span>
                实时风险排行 TOP 5
              </CardTitle>
              <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                实时更新
                <span class="ml-2">{{ currentTime }}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent class="p-6">
            <!-- TOP 5 威胁列表 -->
            <div class="space-y-4">
              <div 
                v-for="(threat, index) in threats" 
                :key="threat.id"
                class="relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                :class="[
                  threat.borderClass,
                  'bg-gradient-to-r from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50'
                ]"
              >
                <!-- 排名角标 -->
                <div 
                  class="absolute top-0 left-0 w-16 h-16 flex items-center justify-center font-bold text-2xl"
                  :class="threat.rankBgClass"
                  style="clip-path: polygon(0 0, 100% 0, 0 100%)"
                >
                  <span class="absolute top-2 left-2 text-white">{{ index + 1 }}</span>
                </div>

                <div class="p-5 pl-20">
                  <div class="flex items-start justify-between gap-4">
                    <!-- 左侧：威胁信息 -->
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-3">
                        <span class="text-3xl">{{ threat.icon }}</span>
                        <div>
                          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                            {{ threat.name }}
                          </h3>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {{ threat.category }}
                          </p>
                        </div>
                      </div>
                      
                      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                        {{ threat.description }}
                      </p>

                      <!-- 标签 -->
                      <div class="flex flex-wrap gap-2 mb-3">
                        <span 
                          v-for="tag in threat.tags" 
                          :key="tag"
                          class="px-2 py-1 text-[10px] rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {{ tag }}
                        </span>
                      </div>

                      <!-- 详细指标 -->
                      <div class="grid grid-cols-4 gap-3 text-center">
                        <div class="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-white/10">
                          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">检测次数</div>
                          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ threat.detections }}</div>
                        </div>
                        <div class="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-white/10">
                          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">影响范围</div>
                          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ threat.impact }}</div>
                        </div>
                        <div class="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-white/10">
                          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">成功率</div>
                          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ threat.successRate }}%</div>
                        </div>
                        <div class="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-white/10">
                          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">趋势</div>
                          <div class="text-lg font-bold" :class="threat.trendClass">{{ threat.trend }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- 右侧：威胁等级 -->
                    <div class="flex flex-col items-center gap-2">
                      <div 
                        class="w-32 h-32 rounded-full flex flex-col items-center justify-center font-bold border-4"
                        :class="threat.levelClass"
                      >
                        <span class="text-3xl mb-1">{{ threat.riskScore }}</span>
                        <span class="text-xs">风险评分</span>
                      </div>
                      <span 
                        class="px-4 py-1.5 rounded-full text-xs font-bold"
                        :class="threat.badgeClass"
                      >
                        {{ threat.level }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 底部统计 -->
            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <div class="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">{{ totalThreats }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">累计威胁</div>
                </div>
                <div class="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div class="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">{{ todayThreats }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">今日新增</div>
                </div>
                <div class="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ blockedThreats }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">已拦截</div>
                </div>
                <div class="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{{ protectionRate }}%</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">防护成功率</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 当前时间
const currentTime = ref('')

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
}

// 定时器
let timer: number | null = null

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// 威胁数据
const threats = ref([
  {
    id: 1,
    name: '提示词注入攻击',
    category: 'Prompt Injection',
    icon: '💉',
    description: '攻击者通过精心设计的提示词绕过模型的安全限制，获取敏感信息或执行未授权操作。近期检测到大量利用多语言混淆技术的变种攻击。',
    tags: ['高频', '变种多', '全球性'],
    detections: '15,234',
    impact: '严重',
    successRate: 42,
    trend: '↑ 23%',
    trendClass: 'text-red-600 dark:text-red-400',
    riskScore: 95,
    level: '极高风险',
    levelClass: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-500',
    badgeClass: 'bg-red-500 text-white',
    borderClass: 'border-red-300 dark:border-red-700',
    rankBgClass: 'bg-red-500'
  },
  {
    id: 2,
    name: '越狱攻击',
    category: 'Jailbreak Attack',
    icon: '🔓',
    description: '通过角色扮演、场景模拟等技巧让模型突破其设定的行为准则。最新趋势显示攻击者开始使用链式越狱技术，成功率显著提升。',
    tags: ['持续增长', '技术演进', '难防御'],
    detections: '12,891',
    impact: '严重',
    successRate: 38,
    trend: '↑ 18%',
    trendClass: 'text-red-600 dark:text-red-400',
    riskScore: 92,
    level: '极高风险',
    levelClass: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-500',
    badgeClass: 'bg-orange-500 text-white',
    borderClass: 'border-orange-300 dark:border-orange-700',
    rankBgClass: 'bg-orange-500'
  },
  {
    id: 3,
    name: '对抗样本攻击',
    category: 'Adversarial Examples',
    icon: '🎭',
    description: '在输入中添加人眼难以察觉的微小扰动，导致模型产生错误输出。最新检测发现针对多模态模型的跨模态对抗样本攻击激增。',
    tags: ['技术复杂', '隐蔽性强', '新兴威胁'],
    detections: '8,567',
    impact: '中等',
    successRate: 28,
    trend: '↑ 35%',
    trendClass: 'text-red-600 dark:text-red-400',
    riskScore: 85,
    level: '高风险',
    levelClass: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-500',
    badgeClass: 'bg-yellow-500 text-white',
    borderClass: 'border-yellow-300 dark:border-yellow-700',
    rankBgClass: 'bg-yellow-500'
  },
  {
    id: 4,
    name: '数据投毒攻击',
    category: 'Data Poisoning',
    icon: '☠️',
    description: '通过污染训练数据影响模型学习结果，植入后门或偏见。监测显示有组织的投毒活动正在针对开源数据集进行系统性攻击。',
    tags: ['长期威胁', '影响深远', '难溯源'],
    detections: '3,245',
    impact: '严重',
    successRate: 15,
    trend: '↓ 8%',
    trendClass: 'text-green-600 dark:text-green-400',
    riskScore: 78,
    level: '高风险',
    levelClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-500',
    badgeClass: 'bg-blue-500 text-white',
    borderClass: 'border-blue-300 dark:border-blue-700',
    rankBgClass: 'bg-blue-500'
  },
  {
    id: 5,
    name: '模型提取攻击',
    category: 'Model Extraction',
    icon: '🕵️',
    description: '通过大量查询模型API来窃取模型的功能和参数。企业级模型成为主要目标，攻击者使用分布式查询来规避检测。',
    tags: ['商业风险', '持续性', '难检测'],
    detections: '2,156',
    impact: '中等',
    successRate: 22,
    trend: '→ 0%',
    trendClass: 'text-gray-600 dark:text-gray-400',
    riskScore: 72,
    level: '中风险',
    levelClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-500',
    badgeClass: 'bg-purple-500 text-white',
    borderClass: 'border-purple-300 dark:border-purple-700',
    rankBgClass: 'bg-purple-500'
  }
])

// 统计数据
const totalThreats = ref('42,093')
const todayThreats = ref('1,847')
const blockedThreats = ref('38,956')
const protectionRate = ref('92.5')
</script>

<style scoped>
.font-sans {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.bg-grid-pattern-light {
  background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}

.bg-grid-pattern-dark {
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-down {
  opacity: 0;
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
