import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
      // imports: ['vue', 'vue-router'] // 自动导入 ref、computed、useRouter 等
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 服务配置
  /*server: {
    port: 8080,
    host: true,
    open: false,
    proxy: {
      '/dev-api': {
        target: 'https://www.fastmock.site/mock/8a55ed5d33a076dfc3d106669db56cf1/dev-api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev-api/, '')
      }
    }
  },*/
  css: {
    preprocessorOptions: {
      // https://cn.vitejs.dev/config/#css-preprocessoroptions
      // 全局引入变量和mixin
      scss: {
        additionalData: `
          @import '@/styles/variables.scss';
          @import '@/styles/mixin.scss';
        `
      }
    }
  }
})
