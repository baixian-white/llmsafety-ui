<template>
  <!-- 主容器，添加了网格背景和主题颜色 -->
  <div
    class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark">
    <!-- 背景装饰：仅在深色模式下显示 -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block">
      <div
        class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse">
      </div>
      <div
        class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000">
      </div>
    </div>

    <!-- 内容容器，相对定位以置于背景之上 -->
    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- 4. 越狱风险排行榜区域 -->
      <section class="mb-20 md:mb-28">
        <header class="text-center mb-12 animate-fade-in-up" style="animation-delay: 600ms;">
          <h2 class="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            <span class="text-gray-900 dark:text-white">AI 模型安全</span>
            <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">风险排行榜</span>
          </h2>
          <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            基于标准测试集的模型“越狱”风险评估，展示各大模型的安全防护能力。
          </p>
        </header>

        <div
          class="w-full max-w-5xl mx-auto p-6 mb-8 bg-white/50 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg animate-fade-in-up"
          style="animation-delay: 750ms;">
          <div class="flex items-start gap-4">
            <ShieldCheck class="w-12 h-12 text-indigo-500 flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">评估方法说明</h3>
              <p class="text-gray-600 dark:text-gray-400">
                本排行榜旨在提供一个透明、公正的模型安全性能参考。评估核心在于一项严格的“越狱”压力测试：我们精选了100个经过特殊构造的有害问题，对每个模型进行测试。为了保证评估的稳定性和准确性，每个问题都会重复测试3次。最终，我们根据模型在总计300次测试中的“越狱”成功率进行排名，数值越低，代表模型的安全防护能力越强。
              </p>
            </div>
          </div>
        </div>

        <div class="w-full max-w-5xl mx-auto animate-fade-in-up" style="animation-delay: 900ms;">
          <div
            class="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm sm:text-base text-left">
                <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-black/20">
                  <tr>
                    <th scope="col" class="px-4 sm:px-6 py-3 text-center w-16">排名</th>
                    <th scope="col" class="px-4 sm:px-6 py-3">模型ID</th>
                    <th scope="col" class="px-4 sm:px-6 py-3 text-center">100个问题越狱率</th>
                    <th scope="col" class="px-4 sm:px-6 py-3 text-center">测试总越狱率</th>
                    <th scope="col" class="px-4 sm:px-6 py-3 text-center">总越狱次数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(model, index) in rankedModels" :key="model.id"
                    class="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors duration-200">
                    <td class="px-4 sm:px-6 py-4 text-center">
                      <span :class="getRankClass(index + 1)" class="font-bold text-lg">
                        {{ index + 1 }}
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {{ model.name }}
                      <p class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ model.id }}</p>
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-center">
                      <span
                        class="px-2.5 py-0.5 text-xs sm:text-sm font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                        {{ (model.hundredRate * 100).toFixed(1) }}%
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-center">
                      <span
                        class="px-2.5 py-0.5 text-xs sm:text-sm font-semibold rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300">
                        {{ (model.totalRate * 100).toFixed(1) }}%
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-center font-mono text-gray-700 dark:text-gray-300">
                      {{ model.jailbreakCount }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. 新增的幻觉率排行榜区域 -->
      <section class="mb-20 md:mb-28">
        <header class="text-center mb-12 animate-fade-in-up" style="animation-delay: 1050ms;">
          <h2 class="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            <span class="text-gray-900 dark:text-white">AI 模型</span>
            <span class="bg-gradient-to-r from-amber-500 to-rose-500 text-transparent bg-clip-text">幻觉率排行榜</span>
          </h2>
          <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            评估模型在回答事实性问题时，产生不真实或捏造信息的比率，保障AI伦理与负责任的开发。
          </p>
        </header>

        <div
          class="w-full max-w-5xl mx-auto p-6 mb-8 bg-white/50 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg animate-fade-in-up"
          style="animation-delay: 1200ms;">
          <div class="flex items-start gap-4">
            <FileCheck class="w-12 h-12 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">评估方法说明</h3>
              <p class="text-gray-600 dark:text-gray-400">
                我们使用包含500个多样化领域事实性问题的标准数据集（TruthfulQA）对模型进行测试。幻觉率的计算标准为：模型回答中包含与公认事实相悖的陈述的比例。幻觉率越低，代表模型在提供准确、可靠信息方面的能力越强。
              </p>
            </div>
          </div>
        </div>

        <div class="w-full max-w-5xl mx-auto animate-fade-in-up" style="animation-delay: 1350ms;">
          <div
            class="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm sm:text-base text-left">
                <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-black/20">
                  <tr>
                    <th scope="col" class="px-4 sm:px-6 py-3 text-center w-16">排名</th>
                    <th scope="col" class="px-4 sm:px-6 py-3">模型ID</th>
                    <th scope="col" class="px-4 sm:px-6 py-3 text-center">幻觉率</th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(model, index) in rankedHallucinationModels" :key="model.id"
                    class="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors duration-200">
                    <td class="px-4 sm:px-6 py-4 text-center">
                      <span :class="getRankClass(index + 1)" class="font-bold text-lg">
                        {{ index + 1 }}
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {{ model.name }}
                      <p class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ model.id }}</p>
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-center">
                      <span
                        class="px-2.5 py-0.5 text-xs sm:text-sm font-semibold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300">
                        {{ (model.hallucinationRate * 100).toFixed(1) }}%
                      </span>
                    </td>


                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. "一键试用" 区域 -->
      <!-- <section class="text-center animate-fade-in-up" style="animation-delay: 1500ms;">
        <h2
          class="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
          准备好测试您的模型了吗？</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8">立即开始，加固您的AI防线，防范越狱风险。</p>
        <Button size="lg"
          class="bg-indigo-500 text-white font-bold text-lg px-10 py-6 rounded-full hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/40">
          一键试用
        </Button>
      </section> -->

    </main>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue';
// 假设您已经安装了 lucide-vue-next
// 您需要根据您的项目设置来调整这些导入
import { Bomb, MegaphoneOff, ShieldAlert, BookOpen, ArrowRightCircle, ShieldCheck, FileCheck } from 'lucide-vue-next';

// 导入 Shadcn UI 组件
// 请确保您已经通过 CLI 添加了这些组件
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';



// 定义越狱风险排行榜数据
const models = ref([
  { name: '腾讯元宝', id: 'hunyuan-lite', totalJailbreaks: 25, hundredJailbreaks: 23, totalRate: 0.0833, hundredRate: 0.23, jailbreakCount: 25 },
  { name: '文心一言', id: 'ernie-4.5-turbo-32k', totalJailbreaks: 29, hundredJailbreaks: 25, totalRate: 0.0967, hundredRate: 0.25, jailbreakCount: 29 },
  { name: '千问', id: 'qwen-turbo', totalJailbreaks: 36, hundredJailbreaks: 33, totalRate: 0.12, hundredRate: 0.33, jailbreakCount: 36 },
  { name: '千问', id: 'qwen2.5-72b-instruct', totalJailbreaks: 43, hundredJailbreaks: 42, totalRate: 0.1433, hundredRate: 0.42, jailbreakCount: 43 },
  { name: '千问', id: 'qwen2.5-32b-instruct', totalJailbreaks: 46, hundredJailbreaks: 40, totalRate: 0.1533, hundredRate: 0.40, jailbreakCount: 46 },
  { name: 'deepseek', id: 'deepseek-r1', totalJailbreaks: 54, hundredJailbreaks: 44, totalRate: 0.18, hundredRate: 0.44, jailbreakCount: 54 },
  { name: 'kimi', id: 'moonshot-v1-8k', totalJailbreaks: 61, hundredJailbreaks: 50, totalRate: 0.2033, hundredRate: 0.50, jailbreakCount: 61 },
  { name: 'llama2', id: 'llama-4-maverick-17b-128e-instruct', totalJailbreaks: 65, hundredJailbreaks: 55, totalRate: 0.2167, hundredRate: 0.55, jailbreakCount: 65 },
  { name: '百川', id: 'Baichuan2-Turbo', totalJailbreaks: 68, hundredJailbreaks: 60, totalRate: 0.2267, hundredRate: 0.60, jailbreakCount: 68 },
  { name: '豆包', id: 'doubao-lite-128k-240828', totalJailbreaks: 72, hundredJailbreaks: 56, totalRate: 0.2400, hundredRate: 0.56, jailbreakCount: 72 },
  { name: '豆包', id: 'doubao-lite-32k-240828', totalJailbreaks: 74, hundredJailbreaks: 57, totalRate: 0.2467, hundredRate: 0.57, jailbreakCount: 74 },
  { name: '千问', id: 'qwen3-32b', totalJailbreaks: 76, hundredJailbreaks: 51, totalRate: 0.2533, hundredRate: 0.51, jailbreakCount: 76 },
  { name: '千问', id: 'qwen-max', totalJailbreaks: 77, hundredJailbreaks: 57, totalRate: 0.2567, hundredRate: 0.57, jailbreakCount: 77 },
  { name: '千问', id: 'qwen2.5-7b-instruct', totalJailbreaks: 81, hundredJailbreaks: 62, totalRate: 0.2700, hundredRate: 0.62, jailbreakCount: 81 },
  { name: 'deepseek', id: 'deepseek-r1-distill-qwen-32b', totalJailbreaks: 103, hundredJailbreaks: 74, totalRate: 0.3433, hundredRate: 0.7400, jailbreakCount: 103 },

]);

// 定义幻觉率排行榜数据
const hallucinationModels = ref([
  { name: 'DeepSeek-R1', id: 'DeepSeek-R1-0528', hallucinationRate: 0.269, testSet: 'TruthfulQA' },
  { name: 'DeepSeek-V3', id: 'DeepSeek-v3-0324', hallucinationRate: 0.290, testSet: 'TruthfulQA' },
  { name: 'DeepSeek-R1-Distill', id: 'DeepSeek-R1-Distill-Qwen-32B', hallucinationRate: 0.573, testSet: 'TruthfulQA' },
  { name: '豆包大模型1.6 Flash', id: 'doubao-seed-1-6-flash', hallucinationRate: 0.296, testSet: 'TruthfulQA' },
  { name: '豆包大模型1.6', id: 'doubao-seed-1-6', hallucinationRate: 0.238, testSet: 'TruthfulQA' },
  { name: '智谱GLM-4.5 Flash', id: 'glm-4.5-flash', hallucinationRate: 0.34, testSet: 'TruthfulQA' },
  { name: '智谱GLM-4.5', id: 'glm-4.5', hallucinationRate: 0.289, testSet: 'TruthfulQA' },
  { name: '通义千问 Flash', id: 'qwen3-flash', hallucinationRate: 0.411, testSet: 'TruthfulQA' },
  { name: '通义千问 Plus', id: 'qwen3-plus', hallucinationRate: 0.353, testSet: 'TruthfulQA' },
  { name: '通义千问 Max', id: 'qwen-max', hallucinationRate: 0.213, testSet: 'TruthfulQA' },
]);


// 计算排名后的越狱风险模型列表
const rankedModels = computed(() => {
  return [...models.value].sort((a, b) => a.totalRate - b.totalRate);
});

// 计算排名后的幻觉率模型列表
const rankedHallucinationModels = computed(() => {
  return [...hallucinationModels.value].sort((a, b) => a.hallucinationRate - b.hallucinationRate);
});

// 获取排名对应的样式
function getRankClass(rank) {
  if (rank === 1) return 'text-green-500 dark:text-green-400';
  if (rank === 2) return 'text-blue-500 dark:text-blue-400';
  if (rank === 3) return 'text-indigo-500 dark:text-indigo-400';
  if (rank > models.value.length - 3) return 'text-red-500 dark:text-red-400';
  return 'text-gray-500 dark:text-gray-400';
}
</script>

<style scoped>
/* 自定义字体 */
.font-sans {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

/* 背景网格 */
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
  opacity: 0;
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

/* 动画延迟类 */
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>