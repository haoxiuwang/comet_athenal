import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' 
// https://vite.dev/config/
export default defineConfig({
  base: "./",
  rollupOptions: {
      input: 'src/main.js',        // 入口文件
      output: {
        format: 'iife',            // ✅ 关键：传统立即执行函数格式
        entryFileNames: 'bundle.js', // ✅ 输出文件名
        name: 'AppBundle',         // 全局变量名（如 window.AppBundle）
      },
    },
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 5173,       // 端口可自定义
  },
  
})
