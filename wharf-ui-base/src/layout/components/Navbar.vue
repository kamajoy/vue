<template>
  <div class="navbar-component">
    <el-menu
      :default-active="activeNav"
      mode="horizontal"
      :ellipsis="false"
      background-color="#2D384B"
      text-color="#fff"
      active-text-color="#589EF8"
    >
      <menu-item title="开发集成" icon="carbon:integration" :to="{ name: 'DevLayout' }" index="DevLayout" />
    </el-menu>
    <navbar-search />
  </div>
</template>

<script setup>
import MenuItem from '~/layout/components/MenuItem.vue'
import NavbarSearch from '~/layout/components/Search.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 定义菜单索引map，帮助自动定位高亮菜单
const menuIndexes = {
  DevLayout: null,
  DevAppLayout: 'DevLayout',
}

const route = useRoute()
const activeNav = computed(() => {
  // 配置了meta.nav则优先使用
  if (route.meta?.nav) {
    return route.meta.nav
  }
  // 否则根据索引map自动计算
  for (const match of route.matched) {
    if (match.name && menuIndexes[match.name] !== undefined) {
      return menuIndexes[match.name] || match.name
    }
  }
  // 都找不到则返回路由名
  return route.name
})
</script>

<style lang="scss" scoped>
.navbar-component {
  flex: 1 1 0%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  :deep(.el-menu--horizontal) {
    border-bottom-width: 0px;
  }
}
</style>

<style lang="scss">
.navbar-component {
  .el-menu-item,
  .el-submenu__title {
    height: 48px !important;
    line-height: 48px !important;
  }
  .el-menu-item svg,
  .el-submenu svg {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 14px;
    vertical-align: middle;
  }
}
.i-* {
  display: inline;
}
</style>
