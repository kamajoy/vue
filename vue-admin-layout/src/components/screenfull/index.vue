<template>
  <div>
    <el-tooltip effect="dark" placement="bottom" :content="isFullscreen ? '退出全屏' : '全屏'">
      <!-- <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" /> -->
      <div @click="toggle">全部</div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>

</style>
