<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <!-- 不可点击项 -->
        <span v-if="index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <!-- 可以点击项 -->
        <a v-else class="redirect" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
// TODO: 另一种处理方法
const levelList = ref([])
const getBreadcrumbData = () => {
  levelList.value = route.matched.filter((item) => item.meta && item.meta.title)
}

// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

const handleLink = (item) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
  }
}
</style>
