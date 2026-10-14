<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Sparkles } from "@/components/ui/sparkles";
import { Icon } from '@iconify/vue'
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";

// import home_jailbreak from '@/assets/home-jailbreak.webp'
// import home_hallucination from '@/assets/home-hallucination-rate.webp'
import home_jailbreak from '@/assets/教育1.png'
import home_hallucination from '@/assets/教育2.png'

const particlesColor = computed(() => (useColorMode().value === "dark" ? "#FFFFFF" : "#000000"));
// 注意：@vueuse/motion 的指令在全局注册后无需在此导入

// AI安全重要性的数据
const securityPoints = [
  {
    icon: 'ph:shield-warning-duotone',
    title: '对国家和社会安全构成威胁',
    description: 'AI可能被用于制造自主武器、发动网络攻击、或大规模制造虚假信息，破坏社会信任，甚至引发冲突。'
  },
  {
    icon: 'ph:fingerprint-simple-duotone',
    title: '助长犯罪活动',
    description: '技术可能被用于更精准的诈骗、合成虚假音视频进行勒索（Deepfakes），或自动化地寻找系统漏洞，降低犯罪门槛。'
  },
  {
    icon: 'ph:crosshair-duotone',
    title: '避免关键决策失误',
    description: '在高风险领域，AI的“幻觉”或漏洞可能导致误诊、金融崩溃或致命事故，造成生命和财产的巨大损失。'
  },
  {
    icon: 'ph:scales-duotone',
    title: '维护公平与公正',
    description: '模型可能学到并放大现实世界中的偏见，导致在招聘、贷款、司法等场景中出现不公平的结果，加剧社会矛盾。'
  }
]

// 产品简介的数据
// 产品简介的数据
const products = [
  {
    title: '安全攻防教学体验',
    description: '通过模拟大模型的对抗样本与提示词注入攻击，学生能够在真实交互中体验人工智能系统的脆弱性与防御机制，培养安全意识与风险识别能力。',
    imageUrl: home_jailbreak,
    link: '/solution/hallucination',
    features: [
      '体验主流大模型的攻防场景',
      '支持输入示例攻击提示词与样本生成',
      '可视化展示攻击路径与模型响应',
      '学习安全防护与模型加固方法'
    ]
  },
  {
    title: '模型安全素养培养',
    description: '平台以教学为核心，结合可视化评估与实验验证，帮助学生理解模型幻觉、鲁棒性与可控性的关系，形成系统的人工智能安全思维。',
    imageUrl: home_hallucination,
    link: '/solution/jailbreaking',
    features: [
      '基于案例的安全问题分析与复现',
      '支持多模型对比与防御策略实验',
      '量量化评估模型安全表现与改进方向',
      '强化学生的AI安全伦理与防范意识'
    ]
  }
]

// 工作流程数据
const workflowSteps = [
  {
    icon: 'ph:plugs-connected-duotone',
    title: '1. 连接您的模型',
    description: '通过我们安全的API接口或SDK，轻松将您的AI模型接入测试平台，整个过程仅需几分钟。'
  },
  {
    icon: 'ph:test-tube-duotone',
    title: '2. 配置并执行测试',
    description: '选择您需要的测试类型（越狱或幻觉），调整测试参数，一键启动全自动化的安全评估流程。'
  },
  {
    icon: 'ph:chart-bar-duotone',
    title: '3. 查看深度分析报告',
    description: '测试完成后，系统会生成一份全面的交互式报告，直观展示模型的安全漏洞和幻觉指标。'
  }
]

// 更多特性数据
const moreFeatures = [
  { icon: 'ph:cloud-arrow-up-duotone', title: '轻松集成', description: '提供 RESTful API 和 Python SDK，无缝集成到现有的 CI/CD 流程中。' },
  { icon: 'ph:sparkle-duotone', title: '自动化报告', description: '自动生成 PDF 和 JSON 格式的详细测试报告，便于学生分享和归档。' },
  { icon: 'ph:timer-duotone', title: '持续监控', description: '设置定时任务，对模型进行持续的安全监控，在新版本上线时自动触发测试。' },
  { icon: 'ph:shield-checkered-duotone', title: '企业级安全', description: '所有数据传输和存储均采用端到端加密，确保模型和数据安全无虞。' }
]

</script>

<template>
  <div class="bg-slate-50 dark:bg-[#0A001F] text-gray-800 dark:text-gray-200 overflow-x-hidden">
    <main>
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center text-center px-4">
        <!-- Background Gradient & Grid Pattern -->
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-50 dark:from-[#0A001F] dark:via-[#0A001F] dark:to-transparent">
          </div>
          <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(91,48,214,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(88,48,214,0.6),rgba(255,255,255,0))]">
          </div>
          <div class="absolute inset-0 opacity-50 dark:opacity-100"
            style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%235830d6%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
          </div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <h1 v-motion-slide-top :delay="300"
            class="inline-block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight
         bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700
         dark:from-white dark:to-gray-400 pb-4 whitespace-nowrap pr-2">
            <!-- 保护您的AI，建立数字信任 -->
             以教育之力，筑牢人工智能防线
          </h1>
          <div class="relative m-auto bg-transparent h-5 w-full">
            <div
              class="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
            <div
              class="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div
              class="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
            <div
              class="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          </div>
          <p v-motion-slide-top :delay="500"
            class="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            测试模型的越狱漏洞，精准评估幻觉率，共同构筑人工智能安全观。
          </p>
          <div v-motion-slide-top :delay="700" class="mt-10 flex flex-col sm:flex-row mx-20 gap-4 justify-center">
            <Button size="lg"
              class="bg-purple text-white hover:bg-purple/80 dark:hover:bg-purple/80 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg dark:shadow-purple/50 shadow-purple/20">
              <RouterLink to="/solution/adversarial-test">一键测试</RouterLink>
            </Button>
            <!-- <Button size="lg" variant="outline"
              class="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-md">
              <RouterLink to="/guanyuwomen/lianxiwomen">联系我们</RouterLink>
            </Button> -->
          </div>
        </div>
      </section>

      <!-- Product Introduction Section -->
      <section class="py-10 sm:py-32 px-10 md:px-20 lg:px-20">
        <div class="relative z-10 max-w-3xl mx-auto">
          <h1 v-motion-slide-top :delay="300"
            class="text-4xl text-center md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700 dark:from-white dark:to-gray-400 pb-4">
            我们的核心教学平台
          </h1>
              <p v-motion-slide-top :delay="500"
                class="mt-6 text-lg md:text-xl mx-auto text-gray-600 dark:text-gray-300 sm:whitespace-nowrap">
                我们提供业界领先的AI模型安全测试教育实践平台，专为防范越狱攻击和抑制模型幻觉而设计。
              </p>

        </div>
      </section>

      <!-- Products Section -->
      <section class="py-5 sm:py-24 lg:px-40 md:px-20 px-4">
        <div class="max-w-7xl mx-auto space-y-20 px-5">
          <div v-for="(product, index) in products" :key="index" v-motion-fade-visible-once :delay="300"
            class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="w-full">
              <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                product.title }}</h2>
              <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">{{ product.description }}</p>
              <ul class="mt-6 space-y-3">
                <li v-for="feature in product.features" :key="feature" class="flex items-center gap-3">
                  <Icon icon="ph:check-circle-duotone" class="text-2xl text-[#5830D6]" />
                  <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                </li>
              </ul>
              <!-- <Button
                class="mt-8 bg-purple text-white hover:bg-purple/80 dark:hover:bg-purple/80 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg dark:shadow-purple/50 shadow-purple/20">
                <RouterLink :to="product.link">查看技术文档</RouterLink>
              </Button> -->
            </div>
            <div
              class="w-full h-80 lg:h-96 border border-border rounded-2xl overflow-hidden shadow-md shadow-[#5830D6]/10 group">
              <img :src="product.imageUrl" :alt="product.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            </div>
          </div>
        </div>
      </section>

      <!-- How it works Section -->
      <section class="px-4 py-20 sm:py-32 sm:px-10 md:px-20">
        <div class="max-w-6xl px-5 mx-auto">
          <div class="text-center max-w-3xl mx-auto">
            <h2 v-motion-fade-visible-once
              class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">
              简单三步，让同学们深刻感受大模型现有风险
            </h2>
            <p v-motion-fade-visible-once :delay="200" class="mt-6 text-lg text-gray-600 dark:text-gray-400">
              我们设计了极致简洁的操作流程，让AI安全测试变得前所未有的轻松高效。
            </p>
          </div>
          <div class="relative mt-16">
            <!-- Connecting line -->
            <div
              class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 dark:bg-gray-700 -translate-y-1/2">
            </div>
            <div class="relative grid grid-cols-1 md:grid-cols-3 gap-12">
              <div v-for="(step, index) in workflowSteps" :key="step.title" v-motion-fade-visible-once
                :delay="300 + index * 150"
                class="p-6 text-center bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl hover:shadow-[#5830D6]/20 transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex justify-center">
                  <div class="w-16 h-16 rounded-full bg-[#5830D6]/10 flex items-center justify-center">
                    <Icon :icon="step.icon" class="text-4xl text-[#5830D6]" />
                  </div>
                </div>
                <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{{ step.title }}
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- More Features Section -->
      <section class="py-20 sm:py-32 px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-3xl mx-auto">
            <h2 v-motion-fade-visible-once
              class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">
              专为现代大学人工智能安全教育设计
            </h2>
            <p v-motion-fade-visible-once :delay="200" class="mt-6 text-lg text-gray-600 dark:text-gray-400">
              我们提供全面的功能，旨在无缝融入的课程教学之中，让培养大模型内容安全观成为一种习惯。
            </p>
          </div>
          <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="(feature, index) in moreFeatures" :key="feature.title" v-motion-fade-visible-once
              :delay="300 + index * 150" class="p-6 text-center">
              <div class="flex justify-center">
                <Icon :icon="feature.icon" class="text-5xl text-[#5830D6]" />
              </div>
              <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{{ feature.title }}
              </h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="py-20 sm:py-32 px-4 ">
        <div class="max-w-3xl mx-auto text-center">
          <h2 v-motion-fade-visible-once
            class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">
            准备好来测试模型了吗？
          </h2>
          <!-- <p v-motion-fade-visible-once :delay="200" class="mt-6 text-lg text-gray-600 dark:text-gray-400">
            立即开始免费试用，或与我们的专家团队联系，获取定制化的AI安全解决方案。
          </p> -->
          <div v-motion-fade-visible-once :delay="400" class="mt-10">
          <!-- <router-link to="/solution/adversarial-test">
            <Button
              size="lg"
              class="text-lg bg-purple text-white hover:bg-purple/80 dark:hover:bg-purple/80 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-purple/50 dark:shadow-purple/50 shadow-purple/20"
            >
              一键测试
            </Button>
          </router-link> -->
          <Button size="lg"
              class="bg-purple text-white hover:bg-purple/80 dark:hover:bg-purple/80 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg dark:shadow-purple/50 shadow-purple/20">
              <RouterLink to="/solution/adversarial-test">一键测试</RouterLink>
            </Button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Scoped styles can be added here if needed, but we are primarily using Tailwind CSS. */
</style>
