<!-- src/pages/guanyuwomen/lianxiwomen.vue -->
<template>
  <div
    class="ai-leaderboard-page bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
    <!-- 背景：静态网格 -->
    <!-- 背景：静态网格 -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-10 pointer-events-none">
      </div>
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5830D6]/20 via-transparent to-transparent pointer-events-none">
      </div>
      <div
        class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-500/10 via-transparent to-transparent pointer-events-none">
      </div>
    </div>
    <main class="relative z-10 container mx-auto px-4 py-16 sm:py-24">
      <!-- 页头 -->
      <section class="container mx-auto px-4 pt-24 md:pt-28">
        <div class="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div class="text-left">
            <h1
              class="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text
                        bg-gradient-to-br from-gray-900 via-gray-700 to-black dark:from-white dark:to-gray-400 leading-tight tracking-tighter">
              联系我们
            </h1>
            <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
              有合作或产品问题？把你的需求告诉我们，我们会在 1 个工作日内回复你。
            </p>
          </div>
          <div
            class="inline-flex items-center gap-2 rounded-full border border-gray-200/80 dark:border-white/10 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 backdrop-blur self-start">
            <span class="inline-block size-2 rounded-full animate-ping-slow" style="background:#5830D6"></span>
            持续响应 · SLA 支持
          </div>
        </div>
      </section>

      <!-- 主体：信息卡 + 表单 -->
      <section class="container mx-auto px-4 mt-10 grid gap-8 lg:grid-cols-12 items-stretch pb-20">
        <!-- 左侧：联系方式卡片 -->
        <aside class="lg:col-span-5 space-y-6">
          <div class="panel contact-card">
            <div class="icon-chip text-purple">
              <Mail class="size-4" />
            </div>
            <div class="flex-1">
              <h3 class="text-base font-semibold">商务与合作</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">投标、联盟、渠道及企业版咨询。</p>
              <a href="mailto:biz@ai-sec.lab" class="link mt-2 inline-flex items-center gap-1">
                taijianwei1993@163.com
                <IconExternalLink class="size-3" />
              </a>
            </div>
          </div>

          <div class="panel contact-card">
            <div class="icon-chip text-purple">
              <MessageSquare class="size-4" />
            </div>
            <div class="flex-1">
              <h3 class="text-base font-semibold">技术支持</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">产品试用、API 使用、集成与故障处理。</p>
              <a href="mailto:support@ai-sec.lab" class="link mt-2 inline-flex items-center gap-1">
                taijianwei1993@163.com
                <IconExternalLink class="size-3" />
              </a>
            </div>
          </div>

          <div class="panel contact-card">
            <div class="icon-chip text-purple">
              <Phone class="size-4" />
            </div>
            <div class="flex-1">
              <h3 class="text-base font-semibold">电话</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">工作日 10:00 – 18:00（GMT+8）</p>
              <a href="tel:+86-010-0000-0000" class="link mt-2 inline-flex items-center gap-1">
                +86 15624962300（手机微信同号）
              </a>
            </div>
          </div>
        </aside>
        <!-- 右侧：联系表单 -->
        <section class="lg:col-span-7">
          <form class="panel p-6 space-y-5 h-full relative z-20 " @submit.prevent="onSubmit">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <Label for="name">称呼</Label>
                <Input id="name" v-model.trim="form.name" placeholder="张三 / Alice" />
                <p v-if="errors.name" class="form-err">{{ errors.name }}</p>
              </div>
              <div>
                <Label for="email">邮箱</Label>
                <Input id="email" type="email" v-model.trim="form.email" placeholder="you@company.com" />
                <p v-if="errors.email" class="form-err">{{ errors.email }}</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <Label for="company">公司/组织</Label>
                <Input id="company" v-model.trim="form.company" placeholder="ACME Inc." />
              </div>
              <div>
                <Label for="topic">主题</Label>
                <select id="topic" v-model="form.topic" class="input-like">
                  <option value="合作咨询">合作咨询</option>
                  <option value="技术集成">技术集成</option>
                  <option value="价格与采购">价格与采购</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <div>
              <Label for="message">你的需求</Label>
              <Textarea id="message" v-model.trim="form.message" :rows="6" placeholder="请简要描述你的场景、目标与期望时效…" />
              <div class="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>尽量提供可复现信息（如模型、API、环境）</span>
                <span>{{ form.message.length }}/1000</span>
              </div>
              <p v-if="errors.message" class="form-err">{{ errors.message }}</p>
            </div>

            <div class="flex items-center gap-2 text-sm relative z-20">
  <input
    id="agree"
    type="checkbox"
    v-model="form.agree"
    class="size-4 border border-gray-300 rounded cursor-pointer accent-[#5830D6] bg-white/70 dark:bg-white/5"
  />
  <label for="agree" class="cursor-pointer select-none">我已阅读并同意</label>
  <RouterLink to="/guanyuwomen/yinsizhengce" class="link">隐私政策</RouterLink>
</div>
<p v-if="errors.agree" class="form-err">{{ errors.agree }}</p>

            <div class="flex items-center gap-3 pt-2">
              <Button type="submit" class="btn-primary" :disabled="submitting">
                <!-- 提交中 -->
                <span v-if="submitting" class="inline-flex items-center gap-2">
                  <svg class="size-4 animate-spin" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" class="opacity-25" stroke="currentColor" stroke-width="4"
                      fill="none" />
                    <path d="M4 12a8 8 0 018-8" class="opacity-75" stroke="currentColor" stroke-width="4" fill="none" />
                  </svg>
                  <span class="whitespace-nowrap">正在发送…</span>
                </span>
                <!-- 常态 -->
                <span v-else class="inline-flex items-center gap-2">
                  <Send class="size-4" />
                  <span class="whitespace-nowrap">发送消息</span>
                </span>
              </Button>

              <Button type="button" variant="ghost" class="btn-ghost " @click="resetForm">
                清空
              </Button>
            </div>

            <!-- 成功/错误 提示 -->
            <Transition name="fade">
              <div v-if="notice.show"
                :class="['mt-4 rounded-xl px-4 py-3 text-sm border', notice.type === 'success' ? 'border-emerald-300/50 text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-400/10' : 'border-red-300/50 text-red-700 dark:text-red-300 bg-red-50/70 dark:bg-red-400/10']">
                <div class="flex items-center gap-2">
                  <component :is="notice.type === 'success' ? CheckCircle2 : AlertTriangle" class="size-4" />
                  <span>{{ notice.message }}</span>
                </div>
              </div>
            </Transition>
          </form>
        </section>
        <section class="lg:col-span-full">
          <!-- 办公地址 + 实际地图（iframe） -->
          <div class="panel p-5 relative overflow-hidden">
            <h3 class="pl-2 text-base font-semibold">办公地址</h3>
            <p class="py-2 pl-2">安徽大学 龙河校区</p>
            <div class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <Icon icon="line-md:map-marker" class="inline-block" width="24" height="24" />
              合肥市蜀山区肥西路3号
            </div>
            <div class="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <img src="@/assets/龙河校区.webp"></img>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

// shadcn-vue 组件
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

// 图标（lucide-vue-next）
import { Mail, MessageSquare, Phone, Send, CheckCircle2, AlertTriangle, ExternalLink as IconExternalLink } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'

type Notice = { show: boolean; type: 'success' | 'error'; message: string }

const form = reactive({
  name: '',
  email: '',
  company: '',
  topic: '合作咨询',
  message: '',
  agree: false
})
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const notice = reactive<Notice>({ show: false, type: 'success', message: '' })

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name) errors.name = '请填写称呼'
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = '请输入有效邮箱'
  if (!form.message || form.message.length < 10) errors.message = '请简要描述你的需求（至少 10 字）'
  if (!form.agree) errors.agree = '请先同意隐私政策'
  return Object.keys(errors).length === 0
}

async function onSubmit() {
  notice.show = false
  if (!validate()) return
  submitting.value = true
  try {
    // await fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })
    await new Promise(r => setTimeout(r, 900)) // demo 延迟
    notice.type = 'success'
    notice.message = '提交成功，我们已收到你的信息，会尽快联系你！'
    notice.show = true
    resetForm(false)
  } catch (e) {
    notice.type = 'error'
    notice.message = '提交失败，请稍后重试或通过邮箱联系 support@ai-sec.lab'
    notice.show = true
  } finally {
    submitting.value = false
  }
}

function resetForm(clearNotice = true) {
  form.name = ''
  form.email = ''
  form.company = ''
  form.topic = '合作咨询'
  form.message = ''
  form.agree = false
  if (clearNotice) notice.show = false
}
</script>

<style scoped>
.panel::before,
.panel::after {
  pointer-events: none;
}
input[type="checkbox"] {
  -webkit-appearance: checkbox;
  appearance: checkbox;
}
</style>

<style>
/* 覆盖全局 reset，恢复浏览器自带的对勾样式 */

</style>