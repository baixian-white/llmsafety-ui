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
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">事中·运行时探测</span>
          <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">数据集</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                  分类标准：包含 wild / runtime / RAG / poison / honeypot / monitoring / traces / logs / production traffic 等关键词，用于模型在运行时的动态探测与防护。
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
    "data_name": "DoAnythingNow",
    "purpose_type": "narrow safety",
    "purpose_tags": "jailbreak, adversarial goal in data creation",
    "entries_n": "15,140",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "characterise and evaluate in-the-wild LLM jailbreak prompts",
    "tags": [
      "adversarial goal in data creation",
      "jailbreak",
      "narrow safety"
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
    "data_name": "ToxiGen",
    "purpose_type": "narrow safety",
    "purpose_tags": "hate speech",
    "entries_n": "260,851",
    "entries_unit": "prompts",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "create new examples of implicit hate speech",
    "tags": [
      "hate speech",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/skg/toxigen-data",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.acl-long.234/",
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
