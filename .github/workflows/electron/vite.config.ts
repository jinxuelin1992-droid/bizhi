import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 关键配置：使用相对路径，确保在 Electron 中离线加载资源
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
