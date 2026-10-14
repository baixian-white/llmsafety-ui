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
            <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">AI 治理与</span>
            <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">安全法规</span>
          </h1>
          <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            探索塑造可信人工智能未来的关键政策与标准
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
                查看详情
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
      title: '欧盟《人工智能法案》',
      description: '全球首个针对人工智能的全面性法规。 它没有对AI技术本身进行限制，而是根据AI应用可能带来的风险，将其划分为“不可接受风险”、“高风险”、“有限风险”和“极低风险”四个等级，并对不同等级的AI系统施加不同的监管要求。',
      link: 'https://artificialintelligenceact.eu/',
      imageUrl: '/qc_picture/law13.webp',
      region: '欧盟',
      status: '正式发布',
      keywords: ['风险分类', '市场准入', '高风险AI']
    },
    {
      title: '美国《NIST AI风险管理框架》',
      description: '由美国国家标准与技术研究院（NIST）发布，这不是一部强制性法律，而是一套自愿采用的指导框架。为企业和机构提供了一个具体、可作的工具集，用于识别、评估和应对AI风险。 其目标是促进可信赖、负责任的AI创新，帮助组织在享受AI带来好处的同时，最小化其负面影响，如偏见、不透明和安全漏洞等。',
      link: 'https://www.nist.gov/itl/ai-risk-management-framework',
      imageUrl: '/qc_picture/law14.webp',
      region: '美国',
      status: '正式发布',
      keywords: ['风险管理', '自愿性框架', '可信AI']
    },
    {
      title: '英国《人工智能监管白皮书》',
      description: '这份白皮书阐述了英国对AI的监管哲学。专门针对“深度伪造”（Deepfake）技术，要求对深度合成内容进行显著标识，防止技术滥用。旨在创建一个适应性强、不僵化的监管环境，以鼓励AI技术的快速发展和商业化。 这种基于具体应用情境的监管方式，力求在保护公众利益和为企业提供清晰规则之间取得平衡，避免“一刀切”的立法扼杀创新。',
      link: 'https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach',
      imageUrl: '/qc_picture/law15.webp',
      region: '英国',
      status: '正式发布',
      keywords: ['五大原则', '情境驱动', '支持创新']
    },
    {
      title: '加拿大《人工智能与数据法案》',
      description: 'AIDA是加拿大数字宪章实施法案（Bill C-27）的一部分，旨在为AI系统的设计、开发和部署制定新的规则，特别是针对那些“高影响力”的AI系统。 法案要求相关组织必须识别、评估并缓解其AI系统可能带来的伤害和偏见风险。',
      link: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-27',
      imageUrl: '/qc_picture/law16.webp',
      region: '加拿大',
      status: '征求意见稿',
      keywords: ['高影响系统', '风险评估', '偏见与歧视']
    },
    {
      title: '美国《人工智能权利法案蓝图》',
      description: '由白宫科技政策办公室发布，这是一份非约束性的框架文件。 它提出了五项核心原则，旨在指导自动化系统的设计、使用和部署，以保护美国公众免受伤害。 这五项原则包括：安全有效的系统、免受算法歧视的保护、数据隐私、通知与解释、以及人工替代方案。',
      link: 'https://bidenwhitehouse.archives.gov/ostp/ai-bill-of-rights/',
      imageUrl: '/qc_picture/law17.webp',
      region: '美国',
      status: '正式发布',
      keywords: ['权利保护', '算法歧视', '数据隐私']
    },
    {
      title: '新加坡《示范性人工智能治理框架》',
      description: '由新加坡个人数据保护委员会（PDPC）发布，这是一份供各组织参考的实践指南。 它没有设立硬性法律，而是提出了一套内部治理的指导原则，旨在帮助组织在部署AI解决方案时，能够以一种负责任、合乎道德的方式进行。 框架的核心是两个指导原则：组织应对其AI模型的决策负责，以及AI的决策过程应是可解释、透明和公平的。',
      link: 'https://www.pdpc.gov.sg/help-and-resources/2020/01/model-ai-governance-framework',
      imageUrl: '/qc_picture/law18.webp',
      region: '新加坡',
      status: '正式发布',
      keywords: ['治理框架', '问责制', '可解释性']
    },
    {
      title: '《人工智能原则》',
      description: '这是首个由多国政府共同签署的关于AI的政府间标准。 它提出了五项以人为本的价值观原则（包容性增长、以人为本、透明度、稳健安全、问责制）和五项对政策制定者的建议。 这些原则虽不具法律约束力，但已成为全球AI治理讨论的基石。',
      link: 'https://oecd.ai/en/ai-principles',
      imageUrl: '/qc_picture/law19.webp',
      region: '经合组织（OECD）',
      status: '正式发布',
      keywords: ['国际准则', '以人为本', '政策建议']
    },
    {
      title: '美国《人工智能行动计划》',
      description: '这是美国政府为指导未来几年国家在人工智能领域的发展而制定的全面战略文件。 它并非单一法案，而是一个涵盖了投资、研发、教育、标准制定和国际合作等多个方面的综合性行动蓝图。',
      link: 'https://whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf',
      imageUrl: '/qc_picture/law20.webp',
      region: '美国',
      status: '正式发布',
      keywords: ['风险管理', '领导地位', '国家战略']
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
  