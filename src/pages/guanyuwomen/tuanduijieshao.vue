<!-- src/pages/guanyuwomen/tuanduijieshao.vue -->
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

      <!-- 页头 / Hero -->
      <section class="container mx-auto px-4 pt-24 md:pt-28">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="text-left">
            <h1
              class="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text
                       bg-gradient-to-br from-gray-900 via-gray-700 to-black dark:from-white dark:to-gray-400 leading-tight tracking-tighter">
              团队介绍
            </h1>
            <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
              我们是一支兼具科研实力与工程落地能力的 AI 安全团队，致力于把“可信”注入每一个模型与应用。
            </p>
          </div>

          <!-- 右上角锚点导航（内联 SVG） -->
          <nav class="flex flex-wrap gap-2">
            <a href="#overview" class="btn-ghost flex items-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M2 12h20"></path>
                <path d="M12 2a15.3 15.3 0 0 0 0 20"></path>
              </svg> 整体介绍
            </a>
            <a href="#founders" class="btn-ghost flex items-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg> 核心成员
            </a>
          </nav>
        </div>
      </section>

      <!-- 整体介绍 -->
      <section id="overview" class="container mx-auto px-4 mt-10 pb-8 scroll-mt-28">
        <div class="panel p-6" v-reveal>
          <div class="grid gap-6 lg:grid-cols-5">
            <div class="lg:col-span-3 space-y-4">
              <h2 class="text-xl md:text-2xl font-semibold">团队整体介绍</h2>
              <p class="text-gray-600 dark:text-gray-300/90 leading-7">
                团队来自国内外一流高校，覆盖安全攻防、模型评测、数据治理、分布式系统等方向。我们以工程化能力为底座，
                将红队对抗、风险评估与防御策略落地为易用的平台化产品，服务政企、金融、运营商与互联网客户。
              </p>
              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-2.5 py-1 text-xs rounded-full border border-gray-200 dark:border-white/10">LLM
                  Security</span>
                <span class="px-2.5 py-1 text-xs rounded-full border border-gray-200 dark:border-white/10">Red
                  Teaming</span>
                <span class="px-2.5 py-1 text-xs rounded-full border border-gray-200 dark:border-white/10">Hallucination
                  Eval</span>
                <span
                  class="px-2.5 py-1 text-xs rounded-full border border-gray-200 dark:border-white/10">Guardrails</span>
              </div>
            </div>

            <!-- 统计信息 -->
            <div class="lg:col-span-2 space-y-4">
              <!-- 一行三个 -->
              <div class="flex justify-between gap-4">
                <div class="stat-card flex-1 text-center" v-reveal>
                  <div class="text-3xl font-semibold">10+</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">软件著作</div>
                </div>
                <div class="stat-card flex-1 text-center" v-reveal data-delay="80">
                  <div class="text-3xl font-semibold">26+</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">顶会论文</div>
                </div>
                <div class="stat-card flex-1 text-center" v-reveal data-delay="140">
                  <div class="text-3xl font-semibold">2+</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">发明专利</div>
                </div>
              </div>

              <!-- 知识产权链接 -->
              <div class="mt-4 text-center">
                <a href="/guanyuwomen/zhishichanquan" class="btn-primary inline-flex items-center gap-2">
                  查看全部知识产权
                  <ExternalLink class="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- 联合创始人（大图卡片样式） -->
      <section id="founders" class="container mx-auto px-4 mt-8 pb-8 scroll-mt-28">
        <header class="flex items-end justify-between mb-6">
          <h2 class="text-xl md:text-2xl font-semibold">核心团队成员</h2>

        </header>

        <!-- 双卡并排：移动端上下叠放，md起并排 -->
        <div class="grid gap-6 md:grid-cols-2">
          <article v-for="(f, i) in founders" :key="'f-' + i" class="group panel p-0 overflow-hidden relative" v-reveal
            :data-delay="i * 80">
            <!-- 背景装饰（淡霓虹） -->
            <div aria-hidden="true"
              class="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition"
              style="background: radial-gradient(220px 160px at 95% 10%, rgba(88,48,214,.15), transparent 60%);"></div>

            <!-- 布局：上图下文（md 起改为左图右文），并让两列等高 -->
            <div class="h-full grid md:grid-cols-5 items-stretch">
              <!-- 左：大图（md+ 绝对铺满以匹配右侧高度；移动端用固定比例） -->
              <div class="relative md:col-span-2 bg-purple/5">
                <!-- md+：绝对定位铺满整个左列，高度随卡片整体而变 -->
                <div class="hidden md:block absolute inset-0">
                  <img :src="f.avatar" :alt="f.name" class="w-full object-contain object-top transition-transform duration-500  group-hover:scale-[1.03]" />
                </div>
                <!-- 移动端：保留原先的 16:9 比例容器 -->
                <div class="md:hidden aspect-[16/9] overflow-hidden">
                  <img :src="f.avatar" :alt="f.name" class="w-full h-full object-cover" />
                </div>
                <!-- 可选：在移动端用底部渐变提升可读性 -->
                <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent md:hidden">
                </div>
              </div>

              <!-- 右：文本区 -->
              <div class="md:col-span-3 p-6 flex flex-col">
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-lg leading-tight">{{ f.name }}</h3>
                  <span class="text-[11px] px-2 py-0.5 rounded-md border border-purple/30 bg-purple/10 text-purple">
                    {{ f.title }}
                  </span>
                </div>

                <!-- 主要简介（加粗更显眼） -->
                <p
                  class="mt-3 text-base md:text-[15px] font-semibold text-gray-800 dark:text-gray-100 leading-relaxed whitespace-pre-line">
                  {{ f.bio }}
                </p>

                <!-- 次要简介（单独浅底框） -->
                <div v-if="f.subBio"
                  class="mt-3 p-3 rounded-md bg-gray-50 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ f.subBio }}
                </div>

                <!-- 标签 -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="(t, j) in f.tags" :key="'ft-' + j"
                    class="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">
                    {{ t }}
                  </span>
                </div>

                <!-- CTA -->
                <div class="mt-5 flex flex-wrap items-center gap-3">
                  <a v-if="f.link" :href="f.link" target="_blank" rel="noopener" class="btn-primary">了解详情</a>
                  <a v-if="f.email" :href="`mailto:${f.email}`" class="btn-ghost">邮件联系</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>





      <!-- 核心成员（大图卡片样式，同款于联合创始人） -->
      <section id="core" class="container mx-auto px-4 mt-8 pb-20 scroll-mt-28">


        <!-- 大卡片：与 founders 同款，左图右文；为保持信息密度，这里两列展示 -->
        <div class="grid gap-6 md:grid-cols-2">
          <article v-for="(m, i) in members" :key="'m-' + i" class="group panel p-0 overflow-hidden relative" v-reveal
            :data-delay="(i % 2) * 80">
            <!-- 背景装饰（淡霓虹） -->
            <div aria-hidden="true"
              class="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition"
              style="background: radial-gradient(220px 160px at 95% 10%, rgba(88,48,214,.15), transparent 60%);"></div>

            <!-- 布局：上图下文（md起改为左图右文） -->
            <div class="grid h-full md:grid-cols-5">
              <!-- 大图 -->
              <div class="relative md:col-span-2 bg-purple/5">
                <div class="aspect-[16/9] md:aspect-[4/5] overflow-hidden">
                  <img :src="m.avatar" :alt="m.name"
                    class="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent md:hidden">
                </div>
              </div>

              <!-- 文本区 -->
              <div class="md:col-span-3 p-6 flex flex-col">
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-lg leading-tight">{{ m.name }}</h3>
                  <span v-if="m.role"
                    class="text-[11px] px-2 py-0.5 rounded-md border border-white/10 bg-white/5 dark:bg-white/5">
                    {{ m.role }}
                  </span>
                </div>

                <!-- 主要简介：重点头衔（显眼） -->
                <p
                  class="mt-3 text-base md:text-[15px] font-semibold text-gray-800 dark:text-gray-100 leading-relaxed  whitespace-pre-line">
                  {{ m.bio }}
                </p>

                <!-- 次要简介：补充说明 -->
                <div v-if="m.subBio"
                  class="mt-3 p-3 rounded-md bg-gray-50 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ m.subBio }}
                </div>

                <!-- 标签 -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="(t, j) in m.tags" :key="'mt-' + j"
                    class="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">
                    {{ t }}
                  </span>
                </div>

                <!-- 行动区（可选） -->
                <div class="mt-5 flex flex-wrap items-center gap-3">
                  <a v-if="m.link" :href="m.link" target="_blank" rel="noopener" class="btn-ghost">个人主页</a>
                  <a v-if="m.email" :href="`mailto:${m.email}`" class="btn-ghost">邮件联系</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>




    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

type Person = {
  name: string
  title?: string       // 显示在头像旁边的小职位标签
  role?: string        // 可以保留，扩展用途
  avatar: string       // 头像
  bio: string          // 重点头衔（主要信息，显眼展示）
  subBio?: string      // 次要头衔（补充说明，放在独立框里）
  tags: string[]       // 技术标签
  email?: string
  link?: string
}

const founders: Person[] = [
  {
    name: '台建玮',
    title: '联合创始人 / CEO',
    avatar: '/guanyuwomen/tuanduijieshao/lianhechuangshiren/台建玮.webp',
    bio: '安徽大学互联网学院助理教授、硕导\n粤黔数字安全研究院理事、技术副院长\n中国计算机学会青年科技论坛合肥分论坛秘书长。',
    subBio: '获中国科学院大学网络空间安全专业博士学位（中国科学院与美国波士顿大学联合培养）、北京邮电大学与英国伦敦大学工学双学士学位在人工智能安全领域发表论文10余篇，申请中国发明专利近30项，软件著作权9项，参与制定国家标准3项\n兼任全国信息技术标准化技术委员会委员，安徽省工业数字化转型专委会专家委员，安徽省人工智能领域专家人才兼任贵州国家级大数据靶场专家委员会委员，华测集团数据安全技术顾问2024年中国国际大数据博览会“数据安全”论坛做大会专题报告，与科大讯飞、华测集团等上市企业共建产学研创新基地3个',
    tags: [
      '人工智能安全',
      '大模型安全',
      '行业顾问',
      '专利与标准制定',
      '产学研合作',
      '学术成果',

    ],
    email: 'ceo@example.com',
    link: 'https://si.ahu.edu.cn/2024/0328/c19593a332145/page.htm'
  },
]

const channel: Person = {

}

const members: Person[] = [
  {
    name: '梁思源',
    role: '核心成员',
    avatar: '/guanyuwomen/tuanduijieshao/hexinchengyuan/梁思源.webp',
    bio: '新加坡南洋理工大学助理教授；\n曾任新加坡国立大学研究员\n获中国科学院大学网络空间安全专业博士学位、四川大学软件工程工学学士学位',
    subBio: '先后师从曹晓春教授、 EE-Chien Chang 教授，现合作导师为陶大程教授，主要研究方向为多模态基础模型的 人工智能安全。;已发表论文二十余篇，其中以第一作者或共同第一作者身份在 CVPR、ICCV、ECCV等国际会议上发表论文九篇;近年来，在人工智能安全相关工作入选了 ICLR 2024 Spotlight、ICLR 2024 Oral、CVPR 2024 和 2025 Highlight，并有一篇论文被评为 CVPR 2024 基础模型安全研讨会的“最佳论文”',
    tags: [
      'AI安全',
      '多模态模型',
      '基础模型',
      'CVPR/ICLR'
    ],
    email: 'eng1@example.com',
    link: '#'
  },
  {
    name: '李亚鹏',
    role: '核心成员',
    avatar: '/guanyuwomen/tuanduijieshao/hexinchengyuan/李亚鹏.webp',
    bio: '获中国科学院信息工程研究所博士研究生学位',
    subBio: '主要研究方向为大语言模型自身安全性，以及大语言模型赋能的自动化安全运营。参与多项大模型安全评测项目，并在2024年世界GEEKCON大会做大模型安全系统演示。',
    tags: [
      '大模型安全',
      '自动化安全运营',
      '世界GEEKCON大会'
    ],
    email: 'eng1@example.com',
    link: '#'
  },
  {
    name: '余海阳',
    role: '核心成员',
    avatar: '/guanyuwomen/tuanduijieshao/hexinchengyuan/余海阳.webp',
    bio: '数据空间研究院认知大模型负责人',
    subBio: ' 研究围绕多模态大模型、内容生成与信息鉴伪等方向，主持和参与国家级课题4项，发表学术论文数十篇，拥有知识产权30余项，在认知智能领域具有丰富工程落地应用经验。',
    tags: [
      '多模态大模型',
      '内容生成',
      '信息鉴伪',
      '认知智能'
    ],
    email: 'eng1@example.com',
    link: '#'
  },
]


/** 入场动效：IntersectionObserver 给元素添加 in-view 类 */
const vReveal = {
  mounted(el: HTMLElement) {
    const delay = (el.dataset?.delay ? parseInt(el.dataset.delay) : 0) || 0
    el.style.opacity = '0'
    el.style.transform = 'translateY(12px)'
    el.style.transition = `opacity .6s ease, transform .6s ease`
    el.style.transitionDelay = `${delay}ms`
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          io.unobserve(el)
        }
      })
    }, { threshold: 0.15 })
    io.observe(el)
  }
}
onMounted(() => {
  // no-op：指令即可完成
})
</script>

<script lang="ts">
export default {
  directives: {
    reveal: (undefined as any) // 仅为类型占位，真正注册在 <script setup> 上下文
  }
}
</script>

<style scoped>
/* 统计卡片的统一外观 */
.stat-card {
  border: 1px solid rgba(255, 255, 255, .08);
  background: linear-gradient(180deg, rgba(255, 255, 255, .7), rgba(255, 255, 255, .55));
  border-radius: 14px;
  padding: 14px;
}

.dark .stat-card {
  background:
    linear-gradient(180deg, rgba(22, 24, 34, .92) 0%, rgba(14, 16, 24, .86) 100%),
    radial-gradient(260px 180px at 100% 100%, rgba(88, 48, 214, .12), transparent 60%);
  border-color: rgba(255, 255, 255, .08);
}
</style>
