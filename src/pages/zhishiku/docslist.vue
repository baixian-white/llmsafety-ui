<template>
  <!-- 主容器：网格背景 + 主题色 -->
  <div
    class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark relative"
  >
    <!-- 深色霓虹背景 -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- 头部 -->
      <header class="text-center mb-10 md:mb-14 animate-fade-in-down">
        <h1
          class="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-3"
        >
          知识库
        </h1>
        <p class="text-base md:text-lg text-indigo-500 font-semibold tracking-wider">
          大模型安全常见工具及框架
        </p>
      </header>

      <!-- 搜索 & 新建 -->
      <section class="max-w-5xl mx-auto mb-8 animate-fade-in-up" style="animation-delay: 80ms;">
        <div class="panel flex gap-3 items-center">
          <input
            v-model.trim="q"
            type="text"
            class="input-like flex-1 h-10"
            placeholder="搜索标题/正文/标签（例如：安全、越狱、RAG）"
            @keyup.enter="onSearch"
          />
          <button class="btn-primary h-10 px-4" @click="onSearch" :disabled="loading">
            搜索
          </button>
          <RouterLink to="/test/editor" class="btn-ghost h-10 px-4">新建文档</RouterLink>
        </div>
        <p v-if="err" class="text-red-600 mt-2">加载失败：{{ err }}</p>
      </section>

      <!-- 列表 -->
      <section class="max-w-5xl mx-auto">
        <!-- 骨架屏（卡片带封面骨架） -->
        <ul v-if="loading" class="space-y-4">
          <li v-for="i in 6" :key="i"
              class="p-4 md:p-5 bg-white/70 dark:bg-white/5 rounded-xl border border-gray-200/80 dark:border-white/10 shadow-md animate-pulse">
            <div class="flex gap-4">
              <div class="w-40 md:w-52 shrink-0">
                <div class="w-full h-24 md:h-32 rounded-lg bg-gray-200/70 dark:bg-white/10"></div>
              </div>
              <div class="flex-1">
                <div class="h-5 w-2/3 bg-gray-200/70 dark:bg-white/10 rounded mb-3"></div>
                <div class="h-4 w-full bg-gray-200/70 dark:bg-white/10 rounded mb-2"></div>
                <div class="h-4 w-5/6 bg-gray-200/70 dark:bg-white/10 rounded mb-3"></div>
                <div class="flex gap-2">
                  <div class="h-6 w-16 bg-gray-200/70 dark:bg-white/10 rounded"></div>
                  <div class="h-6 w-16 bg-gray-200/70 dark:bg-white/10 rounded"></div>
                  <div class="h-6 w-16 bg-gray-200/70 dark:bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- 真正数据：带封面 + 简述（excerpt） -->
        <ul v-else class="space-y-4">
          <li
            v-for="(item, i) in items"
            :key="item.id"
            class="p-4 md:p-5 bg-white/70 dark:bg-white/5 rounded-xl border border-gray-200/80 dark:border-white/10 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="flex gap-4">
              <!-- 封面 -->
              <RouterLink :to="`/zhishiku/editor/${encodeURIComponent(item.slug || item.id)}`" class="w-40 md:w-52 shrink-0 group relative">
                <div class="w-full h-24 md:h-32 rounded-lg overflow-hidden border border-gray-200/80 dark:border-white/10 bg-gray-100/70 dark:bg-white/5">
                  <img v-if="coverUrl(item)"
                       :src="coverUrl(item)"
                       :alt="item.title || '封面'"
                       class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"/>
                  <!-- 无封面占位 -->
                  <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-cyan-500/10">
                    <span class="text-sm text-gray-500 dark:text-gray-400">无封面</span>
                  </div>
                </div>
                <!-- 角标：最新 -->
                <span
                  v-if="i === 0 && page === 1"
                  class="absolute -top-2 -left-2 px-2 py-0.5 text-[10px] rounded-md bg-indigo-600 text-white shadow"
                >最新</span>
              </RouterLink>

              <!-- 文本块 -->
              <div class="flex-1 min-w-0 flex flex-col gap-2">
                <!-- 标题（点击跳转） -->
                <RouterLink
                  :to="`/zhishiku/editor/${encodeURIComponent(item.slug || item.id)}`"
                  class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white hover:underline underline-offset-4 decoration-indigo-400 truncate"
                >
                  <span class="inline-flex items-center gap-2">
                    <span class="size-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"></span>
                    {{ item.title || '（未命名）' }}
                  </span>
                </RouterLink>

                <!-- 简述（excerpt）三行截断 -->
                <p class="text-gray-600 dark:text-gray-300 leading-7 line-clamp-3">
                  {{ resolveExcerpt(item) }}
                </p>

                <!-- 标签与时间 -->
                <div class="flex flex-wrap items-center gap-2 mt-1">
                  <span
                    v-for="(t, ti) in (item.tags || [])"
                    :key="ti"
                    class="px-2.5 py-1 text-xs rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20"
                  ># {{ t }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto truncate">
                    更新：{{ fmt(item.updated_at) }}
                  </span>
                </div>

                <!-- 操作 -->
                <div class="pt-1">
                  <RouterLink
                    :to="`/zhishiku/editor/${encodeURIComponent(item.slug || item.id)}`"
                    class="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300 hover:underline underline-offset-4"
                  >
                    继续编辑
                    <svg class="size-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- 空状态 -->
        <div v-if="!loading && items.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-16">
          没有符合条件的条目。
        </div>

        <!-- 分页 -->
        <div class="max-w-5xl mx-auto mt-8 flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            每页 {{ limit }} 条，第 {{ page }} 页
          </div>
          <div class="inline-flex gap-2">
            <button class="btn-ghost h-9 px-3"
                    :disabled="page<=1 || loading"
                    @click="prev">上一页</button>
            <button class="btn-primary h-9 px-3"
                    :disabled="items.length < limit || loading"
                    @click="next">下一页</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchDocs, type DocListItem } from '@/api/docs'

import { useRouter } from 'vue-router'
const router = useRouter()

/** 生成编辑页路由：优先 slug，缺失时回退到 id */
function editLink(item: Partial<DocListItem> & Record<string, any>) {
  const key = item?.slug || item?.id
  return key ? `/zhishiku/editor/${encodeURIComponent(String(key))}` : '/zhishiku/editor'
}

const q = ref<string>('')
const items = ref<DocListItem[]>([])
const loading = ref(false)
const err = ref<string | null>(null)

const limit = 10
const page = ref(1)
let offset = 0

function fmt(iso?: string) {
  if (!iso) return '-'
  const d = new Date(iso); const p = (n:number)=>String(n).padStart(2,'0')
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/**
 * 兼容多种字段名：cover / cover_url / image / thumbnail
 * 也支持后端仅返回相对路径的情况（前缀由 VITE_ASSET_BASE 控制，可选）
 */
function coverUrl(item: Partial<DocListItem> & Record<string, any>) {
  const raw: string | undefined = item.cover || item.cover_url || item.image || item.thumbnail
  if (!raw) return ''
  // 如果是绝对 URL 或以 / 开头直接返回
  if (/^(https?:)?\/\//.test(raw) || raw.startsWith('/')) return raw
  // 相对路径前置资源根（可在 .env 中配置 VITE_ASSET_BASE=/storage/assets 或 /uploads 等）
  const base = import.meta.env.VITE_ASSET_BASE || ''
  return base ? `${String(base).replace(/\/$/, '')}/${raw.replace(/^\.\//,'')}` : raw
}

/**
 * 简述字段回退逻辑：优先 excerpt -> summary -> description -> 从 content 截取
 */
function resolveExcerpt(item: Partial<DocListItem> & Record<string, any>) {
  const src = item.excerpt || item.summary || item.description || ''
  if (src) return String(src)
  const content = String(item.content || '')
  // 粗略去除 Markdown 标记
  const plain = content
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/\*\*?|__|~~|`|>#?\s?/g, ' ')
    .replace(/\!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return plain ? plain.slice(0, 140) + (plain.length > 140 ? '…' : '') : '（无摘要）'
}

async function load() {
  loading.value = true; err.value = null
  try {
    items.value = await fetchDocs(q.value || undefined, limit, offset)
  } catch (e:any) {
    err.value = e?.message || '未知错误'
  } finally {
    loading.value = false
  }
}

function onSearch() {
  page.value = 1
  offset = 0
  load()
}

function next(){ page.value += 1; offset += limit; load() }
function prev(){ page.value = Math.max(1, page.value - 1); offset = Math.max(0, offset - limit); load() }

onMounted(load)
</script>

<style scoped>
@reference "../../index.css";

/* 背景网格（与参考页一致） */
.bg-grid-pattern-light { background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px); background-size: 2rem 2rem; }
.bg-grid-pattern-dark { background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 2rem 2rem; }

/* 动画（与参考页一致） */
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp   { from { opacity: 0; transform: translateY(20px); }  to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { opacity: 0; animation: fadeInDown 0.8s ease-out forwards; }
.animate-fade-in-up   { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
.animation-delay-4000 { animation-delay: 4s; }

/* 复用全局的 panel/btn/input 样式（在 index.css 已定义） */
.panel { @apply p-4 md:p-5 bg-background rounded-md border border-border shadow-md hover:shadow-lg hover:shadow-purple/20 dark:hover:border-purple transition-all duration-300; }
.btn-primary { @apply inline-flex items-center gap-2 rounded-md text-sm font-medium border border-border bg-background/60 shadow-md hover:shadow-lg hover:shadow-purple/20 dark:shadow-purple/20 dark:hover:shadow-lg dark:hover:border-purple transition; }
.btn-ghost { @apply inline-flex items-center gap-2 rounded-md text-sm font-medium border bg-white/60 hover:bg-gray-100/60 dark:bg-white/5 dark:hover:bg-white/10 px-3; border-color: rgba(229,231,235,.8); }
.input-like { @apply w-full rounded-md text-sm border border-[rgb(var(--border))]/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-gray-900 dark:text-gray-100 px-3 outline-none; }

/* 行数截断工具（如果项目没启用 @tailwindcss/line-clamp，在此兜底） */
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
</style>
