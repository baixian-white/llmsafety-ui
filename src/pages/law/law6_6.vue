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
            <!-- Edit: Adjusted light/dark text colors for better contrast -->
            <span
              class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">国务院“人工智能+”行动意见</span>
            <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">深度解读</span>
          </h1>
          <p class="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            六大领域与八大支撑：一份未来三到五年的国家级AI发展路线图
          </p>
          <div class="mt-8">
            <a href="https://www.gov.cn/"
              target="_blank" rel="noopener noreferrer"
              class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#5830D6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cyan-400/50">
              <span
                class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative">阅读意见原文</span>
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
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">《关于深入实施“人工智能+”行动的意见》解读</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">发布日期：2025年8月31日</p>
              </div>
              <!-- Edit: Adjusted icon color for light/dark mode -->
              <Icon icon="octicon:law-16"
                class="text-purple-500 dark:text-cyan-400/80 w-20 h-20 mt-4 sm:mt-0 opacity-80" />
            </div>
  
            <!-- Scrollable Content Area -->
            <div class="p-6 sm:p-8">
              <div class="max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
                <!-- Edit: Added dark:prose-invert to automatically handle article text colors -->
                <article class="prose prose-lg dark:prose-invert max-w-none">
                  <!-- Chapter 1 -->
                  <div class="chapter-card">
                    <h3>引言：三大阶段目标与总体框架</h3>
                    <p>《意见》明确提出了“三大阶段目标”，旨在围绕<strong>科技、产业、消费、民生、治理、全球合作</strong>六大领域，系统性地推进“人工智能+”行动。整个行动以<strong>模型、数据、算力、应用、生态、人才、政策法规、安全</strong>八大体系为基础支撑，构成了一个从科研到应用、从国内到国际的全链条国家级战略。</p>
                  </div>
  
                  <!-- Chapter 2 -->
                  <div class="chapter-card">
                    <h3>六大重点领域解读</h3>
                    <h4>1. 人工智能+科学技术</h4>
                    <p>将AI置于科研范式转型的引擎位置，推动科研从“加速”到“跃迁”。文件强调建设高质量的科学数据集，并首次将哲学社会科学纳入AI+科技范畴，探索AI对人类认知和伦理的深层影响，体现了“智能向善”的理念。</p>
                    <h4>2. 人工智能+产业发展</h4>
                    <p>在农业、工业和服务业三大板块全面推进智能化转型。AI将成为横贯全产业的通用技术，利用中国完整的工业门类和超大规模市场，为AI应用提供最广阔的舞台。</p>
                    <h4>3. 人工智能+消费提质</h4>
                    <p>随着经济重心转向消费，AI将渗透到“吃穿住行娱”的日常生活中。通过拓展智能消费场景，培育智能家居、网联汽车等新业态，构建全新的消费格局。</p>
                    <h4>4. 人工智能+民生福祉</h4>
                    <p>利用AI创造更智能的工作方式、更高效的学习方式和更美好的生活。在催生新职业的同时，也通过智能导师、AI辅助诊断、陪伴机器人等应用，提升教育、医疗和社会服务的质量与可及性。</p>
                    <h4>5. 人工智能+治理能力</h4>
                    <p>推动政府从被动响应转向主动服务，从粗放管理走向精准治理。AI将被嵌入到政务服务、城市管理、公共安全和环境治理等各个环节，提升预警和快速反应能力。</p>
                    <h4>6. 人工智能+全球合作</h4>
                    <p>首次将“全球合作”纳入行动范畴，强调推动AI的普惠共享，让其成为国际公共产品，并积极参与乃至引领全球AI治理体系的建设。</p>
                  </div>
  
                  <!-- Chapter 3 -->
                  <div class="chapter-card">
                    <h3>八大基础支撑</h3>
                    <ul>
                      <li><strong>模型能力</strong>：通用大模型与行业小模型并举，强调可控、可评、可审。</li>
                      <li><strong>数据供给</strong>：建设高质量、公信力的与数据要素市场规则。</li>
                      <li><strong>算力统筹</strong>：国家级算力调度与边云协同，推动绿色算力与成本可负担。</li>
                      <li><strong>应用发展</strong>：从“技术驱动”转向“场景牵引”，打造可复制可推广的标杆。</li>
                      <li><strong>生态繁荣</strong>：平台、开源、产业链协同，鼓励中小创新与大企业赋能。</li>
                      <li><strong>人才建设</strong>：复合型人才培养体系与在岗转训，完善职教与继续教育。</li>
                      <li><strong>政策法规</strong>：围绕数据流通、算法治理、深度合成、消费者保护完善制度供给。</li>
                      <li><strong>安全保障</strong>：从内容安全、系统安全、可信可控到伦理合规的全栈护栏与评测。</li>
                    </ul>
                  </div>
  
                  <!-- Chapter 4 -->
                  <div class="chapter-card">
                    <h3>落地路线图</h3>
                    <ul>
                        <li><strong>省市层面</strong>：编制“AI+三年行动计划”，设立标杆场景清单与“赛马机制”。</li>
                        <li><strong>行业层面</strong>：建立行业数据规范、参考模型、评测基线的“三件套”。</li>
                        <li><strong>企业层面</strong>：优先实施高频刚需、数据可得、ROI可衡量的MVP项目，并前置安全与合规考量。</li>
                        <li><strong>公众层面</strong>：推进适老化、可解释性与用户数据权利的落地，以增强社会信任。</li>
                    </ul>
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

  .chapter-card h4 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  .dark .chapter-card h3 {
    color: #c4b5fd;
  }
  
  /* prose 样式覆盖 */
  .prose p {
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
