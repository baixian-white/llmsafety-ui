<template>
  <div class="relative z-10 w-full min-h-screen">
    <TopNavBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TopNavBar from '@/pages/TopNavBar.vue'
</script>