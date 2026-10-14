import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite'
import { legacyColorFallback } from './vite-plugins/legacyColorFallback'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    // 老内核（Chrome < 111，如部分安卓自带浏览器）oklch 颜色降级，仅构建期生效
    legacyColorFallback(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'index', // 输出目录（可选）
  },
})