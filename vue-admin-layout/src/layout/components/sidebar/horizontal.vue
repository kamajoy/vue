<template>
  <div class="el-menu-horizontal-warp">
    <el-menu mode="horizontal">
      <sub-item v-for="(route, index) in routes" :key="route.path + index" :route="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePermissionStore } from '@/store/permission'
import SubItem from './sub-item.vue'

const permissionStore = usePermissionStore()

const routes = computed(() => permissionStore.routes)
</script>

<style lang="scss" scoped>
.el-menu-horizontal-warp {
  flex: 1;
  overflow: hidden;
  margin-right: 30px;

  .el-menu.el-menu--horizontal {
		display: flex;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
    border-bottom: 0;
	}
}
</style>
