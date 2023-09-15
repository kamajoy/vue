<template>
  <el-header class="navbar-container" :height="setHeaderHeight">
    <hy-header />
    <tags-view v-if="isTagsView" />
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import HyHeader from './header/index.vue'
import TagsView from './tags-view/index.vue'

const settingsStore = useSettingsStore()

// 是否显示 TagsView
const isTagsView = computed(() => {
  const { layout, isTagsView } = settingsStore
  return (isTagsView && layout !== "classic")
})


// 设置 header 的高度
const setHeaderHeight = computed(() => {
  const { layout, isTagsView } = settingsStore
  if (isTagsView && layout !== 'classic') {
    return '84px'
  } else {
    return '50px'
  }
})
</script>

<style lang="scss" scoped>

</style>
