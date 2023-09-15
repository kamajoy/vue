<template>
  <div class="footer-container mt15" v-show="isDelayFooter">
    <div>vue-admin-layout，Made by HaiYang with ❤️</div>
    <div class="mt6">版权所有：深圳市闻讯数字技术有限公司</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const isDelayFooter = ref(true)
// 路由改变时，等主界面动画加载完毕再显示 footer
onBeforeRouteUpdate(() => {
  isDelayFooter.value = false
  setTimeout(() => {
    isDelayFooter.value = true
  }, 800)
})
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  color: var(--el-text-color-secondary);
  animation: logoAnimation 0.3s ease-in-out;
}
</style>
