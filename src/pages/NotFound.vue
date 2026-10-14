<template>
  <div class="experiment-shell flex min-h-screen items-center justify-center px-4 pt-16">
    <div class="experiment-card max-w-2xl text-center">
      <p class="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">404 · Page not found</p>
      <h1 class="mt-4 text-4xl font-black text-slate-950 dark:text-white">没有找到这个页面</h1>
      <p class="mt-4 leading-7 text-slate-500 dark:text-slate-400">链接可能已经更新。你可以返回首页，或直接进入大模型安全虚拟仿真实验。</p>
      <div class="mt-7 flex flex-wrap justify-center gap-3">
        <RouterLink to="/" class="experiment-secondary-action">返回首页</RouterLink>
        <RouterLink to="/experiment" class="experiment-primary-action">进入虚拟仿真实验</RouterLink>
        <RouterLink to="/solution/adversarial-test" class="experiment-secondary-action">进入原测试平台</RouterLink>
      </div>
    </div>
  </div>
</template>
