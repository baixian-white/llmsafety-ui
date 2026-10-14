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
              class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">《政务大模型应用安全规范》
              </span>
            <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">深度解读</span>
          </h1>
          <p class="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            深入分析国标委发布的21个安全要求，为政企场景落地大模型提供可操作的安全指引
          </p>
          <div class="mt-8">
            <a href="https://www.tc260.org.cn/upload/2025-07-28/1753699924605068212.pdf"
              target="_blank" rel="noopener noreferrer"
              class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#5830D6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cyan-400/50">
              <span
                class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative">阅读规范原文</span>
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
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">政务大模型应用的21个安全要求</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">发布日期：2025年7月28日 (征求意见稿)</p>
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
                    <h3>安全风险</h3>
                    <p><strong>内容安全风险:</strong> 选用不可靠甚至违规大模型，数据集未有效筛选过滤，缺乏有效的输入输出管控措施，模型幻觉，引发生成传播错误有害信息、误导用户，模型应用被恶意利用。</p>
                    <p><strong>数据安全风险:</strong> 涉及超范围使用政务数据、用户上传敏感信息、访问权限管控不严等问题。</p>
                    <p><strong>系统安全风险:</strong> 未落实网络安全防护要求，大模型应用成为网络攻击新入口。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>模型选用安全要求</h3>
                    <p><strong>模型备案:</strong> 采购商业大模型需核实备案情况，不得使用未经备案的服务。</p>
                    <p><strong>模型许可:</strong> 选用开源模型需核实许可证，从权威渠道获取并进行安全测试。</p>
                    <p><strong>外挂知识库:</strong> 宜采用RAG技术，保障内容准确、实时、可控。</p>
                    <p><strong>模型API安全审计:</strong> 调用API时需启用鉴别机制，核实证书有效性，防范虚假接口。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>模型部署安全要求</h3>
                    <p><strong>集约化部署:</strong> 应集约化部署，实施集中统一的安全管理。</p>
                    <p><strong>工具安全:</strong> 部署所需软硬件及工具需进行安全测试，及时修复漏洞。</p>
                    <p><strong>环境安全:</strong> 准确配置运行环境，禁用非必要端口和服务。</p>
                    <p><strong>API鉴权:</strong> 接口需进行用户身份识别与权限控制，限制高风险操作。</p>
                    <p><strong>知识库最小化接入:</strong> 接入数据遵循必要原则，经多部门评估，不接入敏感业务数据。</p>
                    <p><strong>知识库来源可靠:</strong> 确保数据来源可靠、内容准确，建立可追溯的台账。</p>
                    <p><strong>知识库数据清洗:</strong> 对接入数据进行清洗过滤，去除违法不良信息，对敏感内容进行脱敏。</p>
                    <p><strong>知识库内容边界:</strong> 对公众服务应用，知识库内容不应超出政务信息公开范围。</p>
                     <p><strong>大模型内容安全护栏技术措施:</strong> 应采用技术措施识别拦截违法不良信息和攻击，管控输出内容。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>模型运行安全要求</h3>
                    <p><strong>模型标识:</strong> 按要求做好生成内容的标识。</p>
                    <p><strong>发布审核:</strong> 权威信息发布需严格执行内部审核流程。</p>
                    <p><strong>风险提示:</strong> 在显著位置设置风险提示，告知用户服务局限性。</p>
                    <p><strong>推理隐藏:</strong> 对公众服务应用，不应提供推理过程显示功能。</p>
                    <p><strong>保留人工服务方式:</strong> 应保留人工服务，并提供便捷切换入口。</p>
                    <p><strong>日志记录:</strong> 记录运行日志不少于6个月，并定期审计。</p>
                    <p><strong>上线前评估:</strong> 上线前需开展安全测试验证，整改隐患。</p>
                    <p><strong>安全教育:</strong> 对单位人员开展应用安全教育。</p>
                  </div>
<!-- Chapter 0.2 -->
                     <!-- 一级标题 -->
                     <div class="chapter-card">
                    <h3> 大模型安全护栏功能</h3>
                   </div>
                  <div class="chapter-card">
                    <h3>对抗攻击指令识别功能</h3>
                    <p>支持识别提示词注入、越狱攻击、资源消耗攻击等对抗攻击指令并拦截，对抗性攻击指令样本库宜覆盖典型的攻击模式并可持续更新。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>多模态内容识别功能</h3>
                    <p>具备与大模型应用所支持模态相匹配的输入输出内容识别能力，具体包括：文本识别、图像识别、音频识别、视频识别、文件识别。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>输入风险管控功能</h3>
                    <p><strong>上下文关联分析:</strong> 可对超长会话历史进行连贯性分析，可基于用户角色识别拦截越权提问信息。</p>
                    <p><strong>语义级分析能力:</strong> 可自动识别分类违法不良信息，包括多模态隐晦违规内容识别拦截，并提供自定义关键词过滤规则等定制化安全功能。</p>
                    <p><strong>敏感内容识别:</strong> 支持自动识别拦截个人信息等敏感内容。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>输出风险管控功能</h3>
                    <p><strong>脱敏规则:</strong> 配置脱敏规则，对大模型生成的敏感内容进行脱敏后输出。</p>
                    <p><strong>过滤与干预:</strong> 对大模型生成的不当或超业务范围内容，采取限制输出或代答、拒答等方式进行输出。</p>
                    <p><strong>知识库支持:</strong> 支持建立代答知识库和拒答答案库，将识别的风险提问与标准回复进行映射，对可预判问题提供标准答案，并支持自定义扩展与及时更新。</p>
                  </div>

                   <div class="chapter-card">
                    <h3>日志审计功能</h3>
                    <p>具备日志留存和审计能力，支持记录行为主体、事件类型、事件时间以及系统行为、用户行为等；支持基于多维度查询和统计分析，定期对日志记录进行审计。</p>
                  </div>

                   <!-- 一级标题 -->
                   <div class="chapter-card">
                    <h3> 大模型安全测试指南</h3>
                   </div>

                  <div class="chapter-card">
                    <h3>模型选用测试指南</h3>
                    <p><strong>合规性验证:</strong> 核实模型是否已在中国网信网公布，确认软件来源渠道与官方版本一致。</p>
                    <p><strong>开源组件审查:</strong> 核实开源模型的许可证，进行软件成分分析和代码审计，识别安全风险。</p>
                    <p><strong>准确性评估:</strong> 评估生成内容的准确性、时效性、可控性。</p>
                    <p><strong>API验证:</strong> 调用互联网大模型服务时，核实服务商数字证书的有效性，防止虚假接口。</p>
                  </div>

                   <div class="chapter-card">
                    <h3>模型部署测试指南</h3>
                    <p><strong>安全管理:</strong> 采用集中统一的安全管理和体系化技术防护措施。</p>
                    <p><strong>漏洞扫描:</strong> 使用多种漏扫工具对部署环境进行安全测试，及时修复已知漏洞。</p>
                    <p><strong>权限管控:</strong> 对接口进行用户身份识别与权限管理，限制高风险操作。</p>
                    <p><strong>知识库安全:</strong> 接入数据遵循最小化原则，建立数据集台账，并对数据进行清洗与安全核验。</p>
                  </div>

                   <div class="chapter-card">
                    <h3>模型运行测试指南</h3>
                    <p><strong>内容标识:</strong> 按照要求对生成内容进行标识。</p>
                    <p><strong>发布审核:</strong> 对权威信息发布制定严格的内部审核制度。</p>
                    <p><strong>用户告知:</strong> 在显著位置设置风险提示，保留人工服务方式。</p>
                    <p><strong>日志记录:</strong> 记录运行日志不少于6个月，并定期审计。</p>
                    <p><strong>上线前评估:</strong> 上线前开展安全测试验证，对发现的问题进行整改加固。</p>
                  </div>

                   <div class="chapter-card">
                    <h3>安全护栏测试指南</h3>
                    <p><strong>对抗性测试:</strong> 构建多样化测试题集，覆盖提示注入、越狱攻击等，验证识别与分类能力。</p>
                    <p><strong>多模态识别测试:</strong> 核验文本、图像、音视频等多种模态内容的识别能力。</p>
                    <p><strong>输入输出管控测试:</strong> 通过交互问答测试输入内容的识别能力和输出内容的脱敏与干预效果。</p>
                    <p><strong>日志审计测试:</strong> 核查日志记录范围、留存时间和查询统计功能是否满足要求。</p>
                  </div>
  
                  <!-- Link Button -->
                  <div class="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                    <a href="https://www.tc260.org.cn/upload/2025-07-28/1753699924605068212.pdf"
                      target="_blank" rel="noopener noreferrer"
                      class="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#5830D6] dark:text-white hover:text-white bg-transparent border-2 border-[#5830D6] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#5830D6] hover:shadow-lg hover:shadow-[#5830D6]/50">
                      <span class="relative">查看规范原文</span>
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
    
  

