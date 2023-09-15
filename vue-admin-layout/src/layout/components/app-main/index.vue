<template>
  <el-main class="main-container">
    <el-scrollbar class="scrollbar-container" :style="setMinHeight">
      <section style="height: 100%;" class="content-container">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.key" style="width: 100%;" />
            </keep-alive>
          </transition>
        </router-view>
      </section>
      <!-- TODO: 影响滚动，字体大小影响滚动 -->
      <hy-footer v-if="isFooter" />
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import HyFooter from '../footer/index.vue'

const settingsStore = useSettingsStore()

const isFooter = computed(() => settingsStore.isFooter)

const setMinHeight = computed(() => {
  const { layout, isTagsView } = settingsStore
  if (isTagsView && layout !== 'classic') {
    return {
      'min-height': 'calc(100vh - 84px)'
    }
  } else {
    return {
      'min-height': 'calc(100vh - 50px)'
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
