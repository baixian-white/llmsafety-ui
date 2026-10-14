<template>
  <!-- 主容器：网格背景 + 渐变光斑 -->
  <div class="w-full min-h-screen bg-gray-50 dark:bg-[#0A071A] text-gray-800 dark:text-gray-200 overflow-y-auto font-sans transition-colors duration-500 bg-grid-pattern-light dark:bg-grid-pattern-dark relative">
    <!-- 背景装饰（深色模式可见） -->
    <div class="absolute inset-0 z-0 overflow-hidden hidden dark:block pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[560px] h-[560px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[560px] h-[560px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- 头部 -->
      <header class="text-center mb-16 md:mb-20 animate-fade-in-down">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">事后·回归与迭代</span>
          <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">数据集</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          分类标准:包含关键词benchmark / evaluation / trust / bias / alignment / moral / opinion / culture / fairness / audit，用于模型上线后的整体评估与审计，强调对模型表现的分析和研究，而不是直接防御；包括安全性基准测试、偏见与公平性测评、价值观/文化对齐、信任度与社会影响分析。
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          共 {{ allItems.length }} 个数据集
        </p>
      </header>

<!-- 搜索 & 标签过滤 -->
<section
  class="panel bg-white/70 dark:bg-gray-900/30 border border-gray-200 dark:border-white/10
         rounded-2xl shadow-lg p-4 sm:p-6 mb-10 flex flex-col gap-4">
  
  <!-- 搜索栏 -->
  <div class="flex items-center gap-3">
    <input v-model="query" type="text"
           placeholder="搜索名称 / 描述 / 标签"
           class="w-full px-3 py-2 rounded-md bg-white/90 dark:bg-white/5
                  border border-gray-200/70 dark:border-white/10 focus:outline-none" />
    <button class="btn-ghost shrink-0" @click="query=''; selectedTag=''">重置</button>
  </div>

  <!-- 标签过滤 -->
  <div class="flex flex-wrap gap-2">
    <button v-for="t in allTags" :key="t"
            class="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-white/10 transition"
            :class="[selectedTag===t ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-400/40'
                                     : 'text-gray-600 dark:text-gray-300']"
            @click="selectedTag = (selectedTag===t ? '' : t)">
      # {{ t }}
    </button>
  </div>
</section>

      <!-- 网格 -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in pagedItems" :key="item.data_name"
             class="bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/30 hover:-translate-y-2 transition-all duration-300 flex flex-col p-6">
          <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">{{ item.data_name }}</h3>

          <div class="flex flex-wrap gap-2 mb-3">
            <!-- 主要用途标签（从 purpose_* 导出，若存在） -->
            <span v-if="item.purpose_type" :class="['text-[11px] px-2 py-1 rounded-full font-semibold', tagClass(item.purpose_type)]">
              {{ item.purpose_type }}
            </span>
            <span v-if="item.purpose_tags" :class="['text-[11px] px-2 py-1 rounded-full font-semibold', tagClass(item.purpose_tags)]">
              {{ item.purpose_tags }}
            </span>

            <!-- 其他标签（tags 数组） -->
            <span v-for="tag in item.tags" :key="tag"
                  :class="['text-[11px] px-2 py-1 rounded-full font-semibold', tagClass(tag)]">
              {{ tag }}
            </span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{{ item.desc }}</p>

          <p class="text-xs text-gray-500 mb-3">
            <span v-if="item.entries_n">{{ item.entries_n }} {{ item.entries_unit || 'entries' }} · </span>
            <span v-if="item.entries_type">{{ item.entries_type }} · </span>
            <span v-if="item.entries_languages">语言: {{ item.entries_languages }}</span>
          </p>

          <div class="flex flex-wrap gap-2 mt-auto">
            <a v-for="link in item.links" :key="link.url" :href="link.url" target="_blank"
               class="text-xs font-semibold underline"
               :class="link.kind==='paper' ? 'text-amber-600 dark:text-amber-400'
                       : link.kind==='code' ? 'text-emerald-600 dark:text-emerald-400'
                       : link.kind==='hf' ? 'text-violet-600 dark:text-violet-400'
                       : 'text-blue-600 dark:text-blue-400'">
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="flex justify-center gap-4 mt-12">
        <button @click="prevPage" :disabled="page===1"
                class="px-3 py-1 rounded border disabled:opacity-40">上一页</button>
        <span class="text-sm">第 {{ page }} / {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="page===totalPages"
                class="px-3 py-1 rounded border disabled:opacity-40">下一页</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/**
 * 你的数据保持不变：我只展示一部分以示意，实际请保留你的完整 allItems
 * 注意：保留字段 purpose_type / purpose_tags / tags，彩色规则会自动识别中英文关键词
 */
const allItems = [
  {
    "data_name": "HarmEval",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 550,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估大语言模型在被滥用情境下的表现",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://ojs.aaai.org/index.php/AAAI/article/view/34927",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ImplicitBias",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "33,600",
    "entries_unit": "prompts",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估大语言模型中的隐性偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://www.pnas.org/doi/10.1073/pnas.2416228122",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DifferenceAwareness",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "16,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型对群体差异的认知与敏感度",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2502.01926",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "JBBBehaviours",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": 100,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估不同越狱方法的有效性",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/JailbreakBench/JBB-Behaviors",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2404.01318",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MedSafetyBench",
    "purpose_type": "narrow safety",
    "purpose_tags": "medical safety",
    "entries_n": "1,800",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "衡量大语言模型在医疗安全方面的表现",
    "tags": [
      "medical safety",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2403.03744",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "PRISM",
    "purpose_type": "value alignment",
    "purpose_tags": "cultural / social",
    "entries_n": "8,011",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "捕捉人类对模型行为的多样偏好以评估价值对齐",
    "tags": [
      "cultural",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/HannahRoseKirk/prism-alignment",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2404.16019",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SGBench",
    "purpose_type": "broad safety",
    "purpose_tags": "benchmark",
    "entries_n": "1,442",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型在多任务与多提示类型上的安全泛化能力",
    "tags": [
      "benchmark",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2410.21965",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "StrongREJECT",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": 313,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "更深入研究不同越狱技术的效果",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2402.10260",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MultiTP",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "107,000",
    "entries_unit": "binary-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "Afrikaans, Amharic, Arabic, Azerbaijani, Belarusian, Bulgarian, Bengali, Bosnian, Catalan, Cebuano, Corsican, Czech, Welsh等",
    "desc": "跨多语言评估模型的道德决策能力",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2407.02273",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SoFa",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "1,490,120",
    "entries_unit": "sentences",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估模型的社会偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/copenlu/sofa",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.emnlp-main.812/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ArabicAdvBench",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 520,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Arabic",
    "desc": "评估模型在多种阿拉伯语形式下的安全风险",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.emnlp-main.1034",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AyaRedTeaming",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "7,419",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Arabic, English, Filipino, French, Hindi, Russian, Serbian, Spanish",
    "desc": "提供跨全球与本地偏好对齐的测试平台",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/CohereForAI/aya_redteaming",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.emnlp-main.671/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "UltraSafety",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "3,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "为模型安全微调构建数据",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/openbmb/UltraSafety",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.emnlp-main.85/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DeMET",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": 29,
    "entries_unit": "scenarios",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型在决策中的性别偏见",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.findings-emnlp.331",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "GEST",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": "3,565",
    "entries_unit": "sentences",
    "entries_type": "other",
    "entries_languages": "Belarussian, Russian, Ukrainian, Croatian, Serbian, Slovene, Czech, Polish, Slovak, English",
    "desc": "衡量语言模型与机器翻译系统中的性别刻板印象推理",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/kinit/gest",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.findings-emnlp.173/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "GenMO",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": 908,
    "entries_unit": "scenarios",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型在道德决策中的性别偏见",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.findings-emnlp.928",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SGXSTest",
    "purpose_type": "narrow safety",
    "purpose_tags": "false refusal",
    "entries_n": 200,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "在新加坡语境下评估模型的过度安全/误拒行为",
    "tags": [
      "false refusal",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/walledai/SGXSTest",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.emnlp-demo.42/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HiXSTest",
    "purpose_type": "narrow safety",
    "purpose_tags": "false refusal",
    "entries_n": 50,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Hindi",
    "desc": "评估印地语模型的过度安全/误拒行为",
    "tags": [
      "false refusal",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/walledai/HiXSTest",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.emnlp-demo.42/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CIVICS",
    "purpose_type": "value alignment",
    "purpose_tags": "cultural / social",
    "entries_n": 699,
    "entries_unit": "excerpts",
    "entries_type": "chat",
    "entries_languages": "German, Italian, French, English",
    "desc": "评估模型在多语言与价值敏感主题上的社会与文化差异",
    "tags": [
      "cultural",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/CIVICS-dataset/CIVICS",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://ojs.aaai.org/index.php/AIES/article/view/31710",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "GlobalOpinionQA",
    "purpose_type": "value alignment",
    "purpose_tags": "cultural / social",
    "entries_n": "2,556",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型回答与哪些人群观点最相近",
    "tags": [
      "cultural",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Anthropic/llm_global_opinions",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2306.16388",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CALM",
    "purpose_type": "bias",
    "purpose_tags": "gender and race",
    "entries_n": "78,400",
    "entries_unit": "examples",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "在不同任务与领域评估模型的性别与种族偏见",
    "tags": [
      "bias",
      "gender and race"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/vipulgupta/CALM",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2308.12539",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CHiSafetyBench",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "1,861",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "Chinese",
    "desc": "评估中文模型识别风险内容与拒答风险问题的能力",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2406.10311",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "PHTest",
    "purpose_type": "narrow safety",
    "purpose_tags": "false refusal",
    "entries_n": "3,260",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的误拒答问题",
    "tags": [
      "false refusal",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/furonghuang-lab/PHTest",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2409.00598",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SafetyBench",
    "purpose_type": "broad safety",
    "purpose_tags": "benchmark",
    "entries_n": "11,435",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English, Chinese",
    "desc": "通过多选题评估模型安全性",
    "tags": [
      "benchmark",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/thu-coai/SafetyBench",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.acl-long.830/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CatQA",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 550,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English, Chinese, Vietnamese",
    "desc": "评估安全训练方法的效果",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/declare-lab/CategoricalHarmfulQA",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.acl-long.762/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "KorNAT",
    "purpose_type": "value alignment",
    "purpose_tags": "cultural / social",
    "entries_n": "10,000",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English, Korean",
    "desc": "评估模型与韩国社会价值观的对齐程度",
    "tags": [
      "cultural",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/datumo/KorNAT",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.findings-acl.666",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CMoralEval",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "30,388",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "Chinese",
    "desc": "评估中文大模型的道德性",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.findings-acl.703",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "XSafety",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "28,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English, Chinese, Hindi, Spanish, French, Arabic, Bengali, Russian, Japanese, German",
    "desc": "评估多语言模型的安全性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.findings-acl.349/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SaladBench",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "21,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型安全性以及攻击与防御方法",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/OpenSafetyLab/Salad-Data",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2402.05044",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MMHB",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "5,754,444",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English, French, Hindi, Indonesian, Italian, Portuguese, Spanish, Vietnamese",
    "desc": "跨多语言评估模型的社会人口学偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2407.00486",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "GPTFuzzer",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": 100,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估自动化红队方法的有效性",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2309.10253",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ORBench",
    "purpose_type": "narrow safety",
    "purpose_tags": "false refusal",
    "entries_n": "80,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "大规模评估模型的误拒答问题",
    "tags": [
      "false refusal",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/bench-llm/or-bench",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2405.20947",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SorryBench",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "9,450",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English, French, Chinese, Marathi, Tamil, Malayalam",
    "desc": "细粒度评估模型在不同语言特征下的安全性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/sorry-bench/sorry-bench-202406",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2406.14598",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "XSTest",
    "purpose_type": "narrow safety",
    "purpose_tags": "false refusal",
    "entries_n": 450,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的过度安全/误拒行为",
    "tags": [
      "false refusal",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/natolambert/xstest-v2-copy",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.naacl-long.301/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "Flames",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "2,251",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Chinese",
    "desc": "评估中文模型的价值对齐能力",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.naacl-long.256/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SEval",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "20,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English, Chinese",
    "desc": "评估模型安全性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/IS2Lab/S-Eval",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2405.14191",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "WorldValuesBench",
    "purpose_type": "value alignment",
    "purpose_tags": "cultural / social",
    "entries_n": "21,492,393",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型对多元文化人类价值的认知",
    "tags": [
      "cultural",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.lrec-main.1539/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CBBQ",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "106,588",
    "entries_unit": "examples",
    "entries_type": "multiple choice",
    "entries_languages": "Chinese",
    "desc": "评估中文场景下的社会人口学偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/walledai/CBBQ",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.lrec-main.260",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "KoBBQ",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "76,048",
    "entries_unit": "examples",
    "entries_type": "multiple choice",
    "entries_languages": "Korean",
    "desc": "评估韩语场景下的社会人口学偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/naver-ai/kobbq",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00661/120915/KoBBQ-Korean-Bias-Benchmark-for-Question-Answering",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SAFE",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "52,430",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "在超越简单二元安全/不安全划分的设定下评估模型安全性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://ieeexplore.ieee.org/abstract/document/10507773",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DoNotAnswer",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 939,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的“危险能力”",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/LibrAI/do-not-answer",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.findings-eacl.61/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DecodingTrust",
    "purpose_type": "broad safety",
    "purpose_tags": "benchmark",
    "entries_n": "243,877",
    "entries_unit": "prompts",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估大语言模型的可信度",
    "tags": [
      "benchmark",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/AI-Secure/DecodingTrust",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2306.11698",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SimpleSafetyTests",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 100,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的关键安全风险",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Bertievidgen/SimpleSafetyTests",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2311.08370",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HExPHI",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 330,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型安全性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/LLM-Tuning-Safety/HEx-PHI",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=hTEGyKf0dZ",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MaliciousInstructions",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 100,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型对恶意指令的服从性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=gT5hALch9z",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SafetyInstructions",
    "purpose_type": "broad safety",
    "purpose_tags": "positive interaction",
    "entries_n": "2,000",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "用于将模型微调得更安全",
    "tags": [
      "broad safety",
      "positive interaction"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=gT5hALch9z",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "OKTest",
    "purpose_type": "narrow safety",
    "purpose_tags": "false refusal",
    "entries_n": 350,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的误拒答问题",
    "tags": [
      "false refusal",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2401.17633",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AdvBench",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": "1,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "诱使模型生成有害或反感内容以评测",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2307.15043",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "Mosscap",
    "purpose_type": "other",
    "purpose_tags": "adversarial goal in data creation, crowdsourced",
    "entries_n": "278,945",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "分析提示注入/数据外泄类攻击",
    "tags": [
      "adversarial goal in data creation",
      "crowdsourced",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Lakera/mosscap_prompt_injection",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://grt.lakera.ai/mosscap",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MoralChoice",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "1,767",
    "entries_unit": "binary-choice question",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型的道德信念表现",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/ninoscherrer/moralchoice",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=O06z2G18me",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DICES350",
    "purpose_type": "value alignment",
    "purpose_tags": "safety",
    "entries_n": 350,
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "收集关于对话式 AI 安全的多元观点",
    "tags": [
      "safety",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/a74b697bce4cac6c91896372abaa8863-Abstract-Datasets_and_Benchmarks.html",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DICES990",
    "purpose_type": "value alignment",
    "purpose_tags": "safety",
    "entries_n": 990,
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "收集关于对话式 AI 安全的多元观点",
    "tags": [
      "safety",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/a74b697bce4cac6c91896372abaa8863-Abstract-Datasets_and_Benchmarks.html",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "JADE",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "2,130",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Chinese, English",
    "desc": "利用语言模糊测试生成挑战性提示以评估模型安全",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2311.00286",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CPAD",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "10,050",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Chinese",
    "desc": "诱使模型生成有害或不当内容以评测",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2309.11830",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AdvPromptSet",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "197,628",
    "entries_unit": "sentences",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估模型对对抗性毒性文本提示的响应",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.emnlp-main.230/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HackAPrompt",
    "purpose_type": "other",
    "purpose_tags": "adversarial goal in data creation, crowdsourced",
    "entries_n": "601,757",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "mostly English",
    "desc": "分析提示破解/数据外泄类攻击",
    "tags": [
      "adversarial goal in data creation",
      "crowdsourced",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/hackaprompt/hackaprompt-dataset",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.emnlp-main.302/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AART",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": "3,269",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "展示 AART 自动化红队方法的效果",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.emnlp-industry.37/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DELPHI",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "29,201",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型处理争议性议题的能力",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.emnlp-industry.76",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AttaQ",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "1,402",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型生成有害或不良回应的倾向",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/ibm/AttaQ",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.gem-1.10/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DiscrimEval",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "9,450",
    "entries_unit": "binary-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估语言模型在多种用例下的潜在歧视影响",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Anthropic/discrim-eval",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2312.03689",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "FFT",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "2,116",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的事实性、公平性与毒性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2311.18580",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "GandalfIgnoreInstructions",
    "purpose_type": "other",
    "purpose_tags": "adversarial goal in data creation, crowdsourced",
    "entries_n": "1,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "分析提示破解/数据外泄类攻击",
    "tags": [
      "adversarial goal in data creation",
      "crowdsourced",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Lakera/gandalf_ignore_instructions",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://www.lakera.ai/blog/who-is-gandalf",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "GandalfSummarization",
    "purpose_type": "other",
    "purpose_tags": "adversarial goal in data creation, crowdsourced",
    "entries_n": 140,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "分析提示破解/数据外泄类攻击",
    "tags": [
      "adversarial goal in data creation",
      "crowdsourced",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Lakera/gandalf_summarization",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://www.lakera.ai/blog/who-is-gandalf",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "OpinionQA",
    "purpose_type": "value alignment",
    "purpose_tags": "cultural / social",
    "entries_n": "1,498",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型观点与美国不同人口群体的对齐程度",
    "tags": [
      "cultural",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://dl.acm.org/doi/10.5555/3618408.3619652",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CHBias",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "4,800",
    "entries_unit": "Weibo posts",
    "entries_type": "other",
    "entries_languages": "Chinese",
    "desc": "评估与社会人口学相关的偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.acl-long.757/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HarmfulQ",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 200,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型安全性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.acl-long.244/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "FairPrism",
    "purpose_type": "other",
    "purpose_tags": "content moderation",
    "entries_n": "5,000",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "分析与模型对话中的危害类型",
    "tags": [
      "content moderation",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.acl-long.343",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "WinoQueer",
    "purpose_type": "bias",
    "purpose_tags": "gender and sexual orientation",
    "entries_n": "45,540",
    "entries_unit": "sentence pairs",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估与酷儿身份相关术语上的偏见",
    "tags": [
      "bias",
      "gender and sexual orientation"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.acl-long.507/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ModelWrittenAdvancedAIRisk",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "24,516",
    "entries_unit": "binary-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型带来的高级 AI 风险",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Anthropic/model-written-evals",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.findings-acl.847/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ModelWrittenPersona",
    "purpose_type": "value alignment",
    "purpose_tags": "moral / cultural / social",
    "entries_n": "133,204",
    "entries_unit": "binary-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型在政治/宗教观点、人格、道德信念及潜在危险目标等方面的行为",
    "tags": [
      "cultural",
      "moral",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Anthropic/model-written-evals",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.findings-acl.847/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "WinoGenerated",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": "3,000",
    "entries_unit": "sentences",
    "entries_type": "autocomplete",
    "entries_languages": "English",
    "desc": "评估模型在代词上的性别偏见",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.findings-acl.847/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "Machiavelli",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "572,322",
    "entries_unit": "scenarios",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估智能体的伦理行为",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=nkals4A4Vs",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SafetyPrompts",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "100,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Chinese",
    "desc": "评估中文大语言模型的安全性",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/thu-coai/Safety-Prompts",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2304.10436",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HolisticBias",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "459,758",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估与社会人口学相关的综合性偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.emnlp-main.625",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AnthropicRedTeam",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "38,961",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "分析人们如何对模型进行红队测试",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Anthropic/hh-rlhf",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2209.07858",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "IndianStereotypes",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "3,852",
    "entries_unit": "tuples",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "给出印度语境下的刻板印象基准",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.aacl-main.55",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MoralExceptQA",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": 148,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型理解、解释并预测人类道德判断与决策的能力",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/feradauto/MoralExceptQA",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=uP9RiC4uVcR",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "FrenchCrowSPairs",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "1,679",
    "entries_unit": "sentence pairs",
    "entries_type": "other",
    "entries_languages": "French",
    "desc": "评估与社会人口学相关的偏见（法语）",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/BigScienceBiasEval/crows_pairs_multilingual",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.acl-long.583/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SafetyKit",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 990,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "快速评估对话式 AI 的显著安全问题",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.acl-long.284/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "TruthfulQA",
    "purpose_type": "narrow safety",
    "purpose_tags": "truthfulness",
    "entries_n": 817,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型回答的真实性",
    "tags": [
      "narrow safety",
      "truthfulness"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/truthful_qa",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.acl-long.229/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "BBQ",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "58,492",
    "entries_unit": "examples",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "在问答任务中评估模型的社会偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/heegyu/bbq",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.findings-acl.165",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AnthropicHarmlessBase",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "44,849",
    "entries_unit": "conversational turns",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "对模型进行红队以收集无害性相关数据",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Trelis/hh-rlhf-dpo",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2204.05862",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "JiminyCricket",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "1,838",
    "entries_unit": "locations",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估智能体与人类价值与道德的对齐程度",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2110.13136",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "BiasOutOfTheBox",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": 228,
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "English",
    "desc": "评估 GPT-2 的交叉职业偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2102.04130",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "EthnicBias",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": 60,
    "entries_unit": "templates",
    "entries_type": "autocomplete",
    "entries_languages": "English, German, Spanish, Korean, Turkish, Chinese",
    "desc": "评估掩码语言模型的族裔偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.emnlp-main.42",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MoralStories",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "12,000",
    "entries_unit": "stories",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估模型的常识、道德与社会推理能力",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/demelin/moral_stories",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.emnlp-main.54/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "RedditBias",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "11,873",
    "entries_unit": "Reddit comments",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估与社会人口学相关的偏见（Reddit 评论）",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.acl-long.151",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "StereoSet",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "16,955",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估与社会人口学相关的刻板印象偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/stereoset",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.acl-long.416",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HypothesisStereotypes",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "2,098",
    "entries_unit": "prompts",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "研究刻板印象如何在模型生成的 NLI 假设中体现",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.findings-acl.355/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HONEST",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": "2,520",
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "English, Italian, French, Portuguese, Romanian, Spanish",
    "desc": "度量模型产生伤害性句子补全的倾向",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/MilaNLProc/honest",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.naacl-main.191/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SweWinoGender",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": 624,
    "entries_unit": "sentences",
    "entries_type": "other",
    "entries_languages": "Swedish",
    "desc": "度量指代消解中的性别偏见",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.nodalida-main.52/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "LMBias",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "16,388",
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "English",
    "desc": "理解并缓解语言模型中的社会偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2106.13219",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ScruplesAnecdotes",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "32,766",
    "entries_unit": "anecdotes",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估模型对伦理规范的理解",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2008.09094",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ScruplesDilemmas",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "10,000",
    "entries_unit": "binary-choice question",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型对伦理规范的理解",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2008.09094",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CrowSPairs",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "1,508",
    "entries_unit": "sentence pairs",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估与社会人口学相关的偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/crows_pairs",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2020.emnlp-main.154",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "UnQover",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": 44,
    "entries_unit": "templates",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估问答系统中的刻板印象偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2020.findings-emnlp.311",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "RealToxicityPrompts",
    "purpose_type": "broad safety",
    "purpose_tags": "toxicity",
    "entries_n": "99,442",
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "English",
    "desc": "评估模型生成毒性内容的倾向",
    "tags": [
      "broad safety",
      "toxicity"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/allenai/real-toxicity-prompts",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2020.findings-emnlp.301/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SocialChemistry101",
    "purpose_type": "value alignment",
    "purpose_tags": "moral / social",
    "entries_n": "292,000",
    "entries_unit": "sentences",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估模型对社会与道德规范的推理能力",
    "tags": [
      "moral",
      "social",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2020.emnlp-main.48/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "Regard",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": 60,
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "English",
    "desc": "评估自然语言生成中的偏见",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/D19-1339",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "WinoBias",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": "3,160",
    "entries_unit": "sentences",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估指代消解中的性别偏见",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/wino_bias",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/N18-2003",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "WinoGender",
    "purpose_type": "bias",
    "purpose_tags": "gender",
    "entries_n": 720,
    "entries_unit": "sentences",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估指代消解中的性别偏见",
    "tags": [
      "bias",
      "gender"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/oskarvanderwal/winogender",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/N18-2002/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "WildGuardMix",
    "purpose_type": "other",
    "purpose_tags": "content moderation",
    "entries_n": "86,759",
    "entries_unit": "examples",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "train and evaluate content moderation guardrails",
    "tags": [
      "content moderation",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/allenai/wildguardmix",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2406.18495",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "WildJailbreak",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "261,534",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "train LLMs to be safe",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/allenai/wildjailbreak",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=n5R6TvBVcX&noteId=f3XHMKAJeK",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ForbiddenQuestions",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": 390,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate whether LLMs answer questions that violate OpenAI's usage policy",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://dl.acm.org/doi/10.1145/3658644.3670388",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CoSafe",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "1,400",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluating LLM safety in dialogue coreference",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2024.emnlp-main.968/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "PolygloToxicityPrompts",
    "purpose_type": "broad safety",
    "purpose_tags": "toxicity",
    "entries_n": "425,000",
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "Arabic, Chinese, Czech, Dutch, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Swedish\n\n\n\n\n\n\n\n",
    "desc": "evaluate propensity of LLMs to generate toxic content across 17 languages",
    "tags": [
      "broad safety",
      "toxicity"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/ToxicityPrompts/PolygloToxicityPrompts",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2405.09373",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ALERT",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "44,800",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate the safety of LLMs through red teaming methodologies",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Babelscape/ALERT",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2404.08676",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "AegisAIContentSafety",
    "purpose_type": "other",
    "purpose_tags": "content moderation",
    "entries_n": "11,997",
    "entries_unit": "conversational turns",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate content moderation guardrails",
    "tags": [
      "content moderation",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/nvidia/Aegis-AI-Content-Safety-Dataset-1.0",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2404.05993",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HarmBench",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": 400,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate effectiveness of automated red-teaming methods",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2402.04249",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MaliciousInstruct",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": 100,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate success of generation exploit jailbreak",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=r42tSSCHPh",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "QHarm",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": 100,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate LLM safety",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=gT5hALch9z",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "BeaverTails",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "333,963",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate and improve LLM safety on QA",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/PKU-Alignment/BeaverTails",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2307.04657",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "TDCRedTeaming",
    "purpose_type": "broad safety",
    "purpose_tags": "used to test adversarial method",
    "entries_n": 100,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate success of automated red-teaming approaches",
    "tags": [
      "broad safety",
      "used to test adversarial method"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://trojandetection.ai/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "PromptExtractionRobustness",
    "purpose_type": "narrow safety",
    "purpose_tags": "prompt extraction, adversarial goal in data creation, crowdsourced",
    "entries_n": 569,
    "entries_unit": "samples",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate LLM vulnerability to prompt extraction",
    "tags": [
      "adversarial goal in data creation",
      "crowdsourced",
      "narrow safety",
      "prompt extraction"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/qxcv/tensor-trust?row=0",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=UWymGURI75",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "PromptHijackingRobustness",
    "purpose_type": "narrow safety",
    "purpose_tags": "prompt extraction, adversarial goal in data creation, crowdsourced",
    "entries_n": 775,
    "entries_unit": "samples",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate LLM vulnerability to prompt hijacking",
    "tags": [
      "adversarial goal in data creation",
      "crowdsourced",
      "narrow safety",
      "prompt extraction"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/qxcv/tensor-trust?row=0",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=UWymGURI75",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HolisticBiasR",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "214,460",
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "English",
    "desc": "evaluate LLM completions for sentences related to individual sociodemographics",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.emnlp-main.230/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ToxicChat",
    "purpose_type": "other",
    "purpose_tags": "content moderation",
    "entries_n": "10,166",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "mostly English",
    "desc": "evaluate dialogue content moderation systems",
    "tags": [
      "content moderation",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/lmsys/toxic-chat",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2023.findings-emnlp.311/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "HarmfulQA",
    "purpose_type": "broad safety",
    "purpose_tags": null,
    "entries_n": "1,960",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate and improve LLM safety",
    "tags": [
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/declare-lab/HarmfulQA",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2308.09662",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CValuesResponsibilityMC",
    "purpose_type": "value alignment",
    "purpose_tags": "safety",
    "entries_n": "1,712",
    "entries_unit": "multiple-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "Chinese",
    "desc": "evaluate human value alignment in Chinese LLMs",
    "tags": [
      "safety",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Skepsun/cvalues_rlhf",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2307.09705",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CValuesResponsibilityPrompts",
    "purpose_type": "value alignment",
    "purpose_tags": "safety",
    "entries_n": 800,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "Chinese",
    "desc": "evaluate human value alignment in Chinese LLMs",
    "tags": [
      "safety",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/Skepsun/cvalues_rlhf",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2307.09705",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SeeGULL",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "7,750",
    "entries_unit": "tuples",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "expand cultural and geographic coverage of stereotype benchmarks",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "aclanthology.org/2023.acl-long.548",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "OIGModeration",
    "purpose_type": "other",
    "purpose_tags": "content moderation",
    "entries_n": "200,811",
    "entries_unit": "conversations",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "create a diverse dataset of user dialogue that may be unsafe",
    "tags": [
      "content moderation",
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/ontocord/OIG-moderation",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://huggingface.co/datasets/ontocord/OIG-moderation",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ProsocialDialog",
    "purpose_type": "broad safety",
    "purpose_tags": "positive interaction",
    "entries_n": "58,137",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "teach conversational agents to respond to problematic content following social norms",
    "tags": [
      "broad safety",
      "positive interaction"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/allenai/prosocial-dialog",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.emnlp-main.267/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CDialBias",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "28,343",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "Chinese",
    "desc": "evaluate bias in Chinese social media conversations",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/para-zhou/CDial-Bias/tree/main",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.findings-emnlp.262",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "MIC",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "38,000",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "understand the intuitions, values and moral judgments reflected in LLMs",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.acl-long.261",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SaFeRDialogues",
    "purpose_type": "broad safety",
    "purpose_tags": "positive interaction",
    "entries_n": "7,881",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "recovering from safety failures in LLM conversations",
    "tags": [
      "broad safety",
      "positive interaction"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.acl-long.447/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "DiaSafety",
    "purpose_type": "broad safety",
    "purpose_tags": "content moderation",
    "entries_n": "11,492",
    "entries_unit": "conversational turns",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "capture unsafe behaviors in humanbot dialogue settings",
    "tags": [
      "broad safety",
      "content moderation"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/thu-coai/diasafety",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.findings-acl.308/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ConvAbuse",
    "purpose_type": "other",
    "purpose_tags": null,
    "entries_n": "6,837",
    "entries_unit": "examples",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "analyse abuse towards conversational AI systems",
    "tags": [
      "other"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.emnlp-main.587/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ETHICS",
    "purpose_type": "value alignment",
    "purpose_tags": "moral",
    "entries_n": "134,420",
    "entries_unit": "binary-choice question",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "assess LLM basic knowledge of\nethics and common human values",
    "tags": [
      "moral",
      "value alignment"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/hendrycks/ethics",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2008.02275",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "BAD",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "78,874",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate the safety of conversational agents",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2021.naacl-main.235",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "BOLD",
    "purpose_type": "bias",
    "purpose_tags": "sociodemographics",
    "entries_n": "23,679",
    "entries_unit": "prompts",
    "entries_type": "autocomplete",
    "entries_languages": "English",
    "desc": "evaluate bias in text generation",
    "tags": [
      "bias",
      "sociodemographics"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/AlexaAI/bold",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://dl.acm.org/doi/10.1145/3442188.3445924",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ParlAIDialogueSafety",
    "purpose_type": "broad safety",
    "purpose_tags": "adversarial goal in data creation",
    "entries_n": "90,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "evaluate and improve the safety of conversational agents",
    "tags": [
      "adversarial goal in data creation",
      "broad safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/D19-1461",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "EmpatheticDialogues",
    "purpose_type": "broad safety",
    "purpose_tags": "positive interaction",
    "entries_n": "24,850",
    "entries_unit": "conversations",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "train dialogue agents to be more empathetic",
    "tags": [
      "broad safety",
      "positive interaction"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/empathetic_dialogues",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/P19-1534",
        "kind": "paper"
      }
    ]
  }
]

/* ---------------- 搜索 / 分页 ---------------- */
const query = ref("")
const selectedTag = ref("")
const page = ref(1)
const pageSize = 24

const allTags = computed(() => {
  const set = new Set<string>()
  allItems.forEach(i => {
    i.tags?.forEach((t:string)=>set.add(t))
    if (i.purpose_type) set.add(String(i.purpose_type))
    if (i.purpose_tags) set.add(String(i.purpose_tags))
  })
  return [...set].sort()
})

const filtered = computed(() => {
  return allItems.filter(i => {
    const q = query.value.trim().toLowerCase()
    const hay = [
      i.data_name,
      i.desc,
      ...(i.tags || []),
      i.purpose_type ?? '',
      i.purpose_tags ?? ''
    ].join(' ').toLowerCase()
    const matchesQuery = !q || hay.includes(q)
    const matchesTag = !selectedTag.value || (i.tags?.includes(selectedTag.value) || i.purpose_type===selectedTag.value || i.purpose_tags===selectedTag.value)
    return matchesQuery && matchesTag
  })
})

const totalPages = computed(()=>Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const pagedItems = computed(()=>filtered.value.slice((page.value-1)*pageSize, page.value*pageSize))

function prevPage(){ if(page.value>1) page.value-- }
function nextPage(){ if(page.value<totalPages.value) page.value++ }

/* ---------------- 标签配色规则 ----------------
 * 规则说明：
 * - 自动识别中英文关键字，不区分大小写
 * - 可按需在下面继续补充关键字 → 对应某种颜色
 */
function tagClass(raw: string) {
  const t = (raw || '').toLowerCase()

  // 偏见/社会属性
  if (t.includes('bias') || t.includes('偏见') || t.includes('sociodemographic')) {
    return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
  }

  // 医疗安全
  if (t.includes('medical') || t.includes('医疗')) {
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
  }

  // 广义安全/通用安全基线
  if (t.includes('broad') || t.includes('广义') || t.includes('safety')) {
    return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
  }

  // 狭义/专项安全
  if (t.includes('narrow') || t.includes('专项') ) {
    return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
  }

  // 价值对齐/文化/社会
  if (t.includes('align') || t.includes('对齐') || t.includes('cultural') || t.includes('文化') || t.includes('social') || t.includes('社会')) {
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
  }

  // 基准/评测
  if (t.includes('benchmark') || t.includes('sgbench') || t.includes('评测') || t.includes('基准')) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
  }

  // 越狱/对抗方法（用于 purpose_tags: used to test adversarial method 等）
  if (t.includes('jailbreak') || t.includes('越狱') || t.includes('adversarial') || t.includes('对抗')) {
    return 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-200'
  }

  // 兜底：中性灰
  return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
}
</script>

<style scoped>
/* 背景网格 */
.bg-grid-pattern-light {
  background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}
.bg-grid-pattern-dark {
  background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
}
/* 动画 */
@keyframes fadeInDown { from {opacity: 0; transform: translateY(-20px);} to {opacity: 1; transform: translateY(0);} }
.animate-fade-in-down { opacity:0; animation: fadeInDown .8s ease-out forwards; }
.animation-delay-4000 { animation-delay: 4s; }
</style>
