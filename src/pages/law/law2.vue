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
            class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">AI
            算法推荐</span>
          <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">与治理新规</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          深入了解《互联网信息服务算法推荐管理规定》，构建公平、透明、可信的算法推荐生态。
        </p>
        <div class="mt-8">
          <a href="https://www.lw.com/admin/upload/SiteAttachments/Chinas-New-AI-Regulations-Chinese-version.pdf"
            target="_blank" rel="noopener noreferrer"
            class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#5830D6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cyan-400/50">
            <span
              class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative">阅读规定详情</span>
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
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">互联网信息服务算法推荐管理规定</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">自2022年3月1日起施行</p>
            </div>
            <!-- Edit: Adjusted icon color for light/dark mode -->
            <Icon icon="octicon:law-16"
              class="text-purple-500 dark:text-cyan-400/80 w-20 h-20 mt-4 sm:mt-0 opacity-80" />
          </div>

          <!-- Scrollable Content Area -->
          <div class="p-6 sm:p-8">
            <div class="h-full overflow-y-auto custom-scrollbar pr-4">
              <!-- Edit: Added dark:prose-invert to automatically handle article text colors -->
              <article class="prose prose-lg dark:prose-invert max-w-none">
                <!-- Chapter 1 -->
                <div class="chapter-card">
                  <h3>第一章 总则</h3>
                  <p><strong>第一条</strong> 为了规范互联网信息服务算法推荐活动，弘扬社会主义核心价值观，维护国家安全和社会公共利益，保护公民、法人和其他组织的合法权益，促进互联网信息服务健康发展...
                  </p>
                  <p><strong>第二条</strong> 在中华人民共和国境内应用算法推荐技术提供互联网信息服务，适用本规定。</p>
                  <p><strong>第三条</strong> 国家网信部门负责统筹协调全国算法推荐服务治理和相关监督管理工作...</p>
                  <p><strong>第四条</strong> 提供算法推荐服务，应当遵守法律法规，尊重社会公德和伦理，遵守商业道德和职业道德，遵循公正公平、公开透明、科学合理和诚实信用的原则。</p>
                </div>

                <!-- Chapter 2 -->
                <div class="chapter-card">
                  <h3>第二章 信息服务规范</h3>
                  <p><strong>第六条</strong>
                    算法推荐服务提供者应当坚持主流价值导向，积极传播正能量，不得利用算法推荐服务从事危害国家安全、扰乱经济秩序和社会秩序、侵犯他人合法权益等法律、行政法规禁止的活动。</p>
                  <p><strong>第九条</strong> 算法推荐服务提供者应当加强信息内容管理，建立健全用于识别违法和不良信息的特征库，发现违法和不良信息的，应当采取停止传输、消除等处置措施，防止信息扩散。
                  </p>
                  <p><strong>第十四条</strong> 算法推荐服务提供者不得利用算法虚假注册账号、非法交易账号、纵用户账号或者虚假点赞、评论、转发...实施影响网络舆论或者规避监督管理行为。</p>
                  <p><strong>第十五条</strong> 算法推荐服务提供者不得利用算法对其他互联网信息服务提供者进行不合理限制...实施垄断和不正当竞争行为。</p>
                </div>

                <!-- Chapter 3 -->
                <div class="chapter-card">
                  <h3>第三章 用户权益保护</h3>
                  <p><strong>第十七条</strong> 算法推荐服务提供者应当向用户提供不针对其个人特征的选项，或者向用户提供便捷的关闭算法推荐服务的选项。</p>
                  <p><strong>第二十二条</strong>
                    算法推荐服务提供者应当建立健全用户注册、数据管理、应急响应、安全评估等管理制度，制定并公开算法推荐服务相关规则，配备与算法推荐服务规模相适应的专业人员和技术支撑。</p>
                </div>

                <!-- Chapter 4 -->
                <div class="chapter-card">
                  <h3>第四章 监督管理</h3>
                  <p><strong>第二十四条</strong>
                    具有舆论属性或者社会动员能力的算法推荐服务提供商，应当在提供服务之日起十个工作日内通过互联网信息服务算法备案系统填报服务提供者的名称、服务形式、应用领域、算法类型等信息。</p>
                  <p><strong>第二十五条</strong> 国家和省、自治区、直辖市网信部门收到备案人提交的备案材料后，材料齐全的，应当在三十个工作日内予以备案，发放备案编号并进行公示。</p>
                </div>

                <!-- Chapter 5 -->
                <div class="chapter-card">
                  <h3>第五章 法律责任与附则</h3>
                  <p><strong>第三十三条</strong> 违反本规定的，依照有关法律、行政法规的规定处罚;
                    法律、行政法规没有规定的，由国家和省、自治区、直辖市网信部门和电信、公安、市场监管等有关部门依据职责给予警告、通报批评，责令限期改正;
                    拒不改正或者情节严重的，责令暂停信息更新，并处一万元以上十万元以下罚款。</p>
                </div>

                <!-- Link Button -->
                <div class="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                  <!-- Edit: Adjusted button text color for light/dark mode visibility -->
                  <a href="https://www.lw.com/admin/upload/SiteAttachments/Chinas-New-AI-Regulations-Chinese-version.pdf"
                    target="_blank" rel="noopener noreferrer"
                    class="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#5830D6] dark:text-white hover:text-white bg-transparent border-2 border-[#5830D6] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#5830D6] hover:shadow-lg hover:shadow-[#5830D6]/50">
                    <span class="relative">查看规定原文</span>
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
  
