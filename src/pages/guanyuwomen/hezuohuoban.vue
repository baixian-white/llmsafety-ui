<!-- src/pages/guanyuwomen/hezuohuoban.vue -->
<template>
  <div
    class="ai-leaderboard-page bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
    <!-- 背景：静态网格 -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-10"></div>
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5830D6]/20 via-transparent to-transparent">
      </div>
      <div
        class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-500/10 via-transparent to-transparent">
      </div>
    </div>
    <main class="relative z-10 container mx-auto px-4 py-16 sm:py-24">
      <!-- Page Header Section -->
      <section class="pt-20 ">
        <div class="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1
              class="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent text-left bg-clip-text
                      bg-gradient-to-br from-gray-900 via-gray-700 to-black dark:from-white dark:to-gray-400 leading-tight tracking-tighter">
              合作伙伴
            </h1>
            <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
              与顶尖学术机构、产业伙伴、媒体与学术会议共同推动 AI 安全标准化与落地。
            </p>
          </div>
          <!-- 右上角锚点导航 -->
          <nav class="flex flex-wrap gap-2">
            <a href="#tech" class="btn-ghost">技术合作伙伴</a>
            <a href="#app" class="btn-ghost">应用合作伙伴</a>
            <a href="#media" class="btn-ghost">媒体合作伙伴</a>
          </nav>
        </div>
      </section>
      <!-- 技术合作伙伴 -->
      <section id="tech" class="container mx-auto px-4 mt-10 overflow-hidden">
        <header class="mb-4 flex items-center gap-3">
          <div class="size-2 rounded-full animate-ping-slow" style="background:#5830D6"></div>
          <h2 class="text-2xl md:text-3xl font-semibold">技术合作伙伴</h2>
        </header>

        <div class="panel p-6 overflow-hidden">
          <!-- 水平无缝滚动的 logo 带（重复一遍实现 seamless） -->
          <ul class="flex gap-6 animate-scroll">
            <li v-for="(logo, i) in techLogos" :key="'tech1-' + i"
              class="group flex items-center justify-center bg-white rounded-md p-2 shadow-sm min-w-[140px]">
              <img :src="logo" alt="" class="h-10 md:h-12 w-auto object-contain" />
            </li>
            <li v-for="(logo, i) in techLogos" :key="'tech2-' + i"
              class="group flex items-center justify-center bg-white rounded-md p-2 shadow-sm min-w-[140px]">
              <img :src="logo" alt="" class="h-10 md:h-12 w-auto object-contain" />
            </li>
          </ul>

          <div class="mt-6 text-sm text-gray-600 dark:text-gray-400">
            我们与多所国内外知名高校及科研机构保持合作，共同开展人工智能安全相关的前沿研究与课程建设。在学术交流、科研项目和实践教学中，我们聚焦于越狱攻击、幻觉风险等核心议题，推动 AI
            安全技术的创新与落地，培养具备全球视野与实战能力的人才。
          </div>
        </div>
      </section>


      <!-- 应用合作伙伴 -->
      <section id="app" class="container mx-auto px-4 mt-12">
        <header class="mb-4 flex items-center gap-3">
          <div class="size-2 rounded-full animate-ping-slow" style="background:#5830D6"></div>
          <h2 class="text-2xl md:text-3xl font-semibold">应用合作伙伴</h2>
        </header>

        <div class="grid gap-6 md:grid-cols-2">
          <div v-for="(c, i) in appPartners" :key="'app-' + i" class="panel p-6">
            <CardHeader class="flex items-center gap-4">
              <!-- 加白底背景 -->
              <div class="bg-white rounded-md p-2 shadow-sm flex items-center justify-center">
                <img :src="c.logo" :alt="c.name" class="h-10 w-auto object-contain" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold">{{ c.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ c.tagline }}</p>
              </div>
            </CardHeader>
            <CardContent class="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-6">
              {{ c.desc }}
            </CardContent>

          </div>

        </div>
        <div class="panel p-6 overflow-hidden">
          <ul class="flex gap-6 animate-scroll-slow">
            <!-- 第一遍 -->
            <li v-for="(pair, i) in appLogoPairs" :key="'applogo1-' + i"
              class="flex flex-col items-center justify-center bg-white rounded-md p-3 shadow-sm min-w-[160px] gap-4">

              <!-- 每个 logo 单独一层小背景框 -->
              <div class="bg-white rounded-md p-2 shadow-sm flex items-center justify-center w-full">
                <img :src="pair[0]" alt="" class="h-10 md:h-12 w-auto object-contain" />
              </div>
              <div class="bg-white rounded-md p-2 shadow-sm flex items-center justify-center w-full">
                <img :src="pair[1]" alt="" class="h-10 md:h-12 w-auto object-contain" />
              </div>
            </li>

            <!-- 第二遍 -->
            <li v-for="(pair, i) in appLogoPairs" :key="'applogo2-' + i"
              class="flex flex-col items-center justify-center bg-white rounded-md p-3 shadow-sm min-w-[160px] gap-4">

              <div class="bg-white rounded-md p-2 shadow-sm flex items-center justify-center w-full">
                <img :src="pair[0]" alt="" class="h-10 md:h-12 w-auto object-contain" />
              </div>
              <div class="bg-white rounded-md p-2 shadow-sm flex items-center justify-center w-full">
                <img :src="pair[1]" alt="" class="h-10 md:h-12 w-auto object-contain" />
              </div>
            </li>
          </ul>

          <!-- 保留说明文字 -->
          <div class="mt-6 text-sm text-gray-600 dark:text-gray-400">
            我们与政府机构、龙头企业及行业组织建立紧密合作，在数据安全、合规审查和业务创新等关键场景中推动大模型安全技术的实际落地。通过联合打造应用案例与解决方案，我们助力合作伙伴提升智能化水平与安全保障能力，共同推动人工智能在产业中的健康发展与价值创造。
            AI 安全技术的创新与落地，培养具备全球视野与实战能力的人才。
          </div>
        </div>
      </section>
<!-- 媒体合作伙伴 -->
<section id="media" class="container mx-auto px-4 mt-12 overflow-hidden">
  <header class="mb-4 flex items-center gap-3">
    <div class="size-2 rounded-full animate-ping-slow" style="background:#5830D6"></div>
    <h2 class="text-2xl md:text-3xl font-semibold">媒体合作伙伴</h2>
  </header>

  <div class="panel p-6 overflow-hidden">
    <!-- 横向无缝滚动：重复两遍 -->
    <ul class="flex gap-6 animate-scroll-slow">
      <!-- 第一遍 -->
      <li v-for="(item,i) in mediaLogos" :key="'media1-'+i"
          class="group flex items-center justify-center bg-white rounded-md p-2 shadow-sm min-w-[140px]">
        <img :src="item.src" :alt="item.alt" class="h-10 md:h-12 w-auto object-contain" />
      </li>
      <!-- 第二遍（为了无缝衔接） -->
      <li v-for="(item,i) in mediaLogos" :key="'media2-'+i"
          class="group flex items-center justify-center bg-white rounded-md p-2 shadow-sm min-w-[140px]">
        <img :src="item.src" :alt="item.alt" class="h-10 md:h-12 w-auto object-contain" />
      </li>
    </ul>

    <!-- 说明文字 -->
    <div class="mt-6 text-sm text-gray-600 dark:text-gray-400">
      我们与主流媒体及垂直媒体保持长期合作，通过专题报道、走访与共创栏目，持续传播 AI 安全前沿观点与落地成果，推动行业健康发展。
    </div>
  </div>
</section>

      <!-- 媒体报道（卡片式 + 筛选） -->
<section id="media-reports" class="container mx-auto px-4 mt-12">
  <header class="mb-4 flex items-center gap-3">
    <div class="size-2 rounded-full animate-ping-slow" style="background:#5830D6"></div>
    <h2 class="text-2xl md:text-3xl font-semibold">媒体报道</h2>
  </header>

  <!-- 筛选栏 -->
  <div class="mb-4 flex flex-wrap items-center gap-2">
    <button
      v-for="c in categories"
      :key="c"
      class="px-3 py-1 rounded-full text-sm border transition
             hover:border-[#5830D6] hover:text-[#5830D6]
             disabled:opacity-60"
      :class="selectedCategory===c ? 'bg-[#5830D6]/10 text-[#5830D6] border-[#5830D6]/30' : 'border-gray-200 dark:border-white/10'"
      @click="selectedCategory = c"
    >
      {{ c }}
    </button>
  </div>

  <!-- 网格卡片 -->
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="(m, i) in filteredMedia"
      :key="'media-card-' + i"
      class="panel p-0 overflow-hidden group transition hover:-translate-y-0.5"
    >
      <!-- 可选封面（没有就隐藏） -->
      <div v-if="m.cover" class="relative aspect-[16/9] overflow-hidden">
        <img :src="m.cover" :alt="m.title"
             class="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <!-- 置顶/精选徽标（可选） -->
        <span v-if="m.featured"
              class="absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs bg-black/70 text-white">精选</span>
      </div>

      <div class="p-4">
        <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <!-- 左侧媒体 logo（无则隐藏） -->
          <img v-if="m.logo" :src="m.logo" :alt="m.source" class="h-4 w-auto opacity-80" />
          <span class="truncate">{{ m.source }}</span>
          <span>·</span>
          <time :datetime="m.date">{{ m.date }}</time>
        </div>

        <a :href="m.link" target="_blank" rel="noopener"
           class="mt-2 block text-base font-semibold leading-snug hover:underline">
          {{ m.title }}
        </a>

        <!-- 摘要：没有就不渲染 -->
        <p v-if="m.excerpt" class="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {{ m.excerpt }}
        </p>

        <!-- 标签：没有就不渲染 -->
        <div v-if="m.tags?.length" class="mt-3 flex flex-wrap gap-2">
          <span v-for="(tag, idx) in m.tags" :key="idx"
                class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs
                       border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">
            # {{ tag }}
          </span>
        </div>

        <div class="mt-4 flex items-center gap-3">
          <a :href="m.link" target="_blank" rel="noopener" class="btn-primary inline-flex items-center gap-1">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 3h6v6" stroke-width="2"/>
              <path d="M10 14L21 3" stroke-width="2"/>
              <path d="M21 21H3V3" stroke-width="2"/>
            </svg>
            阅读全文
          </a>
      
        </div>
      </div>
    </article>
  </div>

  <!-- 底部说明（可选） -->
  <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">
    我们持续与权威媒体、高校与行业机构共创内容，输出大模型安全的最佳实践与方法论。
  </p>
</section>

    </main>
  </div>
</template>

<script setup lang="ts">

import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ExternalLink } from 'lucide-vue-next'


type AppPartner = {
  name: string; logo: string; tagline: string; desc: string; link: string; doc: string
}
type Media = { title: string; source: string; date: string; logo: string; link: string }
type Venue = { name: string; desc: string; tracks: string; link: string }

// const techPartners: Partner[] = [
//   { name: 'ustclogo',     logo: 'ustcLogo' },
//   // { name: 'VectorX',       logo: 'https://placehold.co/200x60?text=VectorX' },
//   // { name: 'SecureChip',    logo: 'https://placehold.co/200x60?text=SecureChip' },
//   // { name: 'EvalBench',     logo: 'https://placehold.co/200x60?text=EvalBench' },
//   // { name: 'PromptForge',   logo: 'https://placehold.co/200x60?text=PromptForge' },
//   // { name: 'LangOps',       logo: 'https://placehold.co/200x60?text=LangOps' },
//   // { name: 'Guardrail AI',  logo: 'https://placehold.co/200x60?text=Guardrail+AI' },
//   // { name: 'TrustML',       logo: 'https://placehold.co/200x60?text=TrustML' },
//   // { name: 'RedTeamLab',    logo: 'https://placehold.co/200x60?text=RedTeamLab' },
//   // { name: 'HalluMeter',    logo: 'https://placehold.co/200x60?text=HalluMeter' },
// ]


const techLogos = [
  "/guanyuwomen/hezuohuoban/logos/中国科学技术大学.webp",
  "/guanyuwomen/hezuohuoban/logos/安徽大学.webp",
  "/guanyuwomen/hezuohuoban/logos/合肥工业大学.webp",
  "/guanyuwomen/hezuohuoban/logos/中国科学院.webp",
  "/guanyuwomen/hezuohuoban/logos/南洋理工大学.webp",
  "/guanyuwomen/hezuohuoban/logos/新加坡国立大学.webp",
  "/guanyuwomen/hezuohuoban/logos/安徽医科大学.webp",
  "/guanyuwomen/hezuohuoban/logos/美国波士顿大学.webp",
  "/guanyuwomen/hezuohuoban/logos/信息工程研究所.webp"
]

const appLogoPairs = [
  [
    "/guanyuwomen/hezuohuoban/logos/贵州省委网络安全和信息化委员会.webp",
    "/guanyuwomen/hezuohuoban/logos/国家互联网应急中心.webp"
  ],
  [
    "/guanyuwomen/hezuohuoban/logos/公安部第三研究所.webp",
    "/guanyuwomen/hezuohuoban/logos/三实科技.webp"
  ],
  [
    "/guanyuwomen/hezuohuoban/logos/硅基流动.webp",
    "/guanyuwomen/hezuohuoban/logos/火山引擎.webp"
  ],
  [
    "/guanyuwomen/hezuohuoban/logos/阿里云.webp",
    "/guanyuwomen/hezuohuoban/logos/腾讯混元.webp"
  ],
  [
    "/guanyuwomen/hezuohuoban/logos/通义千问.webp",
    "/guanyuwomen/hezuohuoban/logos/文心一言.webp"
  ],
  [
    "/guanyuwomen/hezuohuoban/logos/智谱清言.webp",
    "/guanyuwomen/hezuohuoban/logos/deepseek.webp"
  ],
  [
    "/guanyuwomen/hezuohuoban/logos/比亚迪.webp",
    "/guanyuwomen/hezuohuoban/logos/高凌信息.webp"
  ]
]

const appPartners: AppPartner[] = [
  {
    name: 'ToG政府业务',
    logo: '/guanyuwomen/hezuohuoban/logos/贵州省公安厅.webp',
    tagline: '贵州省公安厅',
    desc: '贵州省公安厅全省安全检查第一次将大模型安全列入检查项。团队作为本次检查的唯一技术支持单位参与相关检查，得到了贵州省公安厅、网信办、互联网应急响应中心的应用证明。',
    link: '#',
    doc: '#'
  },
  {
    name: 'ToB 公司业务',
    logo: '/guanyuwomen/hezuohuoban/logos/华测检测.webp',
    tagline: '华测检测',
    desc: '华测检测作为国内领先的第三方检测认证机构，首次在检测与认证场景中引入大模型安全体系。团队为其提供了数据安全与模型安全评估的整体解决方案，助力其在合规审查和业务落地中建立行业标杆，并获得了企业内部及合作伙伴的高度认可。',
    link: '#',
    doc: '#'
  },
]

const mediaLogos = [
  { src: '/guanyuwomen/hezuohuoban/logos/安徽青年报.webp', alt: '安徽青年报' },
  { src: '/guanyuwomen/hezuohuoban/logos/安徽大学互联网学院.webp', alt: '安徽大学互联网学院融媒体' },
  { src: '/guanyuwomen/hezuohuoban/logos/合肥工业大学.webp', alt: '合肥工业大学融媒体' },
  { src: '/guanyuwomen/hezuohuoban/logos/合肥文旅博览集团.webp', alt: '合肥文旅博览集团' },
  { src: '/guanyuwomen/hezuohuoban/logos/计算机研究与发展.webp', alt: '计算机研究与发展' },
  { src: '/guanyuwomen/hezuohuoban/logos/中国人工智能学会.webp', alt: '中国人工智能学会' },
]

/**
 * 数据结构说明：
 * 必需：title, source, date, link
 * 可选：logo（媒体logo）、cover（封面图）、excerpt（摘要）、tags（标签[]）、
 *       category（分类：媒体/高校/企业…）、featured（精选）、reads（阅读数）
 *
 * 你现有的 mediaList 只有部分字段，也可以直接复用；
 * 我这里做了一个 mediaListPlus，示例包含新字段，没填的会自动“优雅降级”。
 */

 import { computed, ref } from 'vue'
const mediaListPlus = ref([
  {
    title: '博士进校园播撒 AI 火种',
    source: '安徽青年报',
    date: '2025-03-31',
    logo: '/guanyuwomen/hezuohuoban/logos/安徽青年报.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/博士进校园.webp',
    excerpt: '团队成员走进校园，分享 AI 安全前沿进展与实践案例，培养下一代 AI 安全人才。',
    tags: ['走进校园', '人才培养'],
    category: '媒体',
    link: 'http://epaper.ahyouth.com/paperdetails.php?CurrPeid=2453&CurrSid=23996&newsid=68410',
    featured: true,
    reads: 2681,
  },
  {
    title: '台建玮老师当选 CCF YOCSEF 学术秘书',
    source: '安徽大学互联网学院',
    date: '2025-07-02',
    logo: '/guanyuwomen/hezuohuoban/logos/安徽大学互联网学院.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/台老师当选CCF秘书.webp',
    excerpt: '产学研协同推动 AI 安全技术规范化与标准化建设。',
    tags: ['学术任职', 'CCF YOCSEF','安徽大学互联网学院'],
    category: '高校',
    link: 'https://si.ahu.edu.cn/2025/0702/c9326a370119/page.htm',
    reads: 1120,
  },
  {
    title: '大语言模型对抗性攻击与对抗综述',
    source: '计算机研究与发展',
    date: '2025-06-28',
    logo: '/guanyuwomen/hezuohuoban/logos/计算机研究与发展.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/综述推荐-大语言模型对抗性攻击与防御.webp',
    excerpt: '从原理层面对对抗性攻击的作用机制进行分析，汇总针对越狱攻击与防御的新颖观点，尽可能全面且直观地展现这一研究领域的关键问题与方向',
    tags: ['期刊论文', '原理分析'],
    category: '期刊',
    link: 'https://mp.weixin.qq.com/s/n1sksTn6cfG5qhcPJGTbNQ'
  },
  {
    title: '前沿技术如何赋能文旅创新',
    source: '合肥文旅博览集团',
    date: '2025-07-03',
    logo: '/guanyuwomen/hezuohuoban/logos/合肥文旅博览集团.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/前沿技术如何赋能文旅创新.webp',
    excerpt: '为深化前沿技术理论普及，进一步提升大模型技术在文旅领域的应用能力，推动集团业务场景创新升级，7月2日下午，“合肥文旅大讲堂”再次开讲。本次大讲堂邀请到安徽大学互联网学院硕士生导师、中国科学院大学网络空间安全专业台建玮博士亲临授课，集团党委副书记、董事、工会主席文良武主持会议，集团领导班子、外部董事，各部门、各所属企业参会学习',
    tags: ['理论科普', '技术赋能'],
    category: '媒体',
    link: 'https://mp.weixin.qq.com/s/MsXR8RskW9DAGnTZYcPbsA'
  },
  {
    title: 'YOCSEF合肥顺利举办“学术精英发现行”CLUB系列活动（高校站之安徽医科大学）',
    source: 'CCF YOCSEF合肥',
    date: '2025-03-17',
    logo: '/guanyuwomen/hezuohuoban/logos/人工智能学会-合肥.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/YOCSEF合肥顺利举办“学术精英发现行”CLUB系列活动（高校站之安徽医科大学）.webp',
    excerpt: '2025年3月14日上午，CCF YOCSEF合肥“学术精英发现行”系列CLUB活动之“走进安徽医科大学 助力医工交叉融合发展”在安徽医科大学生物医学工程学院顺利举行',
    tags: ['系列活动', '学术交流'],
    category: '学会',
    link: 'https://mp.weixin.qq.com/s/2yyVzrGpSUwzH4oxo3UhGQ'
  },
  {
    title: 'CCF YOCSEF 合肥成功举办技术论坛“车间物理定律VS云端数字理想-如何突破大模型赋能智能制造困局',
    date: '2025-07-16',
    logo: '/guanyuwomen/hezuohuoban/logos/人工智能学会-合肥.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/合肥成功举办技术论坛“车间物理定律VS云端数字理想-如何突破大模型赋能智能制造困局.webp',
    excerpt: '本次论坛是CCF YOCSEF合肥第十五届学术委员会第一次技术论坛，也是YOCSEF 合肥在“大模型”及“智能制造”方向上的延续，同时还是与YOCSEF 苏州、YOCSEF 深圳联合推出的“YOCSEF 2025 工业智能系列论坛”的第一场，旨在推动大模型在工业智能场景中的实际应用',
    tags: ['技术论坛', '学术交流','系列活动','CCF YOCSEF'],
    category: '学会',
    link: 'https://mp.weixin.qq.com/s/Q2nSdqFJCU46zyUaXqk8-g'
  },
  {
    title: '【走访交流】走进越秀区粤黔数字安全研究院',
    date: '2025-07-17',
    logo: '/guanyuwomen/hezuohuoban/logos/广州市越秀区人工智能产业协会.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/走进越秀区粤黔数字安全研究院.webp',
    excerpt: '7月17日上午，广州市越秀区人工智能产业协会一行到访越秀区粤黔数字安全研究院，双方围绕人工智能与数字安全领域的前沿趋势、跨界融合路径及产业协同发展等核心议题展开深度交流，为推动区域数字安全产业创新发展凝聚共识。',
    tags: [ '学术交流','广州市越秀区人工智能产业协会'],
    category: '协会',
    link: 'https://mp.weixin.qq.com/s/DpSPk2OUBHIZySvazT5V7w'
  }
  ,
  {
    title: '我院台建玮老师受聘粤黔数字安全研究院技术副院长',
    date: '2025-07-25',
    logo: '/guanyuwomen/hezuohuoban/logos/安徽大学互联网学院.webp',
    cover: '/guanyuwomen/hezuohuoban/xinwentupian/台建玮老师受聘粤黔数字安全研究院技术副院长.webp',
    excerpt: '近日，由广州越秀区和贵阳经济技术开发区指导、贵阳国家大数据安全靶场联合发起的广州市越秀区粤黔数字安全研究院（以下简称研究院）正式揭牌成立。研究院性质为社会服务机构，由广州市民政局登记备案，广州市科技工业和信息化局为主管单位。经研究院理事会投票决议，聘请安徽大学互联网学院台建玮老师出任研究院理事、技术副院长及学术委员会委员，聘期三年。',
    tags: [ '学术任职','广州市越秀区人工智能产业协会','安徽大学互联网学院'],
    category: '协会',
    link: 'https://si.ahu.edu.cn/2025/0725/c9326a371432/page.htm'
  }
])


// 分类：自动从数据里提取 + “全部”
const categories = computed(() => {
  const set = new Set<string>(['全部'])
  mediaListPlus.value.forEach(m => m.category && set.add(m.category))
  return Array.from(set)
})

const selectedCategory = ref('全部')

const filteredMedia = computed(() => {
  const list = mediaListPlus.value.slice().sort((a,b) => (b.featured?1:0) - (a.featured?1:0))
  if (selectedCategory.value === '全部') return list
  return list.filter(m => m.category === selectedCategory.value)
})

const venues: Venue[] = [
  {
    name: 'NeurIPS / Safe-LLM Workshop',
    desc: '大语言模型安全专题工作坊，涵盖越狱、红队、对抗训练与评测标准化。',
    tracks: 'LLM Safety, Red Teaming, Evaluation',
    link: '#'
  },
  {
    name: 'IEEE S&P（Security & Privacy）',
    desc: '国际顶会之一，聚焦前沿系统安全与隐私保护研究。',
    tracks: 'ML Security, Privacy, Auditing',
    link: '#'
  },
  {
    name: 'ACL / Trustworthy NLP',
    desc: '可信 NLP 分会场，关注偏见、幻觉与事实校验的模型方法与工程实践。',
    tracks: 'Hallucination, Factuality, Bias',
    link: '#'
  },
]
</script>

<style>
@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 25s linear infinite;
  width: max-content;
  /* 关键：避免被容器截断 */
}

.animate-scroll-slow {
  animation: scroll 40s linear infinite;
  width: max-content;
}
</style>
