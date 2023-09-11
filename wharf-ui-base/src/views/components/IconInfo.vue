<template>
  <el-icon :style="{ color: props.color ? 'var(--el-color-info)' : '' }">
    <Icon icon="ep:info-filled"/>
  </el-icon>
</template>

<script setup>
const props = defineProps({
  color: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
</style>
