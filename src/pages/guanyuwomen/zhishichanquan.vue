<!-- src/pages/guanyuwomen/zhishichanquan.vue -->
<template>
  <div
    class="ai-leaderboard-page bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
    <!-- 背景：静态网格 -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-10"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5830D6]/20 via-transparent to-transparent"></div>
      <div class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-500/10 via-transparent to-transparent"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 py-16 sm:py-24">
      <!-- 页头 -->
      <section class="container mx-auto px-4 pt-24 md:pt-28">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="text-left">
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text
                        bg-gradient-to-br from-gray-900 via-gray-700 to-black dark:from-white dark:to-gray-400 leading-tight tracking-tighter">
              知识产权
            </h1>
            <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
              展示本团队的软件著作权、发明专利与顶级论文成果，持续沉淀可信 AI 能力。
            </p>
            <!-- 汇总统计条 -->
<div class="mt-4 flex flex-wrap gap-2">
  <span class="stat-chip">论文：8 篇</span>
  <!-- 真实数据是8篇 -->
  <span class="stat-chip">专利：6 个</span>
  <!-- 真实数据是3个 -->
  <span class="stat-chip">软著：9 篇</span>
  <!-- 真实数据软著6个 -->
  <span class="stat-chip stat-chip--total">合计：23</span>
</div>
          </div>

          <!-- 右上角锚点导航（保留） -->
<nav class="grid grid-cols-3 gap-4">
  <!-- 软件著作 -->
  <a href="#soft" class="stat-card text-center btn-ghost py-4">
    <div class="text-3xl font-semibold text-black dark:text-gray-200">9+</div>
    <div class="text-sm text-black dark:text-gray-300 mt-1 whitespace-nowrap">
      软件著作
    </div>
  </a>

  <!-- 顶级论文 -->
  <a href="#paper" class="stat-card text-center btn-ghost py-4">
    <div class="text-3xl font-semibold text-black dark:text-gray-200">8+</div>
    <div class="text-sm text-black dark:text-gray-300 mt-1 whitespace-nowrap">
      顶级论文
    </div>
  </a>

  <!-- 发明专利 -->
  <a href="#patent" class="stat-card text-center btn-ghost py-4">
    <div class="text-3xl font-semibold text-black dark:text-gray-200">6+</div>
    <div class="text-sm text-black dark:text-gray-300 mt-1 whitespace-nowrap">
      发明专利
    </div>
  </a>
</nav>


        </div>
      </section>

      <!-- 内容区 -->
      <section class="container mx-auto px-4 mt-10 pb-24 space-y-12">
        <!-- 软件著作：多图无缝滚动（仅图片） -->
        <section id="soft" class="scroll-mt-28">
          <header class="flex items-end justify-between mb-4">
            <div>
              <!-- 软件著作 -->
<h2 class="text-xl md:text-2xl font-semibold">
  软件著作
  <span class="ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border border-indigo-300/50 text-indigo-600 dark:text-indigo-300 bg-indigo-500/10">
    共 9 篇
  </span>
</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">软件著作权是对计算机软件原创性成果的法律确认与保护，它不仅体现了科研人员在算法设计、系统架构与功能实现等方面的创新成果，也为学术研究与产业转化之间搭建了重要桥梁。通过软件著作权的登记，可以有效界定知识产权归属，促进学术成果的规范传播与合理利用，同时也为后续的技术交流、科研合作和成果评价提供坚实的依据。</p>
            </div>
          </header>

          <div class="panel p-4 md:p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 overflow-hidden">
            <div class="relative w-full overflow-hidden">
              <!-- 轨道：重复两遍实现无缝 -->
              <ul class="flex items-center gap-4 md:gap-6 w-max animate-marquee">
                <li v-for="(s, i) in softwares" :key="'soft-a-'+i"
                    class="shrink-0 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-2 md:p-3">
                  <img :src="s.image" :alt="s.name" class="h-28 md:h-32 object-contain pointer-events-none" />
                </li>
                <li v-for="(s, i) in softwares" :key="'soft-b-'+i"
                    class="shrink-0 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-2 md:p-3">
                  <img :src="s.image" :alt="s.name" class="h-28 md:h-32 object-contain pointer-events-none" />
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 发明专利：多图无缝滚动（仅图片） -->
        <section id="patent" class="scroll-mt-28">
          <header class="flex items-end justify-between mb-4">
            <div>
              <!-- 发明专利 -->
<h2 class="text-xl md:text-2xl font-semibold">
  发明专利
  <span class="ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border border-emerald-300/50 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10">
    共 6 个
  </span>
</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">发明专利是对技术方案原创性与创新性的高度认定，体现了研究团队在科学探索与工程实践中的核心突破。专利的获得不仅能够在法律层面保障研究成果的独创性与专属性，也为技术成果的应用转化和产业化奠定了基础。在学术语境下，发明专利既是科研水平的重要体现，也是推动学科发展和技术进步的重要动力。</p>
            </div>
          </header>

          <div class="panel p-4 md:p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 overflow-hidden">
            <div class="relative w-full overflow-hidden">
              <ul class="flex items-center gap-4 md:gap-6 w-max animate-marquee-slow">
                <li v-for="(p, i) in patents" :key="'pat-a-'+i"
                    class="shrink-0 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-2 md:p-3">
                  <img :src="p.image" :alt="p.title" class="h-28 md:h-32 object-contain pointer-events-none" />
                </li>
                <li v-for="(p, i) in patents" :key="'pat-b-'+i"
                    class="shrink-0 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-2 md:p-3">
                  <img :src="p.image" :alt="p.title" class="h-28 md:h-32 object-contain pointer-events-none" />
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 顶级论文：多卡信息无缝滚动（保留基础信息，移除链接/BibTeX/放大） -->
        <section id="paper" class="scroll-mt-28">
          <header class="flex items-end justify-between mb-4"> 
            <div>
              <!-- 顶级论文 -->
<h2 class="text-xl md:text-2xl font-semibold">
  顶级论文
  <span class="ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border border-fuchsia-300/50 text-fuchsia-600 dark:text-fuchsia-300 bg-fuchsia-500/10">
    共 8 篇
  </span>
</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">顶级学术论文代表了在相关研究领域的重要发现与前沿进展，是科研工作者长期积累与创新实践的结晶。论文的发表不仅推动了学术界对核心问题的深入讨论与方法论的扩展，也为后续研究提供了可验证、可复用的理论与实验基础。顶级期刊和会议论文的产出，标志着研究团队在国际学术共同体中的影响力与学术贡献。</p>
            </div>
          </header>

          <div class="panel p-4 md:p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 overflow-hidden">
            <div class="relative w-full overflow-hidden">
              <div class="flex items-stretch gap-4 md:gap-6 w-max animate-marquee">
                <!-- 第一遍 -->
                <article v-for="(a, i) in papers" :key="'pap-a-'+i"
                         class="w-[82vw] sm:w-[56vw] md:w-[44vw] lg:w-[36vw] xl:w-[30vw] shrink-0 grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-3 p-3 md:p-4
                                rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 overflow-hidden">
                  <!-- 左：封面（仅展示） -->
                  <div class="rounded-md overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                    <img v-if="a.image" :src="a.image" :alt="a.title" class="object-contain w-full h-28 md:h-32 pointer-events-none" />
                    <div v-else class="text-[10px] text-gray-400 p-3">暂无图片</div>
                  </div>
                  <!-- 右：信息 -->
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border border-purple/40 text-purple bg-purple/10 truncate">
                        {{ a.venue }} · {{ a.year }}
                      </span>
                      <span v-if="a.award" class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border border-amber-400/40 text-amber-600 dark:text-amber-300 bg-amber-500/10">
                        {{ a.award }}
                      </span>
                    </div>
                    <h3 class="mt-1 font-medium leading-snug line-clamp-2">{{ a.title }}</h3>
                    <p class="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-300/90 line-clamp-2">
                      {{ a.authors?.join(', ') }}
                    </p>
                    <p class="mt-2 text-[10px] text-gray-500 dark:text-gray-400">
                      <!-- * 链接与 BibTeX 功能已隐藏 -->
                    </p>
                  </div>
                </article>

                <!-- 第二遍 -->
                <article v-for="(a, i) in papers" :key="'pap-b-'+i"
                         class="w-[82vw] sm:w-[56vw] md:w-[44vw] lg:w-[36vw] xl:w-[30vw] shrink-0 grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-3 p-3 md:p-4
                                rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 overflow-hidden">
                  <div class="rounded-md overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                    <img v-if="a.image" :src="a.image" :alt="a.title" class="object-contain w-full h-28 md:h-32 pointer-events-none" />
                    <div v-else class="text-[10px] text-gray-400 p-3">暂无图片</div>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border border-purple/40 text-purple bg-purple/10 truncate">
                        {{ a.venue }} · {{ a.year }}
                      </span>
                      <span v-if="a.award" class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border border-amber-400/40 text-amber-600 dark:text-amber-300 bg-amber-500/10">
                        {{ a.award }}
                      </span>
                    </div>
                    <h3 class="mt-1 font-medium leading-snug line-clamp-2">{{ a.title }}</h3>
                    <p class="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-300/90 line-clamp-2">
                      {{ a.authors?.join(', ') }}
                    </p>
                    <p class="mt-2 text-[10px] text-gray-500 dark:text-gray-400">
                      <!-- * 链接与 BibTeX 功能已隐藏 -->
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">

/** 仅保留数据与类型；去掉 CSV/BibTeX/预览/按钮等交互逻辑 */
type Software = {
  name: string
  regNo: string
  year: string | number
  brief: string
  tags: string[]
  certificateUrl?: string
  image?: string
  imageLarge?: string
}
type Patent = {
  title: string
  appNo: string
  pubNo?: string
  date: string
  inventors: string[]
  status: '已授权' | '受理中'
  link?: string
  image?: string
  imageLarge?: string
}
type Paper = {
  title: string
  authors: string[]
  venue: string
  year: number
  award?: string
  pdf?: string
  doi?: string
  code?: string
  image?: string
  imageLarge?: string
}

/* ========== 数据（沿用你的原始数据） ========== */
const softwares: Software[] = [
  {
    name: '智能安全威胁检测及风险评估平台V1.0',
    regNo: '软著登字第 15684416 号',
    year: 2025,
    brief: '融合多源日志与模型行为监测，智能识别潜在攻击路径，支持自动化风险分级与预警。',
    tags: ['威胁检测', '风险评估', '自动预警'],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/智能安全威胁检测及风险评估平台.webp',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/智能安全威胁检测及风险评估平台.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/智能安全威胁检测及风险评估平台.webp'
  },
  {
    name: '网络数据多维度增强系统 V1.0',
    regNo: '软著登字第 15737723 号',
    year: 2024,
    brief: '支持对网络数据进行多层次采集、清洗与特征增强，提升数据质量与多样性，为模型训练与安全分析提供高效可靠的基础支撑。',
    tags: ['数据增强', '特征提取', '数据质量提升'],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/网络数据多维度增强系统.webp',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/网络数据多维度增强系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/网络数据多维度增强系统.webp'
  },
  {
    name: '面向多场景事件检测的视频流实时处理平台',
    regNo: '软著登字第 15737723 号',
    year: 2024,
    brief: '面向交通、安防、工业等多种应用场景，支持视频流的实时采集、分析与事件检测，能够快速识别异常行为并触发预警，为复杂环境下的智能监控提供可靠支撑',
    tags: ['视频流处理', '实时检测', '事件识别', '智能监控'],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/面向多场景事件检测的视频流实时处理平台.webp',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/面向多场景事件检测的视频流实时处理平台.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/面向多场景事件检测的视频流实时处理平台.webp'
  },
  {
    name: '流水号渗透测试全流程智能化辅助系统',
    regNo: '软著登字第 15692477 号',
    year: 2024,
    brief: '支持对网络数据进行多层次采集、清洗与特征增强，提升数据质量与多样性，为模型训练与安全分析提供高效可靠的基础支撑。',
    tags: ['数据增强', '特征提取', '数据质量提升'],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/面向多场景事件检测的视频流实时处理平台.webp',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/面向多场景事件检测的视频流实时处理平台.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/面向多场景事件检测的视频流实时处理平台.webp'
  },
  {
    name: '文档质量多维度检测平台',
    regNo: '软著登字第 15740743 号',
    year: 2024,
    brief: '针对技术文档、业务报告及规范文件的多维度质量检测平台，支持内容完整性、逻辑一致性、语言规范性与安全合规性等多方面评估，帮助用户快速发现问题并生成优化建议。',
    tags: ['文档检测', '质量评估', '合规检查', '智能优化'],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/文档质量多维度检测平台.webp',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/文档质量多维度检测平台.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/文档质量多维度检测平台.webp'
  },
     {
    name: '多模态数据伪造智能检测平台',
    regNo: '软著登字第 15807107 号',
    year: 2025,
    brief: '',
    tags: [],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/多模态数据伪造智能检测平台.webp',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/多模态数据伪造智能检测平台.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/多模态数据伪造智能检测平台.webp'
  },
    {
    name: 'AI安全防护平台',
    regNo: '软著登字第 15759136 号',
    year: 2025,
    brief: '',
    tags: [],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/AI安全防护平台.png',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/AI安全防护平台.png',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/AI安全防护平台.png'
  },
  {
    name: '小分子化合物合成智能辅助平台',
    regNo: '软著登字第 15740750 号',
    year: 2025,
    brief: '',
    tags: [],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/小分子化合物合成智能辅助平台.png',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/小分子化合物合成智能辅助平台.png',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/小分子化合物合成智能辅助平台.png'
  },
    {
    name: 'AI模型安全增强系统',
    regNo: '软著登字第 15759129 号',
    year: 2025,
    brief: '',
    tags: [],
    certificateUrl: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/AI模型安全增强系统.png',
    image: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/AI模型安全增强系统.png',
    imageLarge: '/guanyuwomen/zhishichanquan/ruanjianzhuzuo/AI模型安全增强系统.png'
  },

]

const patents: Patent[] = [
  {
    title: '传感器网络环境下的数据增强方法和系统',
    appNo: '202210510798 .9',
    pubNo: 'CN 115271028 A',
    date: '2022-11-01',
    inventors: ['台建玮', '吕欠伟', '罗贺', '王国强', '胡笑旋', '马华伟', '靳鹏', '夏维', '唐奕城'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/传感器网络环境下的数据增强方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/传感器网络环境下的数据增强方法和系统.webp'
  },
  {
    title: '多维时序数据的短期趋势预测方法和系统',
    appNo: '202310182120.7',
    pubNo: '2023030101104900',
    date: '2024-11-03',
    inventors: ['合肥工业大学'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/多维时序数据的短期趋势预测方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/多维时序数据的短期趋势预测方法和系统.webp'
  },
  {
    title: '：一种基于架构搜索和训练的防御对抗性攻击方法和系统',
    appNo: '202510697106.X',
    pubNo: '2025061301164130',
    date: '2025-6-18',
    inventors: ['安徽大学'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/一种基于架构搜索和训练的防御对抗性攻击方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/一种基于架构搜索和训练的防御对抗性攻击方法和系统.webp'
  },
  {
    title: '传感器网络环境下的数据增强方法和系统',
    appNo: '202210510798 .9',
    pubNo: 'CN 115271028 A',
    date: '2022-11-01',
    inventors: ['台建玮', '吕欠伟', '罗贺', '王国强', '胡笑旋', '马华伟', '靳鹏', '夏维', '唐奕城'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/传感器网络环境下的数据增强方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/传感器网络环境下的数据增强方法和系统.webp'
  },
  {
    title: '多维时序数据的短期趋势预测方法和系统',
    appNo: '202310182120.7',
    pubNo: '2023030101104900',
    date: '2024-11-03',
    inventors: ['合肥工业大学'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/多维时序数据的短期趋势预测方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/多维时序数据的短期趋势预测方法和系统.webp'
  },
  {
    title: '：一种基于架构搜索和训练的防御对抗性攻击方法和系统',
    appNo: '202510697106.X',
    pubNo: '2025061301164130',
    date: '2025-6-18',
    inventors: ['安徽大学'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/一种基于架构搜索和训练的防御对抗性攻击方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/一种基于架构搜索和训练的防御对抗性攻击方法和系统.webp'
  },
  {
    title: '传感器网络环境下的数据增强方法和系统',
    appNo: '202210510798 .9',
    pubNo: 'CN 115271028 A',
    date: '2022-11-01',
    inventors: ['台建玮', '吕欠伟', '罗贺', '王国强', '胡笑旋', '马华伟', '靳鹏', '夏维', '唐奕城'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/传感器网络环境下的数据增强方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/传感器网络环境下的数据增强方法和系统.webp'
  },
  {
    title: '多维时序数据的短期趋势预测方法和系统',
    appNo: '202310182120.7',
    pubNo: '2023030101104900',
    date: '2024-11-03',
    inventors: ['合肥工业大学'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/多维时序数据的短期趋势预测方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/多维时序数据的短期趋势预测方法和系统.webp'
  },
  {
    title: '：一种基于架构搜索和训练的防御对抗性攻击方法和系统',
    appNo: '202510697106.X',
    pubNo: '2025061301164130',
    date: '2025-6-18',
    inventors: ['安徽大学'],
    status: '已授权',
    link: 'https://www.cnipa.gov.cn/col/col171/index.html',
    image: '/guanyuwomen/zhishichanquan/zhuanli/一种基于架构搜索和训练的防御对抗性攻击方法和系统.webp',
    imageLarge: '/guanyuwomen/zhishichanquan/zhuanli/一种基于架构搜索和训练的防御对抗性攻击方法和系统.webp'
  }
]


const papers: Paper[] = [
  {
    title: "Towards a 3D Transfer-based Black-box Attack via Critical Feature Guidance",
    authors: ["Shuchao Pang", "Zhenghan Chen", "Shen Zhang", "Liming Lu", "Siyuan Liang", "Anan Du", "Yongbin Zhou"],
    venue: "arXiv (cs.CV); ICCV 2025 (poster)",
    year: 2025,
    pdf: "https://arxiv.org/pdf/2508.15650",
    doi: "https://doi.org/10.48550/arXiv.2508.15650",
    code: "",
    image: "/guanyuwomen/zhishichanquan//lunwen/Towards a 3D Transfer-based Black-box Attack via Critical Feature Guidance.webp",
    imageLarge: "/guanyuwomen/zhishichanquan/lunwen/Towards a 3D Transfer-based Black-box Attack via Critical Feature Guidance.webp"
  },
  {
    title: "Multimodal Instruction Backdoor Attacks against Autoregressive Visual Language Models",
    authors: ["Jiawei Liang", "Siyuan Liang", "Man Luo", "Aishan Liu", "Dongchen Han", "Ee-Chien Chang", "Xiaochun Cao"],
    venue: "International Journal of Computer Vision (ICCV?) – published online Feb 19, 2025",
    year: 2025,
    pdf: "https://arxiv.org/abs/2402.13851",
    doi: "10.1007/s11263-025-02368-9",
    code: "https://github.com/JWLiang007/VL-Trojan",
    image: "/guanyuwomen/zhishichanquan//lunwen/Multimodal Instruction Backdoor Attacks against Autoregressive Visual Language Models.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//lunwen/Multimodal Instruction Backdoor Attacks against Autoregressive Visual Language Models.webp"
  },
  {
    title: "Exploring and Mitigating In-Context Learning Backdoor Attacks",
    authors: ["Zhiyao Ren", "Siyuan Liang", "Aishan Liu", "Dacheng Tao"],
    venue: "International Conference on Machine Learning (ICML)",
    year: 2025,
    pdf: "https://arxiv.org/abs/2507.01321",
    doi: "",
    code: "",
    image: "/guanyuwomen/zhishichanquan//lunwen/Exploring and Mitigating In-Context Learning Backdoor Attacks.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//lunwen/Exploring and Mitigating In-Context Learning Backdoor Attacks.webp"
  },
  {
    title: "3D Gaussian Splatting Driven Multi-View Robust Physical Adversarial Camouflage Generation",
    authors: ["Tianrui Lou", "Xiaojun Jia", "Siyuan Liang", "Jiawei Liang", "Ming Zhang", "Yanjun Xiao", "Xiaochun Cao"],
    venue: "arXiv preprint (expected ICCV 2025), published online Jul 2, 2025",
    year: 2025,
    pdf: "https://arxiv.org/abs/2507.01367",
    doi: "",
    code: "https://github.com/TRLou/PGA",
    image: "/guanyuwomen/zhishichanquan//lunwen/3D Gaussian Splatting Driven Multi-View Robust Physical Adversarial Camouflage Generation.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//lunwen/3D Gaussian Splatting Driven Multi-View Robust Physical Adversarial Camouflage Generation.webp"
  },
  {
    title: "ELBA-Bench: An Efficient Learning Backdoor Attacks Benchmark for Large Language Models",
    authors: ["Xuxu Liu", "Siyuan Liang", "Mengya Han", "Yong Luo", "Aishan Liu", "Xiantao Cai", "Zheng He", "Dacheng Tao"],
    venue: "Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (ACL 2025)",
    year: 2025,
    pdf: "https://aclanthology.org/2025.acl-long.877.pdf",
    doi: "10.18653/v1/2025.acl-long.877",
    code: "https://github.com/NWPUliuxx/ELBA_Bench",
    image: "/guanyuwomen/zhishichanquan//lunwen/ELBA-Bench An Efficient Learning Backdoor Attacks Benchmark for Large Language Models.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//lunwen/ELBA-Bench An Efficient Learning Backdoor Attacks Benchmark for Large Language Models.webp"
  },
  {
    title: "Pre-trained Trojan Attacks for Visual Recognition",
    authors: ["Aishan Liu", "Xinwei Zhang", "Yisong Xiao", "Yuguang Zhou", "Siyuan Liang", "Jiakai Wang", "Xianglong Liu", "Xiaochun Cao", "Dacheng Tao"],
    venue: "International Journal of Computer Vision (IJCV), published online January 22, 2025",
    year: 2025,
    pdf: "https://arxiv.org/abs/2312.15172",
    doi: "10.1007/s11263-024-02333-y",
    code: "https://github.com/Veee9/Pre-trained-Trojan",
    image: "/guanyuwomen/zhishichanquan//lunwen/Pre-trained Trojan Attacks for Visual Recognition.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//Pre-trained Trojan Attacks for Visual Recognition.webp"
  },
  {
    title: "CopyrightShield: Enhancing Diffusion Model Security against Copyright Infringement Attacks",
    authors: ["Zhixiang Guo", "Siyuan Liang", "Aishan Liu", "Dacheng Tao"],
    venue: "International Conference on Computer Vision (ICCV), 2025",
    year: 2025,
    pdf: "https://arxiv.org/abs/2412.01528",
    doi: "",
    code: "",
    image: "/guanyuwomen/zhishichanquan//lunwen/Enhancing Diffusion Model Security against Copyright Infringement Attacks.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//Enhancing Diffusion Model Security against Copyright Infringement Attacks.webp"
  },
  {
    title: "Revisiting Backdoor Attacks against Large Vision-Language Models from Domain Shift",
    authors: ["Siyuan Liang", "Jiawei Liang", "Tianyu Pang", "Chao Du", "Aishan Liu", "Mingli Zhu", "Xiaochun Cao", "Dacheng Tao"],
    venue: "CVPR, published online June 27, 2024",
    year: 2024,
    pdf: "https://arxiv.org/abs/2406.18844",
    doi: "",
    code: "https://github.com/LiangSiyuan21/MABA",
    image: "/guanyuwomen/zhishichanquan//lunwen/Revisiting Backdoor Attacks against Large Vision-Language Models from Domain Shift.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//Revisiting Backdoor Attacks against Large Vision-Language Models from Domain Shift.webp"
  },
  {
    title: "大语言模型对抗性攻击与防御综述",
    authors: ["台建玮", "杨双宁", "王佳佳", "李亚凯", "刘奇旭", "贾晓启"],
    venue: "1 （安徽大学互联网学院　合肥　230039）2 （中国科学院信息工程研究所　北京　100093）",
    year: 2025,
    pdf: "https://crad.ict.ac.cn/cn/article/pdf/preview/10.7544/issn1000-1239.202440630.pdf",
    doi: "",
    code: "",
    image: "/guanyuwomen/zhishichanquan//lunwen/大语言模型对抗性攻击与防御综述.webp",
    imageLarge: "/guanyuwomen/zhishichanquan//lunwen/大语言模型对抗性攻击与防御综述.webp"
  }
]


</script>

<style scoped>
/* 锚点顶部留白（已用 scroll-mt-28 保底） */
:target { scroll-margin-top: 7rem; }

/* 按钮：btn-ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(125,125,125,.25);
  color: inherit;
  transition: all .2s ease;
  border-radius: .75rem;
  padding: .375rem .75rem;
  font-size: .875rem;
}
.btn-ghost:hover { background: rgba(125,125,125,.08); }

/* 面板阴影 */
.panel {
  border-radius: 1rem;
  box-shadow:
    0 1px 2px rgba(0,0,0,.04),
    0 8px 24px rgba(0,0,0,.06);
}

/* ===== 无缝横向滚动（向左） ===== */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); } /* 轨道内容重复两遍，位移 50% 实现无缝衔接 */
}
.animate-marquee {
  animation: marquee 28s linear infinite;
  width: max-content;
  will-change: transform;
}
.animate-marquee-slow {
  animation: marquee 40s linear infinite;
  width: max-content;
  will-change: transform;
}

/* 统计徽标 */
.stat-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem; /* px-2 py-1 */
  font-size: 0.75rem;      /* text-xs */
  border-radius: 0.5rem;
  border: 1px solid rgba(125,125,125,.25);
  background: rgba(125,125,125,.08);
  backdrop-filter: blur(2px);
}
.stat-chip--total {
  border-color: rgba(99,102,241,.35);       /* indigo-ish */
  background: rgba(99,102,241,.08);
}

</style>
