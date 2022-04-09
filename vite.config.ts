import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@':path.join(__dirname,'src'),
    }
  },
  server: {
    // 修改端口
    port: 8888
  }
})
