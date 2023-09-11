<template>
  <div class="logo-component">
    <div class="logo-container">
      <transition name="sidebarLogoFade">
        <!-- 折叠 -->
        <!-- <router-link key="collapse" class="logo-link" to="/">
          <img :src="Logo" class="logo" />
        </router-link> -->
        <!-- // 不折叠 -->
        <router-link
          key="expand"
          class="logo-link"
          :to="{ name: 'Root' }"
        >
          <img :src="Logo" class="logo" />
          <h1 class="logo-title oneline-ellipsis" :title="title">
            {{ title }}
          </h1>
        </router-link>
      </transition>
    </div>
  </div>
</template>

<script setup>
import appConf from '~/config/app'

import Logo from "~/assets/svgs/logo.svg"
const title = appConf.title
</script>

<style lang="scss" scoped>
.logo-component {
  display: flex;
  padding-left: 15px;
  width: 210px;
  height: 100%;
  .logo-container {
    position: relative;
    .logo-link {
      .logo {
        width: 32px;
        height: 32px;
        margin-bottom: 8px;
        border-radius: 3px;
      }
      .logo-title {
        display: inline-block;
        margin: 0 0 0 12px;
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        width: 150px;
      }
    }
  }
}
</style>
