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
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">价值观对齐类（Value Alignment）</span>
          <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">数据集</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          检验模型在伦理、价值观与文化多样性上的对齐能力
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
