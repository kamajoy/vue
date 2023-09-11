<template>
  <div class="app-layout">
    <div class="app-layout-nav" :style="{ top: mainPaddingTop }">
      <el-scrollbar>
        <el-menu :default-active="activeMenu" class="nav-menu-container">
          <menu-item :to="{ name: 'DevApp' }" index="DevApp" title="应用" icon="ep:grid"/>
          <menu-item :to="{ name: 'DevBusiness' }" index="DevBusiness" title="业务组" icon="ep:help-filled"/>
          <menu-item :to="{ name: 'DevBusiness' }" index="DevBusiness" title="菜单名称-01" icon="ep:help-filled"/>
          <menu-item :to="{ name: 'DevBusiness' }" index="DevBusiness" title="菜单名称-02" icon="ep:help-filled"/>
          <menu-item :to="{ name: 'DevBusiness' }" index="DevBusiness" title="菜单名称-03" icon="ep:help-filled"/>
          <menu-item :to="{ name: 'DevBusiness' }" index="DevBusiness" title="菜单名称-04" icon="ep:help-filled"/>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="app-layout-main">
      <router-view>
        <template #default="{ Component, route }">
          <component :is="Component" :key="route.fullPath"/>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import MenuItem from '~/layout/components/MenuItem.vue'
import Submenu from '~/layout/components/Submenu.vue'
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import {useAppStore} from '~/store/modules/app';

const route = useRoute()
const appStore = useAppStore()
// 高亮菜单
const activeMenu = computed(() => route.meta?.appNav || route.name)
const mainPaddingTop = computed(() => appStore.mainPaddingTop + 'px')
</script>

<style lang="scss" scoped>
.app-layout {
  position: relative;
  height: 100%;

  .app-layout-nav {
    position: fixed;
    bottom: 0;
    width: 210px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .nav-menu-container {
      :deep(.el-menu-item svg), :deep(.el-submenu svg) {
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }

  .app-layout-main {
    position: relative;
    margin-left: 210px;
  }
}
</style>
