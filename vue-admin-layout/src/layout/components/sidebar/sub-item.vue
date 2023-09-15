<template>
  <template v-if="!route.isHide">
    <template
      v-if="
        hasOneShowingChild(route.children, route) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !route.alwaysShow
      "
    >
      <!-- <el-menu-item v-if="onlyOneChild.meta" :index="resolvePath(onlyOneChild.path)">
        <i class="iconfont" :class="onlyOneChild.meta.icon" />
        <app-link :to="resolvePath(onlyOneChild.path)">
          {{ onlyOneChild.meta.title }}
        </app-link>
      </el-menu-item> -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i class="iconfont" :class="onlyOneChild.meta.icon" />
          <template #title>{{ onlyOneChild.meta.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else :index="resolvePath(route.path)" popper-append-to-body>
      <template #title v-if="route.meta">
        <i class="iconfont" :class="route.meta.icon" />
        <span>{{ route.meta.title }}</span>
      </template>
      <sub-item
        v-for="child in route.children"
        :key="child"
        :route="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { ref } from 'vue'
import { getNormalPath } from '@/utils'
import { isExternal } from '@/utils/validate'
import AppLink from './link.vue'

const props = defineProps({
  route: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref({})
const hasOneShowingChild = (children = [], parent) => {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.isHide) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  // 一级菜单
  if (showingChildren.length === 1) {
    return true
  }

  // 外链接
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  // return path.resolve(props.basePath, routePath)
  return getNormalPath(props.basePath + '/' + routePath)
}
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 16px;
}
</style>
