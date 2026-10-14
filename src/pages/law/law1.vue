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
            治理与</span>
          <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">安全法规</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          探索《生成式人工智能服务管理暂行办法》，了解我们如何构建一个负责任、可信赖的 AI 未来。
        </p>
        <div class="mt-8">
          <a href="https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm" target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#5830D6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cyan-400/50">
            <span
              class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative">阅读法案详情</span>
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
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">生成式人工智能服务管理暂行办法</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">自2023年8月15日起施行</p>
            </div>
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
                  <p><strong>第一条</strong>
                    为了促进生成式人工智能健康发展和规范应用，维护国家安全和社会公共利益，保护公民、法人和其他组织的合法权益，根据《中华人民共和国网络安全法》、《中华人民共和国数据安全法》、《中华人民共和国个人信息保护法》、《中华人民共和国科学技术进步法》等法律、行政法规，制定本办法。
                  </p>
                  <p><strong>第二条</strong>
                    利用生成式人工智能技术向中华人民共和国境内公众提供生成文本、图片、音频、视频等内容的服务（以下称生成式人工智能服务），适用本办法。国家对利用生成式人工智能服务从事新闻出版、影视制作、文艺创作等活动另有规定的，从其规定。行业组织、企业、教育和科研机构、公共文化机构、有关专业机构等研发、应用生成式人工智能技术，未向境内公众提供生成式人工智能服务的，不适用本办法的规定。
                  </p>
                  <p><strong>第三条</strong> 国家坚持发展和安全并重、促进创新和依法治理相结合的原则，采取有效措施鼓励生成式人工智能创新发展，对生成式人工智能服务实行包容审慎和分类分级监管。</p>
                  <p><strong>第四条</strong>
                    提供和使用生成式人工智能服务，应当遵守法律、行政法规，尊重社会公德和伦理道德，遵守以下规定：（一）坚持社会主义核心价值观...（二）在算法设计、训练数据选择、模型生成和优化、提供服务等过程中，采取有效措施防止产生民族、信仰、国别、地域、性别、年龄、职业、健康等歧视；（三）尊重知识产权、商业道德...（四）尊重他人合法权益...（五）基于服务类型特点，采取有效措施，提升生成式人工智能服务的透明度，提高生成内容的准确性和可靠性。
                  </p>
                </div>

                <!-- Chapter 2 -->
                <div class="chapter-card">
                  <h3>第二章 技术发展与治理</h3>
                  <p><strong>第五条</strong> 鼓励生成式人工智能技术在各行业、各领域的创新应用，生成积极健康、向上向善的优质内容，探索优化应用场景，构建应用生态体系。</p>
                  <p><strong>第六条</strong> 鼓励生成式人工智能算法、框架、芯片及配套软件平台等基础技术的自主创新，平等互利开展国际交流与合作，参与生成式人工智能相关国际规则制定。</p>
                  <p><strong>第七条</strong>
                    生成式人工智能服务提供者（以下称提供者）应当依法开展预训练、优化训练等训练数据处理活动，遵守以下规定：（一）使用具有合法来源的数据和基础模型；（二）涉及知识产权的，不得侵害他人依法享有的知识产权；（三）涉及个人信息的，应当取得个人同意或者符合法律、行政法规规定的其他情形；（四）采取有效措施提高训练数据质量...（五）《中华人民共和国网络安全法》...等法律、行政法规的其他有关规定和有关主管部门的相关监管要求。
                  </p>
                  <p><strong>第八条</strong>
                    在生成式人工智能技术研发过程中进行数据标注的，提供者应当制定符合本办法要求的清晰、具体、可操作的标注规则；开展数据标注质量评估，抽样核验标注内容的准确性；对标注人员进行必要培训...</p>
                </div>

                <!-- Chapter 3 -->
                <div class="chapter-card">
                  <h3>第三章 服务规范</h3>
                  <p><strong>第九条</strong> 提供者应当依法承担网络信息内容生产者责任，履行网络信息安全义务。涉及个人信息的，依法承担个人信息处理者责任，履行个人信息保护义务。</p>
                  <p><strong>第十条</strong>
                    提供者应当明确并公开其服务的适用人群、场合、用途，指导使用者科学理性认识和依法使用生成式人工智能技术，采取有效措施防范未成年人用户过度依赖或者沉迷生成式人工智能服务。</p>
                  <p><strong>第十一条</strong> 提供者对使用者的输入信息和使用记录应当依法履行保护义务，不得收集非必要个人信息...</p>
                  <p><strong>第十二条</strong> 提供者应当按照《互联网信息服务深度合成管理规定》对图片、视频等生成内容进行标识。</p>
                  <p><strong>第十三条</strong> 提供者应当在其服务过程中，提供安全、稳定、持续的服务，保障用户正常使用。</p>
                  <p><strong>第十四条</strong> 提供者发现违法内容的，应当及时采取停止生成、停止传输、消除等处置措施...并向有关主管部门报告。</p>
                  <p><strong>第十五条</strong> 提供者应当建立健全投诉、举报机制...</p>
                </div>

                <!-- Chapter 4 -->
                <div class="chapter-card">
                  <h3>第四章 监督检查和法律责任</h3>
                  <p><strong>第十六条</strong> 网信、发展改革、教育、科技、工业和信息化、公安、广播电视、新闻出版等部门，依据各自职责依法加强对生成式人工智能服务的管理。</p>
                  <p><strong>第十七条</strong> 提供具有舆论属性或者社会动员能力的生成式人工智能服务的，应当按照国家有关规定开展安全评估...</p>
                  <p><strong>第十八条</strong> 使用者发现生成式人工智能服务不符合法律、行政法规和本办法规定的，有权向有关主管部门投诉、举报。</p>
                  <p><strong>第十九条</strong> 有关主管部门依据职责对生成式人工智能服务开展监督检查，提供者应当依法予以配合...</p>
                  <p><strong>第二十条</strong> 对来源于中华人民共和国境外向境内提供生成式人工智能服务不符合法律、行政法规和本办法规定的，国家网信部门应当通知有关机构采取技术措施和其他必要措施予以处置。
                  </p>
                  <p><strong>第二十一条</strong> 提供者违反本办法规定的，由有关主管部门依照...法律、行政法规的规定予以处罚...</p>
                </div>

                <!-- Chapter 5 -->
                <div class="chapter-card">
                  <h3>第五章 附则</h3>
                  <p><strong>第二十二条</strong> 本办法下列用语的含义是：（一）生成式人工智能技术...（二）生成式人工智能服务提供者...（三）生成式人工智能服务使用者...</p>
                  <p><strong>第二十三条</strong> 法律、行政法规规定提供生成式人工智能服务应当取得相关行政许可的，提供者应当依法取得许可。</p>
                  <p><strong>第二十四条</strong> 本办法自2023年8月15日起施行。</p>
                </div>

                <!-- Link Button -->
                <div class="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                  <!-- Edit: Adjusted button text color for light/dark mode visibility -->
                  <a href="https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm" target="_blank"
                    rel="noopener noreferrer"
                    class="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#5830D6] dark:text-white hover:text-white bg-transparent border-2 border-[#5830D6] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#5830D6] hover:shadow-lg hover:shadow-[#5830D6]/50">
                    <span class="relative">查看政策原文</span>
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
