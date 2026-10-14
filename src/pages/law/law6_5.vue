<template>
    <!-- Edit: Added light/dark mode classes for background and text -->
    <div
      class="ai-safety-page bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      <!-- Background Gradient & Grid -->
      <div class="absolute inset-0 z-0">
        <!-- Edit: Swapped grid pattern color for light/dark mode -->
        <div class="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-10"></div>
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5830D6]/20 via-transparent to-transparent">
        </div>
        <div
          class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-500/10 via-transparent to-transparent">
        </div>
      </div>
  
      <!-- Main Content -->
      <main class="relative z-10 container mx-auto px-4 py-16 sm:py-24">
  
        <!-- Hero Section -->
        <header class="text-center mb-16 animate-fade-in-down">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            <span
              class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">欧盟《人工智能法案》</span>
            <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">深度解读</span>
          </h1>
          <p class="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            全球首部全面监管AI的法律，基于风险分类方法为AI系统建立规则
          </p>
          <div class="mt-8">
            <a href="https://artificialintelligenceact.eu/"
              target="_blank" rel="noopener noreferrer"
              class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#5830D6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cyan-400/50">
              <span
                class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative">阅读法案原文</span>
              <svg class="relative w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </header>

        <!-- Content Section -->
        <div ref="contentRef" class="w-full max-w-5xl mx-auto">
          <!-- Edit: Added light/dark mode classes for the main content card -->
          <div
            class="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
            style="animation-delay: 0.3s;">
            <div
              class="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">《人工智能法案》概要</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">2024年8月生效，2026年全面实施</p>
              </div>
              <!-- Edit: Adjusted icon color for light/dark mode -->
              <Icon icon="ph:scales-bold"
                class="text-purple-500 dark:text-cyan-400/80 w-20 h-20 mt-4 sm:mt-0 opacity-80" />
            </div>
  
            <!-- Scrollable Content Area -->
            <div class="p-6 sm:p-8">
              <div class="max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
                <article class="prose prose-lg dark:prose-invert max-w-none">

                  <div class="chapter-card">
                    <h3>四点总结</h3>
                    <p><strong>《人工智能法案》根据人工智能的风险对其进行了分类：</strong></p>
                    <ul>
                      <li>禁止不可接受的风险（例如社交评分系统和操纵性人工智能）。</li>
                      <li>大部分文本涉及受监管的高风险人工智能系统。</li>
                      <li>较小的部分处理有限风险的人工智能系统，但透明度义务较轻：开发人员和部署人员必须确保最终用户知道他们正在与人工智能（聊天机器人和深度伪造）交互。</li>
                      <li>最低风险不受监管（包括目前欧盟单一市场上大多数人工智能应用，例如支持人工智能的视频游戏和垃圾邮件过滤器）。</li>
                    </ul>
                    <p><strong>大部分义务落在高风险人工智能系统的提供商（开发商）身上。</strong></p>
                    <ul>
                      <li>那些打算在欧盟市场投放或投入使用高风险人工智能系统的人，无论他们位于欧盟还是第三国。</li>
                      <li>以及在欧盟使用高风险人工智能系统输出的第三国供应商。</li>
                      </ul>
                    <p><strong>用户是指以专业身份部署人工智能系统的自然人或法人</strong>，而不是受影响的最终用户。</p>
                    <ul>
                      <li>高风险人工智能系统的用户（部署者）也承担一些义务，但比提供商（开发者）的义务要少。</li>
                      <li>这适用于位于欧盟的用户，以及在欧盟使用人工智能系统输出的第三国用户。</li> 
                    </ul>
                    <p><strong>通用人工智能（GPAI）：</strong></p>
                    <ul>
                      <li>所有 GPAI 模型提供商必须提供技术文档、使用说明、遵守版权指令，并发布有关用于培训的内容的摘要。</li>
                      <li>免费开放许可的GPAI模型提供商只需遵守版权并发布训练数据摘要，除非它们存在系统性风险。</li>
                      <li>所有存在系统性风险的 GPAI 模型提供商（无论是开放的还是封闭的）也必须进行模型评估、对抗性测试、跟踪和报告严重事件并确保网络安全保护。</li>
                    </ul>
                  </div>
                  
                  <div class="chapter-card">
                    <h3>禁止的人工智能系统</h3>
                    <p>根据《人工智能法》，以下类型的人工智能系统是“被禁止的”：</p>
                    <ul>
                        <li>采用<strong>潜意识、操纵或欺骗手段</strong>来扭曲行为并损害知情决策，从而造成严重伤害的AI系统。</li>
                        <li>利用与年龄、残疾或社会经济状况相关的<strong>弱点来扭曲行为，造成重大伤害的AI系统。</strong></li>
                        <li>推断敏感属性（种族、政治观点、工会会员资格、宗教或哲学信仰、性生活或性取向）的<strong>生物特征分类系统。</strong></li>
                        <li><strong>社会评分</strong>，即根据社会行为或个人特征对个人或群体进行评估或分类，从而对这些人造成有害或不利的待遇。</li>
                        <li><strong>仅根据分析或性格特征来评估个人犯下刑事罪行的风险的AI系统。</strong></li>
                        <li>通过从互联网或闭路电视录像中无针对性地抓取面部图像来<strong>编制面部识别数据库。</strong></li>
                        <li><strong>在工作场所或教育机构中推断情绪的AI系统</strong>，除非出于医疗或安全原因。</li>
                        <li><strong>执法部门在公共场所进行“实时”远程生物特征识别（RBI）</strong>，但有严格的例外情况（如寻找失踪人员、防止恐怖袭击等）。</li>
                    </ul>
                  </div>

                  <div class="chapter-card">
                    <h3>高风险人工智能系统</h3>
                    
                    <p>高风险AI系统主要分为两类：一是作为受欧盟现有安全法规（如玩具、汽车、医疗器械）监管的产品的安全部件；二是在特定领域（附件三）使用的AI系统。</p>
                    <p><strong>附件三用例包括：</strong></p>
                    <ul>
                        <li><strong>生物识别技术：</strong>远程生物识别系统、情绪识别系统等。</li>
                        <li><strong>关键基础设施：</strong>用于水、气、热、电力等关键基础设施管理和运行的安全组件。</li>
                        <li><strong>教育和职业培训：</strong>用于决定入学、评估学习成果或监控考试的AI系统。</li>
                        <li><strong>就业、工人管理和自主创业：</strong>用于招聘、筛选申请、分配任务或评估绩效的AI系统。</li>
                        <li><strong>获取和享受基本公共和私人服务：</strong>用于评估福利资格、信用评分、紧急呼叫调度或保险风险评估的AI系统。</li>
                        <li><strong>执法：</strong>用于评估犯罪风险、证据可靠性或进行犯罪分析的AI系统。</li>
                        <li><strong>移民、庇护和边境管控管理：</strong>用于风险评估、审查申请或身份识别的AI系统。</li>
                        <li><strong>司法管理和民主进程：</strong>用于辅助司法判决或影响选举结果的AI系统。</li>
                    </ul>
                    <p><strong>对高风险人工智能系统提供者的要求包括：</strong>建立风险管理体系、进行数据治理、起草技术文件、设计记录功能、提供使用说明、确保可被人类监督、以及达到适当的准确性、稳健性和网络安全水平。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>通用人工智能（GPAI）</h3>
                    <p>通用人工智能 (GPAI) 模型是指一种人工智能模型，包括使用大规模自监督方法训练的模型，该模型表现出显著的通用性，无论以何种方式投放市场，都能胜任执行各种不同的任务，并可集成到各种下游系统或应用程序中。这不包括在上市前用于研究、开发和原型设计活动的人工智能模型。

</p>
<p>GPAI 系统是指基于通用 AI 模型的 AI 系统，它能够满足多种用途，既可直接使用，也可集成到其他 AI 系统中。GPAI系统可能被用作高风险AI系统，或被集成到高风险AI系统中。GPAI系统提供商应与此类高风险AI系统提供商合作，以确保后者合规。</p>
                    <p><strong>所有 GPAI 模型提供商必须：</strong></p>
                    <ul>
                      <li>起草<strong>技术文档</strong>，包括培训和测试过程以及评估结果。</li>
                      <li>起草<strong>信息和文档，提供给</strong>下游供应商。</li>
                      <li><strong>制定尊重版权指令的</strong>政策。</li>
                      <li>发布<strong>有关用于训练</strong>GPAI 模型的内容的足够详细的摘要。</li>
                    </ul>
                    <p><strong>存在系统性风险的GPAI模型提供商还必须：</strong></p>
                    <ul>
                      <li>执行<strong>模型评估</strong>，包括进行和记录<strong>对抗性测试</strong>。</li>
                      <li><strong>评估并减轻可能出现的系统性风险</strong>。</li>
                      <li>跟踪、记录并及时<strong>报告严重事件</strong>。</li>
                      <li><strong>确保足够的网络安全保护</strong>水平。</li>
                    </ul>
                  </div>
  
                  <!-- Link Button -->
                  <div class="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                    <a href="https://artificialintelligenceact.eu/"
                      target="_blank" rel="noopener noreferrer"
                      class="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#5830D6] dark:text-white hover:text-white bg-transparent border-2 border-[#5830D6] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#5830D6] hover:shadow-lg hover:shadow-[#5830D6]/50">
                      <span class="relative">查看法案原文</span>
                      <svg class="relative w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
  
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Icon } from '@iconify/vue';
  
  // 用于平滑滚动的引用
  const contentRef = ref(null);
  
  // 平滑滚动到内容区域的方法
  const scrollToContent = () => {
    if (contentRef.value) {
      contentRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  </script>
  
  <style scoped>
  /* 自定义字体 */
  .font-sans {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  /* Edit: Defined separate grid patterns for light and dark modes */
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
  
  
  /* 自定义滚动条样式 */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    /* Edit: Adjusted scrollbar track for light/dark mode */
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #a8a29e;
    /* Light mode thumb */
    border-radius: 10px;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #5830D6;
    /* Dark mode thumb */
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #78716c;
    /* Light mode thumb hover */
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6a44e0;
    /* Dark mode thumb hover */
  }
  
  /* 章节卡片样式 */
  .chapter-card {
    /* Edit: Adjusted chapter card for light/dark mode */
    background: rgba(0, 0, 0, 0.02);
    border-left: 3px solid #5830D6;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0 8px 8px 0;
    transition: all 0.3s ease-in-out;
  }
  
  .dark .chapter-card {
    background: rgba(255, 255, 255, 0.03);
  }
  
  .chapter-card:hover {
    background: rgba(88, 48, 214, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .dark .chapter-card:hover {
    background: rgba(88, 48, 214, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .chapter-card h3 {
    /* Edit: Adjusted chapter title for light/dark mode */
    margin-top: 0;
    margin-bottom: 1rem;
    color: #5830D6;
    font-size: 1.5rem;
  }
  
  .dark .chapter-card h3 {
    color: #c4b5fd;
  }
  
  /* prose 样式覆盖 */
  .prose p, .prose ul {
    line-height: 1.75;
  }
  
  /* 入场动画 */
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
  
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
  
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-down {
    animation: fadeInDown 0.8s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    }
    
  </style>
    
  
```eof
