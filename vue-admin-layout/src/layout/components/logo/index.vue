<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img class="sidebar-logo" :src="logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/images/badge.png'
// 这里为什么不将logo放在sidebar文件里，因为其他布局模式要用logo
// defineProps({
//   collapse: {
//     type: Boolean,
//     required: true
//   }
// })

// TODO: 需要完善
const title = ref('后台管理系统')
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 220px;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  // overflow: hidden;
  .sidebar-logo-link {
    width: 100%;
    height: 100%;
    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    .sidebar-title {
      display: inline-block;
      margin: 0;
      // color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
