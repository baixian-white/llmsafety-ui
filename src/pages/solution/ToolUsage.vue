<template>
    <!-- 主容器，添加了网格背景和主题颜色 -->
    <div class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark">
      <!-- 背景装饰：仅在深色模式下显示 -->
      <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block">
        <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
  
      <!-- 内容容器，相对定位以置于背景之上 -->
      <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <!-- 1. 头部区域 -->
        <header class="text-center mb-20 md:mb-28 animate-fade-in-down">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4">
            工具使用说明
          </h1>
          <p class="text-lg md:text-xl text-indigo-500 font-semibold tracking-wider">
            三步完成，一键启动您的AI安全测试
          </p>
        </header>
  
        <!-- 2. 越狱测试工具使用说明 -->
        <section class="mb-20 md:mb-28">
          <div class="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">越狱测试工具</h2>
            <p class="max-w-3xl mx-auto text-gray-500 dark:text-gray-400">
              轻松评估您的模型抵御恶意提问的能力，加固安全防线。
            </p>
          </div>
  
          <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <!-- 左侧：步骤说明 -->
            <div class="w-full lg:w-1/2 space-y-6">
              <div v-for="(step, index) in jailbreakSteps" :key="step.title" class="flex items-start gap-4 animate-fade-in-up" :style="{ animationDelay: `${200 + index * 150}ms` }">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-xl">
                  <component :is="step.icon" class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{{ step.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-400">{{ step.description }}</p>
                </div>
              </div>
            </div>
            <!-- 右侧：图片/图示 -->
            <div class="w-full lg:w-1/2 animate-fade-in-up" style="animation-delay: 600ms;">
              <div class="p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-indigo-500/10 backdrop-blur-sm">
                <img src="https://placehold.co/600x400/6366f1/ffffff?text=越狱测试界面示意图" alt="越狱测试界面示意图" class="rounded-lg object-cover w-full h-full">
              </div>
            </div>
          </div>
        </section>
  
        <!-- 3. 幻觉率评估工具使用说明 -->
        <section class="mb-20 md:mb-28">
          <div class="text-center mb-12 md:mb-16 animate-fade-in-up" style="animation-delay: 700ms;">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">幻觉率评估工具</h2>
            <p class="max-w-3xl mx-auto text-gray-500 dark:text-gray-400">
              快速检测模型生成内容的真实性，确保信息准确可靠。
            </p>
          </div>
  
          <div class="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
            <!-- 左侧：步骤说明 -->
            <div class="w-full lg:w-1/2 space-y-6">
              <div v-for="(step, index) in hallucinationSteps" :key="step.title" class="flex items-start gap-4 animate-fade-in-up" :style="{ animationDelay: `${800 + index * 150}ms` }">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xl">
                  <component :is="step.icon" class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{{ step.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-400">{{ step.description }}</p>
                </div>
              </div>
            </div>
            <!-- 右侧：图片/图示 -->
            <div class="w-full lg:w-1/2 animate-fade-in-up" style="animation-delay: 1200ms;">
               <div class="p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-amber-500/10 backdrop-blur-sm">
                <img src="https://placehold.co/600x400/f59e0b/ffffff?text=幻觉率评估界面示意图" alt="幻觉率评估界面示意图" class="rounded-lg object-cover w-full h-full">
              </div>
            </div>
          </div>
        </section>
  
        <!-- 4. "一键试用" 区域 -->
        <section class="text-center animate-fade-in-up" style="animation-delay: 1350ms;">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">现在就去试试吧！</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-8">您已经掌握了使用方法，立即开始您的第一次AI模型安全评估。</p>
          <a 
          href="/hall_assessment" 
          class="inline-block bg-indigo-500 text-white font-bold text-lg px-10 py-6 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/40"
        >
          返回测试平台
        </a>
        </section>
  
      </main>
    </div>
  </template>
  
  <script setup>
  import { shallowRef } from 'vue';
  import { Button } from '@/components/ui/button';
  import { Target, ListChecks, Send, FileInput, CheckCircle, PlayCircle } from 'lucide-vue-next';
  
  // 越狱测试步骤
  const jailbreakSteps = shallowRef([
    {
      title: '第一步：选择模型',
      description: '从支持的模型列表中，选择您想要进行越狱风险测试的目标模型。',
      icon: Target
    },
    {
      title: '第二步：选择测试集',
      description: '选择我们预设的标准化有害问题测试集，或上传您自定义的问题列表。',
      icon: ListChecks
    },
    {
      title: '第三步：一键开始',
      description: '点击“一键开始测试”按钮，系统将自动完成所有对抗性测试并生成详细报告。',
      icon: Send
    }
  ]);
  
  // 幻觉率评估步骤
  const hallucinationSteps = shallowRef([
    {
      title: '第一步：选择模型',
      description: '从支持的模型列表中，选择您想要进行幻觉率评估的目标模型。',
      icon: Target
    },
    {
      title: '第二步：提供评估内容',
      description: '输入一段文本或一个核心主题，作为模型生成内容的依据。',
      icon: FileInput
    },
    {
      title: '第三步：一键评估',
      description: '点击“一键开始评估”按钮，系统将分析生成内容的真实性，并给出幻觉率分数。',
      icon: PlayCircle
    }
  ]);
  </script>
  
  <style scoped>
  /* 自定义字体 */
  .font-sans {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  /* 背景网格 */
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
  
  /* 入场动画 */
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
  
  /* 动画延迟类 */
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  </style>
  