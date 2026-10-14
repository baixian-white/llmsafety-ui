
import { createApp } from 'vue'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion' // 1. 导入插件
import {createRouter,createWebHistory} from 'vue-router'


console.log("API_BASE =", import.meta.env.VITE_API_BASE)
//配置路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/guanyuwomen/hezuohuoban',
    name: 'hezuohuoban',
    component: () => import('./pages/guanyuwomen/hezuohuoban.vue'),
  },
  {
    path: '/guanyuwomen/lianxiwomen',
    name: 'lianxiwomen',
    component: () => import('./pages/guanyuwomen/lianxiwomen.vue'),
  },
  {
    path: '/guanyuwomen/tuanduijieshao',
    name: 'tuanduijieshao',
    component: () => import('./pages/guanyuwomen/tuanduijieshao.vue'),
  },
  {
    path: '/guanyuwomen/zhishichanquan',
    name: 'zhishichanquan',
    component: () => import('./pages/guanyuwomen/zhishichanquan.vue'),
  },
  {
    path: '/guanyuwomen/yinsizhengce',
    name: 'yinsizhengce',
    component: () => import('./pages/guanyuwomen/yinsizhengce.vue'),
  },
  {
    path: '/law1',
    name: 'law1',
    component: () => import('./pages/law/law1.vue'),
  },
  {
    path: '/law2',
    name: 'law2',
    component: () => import('./pages/law/law2.vue'),
  },
  {
    path: '/law3',
    name: 'law3',
    component: () => import('./pages/law/law3.vue'),
  },
  {
    path: '/law4',
    name: '国外法案',
    component: () => import('./pages/law/law4.vue'),
  },
  {
    path: '/law5',
    name: '国内法案',
    component: () => import('./pages/law/law5.vue'),
  },
  {
    path: '/law6',
    name: '法案解读',
    component: () => import('./pages/law/law6.vue'),
  },
  {
    path: '/law6_1',
    name: '法案解读详情1',
    component: () => import('./pages/law/law6_1.vue'),
  },
  {
    path: '/law6_2',
    name: '法案解读详情2',
    component: () => import('./pages/law/law6_2.vue'),
  },
  {
    path: '/law6_3',
    name: '法案解读详情3',
    component: () => import('./pages/law/law6_3.vue'),
  },
  {
    path: '/law6_4',
    name: '法案解读详情4',
    component: () => import('./pages/law/law6_4.vue'),
  },
  {
    path: '/law6_5',
    name: '法案解读详情5',
    component: () => import('./pages/law/law6_5.vue'),
  },
  {
    path: '/law6_6',
    name: '法案解读详情6',
    component: () => import('./pages/law/law6_6.vue'),
  },
  {
    path: '/solution/rank',
    name: '模型测试排行',
    component: () => import('./pages/solution/ModelRank.vue'),
  },
  {
    path: '/hangye/yiliaojiankang',
    name: 'yiliaojiankang',
    component: () => import('./pages/hangye/yiliaojiankang.vue'), 
  },
  {
    path: '/hangye/jinrongfuwu',
    name: 'jinrongfuwu',
    component: () => import('./pages/hangye/jinrongfuwu.vue'), 
  },
  {
    path: '/hangye/zhizaoye',
    name: 'zhizaoye',
    component: () => import('./pages/hangye/zhizaoye.vue'), 
  },
  {
    path: '/hangye/linshoudianshang',
    name: 'linshoudianshang',
    component: () => import('./pages/hangye/linshoudianshang.vue'), 
  },
    {
    path: '/hangye/jiaoyupeixun',
    name: 'jiaoyupeixun',
    component: () => import('./pages/hangye/jiaoyupeixun.vue'), 
  },
  {
    path: '/solution/hallucination',
    name: '幻觉率评估',
    component: () => import('./pages/solution/HallucinationAssess.vue'),
  },
  {
    path: '/solution/jailbreaking',
    name: '越狱率评估',
    component: () => import('./pages/solution/JailbreakingAssess.vue'),
  },
  {
    path: '/solution/case',
    name: '案例分析',
    component: () => import('./pages/solution/CaseAnalysis.vue'),
  },
  {
    path: '/solution/adversarial-test',
    name: '对抗性攻击测试',
    component: () => import('./pages/solution/AdversarialTest.vue'),
  },
  {
    path: '/solution/threat-intelligence',
    name: '威胁情报分析',
    component: () => import('./pages/solution/ThreatIntelligence.vue'),
  },
  {
    path: '/tool-usage',
    name: '工具使用说明',
    component: () => import('./pages/solution/ToolUsage.vue'),
  },
  {
    path: '/zhishiku/mdlist',
    name: 'md列表页',
    component: () => import('./pages/zhishiku/mdlist.vue'),
  },
  // src/router/index.ts
   {
    path: '/zhishiku/md/md1',
    name: '九个大模型安全框架解读',
    component: () => import('./pages/zhishiku/md/md1.vue'),
  },
  
  {
    path: '/zhishiku/md/md2',
    name: 'LLM安全评测数据集',
    component: () => import('./pages/zhishiku/md/md2.vue'),
  },
  {
    path: '/zhishiku/md/md3',
    name: '15个AI风险与安全防控措施',
    component: () => import('./pages/zhishiku/md/md3.vue'),
  },
  {
    path: '/zhishiku/md/md4',
    name: 'LLM越狱攻击方法汇总',
    component: () => import('./pages/zhishiku/md/md4.vue'),
  },
  {
    path: '/zhishiku/md/md5',
    name: '面向AI安全的26个防御措施',
    component: () => import('./pages/zhishiku/md/md5.vue'),
  },
  {
    path: '/zhishiku/md/md6',
    name: '大模型安全开源项目汇总',
    component: () => import('./pages/zhishiku/md/md6.vue'),
  },
  {
    path: '/zhishiku/md/md7',
    name: 'Google提出的AI Agent纵深安全体系：从风险识别到动态防御的新范式',
    component: () => import('./pages/zhishiku/md/md7.vue'),
  },
   {
    path: '/zhishiku/md/md8',
    name: ' 面向 AI 的 15 个攻击策略',
    component: () => import('./pages/zhishiku/md/md8.vue'),
  },

  //测试页面
  {
    path: '/zhishiku/docslist',
    name: '测试页面-md列表页',
    component: () => import('./pages/zhishiku/docslist.vue'),
  },
  {
    path: '/zhishiku/editor',
    name: 'md编辑页面（新建）',
    component: () => import('./pages/zhishiku/editor.vue'),
  },
  {
    path: '/zhshiku/editor/:key',
    name: 'md编辑页面（编辑）',
    component: () => import('./pages/zhishiku/editor.vue'),
  },

  {
    path: '/aisec/LifecycleIndex',
    name: 'AI安全生命周期',
    component: () => import('./pages/aisec/LifecycleIndex.vue'),
  },
  {
    path: '/aisec/Before',
    name: 'AI安全生命周期事前',
    component: () => import('./pages/aisec/Before.vue'),
  },{
    path: '/aisec/During',
    name: 'AI安全生命周期事中',
    component: () => import('./pages/aisec/During.vue'),
  },{
    path: '/aisec/After',
    name: 'AI安全生命周期事后',
    component: () => import('./pages/aisec/After.vue'),
  },
  {
    path: '/aisec/DatasetsIndex',
    name: 'AI安全数据集',
    component: () => import('./pages/aisec/DatasetsIndex.vue'),
  },
  {
    path: '/dataset/Before',
    name: 'AI安全数据集事前',
    component: () => import('./pages/dataset/Before.vue'),
  },
  {
    path: '/dataset/During',
    name: 'AI安全数据集事中',
    component: () => import('./pages/dataset/During.vue'),
  },
   {
    path: '/dataset/After',
    name: 'AI安全数据集事后',
    component: () => import('./pages/dataset/After.vue'),
  },
    {
    path: '/dataset/Bias',
    name: 'AI安全数据集Bias',
    component: () => import('./pages/dataset/Bias.vue'),
  },
  {
    path: '/dataset/Broad Safety',
    name: 'AI安全数据集Broad Safety',
    component: () => import('./pages/dataset/Broad Safety.vue'),
  },
  {
    path: '/dataset/Narrow Safety',
    name: 'AI安全数据集Narrow Safety',
    component: () => import('./pages/dataset/Narrow Safety.vue'),
  },
  {
    path: '/dataset/Others',
    name: 'AI安全数据集Others',
    component: () => import('./pages/dataset/Others.vue'),
  },
    {
    path: '/dataset/Value Alignment',
    name: 'Value Alignment',
    component: () => import('./pages/dataset/Value Alignment.vue'),
  },
]

//创建路由器
const router = createRouter({
history: createWebHistory(),
routes,
})
//加载路由器
const app = createApp(App)
app.use(router)
//加载特效插件
app.use(MotionPlugin)

app.mount('#app')
