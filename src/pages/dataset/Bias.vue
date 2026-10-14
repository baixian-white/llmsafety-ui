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
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">偏见评估类（Bias）</span>
          <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">数据集</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
         测试社会偏见（性别、种族、年龄等）
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
