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
            大模型内容安全对抗性测试平台
          </h1>
          <p class="text-lg md:text-xl text-indigo-500 font-semibold tracking-wider">
            测试越狱
          </p>
        </header>
  
        <!-- 2. "什么是越狱大模型？" 区域 -->
        <section class="mb-20 md:mb-28">
          <div class="max-w-4xl mx-auto p-8 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/30 rounded-2xl shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-indigo-500/10 backdrop-blur-sm animate-fade-in-up">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              什么是<span class="text-indigo-500">越狱大模型</span>？
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg text-center">
              对大型语言模型（LLM）进行「越狱」，指的是用户透过特殊设计的提问（Prompt）或其他方法，绕过或破解模型开发者设定的安全护栏，诱使模型生成那些它本应拒绝产出的<strong class="font-semibold text-indigo-600 dark:text-indigo-300">有害内容</strong>。
            </p>
            <div class="mt-8 text-center">
              
            </div>
          </div>
        </section>
  
        <!-- 3. "模型被越狱的危害" 区域 -->
        <section class="mb-20 md:mb-28">
          <div class="text-center mb-12 md:mb-16 animate-fade-in-up" style="animation-delay: 200ms;">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">模型被越狱的危害</h2>
            <p class="max-w-3xl mx-auto text-gray-500 dark:text-gray-400">
              「越狱」的危害是全面性的，它不仅能让AI从一个强大的生产力工具变成一个危险的武器，还会从根本上破坏人与AI之间的信任关系。
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
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">准备好测试模型安全性了吗？</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-8">立即开始，构建坚实的AI防线，防范越狱风险。</p>
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
  import { Bomb, MegaphoneOff, ShieldAlert, BookOpen, ArrowRightCircle } from 'lucide-vue-next';
  
  // 导入 Shadcn UI 组件
  // 请确保您已经通过 CLI 添加了这些组件
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
  
  //导入素材图片
  import Prohibited from '@/assets/炸弹.webp';
  import Horn from '@/assets/喇叭.webp';
  import Hotbed from '@/assets/温床.webp';
  // 定义危害数据，并添加颜色和图片相关的类与属性
  const harms = shallowRef([
    {
      title: '成为制造危险的“指导手册”',
      description: '模型可能被诱骗提供制造武器、炸药、毒品的详细指令，或用于编写恶意软件和网络攻击代码，极大降低犯罪的技术门槛。',
      icon: Bomb,
      imageUrl: Prohibited,
      colorClass: 'text-cyan-500',
      bgClass: 'bg-rose-500/10 dark:bg-rose-500/20',
      shadowClass: 'dark:hover:shadow-rose-500/30'
    },
    {
      title: '成为制造仇恨与歧视的“宣传机器”',
      description: '模型可被用来生成大量针对特定群体的歧视性内容和仇恨言论，或被极端团体用于制造宣传材料，加剧社会对立与冲突。',
      icon: MegaphoneOff,
      imageUrl: Horn,
      colorClass: 'text-cyan-500',
      bgClass: 'bg-amber-500/10 dark:bg-amber-500/20',
      shadowClass: 'dark:hover:shadow-amber-500/30'
    },
    {
      title: '成为诈骗与网络犯罪的“温床”',
      description: '模型可生成高度个性化的诈骗脚本、钓鱼邮件，或在关键时刻大规模散播虚假信息，制造社会恐慌，操纵公众舆论。',
      icon: ShieldAlert,
      imageUrl: Hotbed,
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
  