import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import prismjs from 'vite-plugin-prismjs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    prismjs({
      languages: ['java','css','html','xml','javascript','typescript','c',
        'cpp','python','sql','bash','markdown','yml'],
    })

  ],
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
