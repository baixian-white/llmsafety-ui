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
              class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">中美AI战略深度解析</span>
            <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">十大共识</span>
          </h1>
          <p class="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            梳理中美AI战略中的十大共识，揭示AI发展背后的全球性逻辑与未来趋势
          </p>
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
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">中美AI行动计划对比分析</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">发布时间：2025年7月</p>
              </div>
              <!-- Edit: Adjusted icon color for light/dark mode -->
              <Icon icon="ph:globe-hemisphere-west-bold"
                class="text-purple-500 dark:text-cyan-400/80 w-20 h-20 mt-4 sm:mt-0 opacity-80" />
            </div>
  
            <!-- Scrollable Content Area -->
            <div class="p-6 sm:p-8">
              <div class="max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
                <article class="prose prose-lg dark:prose-invert max-w-none">

                  <div class="chapter-card">
                    <h3>引言</h3>
                    <p>随着人工智能技术步入深水区，中美两国于2025年7月几乎同期发布了各自的AI行动计划。从战略目标到政策举措，从基础设施到治理原则，两份文件不仅体现了对AI技术重塑未来格局的高度重视，也映射出全球AI竞争的加速演化趋势。本文梳理了中美AI战略中的十大共识，既有相似的判断与目标，也有各自路径和立场的分歧。这些共识不仅揭示了AI发展背后的全球性逻辑，也为政策制定者、技术从业者提供了思考未来趋势与制定对策的重要参考。</p>
                  </div>
                  
                  <div class="chapter-card">
                    <h3>一、AI成为21世纪的决定性技术力量</h3>
                    <p>从中美最新发布的AI行动计划可以明显看出，<strong>AI已不仅仅是某一类新兴技术，而是正在成为21世纪的基础性力量，如同电力、互联网在过去几十年所起到的作用。</strong>中美都明确将AI纳入国家战略核心，不再局限于产业变革，而是全面嵌入工业体系、科研体系、国防体系、社会治理体系，甚至文化传播体系。美国强调AI技术对国家竞争力的决定性意义，认为掌握AI技术等同于掌握全球影响力的主导权，而中国则将AI上升为未来生产力新引擎，并强调其对推动“高质量发展”的不可替代作用。两国的战略共识在于，AI已经成为继工业革命、电气革命、信息革命之后的又一次“<strong>文明跃迁</strong>”，谁能掌握AI技术与产业主导权，谁将在全球新秩序中占据先机。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>二、AI发展已从商业创新转向国家级工程</h3>
                    <p>过去AI是科技公司内部的创新项目，如今却成为<strong>国家级“重大战略工程”</strong>。美国将AI纳入《国家安全战略》《关键与新兴技术战略》中，明确指出AI是维持全球竞争优势的关键工具；中国则从“科技强国”、“数字中国”等战略中，全面部署AI能力建设，强调全社会力量共同参与。<strong>这意味着，AI发展将不再依赖“市场自发调节”，而是更倚重国家资源统筹配置。</strong>政府成为“AI投资人”“用户”“监管者”“推动者”多重角色的承担者。从算力平台、示范应用到法规制定，再到技术标准输出，AI发展已然进入一个国家全面主导、跨部门协作的新阶段。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>三、“数据是新石油”，但共享和质量仍是瓶颈</h3>
                    <p>数据在AI中的地位毋庸置疑。中美都在行动计划中提出构建高质量、可监管的数据基础设施，强调开放数据平台、政府数据释放、行业数据共享的重要性。但在实际落地过程中，两国都面临类似挑战：数据质量参差-齐、行业壁垒难以打破、隐私保护机制不统一、跨境流通难以监管等。在中国，数据作为新型生产要素的制度化改革仍在进行，如何实现“数据确权、合规共享、价值变现”三者统一，是数据资源转化为AI能力的关键。而美国则更关注数据资产的商业化路径与隐私法的适配性，但也在面临诸如“数据孤岛”、“算法偏见”等问题的反噬。由此可见，数据虽是AI的燃料，但<strong>如何治理、如何评估其质量、如何安全共享</strong>，已成为全球AI发展的共同难题。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>四、算法创新决定AI发展上限，生态系统建设尤为关键</h3>
                    <p>算法的边界，决定了AI的天花板。虽然Transformer仍是当前主流架构，但无论是美国行动计划中强调“基础模型架构持续优化”，还是中国提出“构建开源开放算法生态”，都表明双方都将算法创新列为重中之重。更重要的是，<strong>算法创新不只是技术问题，而是生态系统问题</strong>。没有强大的开源社区和协作机制，算法就难以持续演化。OpenAI、Meta开源策略与Hugging Face生态的兴起证明了这一点；中国近年来鼓励“源头创新+产业开源”的双轨建设，也体现出同样逻辑。最终，谁掌握更强的算法创新能力和更繁荣的算法生态，谁就可能在下一代AI技术上取得决定性突破。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>五、人才体系重构成为AI竞争的基础工程</h3>
                    <p>人才是AI发展的核心驱动力。中美都明确表示将加大AI人才培养力度，并推动教育体系与技术演进深度融合。美国推行“全民AI基础教育”，鼓励跨学科交叉人才培养；中国则在“新工科”建设中强化数理基础与产业接轨，推动AI研究型、实用型、伦理型人才的协同培养。<strong>未来AI系统的构建不只依赖算法工程师，还需要懂治理的政策人才、懂伦理的哲学人才、懂安全的攻防人才</strong>。谁能率先构建起“全链条AI人才体系”，谁就拥有更强的可持续发展能力。</p>
                  </div>
                  
                  <div class="chapter-card">
                    <h3>六、电力系统正成为AI发展的新基础设施瓶颈</h3>
                    <p>大模型训练和推理对能源的消耗已达到惊人水平。据估算，GPT-4训练阶段的电力消耗相当于美国数千户家庭年均用电。中美在行动计划中都提到了对电网、绿色能源、数据中心节能技术的关注，意图缓解AI发展对传统能源系统的挤压。中国推动“东数西算”工程与绿色数据中心协同优化，美国则更倾向以私营企业主导部署节能芯片与模块化计算架构，同时鼓励创新型电力调度机制。背后共识是明确的：AI基础设施已经不限于“GPU”和“模型”，而是扩大到“电力—计算—传输”整个物理栈，<strong>未来甚至可能对国家能源战略造成反向牵引</strong>。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>七、AI普及将带来深刻的伦理和社会结构冲击</h3>
                    <p>AI的快速普及引发了前所未有的伦理挑战和社会结构再调整。尤其在就业领域，AI替代趋势正以前所未有的速度显现。文员、客服、翻译、初级编程等岗位正在被AI逐步替代，而与此对应的是技能错位、大规模转岗压力，以及新职业教育体系尚未成熟所带来的断层。美国提出通过政府主导的AI技能培训项目，帮助受影响人群重新就业，并构建“人+AI”的工作机制。中国则强调全面提高国民AI素养，并推动在中小学、职业教育、高等教育中全面普及AI基础课程。这一过程中，AI不再是技术选择题，而是伦理政治议题：<strong>如何在效率提升的同时保障公平，如何避免AI造成数字鸿沟加剧与“技术剥夺”</strong>，成为未来治理的重点课题。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>八、AI治理是一项系统性、长期性、跨国界的工程</h3>
                    <p>随着AI能力的飞跃，治理问题也日益凸显，成为中美在行动计划中都高度重视的议题。不同于传统技术治理，<strong>AI涉及模型可控性、内容安全性、使用伦理性、系统稳定性、跨境合法性</strong>等多个维度，治理难度远高于其他科技。中国提出建立多层次、系统化的AI治理体系，倡导全球共治，并在上海成立国家级AI治理组织以推动国际对话。美国则更多强调技术管控与战略遏制，推动制定“可信AI”与“责任AI”技术标准，并利用盟友机制输出治理框架。但无论路径如何分化，双方都承认：AI的治理必须前置，不能等到问题发生才“亡羊补牢”。并且，AI治理不仅是国内议题，更是全球协作问题，单一国家无法完成闭环，跨国协作势在必行。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>九、AI治理规则将成为新一代国际话语权竞争焦点</h3>
                    <p>AI治理并不只是“技术中立”的问题，而正在成为国际秩序博弈的新前沿。美国强调要通过输出AI治理规范，维持其在全球科技价值链上的话语权；而中国则主张将AI定位为全球公共产品，推动建设“人类命运共同体式”的治理框架。虽然在路径上有所分歧，但中美共识在于：未来的AI竞争不仅在于技术领先，更在于谁能主导制定全球规则。<strong>标准输出将成为软实力的延伸</strong>，类似于当年对互联网协议、芯片标准的掌控。AI时代的“国际语言”正在编写中，规则制定者将是未来的权力中心。</p>
                  </div>

                  <div class="chapter-card">
                    <h3>十、评估标准建设是AI治理的重要突破口</h3>
                    <p>当前AI发展正面临“<strong>缺乏统一评估标准</strong>”的困境。中美都意识到，评估体系的缺失正在成为AI发展的瓶颈之一。无论是模型性能（准确率、多模态能力）、安全性（是否存在幻觉、越狱）、伦理风险（歧视性偏见）还是数据质量，都亟需统一、透明、公正的评估体系。美国行动计划中提出要建设由国家标准与技术研究院主导的“可信AI评估机制”，中国则在推动“国家智能标准体系”，包括语言模型基准测试、安全红队测试等模块。评估标准不仅是“测量工具”，更是“市场准入门槛”和“治理手段”。谁掌握评估框架，谁就拥有认证权和议价权。中美在此问题上虽未形成协作机制，但共识已经建立，这或许正是未来多边合作的突破口之一。</p>
                  </div>

                  <div class="chapter-card overflow-x-auto">
                    <h3>附录：中美AI行动计划对比表</h3>
                    <table class="w-full text-sm text-left border-collapse">
                      <colgroup>
                        <col style="width: 15%;">
                        <col style="width: 28%;">
                        <col style="width: 28%;">
                        <col style="width: 29%;">
                      </colgroup>
                      <thead>
                        <tr class="text-left">
                          <th class="border-b-2 border-gray-300 dark:border-gray-600 p-3 font-semibold">维度</th>
                          <th class="border-b-2 border-gray-300 dark:border-gray-600 p-3 font-semibold">美国《AI行动计划》</th>
                          <th class="border-b-2 border-gray-300 dark:border-gray-600 p-3 font-semibold">中国《人工智能全球治理行动计划》</th>
                          <th class="border-b-2 border-gray-300 dark:border-gray-600 p-3 font-semibold">异同点分析</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">发布时间</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">2025年7月23日，白宫发布</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">2025年7月26日，世界人工智能大会发布</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">同时发布，时间点高度重合，释放战略对抗信号</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">战略定位</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">以赢得全球AI竞赛、保持美国主导地位为核心</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">强调合作共赢，推动AI成为全球公共产品</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">根本出发点不同，美国强调“领先”，中国强调“共享”</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">政策目标</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">巩固领先、遏制中国、主导全球标准</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">普惠发展、向善治理、构建人类命运共同体</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">都强调AI的重要性，但战略目标对立</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">对中国表述</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">明确提出反制中国，禁止使用中国产品</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">未点名国家，主张开放共治</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">美国针对性强，体现博弈姿态；中国更克制</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">主导理念</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">放松监管、市场主导、少政府干预</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">分类分级治理、政府引导、规范发展</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">治理路径明显不同：美强调自由，中国强调秩序</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">基础设施建设</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">建设数据中心、电力保障、重振本土芯片</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">推动全球算力互联、绿色算力布局、普惠建设</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">都强调算力与基础设施，但美国聚焦自身，中国倡导全球共享</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">技术研发方向</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">减少管制，加大资金支持，释放创新力</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">鼓励开源合作、建立共享平台、支持低门槛创新</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">都鼓励技术进步，但路径不同：美国靠资本，中国提倡合作生态</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">开源生态</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">鼓励开源模型和开放权重，担忧被滥用</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">构建可信开源平台、推动国际共享、建立开源社区</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">都重视开源，但美国更担忧安全，中国更倡导共建共享</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">人才与劳动力</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">技能再培训、吸引AI人才回流</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">提升全民AI素养、发展中国家能力建设</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">都关注人才，但美国更聚焦本国，中国强调全球公平</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">AI安全治理</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">偏重国家安全风险、反对自由派偏见、去监管</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">强调风险分级、算法可解释性、伦理规则</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">都提到“安全”，但美国更偏意识形态，中国更重系统治理</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">伦理价值观</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">输出美国价值观，反对“左派偏见”模型</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">强调AI向善、智能平权、消除算法歧视</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">意识形态导向完全不同，美国保守，中国包容普惠</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">国际合作策略</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">搭建盟友圈，排除中国，推广美式治理</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">倡导联合国主导，成立全球AI合作组织</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">美国走技术阵营路线，中国走多边共治路线</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">军事与国家安全</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">强调AI军事用途，设立国防数据中心</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">基本未涉及军用，聚焦民用场景</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">军事用途表述强烈对比，美国强调， 中国刻意回避</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">全球能力建设</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">以本国利益为主，未提发展中国家</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">倡议缩小“智能鸿沟”，培训发展中国家人才</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">在“AI公平”问题上，中国表态更积极</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">标准与规则制定</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">推广美式标准，争夺全球主导权</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">提倡联合国框架下共商规则</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">规则路径不同，一个单边，一个多边</td></tr>
                        <tr><td class="border-b border-gray-200 dark:border-gray-700 p-3">监管思路</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">降低监管门槛，主张自我审查和行业主导</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">政府主导监管，强调规范和透明</td><td class="border-b border-gray-200 dark:border-gray-700 p-3">管控理念背道而驰</td></tr>
                      </tbody>
                    </table>
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

  .prose table {
    width: 100%;
    /* table-layout: fixed; */ /* Removed for better auto-layout */
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
    
  

