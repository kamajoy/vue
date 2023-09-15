<template>
  <el-container class="layout-container" :class="classObj">
    <sidebar />
    <el-container class="flex-center">
      <navbar v-if="isFixedHeader" />
      <el-scrollbar>
        <navbar v-if="!isFixedHeader" />
        <app-main />
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'
import { Sidebar, Navbar, AppMain } from '../components'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const isFixedHeader = computed(() => settingsStore.isFixedHeader)

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
}))
</script>

<style lang="scss" scoped>
.hideSidebar .sidebar-container {
  width: 54px;
}
</style>
