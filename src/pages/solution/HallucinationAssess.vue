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
            大模型生成内容幻觉测试平台
          </h1>
          <p class="text-lg md:text-xl text-indigo-500 font-semibold tracking-wider">
            幻觉率评估
          </p>
        </header>
  
        <!-- 2. "什么是模型的幻觉率？" 区域 -->
        <section class="mb-20 md:mb-28">
          <div class="max-w-4xl mx-auto p-8 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/30 rounded-2xl shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-indigo-500/10 backdrop-blur-sm animate-fade-in-up">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              什么是模型的<span class="text-indigo-500">幻觉率</span>？
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg text-center">
              幻觉（Hallucination）被正式定义为模型生成的一种响应，其中包含以事实形式呈现的虚假、误导性或无意义的信息，而这些信息在所提供的来源上下文或模型可验证的参数化知识中是<strong class="font-semibold text-indigo-600 dark:text-indigo-300">没有根据的</strong>。
            </p>
            <div class="mt-8 text-center">
              
            </div>
          </div>
        </section>
  
        <!-- 3. "模型幻觉带来的危害" 区域 -->
        <section class="mb-20 md:mb-28">
          <div class="text-center mb-12 md:mb-16 animate-fade-in-up" style="animation-delay: 200ms;">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">模型幻觉带来的危害</h2>
            <p class="max-w-3xl mx-auto text-gray-500 dark:text-gray-400">
              虽然在某些创意场景下，幻觉可能被视为一种“创造力”的体现，但在任何要求事实准确性的情境中，它都是一个严重的缺陷。
            </p>
          </div>
  
          <!-- 危害卡片网格 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              v-for="(harm, index) in harms" 
              :key="harm.title" 
              class="bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up overflow-hidden"
              :class="harm.shadowClass"
              :style="{ animationDelay: `${300 + index * 150}ms` }"
            >
              <CardHeader>
                <div class="flex items-center gap-4">
                  <div class="p-3 rounded-lg" :class="harm.bgClass">
                    <component :is="harm.icon" class="w-6 h-6" :class="harm.colorClass" />
                  </div>
                  <CardTitle class="text-gray-900 dark:text-white text-xl">{{ harm.title }}</CardTitle>
                </div>
              </CardHeader>
              <CardContent class="px-6 pb-4">
                <!-- 新增的图片位置 -->
                <img :src="harm.imageUrl" :alt="harm.title" class="w-full h-40 object-cover rounded-lg mb-4 shadow-md">
                <p class="text-gray-600 dark:text-gray-300">{{ harm.description }}</p>
              </CardContent>
              <CardFooter class="px-6 pb-6">
              </CardFooter>
            </Card>
          </div>
        </section>
  
        <!-- 4. "一键试用" 区域 -->
        <section class="text-center animate-fade-in-up" style="animation-delay: 800ms;">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">准备好评估模型了吗？</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-8">立即开始，深刻理解模型幻觉的相关知识
            。</p>
          <router-link to="/solution/adversarial-test">
  <Button 
    size="lg" 
    class="bg-indigo-500 text-white font-bold text-lg px-10 py-6 rounded-full hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/40"
  >
    一键测试
  </Button>
</router-link>
        </section>
  
      </main>
    </div>
  </template>
  
  <script setup>
  import { shallowRef } from 'vue';
  // 假设您已经安装了 lucide-vue-next
  // 您需要根据您的项目设置来调整这些导入
  import { HeartPulse, ShieldOff, BrainCircuit, BookOpen, ArrowRightCircle } from 'lucide-vue-next';
  
  // 导入 Shadcn UI 组件
  // 请确保您已经通过 CLI 添加了这些组件
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
  
  // 导入素材图片
  import Healthcare from '@/assets/医疗健康.webp';
  import Trust from '@/assets/信任.webp';
  import Mislead from '@/assets/误导.webp';
  // 定义危害数据，并添加颜色和图片相关的类与属性
  const harms = shallowRef([
    {
      title: '医疗与健康',
      description: '模型可能会提供错误的医疗建议、捏造不存在的临床试验结果或提出不准确的诊断，这类建议可能危及患者安全。',
      icon: HeartPulse,
      // TODO: 将此路径替换为您自己的图片，推荐放在 public/images/ 目录下
      imageUrl: Healthcare,
      colorClass: 'text-cyan-500',
      bgClass: 'bg-rose-500/10 dark:bg-rose-500/20',
      shadowClass: 'dark:hover:shadow-rose-500/30'
    },
    {
      title: '破坏用户信任',
      description: '当用户发现模型提供的信息不可靠时，会对这项技术的信誉产生怀疑，从而阻碍其在重要应用中的普及和部署。',
      icon: ShieldOff,
      // TODO: 将此路径替换为您自己的图片，推荐放在 public/images/ 目录下
      imageUrl: Trust,
      colorClass: 'text-cyan-500',
      bgClass: 'bg-amber-500/10 dark:bg-amber-500/20',
      shadowClass: 'dark:hover:shadow-amber-500/30'
    },
    {
      title: '技能学习中的误导',
      description: '在教育或技能培训等应用中，幻觉可能会对学习过程产生负面影响，例如在体育训练中提供错误的指导。',
      icon: BrainCircuit,
      // TODO: 将此路径替换为您自己的图片，推荐放在 public/images/ 目录下
      imageUrl: Mislead,
      colorClass: 'text-cyan-500',
      bgClass: 'bg-cyan-500/10 dark:bg-cyan-500/20',
      shadowClass: 'dark:hover:shadow-cyan-500/30'
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
  