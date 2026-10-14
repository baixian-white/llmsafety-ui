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
          <span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">专项安全类（Narrow Safety）</span>
          <span class="bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text">数据集</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          聚焦单一风险（如提示注入、拒答、隐私等）
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
    "data_name": "CoCoNot",
    "purpose_type": "narrow safety",
    "purpose_tags": "non-compliance",
    "entries_n": "12,478",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估并改进模型在语境化不合规场景下的表现",
    "tags": [
      "narrow safety",
      "non-compliance"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/allenai/coconot",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2407.12043",
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
    "data_name": "WMDP",
    "purpose_type": "narrow safety",
    "purpose_tags": "hazardous knowledge",
    "entries_n": "3,688",
    "entries_unit": "multiple-choice questions",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "衡量模型在生物/网络/化学安全方面的危险知识",
    "tags": [
      "hazardous knowledge",
      "narrow safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/cais/wmdp",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://proceedings.mlr.press/v235/li24bc.html",
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
    "data_name": "RuLES",
    "purpose_type": "narrow safety",
    "purpose_tags": "rule-following",
    "entries_n": 862,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型遵循简单规则的能力",
    "tags": [
      "narrow safety",
      "rule-following"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/normster/RuLES",
        "kind": "hf"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2311.04235",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ConfAIde",
    "purpose_type": "narrow safety",
    "purpose_tags": "privacy",
    "entries_n": "1,326",
    "entries_unit": "prompts",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估指令微调模型的隐私推理能力",
    "tags": [
      "narrow safety",
      "privacy"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=gmg7t8b4s0",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "CoNA",
    "purpose_type": "narrow safety",
    "purpose_tags": "hate speech",
    "entries_n": 178,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型对有害指令的服从性",
    "tags": [
      "hate speech",
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
        "url": "https://openreview.net/forum?id=gT5hALch9z",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ControversialInstructions",
    "purpose_type": "narrow safety",
    "purpose_tags": "hate speech",
    "entries_n": 40,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型在争议性话题上的行为",
    "tags": [
      "hate speech",
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
        "url": "https://openreview.net/forum?id=gT5hALch9z",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "PhysicalSafetyInstructions",
    "purpose_type": "narrow safety",
    "purpose_tags": "physical safety",
    "entries_n": "1,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的常识性物理安全能力",
    "tags": [
      "narrow safety",
      "physical safety"
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
    "data_name": "SycophancyEval",
    "purpose_type": "narrow safety",
    "purpose_tags": "sycophancy",
    "entries_n": "20,956",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型的逢迎附和倾向",
    "tags": [
      "narrow safety",
      "sycophancy"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/datasets/meg-tong/sycophancy-eval",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://openreview.net/forum?id=tvhaxkMKAn",
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
    "data_name": "CyberattackAssistance",
    "purpose_type": "narrow safety",
    "purpose_tags": "cyberattacks",
    "entries_n": "1,000",
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型在协助网络攻击方面的服从性",
    "tags": [
      "cyberattacks",
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
        "url": "https://arxiv.org/abs/2312.04724",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "SPMisconceptions",
    "purpose_type": "narrow safety",
    "purpose_tags": "privacy",
    "entries_n": 122,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "衡量模型驳斥谬见（误解）的能力",
    "tags": [
      "narrow safety",
      "privacy"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://dl.acm.org/doi/10.1145/3627106.3627196",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "LatentJailbreak",
    "purpose_type": "narrow safety",
    "purpose_tags": "jailbreak, adversarial goal in data creation",
    "entries_n": 416,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估模型对对抗性提示的安全性与鲁棒性",
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
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2307.08487",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "ModelWrittenSycophancy",
    "purpose_type": "narrow safety",
    "purpose_tags": "sycophancy",
    "entries_n": "30,051",
    "entries_unit": "binary-choice questions",
    "entries_type": "multiple choice",
    "entries_languages": "English",
    "desc": "评估模型的逢迎附和倾向",
    "tags": [
      "narrow safety",
      "sycophancy"
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
    "data_name": "SafeText",
    "purpose_type": "narrow safety",
    "purpose_tags": "physical safety",
    "entries_n": 367,
    "entries_unit": "prompts",
    "entries_type": "chat",
    "entries_languages": "English",
    "desc": "评估常识性的物理安全",
    "tags": [
      "narrow safety",
      "physical safety"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.emnlp-main.154/",
        "kind": "paper"
      }
    ]
  },
  {
    "data_name": "PersonalInfoLeak",
    "purpose_type": "narrow safety",
    "purpose_tags": "privacy",
    "entries_n": "3,238",
    "entries_unit": "entries",
    "entries_type": "other",
    "entries_languages": "English",
    "desc": "评估模型是否容易泄露个人隐私信息（PII）",
    "tags": [
      "narrow safety",
      "privacy"
    ],
    "links": [
      {
        "label": "HuggingFace",
        "url": "not available",
        "kind": "hf"
      },
      {
        "label": "Paper",
        "url": "https://aclanthology.org/2022.findings-emnlp.148",
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
