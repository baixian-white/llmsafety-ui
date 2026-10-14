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
              class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">美国《人工智能行动计划》
              </span>
            <span class="bg-gradient-to-r from-[#5830D6] to-cyan-500 text-transparent bg-clip-text">与中美竞争及技术伦理分析</span>
          </h1>
          <p class="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            深入分析该行动有关中美竞争战略和技术伦理的核心内容，并与中国发布的相关政策进行对比评析
          </p>
          <div class="mt-8">
            <a href="https://whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf"
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
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">2025美国AI行动计划分析</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">自2025年7月23日起施行</p>
              </div>
              <!-- Edit: Adjusted icon color for light/dark mode -->
              <Icon icon="octicon:law-16"
                class="text-purple-500 dark:text-cyan-400/80 w-20 h-20 mt-4 sm:mt-0 opacity-80" />
            </div>
  
            <!-- Scrollable Content Area -->
            <div class="p-6 sm:p-8">
              <!-- MODIFIED: Added max-h-[70vh] to enable scrolling -->
              <div class="max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
                <!-- Edit: Added dark:prose-invert to automatically handle article text colors -->
                <article class="prose prose-lg dark:prose-invert max-w-none">
                    <!-- 内容 -->
                    <!-- Chapter 0 -->
                  <div class="chapter-card">
                    <h3> 引言 </h3>
                    <p>人工智能已成为大国战略博弈的关键领域。美国和中国作为全球AI技术与应用的两大引领者，
                        在研发投入、人才储备、产业规模等方面展开激烈竞争。美国白宫于2025年推出的《人工智能行动计划》（由时任总统批准发布）代表了美国最新的国家AI战略，
                        集中体现了美国政府在中美科技竞争和AI治理上的政策取向。与此同时，中国近年来也密集出台人工智能治理法规和伦理指引，
                        如《关于生成式人工智能服务管理暂行办法》的部门规章（2023年8月生效）以及《科技伦理审查办法（试行）》（2023年12月起施行）等，
                        规范AI技术研发应用并强调科技伦理审查机制。中国早在2017年即发布《新一代人工智能发展规划》，提出到2030年成为世界主要人工智能创新中心和全球AI领导者的宏伟目标。
                        在此背景下，比较分析2025年美国AI行动计划与中国相关政策，有助于理解中美在抢占AI主导权和规范AI伦理方面的思路差异，对研判未来政策走向具有重要意义。
                    </p>
                    </div>

                    <!-- Chapter 0.1 -->
                  <div class="chapter-card">
                   
                    <p><strong>接下来，本文将首先解析美国《人工智能行动计划》中有关中美科技竞争的战略举措，
                        涵盖出口管制、技术主导权、人才与供应链安全等方面。
                        随后，分析该计划涉及的AI技术伦理内容，包括透明度、公平性、能耗与道德使用边界等议题，并对比中国在相应领域的政策规范。
                        最后，本文总结中美两国AI政策的异同，并提出若干政策建议。
                    </strong>
                    </p>
                    </div>

                    
                    <!-- Chapter 0.2 -->
                     <!-- 一级标题 -->
                  <div class="chapter-card">
                    <h3> 1.中美科技竞争战略：美国行动计划解析与中国应对 </h3>
                   </div>

                   <!-- Chapter 0.3 -->
                    <!-- 二级标题 -->
                  <div class="chapter-card">
                    <h2> <strong>A.美国行动计划中的竞争战略</strong> </h2>
                   </div>




                  <!-- Chapter 1 -->
                  <div class="chapter-card">
                    
                    <p> <strong>明确中国为竞争对手，巩固AI主导权：</strong> 
                        《人工智能行动计划》开宗明义强调美国“必须赢得AI竞赛”，确保继续作为全球经济和军事领先强国。
                        美方认为人工智能将“改变全球力量平衡”，因而将其提升为国家竞争的核心领域。行动计划将中国等“战略对手”作为假想竞争方，要求防止对手利用美国创新成果反超美国
                        。国务卿兼国家安全顾问在计划发布时表态称，“赢得AI竞赛不容谈判，美国必须继续主导人工智能，以维护繁荣和安全”。可见，美国官方已将中美AI竞赛定位为零和赛跑，强调通过政府干预确保美国优势地位。</p></div>
                 <div class="chapter-card">   
                    <p> <strong> 强化出口管制与技术封锁：</strong>
                        行动计划针对关键AI相关技术，提出更严格的出口管制和更广泛的“护栏”措施，以阻止中国获取先进AI能力。一方面，要求加强对高性能AI芯片的出口管制执法，利用新技术手段确保受控芯片不经第三国转手流入“中国等关注国家”。
                        例如，计划建议利用芯片定位验证功能，跟踪高端AI芯片最终去向，防止通过灰色渠道转卖给中国。另一方面，补上半导体制造设备管制漏洞，扩大管制范围至关键子系统和部件。目前美日荷已对光刻机等整机出口实施限制，
                        行动计划提出美国应开发针对次级部件的新管制措施，防止中国通过自研或第三方获得这些关键环节技术。此外，计划强调与盟友“趋同管制”，防止他国“补漏”和“代购”，并称若盟友不配合，美国将动用“外国直接产品规则”和次级制裁关税等工具予以惩戒
                        。这体现出美国意在构筑多边技术壁垒，全面遏制中国获取先进半导体与AI技术。
                    </p></div>
                    <div class="chapter-card">   <p> <strong> 建立“AI联盟”以技术结盟抗衡中国：</strong>
                        行动计划的另一大着力点是在国际上组建“人工智能联盟”，向盟友和友好国家输出美国的全套AI技术解决方案，确保其采用美国技术而非中国方案。计划指出,
                        美国应满足全球AI需求，将硬件、模型、软件、应用、标准等全栈技术出口给任何愿加入“美国AI联盟”的国家。如果美国不及时提供，这些国家可能转向美国的对手（暗指中国），
                        形成战略漏洞。为此，商务部将召集产业联盟提出成套出口方案，国家开发机构、进出口银行、国际开发金融公司和国务院将协同推动交易，在保证安全的前提下让盟友用上美国AI。
                        通过这种技术外交，美国试图巩固盟国对自身技术体系的依赖，防止“中国制造”的AI技术在第三国扩散。同时，在国际标准与治理机构上，美国将“积极利用话语权，抵制威权势力影响”，
                        点名批评一些AI治理倡议被“中国企业影响、倡导监控和人脸识别标准”。行动计划要求美国利用在联合国、经合组织、G7/G20、国际电信联盟等机构中的地位，大力倡导符合美国价值观的AI治理方案，
                        反制中国等推动的偏重管制、模糊价值观或有利于监控技术的倡议。这表明美国希望主导国际规则制定，使之有利于自身技术和价值观输出，同时遏制中国在国际标准中的话语权。

                    </p></div>
                    <div class="chapter-card"> <p> <strong> 确保供应链和基础设施自主可控:</strong>
                        在国内措施上，行动计划强调打造牢固的AI产业链和基础设施。鉴于AI竞争很大程度上取决于算力和能源供给，美方计划加速国内数据中心、芯片工厂和电力设施建设。
                        文件指出美国电力产能自上世纪70年代以来停滞不前，而中国电网却快速扩张，美国若不解决能源瓶颈将难以实现AI主导。因此特朗普政府已通过行政手段放松环境监管，加快审批，
                        以“前所未有的进展”推动数据中心、半导体厂和相关能源项目落地。计划建议进一步豁免数据中心建设的环评要求，简化清洁水和空气法规审批，为AI基础设施大提速扫清障碍。
                        与此同时，供应链安全被提升到战略高度。行动计划明确提出“不得使用对手国家的技术建设美国AI基础设施”，确保国内AI计算栈建立在美国产品之上，能源、通信等支撑AI发展的关键领域杜绝外国对手的信息通信技术介入。
                        这显然是针对中国的供应链安全措施，防止在数据中心设备、5G网络、电网控制等方面使用中国产品，从而杜绝潜在的安全后门或受制于人的风险。计划还要求设立安全防火墙，禁止“对手将敏感部件植入美国基础设施”，
                        并确保盟国防务供应链不依赖中国技术。概言之，美国正试图构筑一条“技术铁幕”：在高端芯片、关键设备、供应链节点等方面与中国尽可能隔绝，以保证AI时代美方的战略自主.
                    </p></div>
                    <div class="chapter-card"><p> <strong> 保护人才和科研优势：</strong>
                        虽然行动计划主要未直接提及中国人才，但从其部署可以看出对人才和知识产权流失的警惕。一方面，计划在科研和教育领域提出“技术保护措施”，要求制定对策防范战略对手（显指中国）通过基础研究合作或高等教育获取敏感技术。
                        这包括信息共享，加强高校及科研机构的审查，降低知识产权和人才外流风险。另一方面，计划也关注国内AI人才培养，提出跨机构的人才流动计划，让联邦员工中的AI专才在不同部门交流，以填补技术缺口；
                        在国防领域识别AI技术技能缺口并实施培训；扩充AI教育项目等。此外，文件提及要评估对手AI系统对美国关键基础设施和安全的影响，包括考虑“对手AI有可能具备的能力、存在后门或其他恶意行为的可能”，
                        以及外国AI在美国经济和安全领域的渗透风险。这些都反映出美国意识到AI竞赛不仅是技术和硬件，比拼的也是人才智力和制度优势，需要既加强自身人才储备又防范对手的人才渗透。
                    </p>
                    
                  </div>

                  <!-- Chapter 1.1 -->
                    <!-- 二级标题 -->
                    <div class="chapter-card">
                    <h2><strong>B.中国的应对与比较</strong>  </h2>
                   </div>
  
                  <!-- Chapter 2 -->
                  <div class="chapter-card">
                    
                    <p>
                        <strong>面对美国的全面战略施压:</strong>中国一方面坚守自身长期AI发展规划目标，另一方面采取措施缓解美国技术封锁带来的压力。2017年中国《新一代人工智能发展规划》就已把AI提升到国家战略层面，
                        强调主动谋划、系统布局，在新阶段国际竞争中“牢牢把握战略主动”，争取AI发展主导权。该规划提出分“三步走”实现AI赶超：2020年与世界先进水平并跑，2025年取得重大突破，
                        2030年成为全球AI创新高地和主要领军者。目前中国已在语音识别、计算机视觉等领域达到世界领先，并在专利、论文数量上占据优势。然而也清醒认识到在基础理论、核心算法、高端芯片等方面与美国等仍有差距，
                        顶尖AI人才储备不足、产业生态和供应链影响力不够等。因此，中国持续加大科研投入和人才培养力度，力图在美国封锁下实现关键技术自主可控。</p></div>
                        <div class="chapter-card">
                        <p><strong>在出口管制方面:</strong>美国的芯片禁令对中国AI产业带来巨大挑战。为此，中国政府一方面通过外交途径谴责美国滥用出口管制、扰乱全球产业链，呼吁建立公平开放的国际科技合作环境；
                        另一方面加大对本土半导体产业的扶持力度，加快推进“卡脖子”技术攻关。近年来中国设立了大基金等多期国家集成电路产业投资基金，投入上千亿元推动芯片自主研发和制造能力提升。
                        同时，2023年中国也开始对部分战略资源和技术实施反制措施，例如对镓、锗等芯片关键原材料出口实施许可管理，以反击美方限制。此外，中国强化了对自身技术外流的管制，
                        早在2020年就将包括AI算法在内的部分技术列入《中国出口管制清单》，要求对外转让需政府审批，防止核心AI技术外泄。总体而言，中国在科技脱钩压力下正加速提升国内供给能力，
                        试图减少对美国的依赖，推动国产替代。例如，鼓励采用“安全可控的芯片、软件、工具、算力和数据资源”；建设AI算力基础设施和公共训练数据平台，提升算力资源协同利用效率。
                        这些举措旨在培育自有的AI生态体系，降低被“卡脖子”的风险。</p></div>
                        <div class="chapter-card">
                        <p><strong>在联盟与国际标准方面:</strong>中国采取不同于美国的思路，更加强调开放合作与多边主义。中国官方多次表态愿意“平等互利开展国际交流合作，参与AI国际规则制定”。
                        例如，2022年中国外交部发布《关于加强人工智能伦理治理的中国立场文件》，倡导各国“广泛协商、共同受益”推进AI国际治理。中国积极参与联合国、联合国教科文组织等框架下的AI伦理和治理讨论，
                        并于2021年支持通过《人工智能伦理建议书》。在国际标准组织中，中国企业和专家也日益活跃，希望在技术标准上取得发言权。然而，美方视此为中国输出影响力、塑造有利自身的标准。
                        美国行动计划指责有“中国公司试图影响人脸识别和监控标准”，实际上中国的主张是希望将其在安全监控等领域的实践上升为国际标准，以获得认可和市场优势。这体现出中美在国际治理舞台上的话语博弈：
                        美国强调“基于自由民主价值”的技术规范，而中国主张“尊重主权、促进发展、安全可控”的框架。双方在AI全球治理理念上的分歧，折射出各自政治价值观和战略利益的差异，也意味着未来围绕AI标准和规则的国际竞争将持续。
                    </p></div>
                    <div class="chapter-card">
                    <p><strong>在供应链与基础设施方面:</strong>中国高度重视供应链自主和韧性建设。美国行动计划要求彻底排除中国技术，中国则致力于摆脱对美技术依赖。例如，在5G通信、新能源等领域，中国推进国产设备替代，避免关键基础设施受制于人。
                        针对美国可能的技术禁运和网络安全威胁，中国也加强了关键信息基础设施安全保护，发布《关键信息基础设施安全保护条例》等法规，提高本土供应比重。美国试图联合盟友排挤中国高科技企业（如对华为5G的禁令），
                        中国则通过“一带一路”数字丝绸之路等倡议，拓展与发展中国家在数字基础设施和AI应用上的合作，开拓替代市场和供应来源。同时，中国出台政策吸引海外高层次人才回流，加强本土人才培养，以缓解美国收紧签证、限制学术交流带来的影响。
                        在人才竞争上，中美都在争夺全球AI顶尖人才资源：美国有开放的科研环境和高薪优势，中国则提供更大的成长空间和政策激励。近年来部分留美中国AI人才回国创业或加入国内科研项目，体现出中国在人才上的一定回流趋势。
                        但整体而言，美国在高端人才吸引力上仍占优，中国则通过专项人才引进计划等不断发力，争取缩小人才差距。
                    </p></div>
                    <div class="chapter-card">
                    <p><strong>综上:</strong>美国《人工智能行动计划》旨在通过技术封锁、联盟对冲、内建强基等手段巩固对华优势，而中国则以自主创新、国际合作、供应链多元来化解外部压力，持续推进其既定AI发展路径。
                        中美在AI竞争中进入全面战略竞逐阶段，美国试图以制度和协调手段维系领先，中国则希望凭借规模市场和国家意志实现赶超。这种竞合态势将在相当长时期内存在，并将在很大程度上形塑全球AI产业格局。</p>
                    
                  </div>

                  <!-- 一级标题 -->
                  <div class="chapter-card">
                    <h3> 2.技术伦理与AI治理：美国行动计划与中国政策之比较 </h3>
                   </div>

                   <!-- 二级标题 -->
                   <div class="chapter-card">
                    <h2><strong>A.美国行动计划的技术伦理取向</strong>  </h2>
                   </div>
  
                  <!-- Chapter 3 -->
                  <div class="chapter-card">
                    
                    <p>
                        <strong>去意识形态偏见与保障言论自由：</strong>美国《人工智能行动计划》提出的伦理要求集中体现了美式价值观，尤其是强调反对AI系统带有“上层意识形态偏见”。
                        计划要求修改国家标准与技术研究院（NIST）的AI风险管理框架，删除其中关于误信息、多元平等（DEI）和气候变化等内容的提法。美方认为这些议题容易被用于“社会工程议程”，
                        担心政府以打击虚假信息或促进多元为由干预AI，从而损害言论自由。因此，行动计划明确要求联邦政府采购时只选用“客观中立、无上而偏见”的前沿大模型。
                        换言之，政府将拒绝采用被认为存在政治倾向过滤的AI系统，防止政府购买的AI工具“迎合某种社会议程”。这一导向与前一届政府（拜登政府）倡导的AI公平性、消除算法偏见等有所区别，
                        而更侧重防范AI内容审查或“偏向保守派不认同的价值观”。特朗普政府将AI言论自由置于突出位置，号称要让AI“从根本上体现言论自由”，并确保政府政策不妨碍这一目标。例如，要求大型语言模型不得内置“上层偏见”
                        ，并设想由NIST旗下的AI标准与创新中心对来自中国的前沿模型进行审查，评估其是否迎合中国观点或审查标准。这项举措带有明显的意识形态色彩，即通过技术检测揭示中国AI模型可能存在的政治审查痕迹，
                        以提醒各界警惕“中国式AI”的价值观渗透。</p></div>
                        <div class="chapter-card">
                        <p><strong>防范“奥威尔式”滥用与隐私保护：</strong>行动计划强调避免人工智能被用于侵犯公民自由的用途。
                            特朗普政府官员表示，必须杜绝AI的“奥威尔式用途”，暗指如极权主义国家利用AI进行大规模监控、社会评级等行为。
                            这种表态实际上剑指中国的某些做法（如摄像头监控和社会信用体系），传达出美国政府在伦理上拒绝AI用于大众监控、言论审查等侵害人权的领域
                            。行动计划在国家安全部分也提到，要确保AI使用“安全可靠”，特别是在国防和执法中防止滥用。此外，计划要求政府部门在采用AI时遵守隐私、数据治理和透明度等相关法律。
                            这意味着即便特朗普政府对AI监管持宽松态度，但在政府自身应用AI上仍需符合现行隐私和透明度规范，保障公众知情权和数据安全。比如，要求建立AI采购工具箱，让各机构可选择符合隐私和透明要求的模型，
                            并能查看其他部门AI用例。可见，在避免政府滥用AI侵犯公民隐私方面，美国仍保持基本的制度约束。不过，总体而言，特朗普版AI伦理观更强调限制政府权力、防止社会控制，而不像欧洲那样专注于约束企业算法歧视。
                            这与美国保护公民自由传统和对政府不信任的文化相符。</p></div>
                        <div class="chapter-card">
                        <p><strong>强调模型透明度与可靠性：</strong>虽然特朗普政府删除了NIST框架中关于“偏见和气候”等的要求，但并非完全忽视AI模型的透明与可信问题。在行动计划中，要求美国建立AI评估生态
                            ，汇聚顶尖学术人才测试AI系统的透明度、有效性、控制性和安全漏洞等。这表明美方关注AI模型的可解释性和稳健性，希望通过学界和产业的合作提升对AI系统的理解和信任。此外，
                            针对生成式AI带来的信息真实性挑战，计划专门讨论了合成媒体（deepfake）问题。例如提及特朗普政府支持的《TAKE IT DOWN法案》，旨在打击AI生成的非合意色情深伪内容，并认识到虚假音视频证据可能干扰司法公正。
                            行动计划认为有必要进一步采取措施，帮助法律体系应对AI生成内容带来的新挑战。可以预见，美国将探索建立深伪内容的鉴别和法律责任框架，以维护社会对图像、影音证据的信任。这体现出美方在AI伦理上的另一侧面：
                            维护真实性和法治，防范AI被用于欺诈、诬陷等。有鉴于此，美国政府在促进AI发展的同时，也开始部署技术手段和法规来控制AI风险，只是在总体基调上避免出台过多事前约束，而倾向于事后治理和市场自律。
                    </p></div>
                    <div class="chapter-card">
                    <p><strong>能源与环境考量的弱化：</strong>值得注意的是，与欧盟等强调AI碳足迹和可持续发展的论调不同，美国行动计划几乎未对AI巨大的能耗和环境影响提出限制措施。相反，
                        它将扩大能源供给视为保障AI发展的前提。计划强调美国必须“大幅扩建电力基础设施”，以满足算力时代的需求，并批评过去电力建设停滞让美国陷于劣势。由此，
                        美国不仅没有因AI高耗能而收紧监管，反而通过宣布能源紧急状态、成立国家能源主导委员会等举措来加速电力项目审批。同时，放松环境法规，以确保数据中心、半导体厂等项目快速上马。
                        这种做法隐含着对AI产业优先发展的价值选择，即短期内经济和战略利益优先于长期的环境约束。这与中国“统筹发展和安全”的提法有所不同：中国政策文件通常强调发展不能牺牲安全和公共利益，包括生态环境安全
                        。美国在AI时代的能源观，基本延续了特朗普政府对环境规制的不积极态度。这可能带来潜在问题：AI数据中心的大规模扩张将显著增加碳排放和用水压力，美国此举可能在国际气候合作中受到批评。然而，从政策分析角度，
                        美国此举反映出国家战略竞争压力下，对环境伦理的让步。未来美国或许寄希望于技术进步（如绿色AI芯片、可再生能源供电）来缓解AI能耗问题，但在当前行动计划中，能耗监管并非关注重点。
                    </p></div>


                    <!-- 二级标题 -->
                   <div class="chapter-card">
                    <h2><strong>B.中国AI政策的伦理规范</strong>  </h2>
                   </div>



  
                  <!-- Chapter 4 -->
                
                  <div class="chapter-card">
                    
                    <p>
                        <strong>核心价值导向与内容安全：</strong>中国在AI伦理上采取了鲜明的价值观引导和内容红线。以2023年《生成式人工智能服务管理暂行办法》为例，
                        第四条明确规定生成式AI服务“应当坚持社会主义核心价值观”，不得生成违背法律和公序良俗的内容，包括煽动颠覆政权、分裂国家、宣扬恐怖极端、暴力色情、虚假有害信息等。
                        这体现了中国政府将政治安全和意识形态安全置于AI伦理的首位，要求AI不得成为传播不良信息或影响社会稳定的工具。相较美国强调AI不得有“自由派偏见”，中国更关注AI不得偏离党和国家确定的主流价值。
                        同样的，办法要求AI开发者在算法设计、训练数据选择等环节采取措施防止产生民族、信仰、性别、地域等方面的歧视。这与美国强调“无偏见”有表面相似之处，但中国涵盖了更广泛的歧视维度（种族、宗教等），
                        本质上属于内容审核的一部分，确保AI输出不损害社会团结与公平。另外，中国明令禁止AI产品侵犯他人肖像权、名誉权、隐私权等个人合法权益。这些规定确立了AI生成内容的道德和法律边界，
                        勾勒出一条政府认可的AI应用“红线”。也就是说，中国AI服务提供者必须内置强大的内容过滤和审核机制，以屏蔽违法或不良信息。这与美国行动计划要求的“大模型无意识形态偏见”形成对照：美国担心AI过度过滤言论，
                        而中国要求AI必须过滤不良内容。从伦理视角看，美国更注重维护个人自由表达，中国更强调集体秩序。</p></div>
                        <div class="chapter-card">
                        <p><strong>提升透明度与防范欺骗：</strong>中国政策高度重视AI输出的可识别性和可信度。《生成式AI办法》第十二条规定，提供者应按照《互联网信息服务深度合成管理规定》对AI生成的图片、视频内容进行标识。
                            这意味着AI生成内容必须有显著标记，以便用户区分真伪，从而防止深度伪造造成公众误导。中国也是全球较早实施深度合成内容标识要求的国家之一，体现了在AI透明度上的监管。
                            该办法还要求提供者根据服务类型采取措施提升生成内容的准确性和可靠性。这类似于对AI输出质量的伦理要求，避免AI散布虚假信息或造成严重错误。
                            中国官方还出台了针对新闻、教育等特定领域使用AI生成内容的规定，要求严格遵守真实性与先审后播原则。此外，在数据来源透明方面，办法第七条要求提供者使用合法来源的数据和基础模型，
                            不得侵犯知识产权，涉及个人信息须经同意或符合法定情形。这反映了对训练数据合法合规的重视，也是一种源头透明度（确保AI不是建立在非法数据基础上）。从更宏观的角度，
                            2022年中国提出“ AI可控可视可信”的目标，即算法要透明可解释、结果可追溯。外交部2022年的立场文件也要求AI研发方提高算法透明度、可解释性和可靠性，逐步使AI“可验证、可监管、可追溯、可预测、可信赖”。
                            由此可见，中国在AI透明度议题上持较积极态度，通过立法和倡议敦促提高AI系统的可解释和可监管水平。这与美国某些科技公司偏好“黑箱算法”的做法形成对比，但美国学界和政府也认识到透明度的重要，只是具体执行层面两国策略不同：
                            中国倾向于强制标识与官方审核，美国更多依赖行业自律与技术解决方案。</p></div>
                        <div class="chapter-card">
                        <p><strong>公平与非歧视：</strong>避免算法歧视和保障公平也是中国AI伦理的重要内容。除了前述禁止生成歧视性内容外，
                            中国在更广泛的AI治理原则中多次强调公平公正。例如，《科技伦理审查办法（试行）》第三条明确将“坚持公平公正”作为科技活动伦理原则之一。
                            中国发布的《新一代人工智能伦理规范（2021）》也提出“促进公平正义”为基本要求之一，强调AI不得有算法偏见、应防止对特定群体的不利影响
                            。外交部立场文件要求研发机构避免数据和算法偏见，实现AI系统的普惠、公平和非歧视。这些原则与西方伦理讨论如出一辙，展现出中国愿与国际接轨的一面
                            。然而，中国在实践中落实公平原则往往与其监管需求相结合。例如，在内容平台领域，中国要求算法不得因用户偏好而形成“信息茧房”或引发不良导向，同时强调服务未成年人等方面的公平
                            。可以说，中国将社会公平和伦理公平融入AI治理，但其动因既包括伦理关切也包括政治考量（防止算法影响社会稳定、缩小数字鸿沟等）。相较之下，
                            美国行动计划刻意淡化了算法公平（删除DEI内容就是明证），这也许是特朗普政府对公平议题的不同价值取向所致。在这一点上，中美出现一定反差：
                            中国官方高调倡导AI公平，而特朗普政府认为某些“公平”要求本身带有政治偏见。不过，需要指出的是，美国产业界和地方政府仍有许多关于算法公平、审查偏见的努力
                            （例如一些州立法要求高风险算法的影响评估）。只不过联邦层面政策随政府更迭而摇摆。未来若美国行政当局调整，可能重新强调AI公平原则。
                    </p></div>
                    <div class="chapter-card">
                    <p><strong>隐私和数据保护：</strong>中国近年通过《个人信息保护法》《数据安全法》等为AI数据利用划定红线。
                        《生成式AI办法》第十一条要求提供者对用户输入和使用记录依法履行保护义务，不得收集非必要个人信息，不得非法留存可识别用户身份的信息或泄露给他人。
                        这与欧美强调保护用户隐私的方向一致。中国还在2023年发布了针对面向公众的AI服务必须进行安全评估的要求，确保算法使用符合法律和伦理。此外，《科技伦理审查办法》
                        提出对涉及个人信息的数据采集和算法开发要加强伦理审查，注重对个人隐私和数据安全的遵循。相比而言，美国虽然有零散的隐私法律，但缺乏联邦层面的统一个人数据保护法
                        。拜登政府时期曾倡议AI开发遵守“用户数据隐私”原则，但特朗普政府对此着墨不多，更多依赖现有部门法。两国在隐私保护的执行上各有短板：中国执行力度强但也存在过度收集争议，
                        美国法律体系不健全导致AI数据利用标准不一。在AI伦理话语上，中美都承认隐私重要，但实现路径不同：中国通过行政监管和企业责任确保合规，美国倾向司法救济和市场声誉机制调节。
                    </p></div>
                    <div class="chapter-card">
                    <p><strong>科技伦理审查与治理机制：</strong>中国的一大特色做法是建立系统的伦理审查制度。《科技伦理审查办法（试行）》要求在高校、科研机构、企业中从事生命科学、医学、
                        人工智能等敏感领域研究的单位必须设立科技伦理（审查）委员会，对研究项目进行事前伦理审查和全程监督。委员会需具备多学科专家组成，遵循独立、公正、透明原则开展工作
                        。审查范围不仅包括涉及人的研究和动物试验，还涵盖可能影响生命健康、生态环境、公共秩序、可持续发展的科研活动。显然，高等级人工智能研发若被认定可能带来社会伦理风险
                        ，也在审查之列。这相当于对AI前沿研究设置一道伦理把关，防止潜在高风险技术在无监督情况下发展。美国目前尚无类似全国性强制伦理审查制度，科研伦理主要通过机构审查板（IRB）针对生物医学研究存在
                        ，而对AI研究仅有少数机构尝试伦理审查。特朗普的行动计划强调“移除妨碍AI创新的繁琐联邦法规”，并未要求广泛的伦理审查，反而更倾向于让市场自行试错。这反映了两国科研治理理念的差异：
                        中国倾向政府主导预防风险，美国倾向宽松鼓励创新、风险事后治理。但值得注意的是，中国强化伦理审查也有助于向国际社会表明其开发AI的负责任态度，缓解外界对“中国AI失控”的疑虑。同样，美国如果忽视AI伦理，
                        可能在国际道义和公众信任上处于不利。因此，两国都在一定程度上意识到AI伦理的重要，只是平衡创新与监管的侧重点不同。
                    </p>
                    </div>
                    <div class="chapter-card">
                    <p><strong>总的来看:</strong>美国2025年《人工智能行动计划》和中国同期政策在AI伦理治理上的趋同与差异并存。一方面，双方都关注AI可能带来的风险，如偏见歧视、虚假信息、隐私侵害等，也都有提升AI透明度、
                        确保安全可控的意愿。这为未来国际合作提供了共同语言基础。另一方面，受制于政治文化和制度环境，中美在具体伦理要求上分化明显：美国突出自由与防止过度监管，中国强调秩序与国家安全；
                        美国主要约束政府不滥用，鼓励企业自律创新，中国则对企业和研究活动实施更多事前约束和价值引导。这种差异意味着两国在全球AI伦理规范谈判中立场不同。例如，美国可能反对过严的AI使用限制，
                        而中国会倡导主权和政府在伦理治理中的作用。但随着AI技术不断发展并广泛影响社会，中美在一些伦理议题上也有契合点，如都希望防止AI军事失控或严重安全事故。因此，虽然竞争态势紧张，
                        双方在多边场合寻求最低限度的伦理共识仍有可能，这对管控AI全球风险至关重要。</p>
                    </div>


                    <!-- 一级标题 -->
                  <div class="chapter-card">
                    <h3> 3.结论与政策建议 </h3>
                   </div>
                   <div class="chapter-card">
                    
                    <p>
                        <strong>美国《人工智能行动计划》（2025）展现出强烈的战略竞争意识和价值观取向：</strong>通过巩固自身科技优势和联盟体系，全方位遏制中国在AI领域的追赶，
                        同时在伦理上强调自由主义价值，避免AI成为意识形态工具或监控手段。中国则在国家战略层面坚定推进AI创新，自主应对外部打压，并以严格的治理措施确保AI发展服从法律和伦理规范。
                        在这场AI竞赛中，美国侧重“赢得竞赛”和塑造国际规则，中国强调“安全可控”和遵循自身发展路线。两国政策的差异反映了各自制度与文化背景：美国信奉市场驱动与个人自由，即使政府出手干预也是为维护技术霸主地位；
                        中国则倾向政府规划和监管，宁可放慢也要守牢安全与价值底线。</p></div>
                        <div class="chapter-card">
                        <p><strong>展望未来，中美在人工智能领域的博弈将持续并深入，但竞争并不排斥合作。鉴于AI具有全球影响和潜在风险，双方应在竞争中寻找管控风险的合作机会。为此提出以下政策建议：</strong></p></div>
                        <div class="chapter-card">
                        <p><strong>建立沟通机制，防范军备竞赛失控：</strong>建议中美重启或建立人工智能安全对话，就AI在军事、安全领域的应用加强沟通。
                            双方可探讨限制自主武器、避免AI误判等问题，制定基本准则，防止陷入危险的军备竞赛。即使政治关系紧张，也应保持专家层面的交流，
                            分享对AI安全风险的评估，共同避免“AI冷战”滑向冲突。
                    </p></div>
                    <div class="chapter-card">
                    <p><strong>推动国际伦理标准对话：</strong>中美应积极参与联合国教科文组织、G20人工智能工作组等多边平台，在算法透明度、数据治理、隐私保护等方面寻求共识。
                        中国可倡议将其实践经验（如深度伪造标识制度）贡献出来，美国也可分享其在AI审查、偏见纠正等领域的技术方法，共同完善国际伦理指南。尽管价值观不同，双方可聚焦技术层面的可解释AI、
                        AI治理评估等具体议题开展合作研究，增进互信。
                    </p></div>
                    <div class="chapter-card">
                    <p><strong>平衡监管与创新：</strong>对于美国而言，应注意在确保国家安全的同时，避免过度紧缩政策伤及自身创新生态和全球合作声誉。可以考虑在出口管制之外，为特定民用AI技术对华交流留出窗口
                        以免完全脱钩反而减弱美国企业竞争力。对于中国而言，要在严控风险和激励创新之间取得平衡。当前一些AI监管（如内容审核）虽有必要，但也要防止过度管制扼杀企业创造力和用户体验。可引入沙盒机制，
                        在可控环境下让企业测试创新应用，逐步完善监管，而非“一刀切”停滞不前。
                    </p>
                    </div>
                    <div class="chapter-card">
                    <p><strong>加强自身短板领域投入：</strong>美国应重视AI伦理和社会影响研究，鼓励学界制定算法公平、透明的行业标准，弥补联邦政府暂时缺位的部分，以维护其在人权和道义层面的国际形象。
                        中国则应持续攻坚基础芯片、核心软件等薄弱环节，减少卡脖子隐患。同时吸引国际人才开放合作，在遵守伦理前提下融入全球创新网络，以提升技术水准并化解外部疑虑。</p>
                    </div> 
                    <div class="chapter-card">
                    <p><strong>共同应对全球挑战：</strong>人工智能也可成为中美合作抗击全球性问题的工具，如气候变化预测、公共卫生、灾害预警等。双方政府可以支持两国科研机构联合开发相关AI模型，
                        在这些非敏感领域树立成功合作范例。这既有助于增进民间交流互信，又体现两国作为大国对人类福祉的担当，为紧张的双边关系注入一些正能量。</p>
                    </div> 
                    <div class="chapter-card">
                    <p><strong>总之，2025年的美国AI行动计划是中美科技竞争加剧的产物，也将进一步影响中国的应对策略。中美在AI领域各有所长、相互依存，在竞争之外仍有合作空间与共同利益。
                        决策者需要冷静研判形势，既要做好应对长期竞争的准备，也不可忽视合作管控的重要性。在技术飞速演进的时代，坚持负责任的开发和应用人工智能，应是中美乃至全世界共同遵循的伦理准则和政策考量点。
                        这不仅关乎两国竞争胜负，更关乎全球人工智能未来发展方向和人类共同利益。</strong></p>
                    </div> 
  
                  




               
  
                  <!-- Link Button -->
                  <div class="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                    <!-- Edit: Adjusted button text color for light/dark mode visibility -->
                    <a href="https://whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf"
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
    
  
