<template>
  <el-container class="layout-container flex-center">
    <navbar />
    <el-container>
      <sidebar />
      <div class="flex-center">
        <tags-view v-if="isTagsView" />
        <app-main />
      </div>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { Sidebar, Navbar, AppMain } from '../components'
import TagsView from '@/layout/components/navbar/tags-view/index.vue'

const settingsStore = useSettingsStore()

const isTagsView = computed(() => settingsStore.isTagsView)
</script>

<style lang="scss" scoped>

</style>
