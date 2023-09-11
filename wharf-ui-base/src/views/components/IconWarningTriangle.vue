<template>
  <el-icon :style="{ color: props.color ? 'var(--el-color-danger)' : '' }">
    <Icon icon="ep:warn-triangle-filled"/>
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
