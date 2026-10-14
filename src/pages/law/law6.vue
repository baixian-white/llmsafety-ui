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
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">AI 法规</span>
            <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">深度洞察</span>
          </h1>
          <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            权威专家为您剖析全球AI政策，洞悉合规未来
          </p>
        </header>
  
        <!-- 2. 法案模块网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(act, index) in acts" 
            :key="act.title" 
            class="bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/30 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up flex items-center overflow-hidden"
            :style="{ animationDelay: `${200 + index * 100}ms` }"
          >
            <!-- 左侧：文字内容 -->
            <div class="p-6 flex flex-col flex-grow self-stretch">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">{{ act.title }}</h3>
              
              <!-- 标签区域 -->
              <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full" :class="act.region === '中国' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'">
                  {{ act.region }}
                </span>
                <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full" :class="act.status === '正式发布' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'">
                  {{ act.status }}
                </span>
                <span v-for="keyword in act.keywords" :key="keyword" class="px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  {{ keyword }}
                </span>
              </div>
  
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">{{ act.description }}</p>
              
              <a 
                :href="act.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors duration-300 mt-auto"
              >
                查看解读
                <ArrowRight class="ml-1 h-4 w-4" />
              </a>
            </div>
  
            <!-- 右侧：图片 -->
            <div class="w-36 h-36 flex-shrink-0 m-4">
              <img :src="act.imageUrl" :alt="act.title" class="w-full h-full object-cover rounded-md">
            </div>
          </div>
        </div>
  
      </main>
    </div>
  </template>
  
  <script setup>
  import { shallowRef } from 'vue';
  import { ArrowRight } from 'lucide-vue-next';
  
  // 法案数据
  const acts = shallowRef([
    {
      title: '美国《人工智能行动计划》',
      description: '通过协调政府各部门的努力，加速AI技术的研发和应用，以确保美国在全球AI竞赛中的领导地位。 它强调了建设安全、可信赖的AI生态系统的重要性，一方面大力投资AI基础设施和人才培养以驱动创新，另一方面也着手建立风险管理框架和标准，以应对AI带来的社会、经济和国家安全挑战。',
      link: '/law6_1',
      imageUrl: '/qc_picture/law20.webp',
      region: '美国',
      status: '正式发布',
      keywords: ['风险管理', '领导地位', '国家战略']
    },
    {
      title: '《政务大模型应用安全规范》',
      description: '专注于大模型在政府服务领域的应用安全。为政府部门使用大模型技术提供了一套安全准则。由于政务数据高度敏感，该规范旨在确保数据在处理过程中的机密性、完整性，防止数据泄露，保障政务服务的稳定和可靠。',
      link: '/law6_2',
      imageUrl: '/qc_picture/law6.webp',
      region: '中国',
      status: '征求意见稿',
      keywords: ['数据安全', '政府服务', '安全规范']
    },
    {
      title: '美国《NIST AI风险管理框架》',
      description: '由美国国家标准与技术研究院（NIST）发布，这不是一部强制性法律，而是一套自愿采用的指导框架。为企业和机构提供了一个具体、可作的工具集，用于识别、评估和应对AI风险。 其目标是促进可信赖、负责任的AI创新，帮助组织在享受AI带来好处的同时，最小化其负面影响，如偏见、不透明和安全漏洞等。',
      link: '/law6_3',
      imageUrl: '/qc_picture/law14.webp',
      region: '美国',
      status: '正式发布',
      keywords: ['风险管理', '自愿性框架', '可信AI']
    },
    {
      title: '《人工智能全球治理行动计划》',
      description: '本文梳理了中美AI战略中的十大共识，既有相似的判断与目标，也有各自路径和立场的分歧。这些共识不仅揭示了AI发展背后的全球性逻辑，也为政策制定者、技术从业者提供了思考未来趋势与制定对策的重要参考。',
      link: '/law6_4',
      imageUrl: '/qc_picture/law5.webp',
      region: '中国（倡议）',
      status: '正式发布',
      keywords: ['全球治理', '国际合作', '智能向善']
    },
    {
      title: '欧盟《人工智能法案》',
      description: '全球首个针对人工智能的全面性法规。 它没有对AI技术本身进行限制，而是根据AI应用可能带来的风险，将其划分为“不可接受风险”、“高风险”、“有限风险”和“极低风险”四个等级，并对不同等级的AI系统施加不同的监管要求。',
      link: '/law6_5',
      imageUrl: '/qc_picture/law13.webp',
      region: '欧盟',
      status: '正式发布',
      keywords: ['风险分类', '市场准入', '高风险AI']
    },                                                                                                                                                                                                                                                                                                                                                                                 
    {
      title: '《国务院“人工智能+”行动意见》解读',
      description: '本文深度剖析了国务院发布的《关于深入实施“人工智能+”行动的意见》。 该意见作为一份未来三到五年的国家级AI发展路线图，系统性地提出了围绕科技、产业、消费、民生、治理与全球合作等六大领域的行动方向，并以模型、数据、算力、安全等八大体系为基础支撑，旨在将AI全面融入经济社会发展的全过程。',
      link: '/law6_6',
      imageUrl: '/qc_picture/law21.webp',
      region: '中国',
      status: '正式发布',
      keywords: ['人工智能+', '国家战略', '数字经济']
    },
    
    
    
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
  