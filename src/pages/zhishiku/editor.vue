<!-- src/pages/zhishiku/editor.vue -->
<template>
  <div class=" min-h-screen mt-16 w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-hidden font-sans transition-colors duration-500 relative">
    <!-- 顶部条 -->
    <header class="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3 min-w-0">
          <span class="inline-flex items-center justify-center size-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-600 dark:text-indigo-300 border border-white/20 shadow">✍️</span>
          <div class="truncate">
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-none">{{ isEdit ? '编辑文档' : '新建文档' }}</p>
            <p class="text-sm text-gray-900 dark:text-gray-100 truncate">
              {{ title || '未命名文档' }}
              <span v-if="version !== null" class="ml-2 text-xs text-gray-500 dark:text-gray-400">v{{ version }}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 text-sm"
            @click="resetForm"
            :disabled="saving"
            title="清空当前表单（新建模式有效）"
          >
            重置
          </button>
          <button
            class="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow"
            @click="handleSave"
            :disabled="saving"
          >
            {{ saving ? '保存中...' : (isEdit ? '保存更新' : '创建文档') }}
          </button>
        </div>
      </div>
    </header>

    <!-- 主体 -->
    <main class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 表单区 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：主要内容 -->
        <section class="lg:col-span-8 space-y-6">
          <!-- 标题 -->
          <div class="panel p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
            <label class="block text-sm text-gray-600 dark:text-gray-400 mb-2">标题</label>
            <input
              v-model.trim="title"
              type="text"
              class="w-full rounded-xl border border-gray-300/80 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 outline-none focus:ring-2 ring-indigo-500/50"
              placeholder="请输入标题"
            />
          </div>

          <!-- 摘要 -->
          <div class="panel p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
            <label class="block text-sm text-gray-600 dark:text-gray-400 mb-2">简述 / 摘要</label>
            <textarea
              v-model="summary"
              rows="4"
              class="w-full rounded-xl border border-gray-300/80 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 outline-none focus:ring-2 ring-indigo-500/50"
              placeholder="用于列表页卡片展示的简述"
            ></textarea>
          </div>

          <!-- 正文（Markdown） -->
          <div class="panel p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm text-gray-600 dark:text-gray-400">正文（Markdown）</label>
              <div class="text-xs text-gray-500 dark:text-gray-400">支持上传资源后自动插入图片 Markdown</div>
            </div>
            <textarea
              v-model="content"
              rows="18"
              class="w-full rounded-xl border border-gray-300/80 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 font-mono text-sm outline-none focus:ring-2 ring-indigo-500/50"
              placeholder="在此编写 Markdown 正文..."
            ></textarea>

            <!-- 工具栏：插入图片 -->
            <div class="mt-3 flex items-center gap-3">
              <input ref="assetInput" type="file" accept="image/*" class="hidden" @change="onPickAsset" />
              <button
                class="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 text-sm"
                @click="() => assetInput?.click()"
                :disabled="!isEdit || uploadingAsset"
                title="先保存创建文档后才可上传资源"
              >
                {{ uploadingAsset ? '上传中...' : '上传图片并插入' }}
              </button>
              <p v-if="!isEdit" class="text-xs text-amber-600">提示：请先创建文档（保存一次）才能上传图片资源。</p>
            </div>
          </div>
        </section>

        <!-- 右侧：元信息 -->
        <aside class="lg:col-span-4 space-y-6">
          <!-- 封面 -->
          <div class="panel p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm text-gray-600 dark:text-gray-400">封面</label>
              <span v-if="version !== null" class="text-xs text-gray-500 dark:text-gray-400">当前版本 v{{ version }}</span>
            </div>

            <div class="aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <img
                v-if="cover_url"
                :src="cover_url"
                :alt="title || '封面'"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-sm text-gray-400">暂无封面</div>
            </div>

            <div class="mt-3 flex items-center gap-3">
              <input ref="coverInput" type="file" accept="image/*" class="hidden" @change="onPickCover" />
              <button
                class="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 text-sm"
                @click="() => coverInput?.click()"
                :disabled="!isEdit || uploadingCover"
                title="先保存创建文档后才可上传封面"
              >
                {{ uploadingCover ? '上传封面中...' : '上传封面' }}
              </button>
              <button
                class="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 text-sm"
                @click="clearCover"
                :disabled="!isEdit || !cover_url || saving"
                title="清除封面（需点击保存才生效）"
              >
                清除
              </button>
            </div>

            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              支持 png/jpg/jpeg/webp/gif；上传成功会自动回填 <code>cover_url</code> 并<strong>version+1</strong>。
              若随后再更新正文，请使用最新版本号，避免 409 冲突。
            </p>
          </div>

          <!-- 标签 -->
          <div class="panel p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
            <label class="block text-sm text-gray-600 dark:text-gray-400 mb-2">标签（逗号分隔）</label>
            <input
              v-model="tagsInput"
              type="text"
              class="w-full rounded-xl border border-gray-300/80 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 outline-none focus:ring-2 ring-indigo-500/50"
              placeholder="例如：LLM, 对抗攻击, 安全评测"
            />
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="(t, i) in tagsFromInput"
                :key="t + i"
                class="px-2 py-0.5 rounded-lg text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
              >
                {{ t }}
              </span>
            </div>
          </div>

          <!-- 信息展示 -->
          <div class="panel p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm space-y-1">
            <div class="text-gray-600 dark:text-gray-400">ID/Slug：
              <span class="text-gray-900 dark:text-gray-100">{{ isEdit ? routeKey : '-' }}</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400">创建时间：
              <span class="text-gray-900 dark:text-gray-100">{{ created_at || '-' }}</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400">更新时间：
              <span class="text-gray-900 dark:text-gray-100">{{ updated_at || '-' }}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// ===== 依赖 =====
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 对接你的 API 封装
import {
  getDoc,
  createDoc,
  updateDoc,
  uploadCover,
  uploadAsset,
  type DocOut,
} from '@/api/docs'

// ===== 路由参数：有 key 则为编辑模式 =====
const route = useRoute()
const routeKey = route.params.key as string | undefined
const isEdit = computed(() => !!routeKey)

// ===== 表单状态 =====
const title = ref<string>('')
const summary = ref<string>('')         // 简述
const content = ref<string>('')         // Markdown 正文
const tagsInput = ref<string>('')       // 逗号分隔输入框
const cover_url = ref<string>('')       // 当前封面（可为空）

// 只读信息
const created_at = ref<string>('')
const updated_at = ref<string>('')

// 乐观锁版本：后端每次更新会 +1；PUT 必须携带
const version = ref<number | null>(null)

// UI 状态
const saving = ref(false)
const uploadingCover = ref(false)
const uploadingAsset = ref(false)

// 文件 input 引用
const coverInput = ref<HTMLInputElement | null>(null)
const assetInput = ref<HTMLInputElement | null>(null)

// ===== 计算：解析 tagsInput -> string[] =====
const tagsFromInput = computed<string[]>(() =>
  tagsInput.value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
)

// ===== 生命周期：编辑模式下加载详情 =====
onMounted(async () => {
  if (!isEdit.value || !routeKey) return
  try {
    const data: DocOut = await getDoc(routeKey)
    // 回填表单
    title.value = data.title || ''
    summary.value = data.summary || ''
    content.value = data.content || ''
    cover_url.value = data.cover_url || ''
    tagsInput.value = (data.tags || []).join(', ')
    created_at.value = data.created_at || ''
    updated_at.value = data.updated_at || ''
    version.value = data.version
  } catch (e: any) {
    alert('加载文档失败：' + e.message)
  }
})

// ===== 方法：上传封面 =====
async function onPickCover(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files || !input.files.length) return
  const file = input.files[0]
  if (!isEdit.value || !routeKey) {
    alert('请先保存创建文档后再上传封面')
    input.value = ''
    return
  }
  uploadingCover.value = true
  try {
    const resp = await uploadCover(routeKey, file)
    // 封面上传接口会自动 version+1，且返回最新 cover_url 和 version
    cover_url.value = resp.cover_url
    version.value = resp.version
    // 同时建议刷新 updated_at（后端已更新）
    const fresh = await getDoc(routeKey)
    updated_at.value = fresh.updated_at
    alert('封面上传成功')
  } catch (e: any) {
    alert('封面上传失败：' + e.message)
  } finally {
    uploadingCover.value = false
    if (coverInput.value) coverInput.value.value = ''
  }
}

// 清除封面（需要点击“保存更新”才真正生效）
function clearCover() {
  cover_url.value = ''
}

// ===== 方法：上传图片资产并插入 Markdown =====
async function onPickAsset(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files || !input.files.length) return
  const file = input.files[0]
  if (!isEdit.value || !routeKey) {
    alert('请先保存创建文档后再上传资源')
    input.value = ''
    return
  }
  uploadingAsset.value = true
  try {
    const { url } = await uploadAsset(routeKey, file)
    // 在光标处插入一段 Markdown 图片（这里简化为追加）
    const md = `\n\n![${file.name}](${url})\n`
    content.value += md
    alert('图片已上传并插入 Markdown')
  } catch (e: any) {
    alert('资源上传失败：' + e.message)
  } finally {
    uploadingAsset.value = false
    if (assetInput.value) assetInput.value.value = ''
  }
}

// ===== 方法：保存（新建 / 更新） =====
async function handleSave() {
  if (!title.value.trim()) {
    alert('请填写标题')
    return
  }
  saving.value = true
  try {
    if (!isEdit.value) {
      // 新建：用 x-www-form-urlencoded 提交
      const created = await createDoc(
        title.value.trim(),
        content.value,
        tagsFromInput.value,
        summary.value,
        cover_url.value
      )
      // 新建成功后，填充编辑态字段（不做路由跳转也能继续编辑）
      version.value = created.version
      created_at.value = created.created_at
      updated_at.value = created.updated_at
      cover_url.value = created.cover_url
      alert('创建成功！请刷新或进入该文档编辑页继续编辑。')
      // 你也可以在此处 router.push(`/zhishiku/${created.slug}`) 进入编辑路由
    } else {
      if (version.value === null) {
        alert('缺少版本号，请刷新后重试')
        return
      }
      // 编辑：必须携带最新 version，避免 409
      const resp = await updateDoc(
        routeKey!,
        title.value,
        content.value,
        version.value,             // 必填：乐观锁
        tagsFromInput.value,
        summary.value,
        cover_url.value
      )
      // 同步最新 version & 更新时间
      version.value = resp.version
      const fresh = await getDoc(routeKey!)
      updated_at.value = fresh.updated_at
      alert('已保存更新')
    }
  } catch (e: any) {
    // 409 等错误直接提示
    alert('保存失败：' + e.message)
  } finally {
    saving.value = false
  }
}

// ===== 方法：重置表单（新建模式） =====
function resetForm() {
  if (isEdit.value) {
    alert('当前为编辑模式，重置会丢失未保存的修改。请刷新或手动清空需要修改的字段。')
    return
  }
  title.value = ''
  summary.value = ''
  content.value = ''
  tagsInput.value = ''
  cover_url.value = ''
  created_at.value = ''
  updated_at.value = ''
  version.value = null
}
</script>

<style scoped>
@reference "../../index.css";
/* 一些小的 UI 美化（Tailwind 为主，这里极少量补充） */
.panel { box-shadow: 0 1px 0 rgba(0,0,0,0.02); }
</style>
