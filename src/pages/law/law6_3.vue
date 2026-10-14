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
              class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">美国人工智能风险管理框架</span>
            <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">深度解读</span>
          </h1>
          <p class="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            深入分析NIST发布的AI RMF 1.0，探索构建可信AI的七大特征与四大支柱
          </p>
          <div class="mt-8">
            <a href="https://www.nist.gov/itl/ai-risk-management-framework"
              target="_blank" rel="noopener noreferrer"
              class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#5830D6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cyan-400/50">
              <span
                class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative">阅读框架原文</span>
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
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">美国人工智能风险管理框架解读</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">发布单位：美国国家标准与技术研究院 (NIST)</p>
              </div>
              <!-- Edit: Adjusted icon color for light/dark mode -->
              <Icon icon="octicon:law-16"
                class="text-purple-500 dark:text-cyan-400/80 w-20 h-20 mt-4 sm:mt-0 opacity-80" />
            </div>
  
            <!-- Scrollable Content Area -->
            <div class="p-6 sm:p-8">
              <div class="max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
                <article class="prose prose-lg dark:prose-invert max-w-none">

                  <div class="chapter-card">
                    <h3>框架概述</h3>
                    <p>美国国家标准与技术研究院（NIST）于2023年发布<strong>AI风险管理框架1.0(AI RMF 1.0)</strong>，作为指导组织<strong>识别和管理AI风险</strong>的自愿性框架。AI RMF提出了“<strong>地图-测评-管理-治理</strong>”<strong>四大职能支柱，用于构建可信AI。框架强调一系列</strong>信任**特征，包括<strong>有效性、可靠性、安全性、抗干扰性、可问责与透明性、可解释性、隐私增强、公平性</strong>等，以帮助企业平衡创新与风险。</p>
                  </div>
                  
                  <div class="chapter-card">
                    <h3>AI系统的生命周期</h3>
                    <p>AI系统的生命周期包括<strong>系统规划设计、数据采集与处理、模型训练与构建、模型验证与确认、系统部署与使用、系统运行与监控、系统使用与影响</strong>这七个阶段，在整个生命周期需要关注<strong>应用场景、数据&输入、AI模型、任务&输出、人类社群</strong>这五大关键维度。</p>
                    <p><strong>阶段一：系统规划与设计(Plan and Design)</strong><br/><strong>工作内容：</strong>明确并记录系统的概念与目标、基本假设和背景，并结合法律法规与伦理要求进行说明。<br/><strong>参与方：</strong>系统运营者、终端用户、领域专家、AI设计师、影响评估员、TEVV专家、产品经理、合规专家、审计员、治理专家、组织管理层、高管、受影响的个人或社区、评估人员。</p>
                    <p><strong>阶段二：数据采集与处理(Collect and Process Data)</strong><br/><strong>工作内容：</strong>收集、验证和清洗数据，记录数据集的元数据和特征，并结合目标、法律和伦理要求。<br/><strong>参与方：</strong>数据科学家、数据工程师、数据提供者、领域专家、社会文化分析师、人因专家、TEVV 专家。</p>
                    <p><strong>阶段三：模型训练与构建 (Build and Use Models)</strong><br/><strong>工作内容：</strong>创建或选择算法，训练模型。<br/><strong>参与方：</strong>建模人员、模型工程师、数据科学家、开发人员、领域专家，并咨询熟悉应用背景的社会文化分析师和TEVV专家。</p>
                    <p><strong>阶段四：验证与确认 (Validate and Verify)</strong><br/><strong>工作内容：</strong>验证与确认、校准并解释模型输出。<br/><strong>参与方：</strong>系统集成商、开发人员、系统工程师、软件工程师、领域专家、采购专家、第三方供应商、高管，并咨询人因专家、社会文化分析师、治理专家、TEVV专家。</p>
                    <p><strong>阶段五：部署与使用 (Deploy and Use)</strong><br/><strong>工作内容：</strong>试点运行，检查与旧系统的兼容性，验证法规合规性，管理组织变更，并评估用户体验。<br/><strong>参与方：</strong>系统运营者、终端用户和从业者、领域专家、AI设计师、影响评估员、TEVV 专家、系统资助方、产品经理、合规专家、审计员、治理专家、组织管理层、受影响的个人或社区、评估人员。</p>
                    <p><strong>阶段六：运行与监控 (Operate and Monitor)</strong><br/><strong>工作内容：</strong>运行AI系统，并持续评估其建议和影响（包括预期和非预期影响），结合目标、法律法规和伦理要求。<br/><strong>参与方：</strong>终端用户、运营者和从业者、受影响的个人或社区、公众、政策制定者、标准组织、行业协会、倡导团体、环保组织、民间社会组织、研究人员。</p>
                    <p><strong>阶段七：使用与影响 (Use or Be Affected)</strong><br/><strong>工作内容：</strong>使用系统/技术；监控与评估影响；寻求影响缓解并倡导权利。<br/><strong>参与方：</strong>公众、受影响的个人或社区、政策制定者、标准制定组织、社会团体、环保组织、研究人员等。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>可信AI七大特征</h3>
                    <p><strong>有效性与可靠性 (Valid and Reliable):</strong> 有效性是指确认AI系统是否满足预期需求；可靠性是指AI系统能否持续、无故障地工作。准确性和鲁棒性对系统可信度也非常重要。</p>
                    <p><strong>安全性 (Safe):</strong> AI系统的安全性要求它们在预定条件下不会对人类生命、健康、财产或环境造成威胁。安全的AI系统应该通过负责任的设计、清晰的指南和基于证据的风险评估来保证。</p>
                    <p><strong>安全与韧性 (Secure and Resilient):</strong> 安全指AI系统能保护机密性、完整性和可用性，抵御攻击；韧性指系统在遭遇意外时能保持运作或安全退化。</p>
                    <p><strong>可问责与透明 (Accountable and Transparent):</strong> 透明性意味着AI系统的工作过程和输出信息对用户开放，帮助用户理解系统如何做出决策，是实现可问责性的基础。</p>
                    <p><strong>可解释与可理解 (Explainable and Interpretable):</strong> 可解释性指解释AI内部工作机制，可理解性是让用户理解输出意义。两者结合能提高系统可信度。</p>
                    <p><strong>隐私增强 (Privacy-Enhanced):</strong> 指的是保护个人信息和身份的规范和措施。隐私保护和安全、偏见、透明性之间存在权衡，需要平衡这些特性。</p>
                    <p><strong>公平—有害偏见管理 (Fair – with Harmful Bias Managed):</strong> 公平性是AI中的一个重要议题，涉及到如何处理偏见和歧视等问题。AI系统中的有害偏见可能会放大不平等和歧视，影响不同群体。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>可信AI四大支柱</h3>
                    <p>AI RMF Core 是NIST提出的AI风险管理核心框架，由<strong>治理（GOVERN）、地图（MAP）、测评（MEASURE）和管理（MANAGE）</strong>四大功能构成，旨在为组织提供共同语言和实践指南。</p>
                    <p><strong>1. 治理（GOVERN）：定规则、立规矩</strong><br/>先定好“公司文化”和“风险态度”，告诉大家做事的原则。设好流程和文档，让每个人都知道该怎么发现、报告、处理风险。把技术和公司价值观绑在一起，确保技术团队和业务团队方向一致。</p>
                    <p><strong>2. 地图（MAP）：看全局、找风险</strong><br/>弄清楚AI系统在哪用、谁会用、可能影响谁。找出上下游环节的依赖，比如训练数据从哪来、部署环境限制是什么。想明白用错的后果，比如模型被拿去做诈骗的风险。</p>
                    <p><strong>3. 测评（MEASURE）：做检测、量指标</strong><br/>用各种方法（定量、定性或混合）去检测 AI 是否安全、好用、可靠。不只是在上线前测，还要上线后定期测，避免它“跑偏”。测试要有标准、有记录，确保别人能复现结果。</p>
                    <p><strong>4. 管理（MANAGE）：持续管、能修复</strong><br/>根据测量出来的风险，分配人力和资源去解决问题。制定应急方案，比如 AI 出了事故怎么沟通、怎么恢复服务。持续改进，保证它一直处在可控范围内。</p>
                  </div>
  
                  <!-- Link Button -->
                  <div class="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                    <a href="https://www.nist.gov/itl/ai-risk-management-framework"
                      target="_blank" rel="noopener noreferrer"
                      class="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#5830D6] dark:text-white hover:text-white bg-transparent border-2 border-[#5830D6] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#5830D6] hover:shadow-lg hover:shadow-[#5830D6]/50">
                      <span class="relative">查看框架原文</span>
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
