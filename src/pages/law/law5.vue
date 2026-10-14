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
      title: '《生成式人工智能服务管理暂行办法》',
      description: '确立了服务提供商的基本门槛、责任和安全要求。为生成式AI这一新兴领域划定了明确的法律红线，要求服务内容必须符合社会主义核心价值观，保护用户隐私和数据安全，防止生成虚假有害信息，确保技术在可控、负责任的轨道上发展。',
      link: 'https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm',
      imageUrl: '/qc_picture/law1.webp',
      region: '中国',
      status: '正式发布',
      keywords: ['生成式AI', '服务管理', '安全评估']
    },
    {
      title: '《互联网信息服务算法推荐管理规定》',
      description: '管理各类网站和App如何使用算法向用户推荐信息。规范算法推荐行为，保障用户的知情权和选择权。要求服务提供者明确告知用户正在使用算法推荐，并允许用户关闭该功能。此举旨在防止平台利用算法进行“大数据杀熟”、诱导沉迷或传播不良信息。',
      link: 'https://www.lw.com/admin/upload/SiteAttachments/Chinas-New-AI-Regulations-Chinese-version.pdf',
      imageUrl: '/qc_picture/law2.webp',
      region: '中国',
      status: '正式发布',
      keywords: ['算法推荐', '用户权益', '知情权']
    },
    {
      title: '《互联网信息服务深度合成管理规定》',
      description: '专门针对“深度伪造”（Deepfake）技术，要求对深度合成内容进行显著标识，防止技术滥用。',
      link: 'https://www.lw.com/admin/upload/SiteAttachments/Chinas-New-AI-Regulations-Chinese-version.pdf',
      imageUrl: '/qc_picture/law3.webp',
      region: '中国',
      status: '正式发布',
      keywords: ['Deepfake', '内容标识', '技术滥用']
    },
    {
      title: '《人工智能计算平台安全框架》',
      description: '从技术层面为AI计算平台（如AI云服务、智算中心）的搭建和运维提供了一个全面的安全参考模型。为企业构建安全的AI基础设施提供了一套“指导蓝图”。帮助企业系统性地识别和防御从硬件、数据、算法到应用等各个层面的安全风险，提升AI平台的整体安全性。',
      link: 'https://www.tc260.org.cn/front/bzzqyjDetail.html?id=20230515154409898112&norm_id=20221102142806&recode_id=51281',
      imageUrl: '/qc_picture/law4.webp',
      region: '中国',
      status: '征求意见稿',
      keywords: ['技术标准', '计算平台', '基础设施']
    },
    {
      title: '《人工智能全球治理行动计划》',
      description: '中国向全球提出的关于AI治理的立场和倡议，推动建立开放、公正、有效的全球治理体系。倡导各国在AI发展中加强合作，共享AI发展的红利，同时共同管控风险，确保AI技术“智能向善”。',
      link: 'https://www.gov.cn/yaowen/liebiao/202507/content_7033929.htm',
      imageUrl: '/qc_picture/law5.webp',
      region: '中国（倡议）',
      status: '正式发布',
      keywords: ['全球治理', '国际合作', '智能向善']
    },
    {
      title: '《政务大模型应用安全规范》',
      description: '专注于大模型在政府服务领域的应用安全。为政府部门使用大模型技术提供了一套安全准则。由于政务数据高度敏感，该规范旨在确保数据在处理过程中的机密性、完整性，防止数据泄露，保障政务服务的稳定和可靠。',
      link: 'https://www.tc260.org.cn/upload/2025-07-28/1753699924605068212.pdf',
      imageUrl: '/qc_picture/law6.webp',
      region: '中国',
      status: '征求意见稿',
      keywords: ['数据安全', '政府服务', '安全规范']
    },
    {
      title: '《人工智能 面向机器学习的数据标注规程》',
      description: '一个关于数据标注流程的技术标准。旨在提升AI“食粮”——训练数据的质量。通过规范数据标注的流程、方法和质量要求，减少因数据偏差导致的模型偏见和错误，从而提高AI模型的准确性和公平性。',
      link: 'https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=2BE1BE0093F37778CFB2071DD490EECD',
      imageUrl: '/qc_picture/law7.webp',
      region: '中国',
      status: '正式发布',
      keywords: ['技术标准', '内容标识', '数字水印']
    },
    {
      title: '《人工智能生成合成内容标识方法》',
      description: '该标准为如何给AI生成内容（AIGC）打上“标签”提供了具体的技术指引。是《深度合成管理规定》的技术配套文件，为企业如何通过数字水印、元数据等方式对AIGC进行有效标识提供了具体方案，使“强制标识”的要求能够落地。',
      link: 'https://www.tc260.org.cn/front/postDetail.html?id=20230807193836',
      imageUrl: '/qc_picture/law8.webp',
      region: '中国',
      status: '征求意见稿',
      keywords: ['技术标识', '生成式AI', '数字水印']
    },
    {
      title: '《生成式人工智能服务安全基本要求》',
      description: '详细列出了提供生成式AI服务必须满足的安全底线。为企业提供了一份详细的“安全自查清单”。它涵盖了从数据安全、模型安全到服务安全等各个环节的具体要求，是企业进行算法备案和安全评估时的重要参考依据。',
      link: 'https://www.tc260.org.cn/upload/2024-03-01/1709282398070082466.pdf',
      imageUrl: '/qc_picture/law9.webp',
      region: '中国',
      status: '正式发布',
      keywords: ['服务规范', '安全要求', '技术标识']
    },
    {
      title: '《生成式人工智能数据标注安全规范》',
      description: '此规范专门针对生成式AI在数据标注环节的安全问题。旨在保护数据标注过程中的数据安全。它要求在标注过程中对个人信息等敏感数据进行脱敏处理，防止数据在标注环节被泄露或滥用。',
      link: 'https://www.tc260.org.cn/front/bzzqyjDetail.html?id=20240403111401&norm_id=20231220160952&recode_id=54518',
      imageUrl: '/qc_picture/law10.webp',
      region: '中国',
      status: '征求意见稿',
      keywords: ['数据标注', '隐私保护', '数据安全']
    },
    {
      title: '《生成式人工智能预训练和优化训练数据安全规范》',
      description: '该规范聚焦于大模型训练前的数据源头安全。旨在从源头上净化AI的训练数据。它要求在收集和使用海量预训练数据时，必须遵守法律法规，过滤掉违法和不良信息，保护知识产权和个人隐私。',
      link: 'https://www.tc260.org.cn/front/bzzqyjDetail.html?id=20240523143149&norm_id=20240430101922&recode_id=55010',
      imageUrl: '/qc_picture/law11.webp',
      region: '中国',
      status: '征求意见稿',
      keywords: ['预训练数据', '数据源', '技术标识']
    },
    {
      title: '《人脸识别技术应用安全管理办法》',
      description: '规定旨在严格规范人脸识别技术的应用。核心是保护公民的生物信息安全和隐私权。它强调只有在“具有特定的目的和充分的必要性”时才能使用人脸识别，并要求采取严格的保护措施，防止人脸数据被滥用或泄露。',
      link: 'https://whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf',
      imageUrl: '/qc_picture/law12.webp',
      region: '中国',
      status: '征求意见稿',
      keywords: ['人脸识别', '生物信息', '隐私保护']
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
  