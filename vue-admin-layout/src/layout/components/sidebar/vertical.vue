<template>
  <el-aside class="sidebar-container">
    <logo v-if="isSidebarLogo" />
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#fff"
        :unique-opened="true"
        :collapse-transition="false"
      >
        <sub-item
          v-for="(route, index) in routes"
          :key="route.path + index"
          :route="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
import { useSettingsStore } from '@/store/settings'
import SubItem from './sub-item.vue'
import Logo from '../logo/index.vue'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()

const routes = computed(() => permissionStore.routes)

const isSidebarLogo = computed(() => {
  const { layout, isSidebarLogo } = settingsStore
  return isSidebarLogo && layout !== 'classic'
})

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => !appStore.sidebar.opened)
</script>

<style lang="scss" scoped>

</style>
