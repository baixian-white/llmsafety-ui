<!-- PrivacyPolicy.vue  隐私政策页面（Tailwind v4 适配：gray → zinc） -->
<template>
  <div class="ai-leaderboard-page bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
    <!-- 背景：静态网格 -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-10"></div>
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5830D6]/20 via-transparent to-transparent"></div>
        <div class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-500/10 via-transparent to-transparent"></div>
      </div>
    <main class="relative z-10 container mx-auto px-4 py-16 sm:py-24">
      <!-- 页头 -->
      <section class="container mx-auto px-4">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">
              隐私政策 <span class="gradient-chip">PRIVACY POLICY</span>
            </h1>
            <p class="mt-2 text-zinc-600 dark:text-zinc-300/90">
              我们深知个人信息对你的重要性，并会按法律法规与业界最佳实践保护你的隐私与数据安全。
            </p>
            <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              版本：{{ version }}　生效日期：{{ effectiveDate }}
            </p>
          </div>

          <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 dark:border-white/10 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300 backdrop-blur self-start">
            <span class="inline-block size-2 rounded-full animate-ping-slow" style="background:#5830D6"></span>
            加密传输 · 访问控制 · 审计留痕
          </div>
        </div>
      </section>

      <section class="container mx-auto px-4 mt-10 grid gap-8 lg:grid-cols-12">
        <!-- 侧边目录（大屏显示） -->
        <aside class="hidden lg:block lg:col-span-3">
          <nav class="sticky top-28 space-y-1">
            <a
              v-for="(item, i) in toc" :key="i"
              :href="'#' + item.id"
              class="block rounded-lg px-3 py-2 text-sm transition-all"
              :class="activeSection === item.id ? 'bg-[var(--brand)/10] text-[var(--brand)] ring-1 ring-[var(--brand)/30]' : 'text-zinc-600 dark:text-zinc-300 hover:text-[var(--brand)]'">
              {{ i + 1 }}. {{ item.title }}
            </a>
          </nav>
        </aside>

        <!-- 正文 -->
        <article class="lg:col-span-9 space-y-10">
          <!-- 提示 -->
          <div class="rounded-xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5">
            <p class="text-sm text-zinc-600 dark:text-zinc-300/90">
              本政策适用于 <b>{{ companyName }}</b> 提供的产品与服务（以下称“本服务”）。若你不同意本政策的任何内容，请立即停止使用；如继续使用，即表示你已阅读、理解并同意本政策全部条款。
            </p>
          </div>

          <!-- 各章节 -->
          <section v-for="(sec, i) in sections" :key="i" class="space-y-3" :id="sec.id" data-section>
            <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
              {{ i + 1 }}. {{ sec.title }}
            </h2>
            <div class="prose prose-zinc dark:prose-invert max-w-none">
              <template v-for="(para, j) in sec.paragraphs" :key="j">
                <p v-if="typeof para === 'string'">{{ para }}</p>
                <ul v-else-if="Array.isArray(para)" class="list-disc pl-6 space-y-1">
                  <li v-for="(li, k) in para" :key="k">{{ li }}</li>
                </ul>
              </template>
            </div>
          </section>

          <!-- 结尾 CTA -->
          <div class="rounded-2xl border border-zinc-200 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/50 dark:from-white/10 dark:to-white/5 backdrop-blur p-6 md:p-8 relative overflow-hidden">
            <div class="absolute -right-14 -bottom-14 size-[280px] rotate-12 opacity-70 stripes"></div>
            <h3 class="text-lg md:text-xl font-semibold">还有疑问？</h3>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300/90">你可以随时通过本页“联系我们”中的渠道与我们沟通，我们将在合理期限内答复。</p>
            <div class="mt-4 flex flex-wrap gap-3">
              <RouterLink to="/guanyuwomen/lianxiwomen" class="btn-primary">联系支持</RouterLink>
              <RouterLink to="/" class="btn-ghost">返回首页</RouterLink>
            </div>
          </div>
        </article>
      </section>

      <!-- 返回顶部按钮 -->
      <button
        v-show="showTop"
        @click="scrollTop"
        class="fixed bottom-6 right-6 z-20 inline-flex items-center justify-center rounded-full w-11 h-11 shadow-lg text-white transition-all hover:brightness-110 active:brightness-95"
        style="background:#5830D6">
        ▲
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const companyName = '双螺旋智能（示例）'
const version = 'v1.0'
const effectiveDate = '2025-08-18'

const toc = [
  { id: 'scope', title: '适用范围' },
  { id: 'what-we-collect', title: '我们如何收集与使用信息' },
  { id: 'cookies', title: 'Cookie 与同类技术' },
  { id: 'share-transfer', title: '共享、转让与公开披露' },
  { id: 'cross-border', title: '跨境传输' },
  { id: 'retention', title: '信息保存期限' },
  { id: 'security', title: '信息安全保护' },
  { id: 'your-rights', title: '你的权利' },
  { id: 'minors', title: '未成年人保护' },
  { id: 'third-party', title: '第三方服务与 SDK' },
  { id: 'updates', title: '本政策的更新' },
  { id: 'contact', title: '如何联系我们' },
  { id: 'misc', title: '其他' },
]

// 正文内容（简明合规模板，按需调整）
const sections = [
  {
    id: 'scope',
    title: '适用范围',
    paragraphs: [
      `本政策适用于你通过网页、移动端、API 或其他方式使用本服务的情形。若特定产品、功能另有单独隐私条款，以该条款为准；与本政策不一致的，以该条款为准。`,
      [
        '本政策不适用于第三方向你提供的服务；',
        '你通过第三方渠道访问本服务时，第三方的隐私政策可能同样适用。'
      ]
    ]
  },
  {
    id: 'what-we-collect',
    title: '我们如何收集与使用信息',
    paragraphs: [
      '我们遵循“最小必要”“目的明确”“公开透明”的原则，仅在达成产品功能所必需的范围内处理你的数据：',
      [
        '你主动提供的信息：注册/登录信息（昵称、头像、邮箱/手机号）、组织/发票信息、联系内容与附件等；',
        '自动采集的信息：设备标识、浏览器/操作系统、IP 与大致位置、日志与崩溃信息、操作记录与审计记录；',
        '业务数据：你输入给模型的文本/文件、模型输出、评测与判定结果；',
        '来源于第三方的信息：在你授权或法律允许的范围内从合作伙伴处获取。'
      ],
      '用途包括但不限于：提供/维护/优化服务、账号与权限管理、风控与安全、客户支持、统计与报表、遵循法律法规。若我们拟将你的信息用于本文未载明的其他目的，将再次征得你的同意。'
    ]
  },
  {
    id: 'cookies',
    title: 'Cookie 与同类技术',
    paragraphs: [
      '为确保网站基本功能与偏好设置、改进体验和统计分析，我们可能使用 Cookie、LocalStorage、像素标签等技术。你可在浏览器中清理或禁用相关功能，但可能影响部分功能的使用体验。'
    ]
  },
  {
    id: 'share-transfer',
    title: '共享、转让与公开披露',
    paragraphs: [
      '我们不会向无关第三方共享、转让或公开披露你的个人信息，除非：',
      [
        '与你的授权或在你主动选择下进行（如使用第三方身份认证、支付）；',
        '基于法律法规、行政/司法机关要求；',
        '为维护你、我们或公众的生命财产安全所必需；',
        '与供应商/合作伙伴为实现功能所必需的共享（将签署严格的数据处理协议并进行必要的安全评估）。'
      ]
    ]
  },
  {
    id: 'cross-border',
    title: '跨境传输',
    paragraphs: [
      '若因在境外服务器处理或与境外合作伙伴合作而发生跨境传输，我们将遵守适用法律法规，采取必要的合规措施（如签署标准合同、开展安全评估等），并向你充分告知传输目的、接收方类别与类型、处理方式与安全保障。'
    ]
  },
  {
    id: 'retention',
    title: '信息保存期限',
    paragraphs: [
      '我们仅在达成本政策所述目的所必需的最短期限内保存你的信息，除非法律另有要求。到期后我们将删除或匿名化处理。你也可通过“你的权利”章节所述方式申请更早删除。'
    ]
  },
  {
    id: 'security',
    title: '信息安全保护',
    paragraphs: [
      [
        '我们采用加密传输、访问控制、最小权限、日志审计、备份与恢复等措施保护信息安全；',
        '我们建立了数据分级分类与安全管理制度，并对员工进行安全与隐私培训；',
        '尽管已采取合理有效的措施，但互联网环境并非绝对安全。若发生安全事件，我们将按法律法规履行通报与处置义务。'
      ]
    ]
  },
  {
    id: 'your-rights',
    title: '你的权利',
    paragraphs: [
      [
        '访问与更正：你可在个人中心或通过联系渠道访问/更正你的信息；',
        '复制与携带：在法律允许范围内，你可申请导出你的个人信息副本；',
        '删除：在符合法律规定或合同约定的情形下，你可申请删除；',
        '撤回同意：当依赖你的同意作为处理依据时，你可随时撤回；',
        '注销账号：你可申请注销账号，注销后我们将删除或匿名化处理相关数据，法律法规另有要求的除外；',
        '投诉与申诉：你可通过“如何联系我们”章节所述渠道提交，我们将在合理期限内反馈处理结果。'
      ]
    ]
  },
  {
    id: 'minors',
    title: '未成年人保护',
    paragraphs: [
      '我们主要面向成年人用户。若你是未成年人，请在监护人同意与指导下使用本服务。若监护人发现我们在未获同意的情况下收集了未成年人信息，可联系我们予以及时处理。'
    ]
  },
  {
    id: 'third-party',
    title: '第三方服务与 SDK',
    paragraphs: [
      '本服务可能集成第三方登录、分析、云存储、支付等服务。这些第三方将依据其隐私政策处理你的信息。我们会尽到必要的安全审查义务，并在合理范围内对其行为进行约束与评估。具体清单可在“平台合规”页或本政策更新版本中补充公示。'
    ]
  },
  {
    id: 'updates',
    title: '本政策的更新',
    paragraphs: [
      '我们可能适时更新本政策。若变更将实质影响你的权利，我们会通过站内通知、弹窗或页面显著位置提示，并在必要时重新征求你的同意。'
    ]
  },
  {
    id: 'contact',
    title: '如何联系我们',
    paragraphs: [
      [
        '邮箱：',
        '地址：',
        '为核验与定位问题，来信请附：账号/组织、诉求与理由、相关截图与时间。'
      ]
    ]
  },
  {
    id: 'misc',
    title: '其他',
    paragraphs: [
      '除非法律另有强制性规定，本政策的解释与争议解决以本服务运营地法律为准，并由运营地有管辖权的法院专属管辖。'
    ]
  }
]

const activeSection = ref<string>(toc[0].id)
const showTop = ref(false)
let observer: IntersectionObserver | null = null
let scrollHandler: any = null

onMounted(() => {
  const targets = document.querySelectorAll('[data-section]')
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = (entry.target as HTMLElement).id
        if (id) activeSection.value = id
      }
    })
  }, { threshold: 0.4 })
  targets.forEach(el => observer!.observe(el))

  scrollHandler = () => { showTop.value = window.scrollY > 300 }
  window.addEventListener('scroll', scrollHandler)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', scrollHandler)
})

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
@theme {
  --color-gray-50: var(--color-zinc-50);
  --color-gray-100: var(--color-zinc-100);
  --color-gray-200: var(--color-zinc-200);
  --color-gray-300: var(--color-zinc-300);
  --color-gray-400: var(--color-zinc-400);
  --color-gray-500: var(--color-zinc-500);
  --color-gray-600: var(--color-zinc-600);
  --color-gray-700: var(--color-zinc-700);
  --color-gray-800: var(--color-zinc-800);
  --color-gray-900: var(--color-zinc-900);
}
:root { --brand: #5830D6; }

/* 渐变角标 */
.gradient-chip {
  display: inline-block;
  margin-left: .5rem;
  padding: .2rem .5rem;
  border-radius: .75rem;
  font-size: .75rem;
  background: linear-gradient(90deg, #5830D6 0%, #8a6cff 50%, #b7a7ff 100%);
  color: white;
}

/* 文章排版（不依赖额外插件） */
.prose :where(p):not(:where(.not-prose, .not-prose *)) {
  color: oklch(var(--color-zinc-700));
  line-height: 1.75; /* ≈ leading-7 */
}
.dark .prose :where(p):not(:where(.not-prose, .not-prose *)) {
  color: oklch(var(--color-zinc-300));
}
.prose :where(h2):not(:where(.not-prose, .not-prose *)) {
  margin-top: 0.25rem; /* mt-1 */
}
/* 背景装饰条纹 */
.stripes {
  background: repeating-linear-gradient(45deg,
      rgba(88,48,214,0.22) 0 8px,
      rgba(88,48,214,0.05) 8px 16px);
  border-radius: 32px;
  filter: blur(1px);
}

/* 轻量呼吸光点 */
@keyframes ping-slow {
  0% { box-shadow: 0 0 0 0 rgba(88,48,214,.45) }
  70% { box-shadow: 0 0 0 16px rgba(88,48,214,0) }
  100% { box-shadow: 0 0 0 0 rgba(88,48,214,0) }
}
.animate-ping-slow { animation: ping-slow 2.2s cubic-bezier(0,0,.2,1) infinite; }
</style>
