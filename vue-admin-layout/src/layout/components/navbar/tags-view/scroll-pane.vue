<template>
  <el-scrollbar class="scroll-container" ref="scrollbarRef" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'

const { proxy } = getCurrentInstance()

// TODO: 不理解什么意思
const scrollWrapper = computed(() => proxy.$refs.scrollbarRef.$refs.wrap$)

// 鼠标滚动事件
const handleScroll = e => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
  console.log('鼠标滚动事件')
}

const emitScroll = () => {
  emits('scroll')
}

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})
</script>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }

  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
