<template>
  <el-container class="layout-container">
    <columns-aside />
    <div class="layout-columns-warp">
      <sidebar />
      <el-container class="flex-center">
        <navbar v-if="isFixedHeader" />
        <el-scrollbar>
          <navbar v-if="!isFixedHeader" />
          <app-main />
        </el-scrollbar>
      </el-container>
    </div>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { Sidebar, Navbar, AppMain } from '@/layout/components'
import ColumnsAside from '@/layout/components/columns-aside/index.vue'

const settingsStore = useSettingsStore()

const isFixedHeader = computed(() => settingsStore.isFixedHeader)
</script>

<style lang="scss" scoped>
.layout-columns-warp {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
