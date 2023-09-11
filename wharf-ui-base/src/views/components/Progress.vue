<template>
  <el-progress :percentage="percentage" :color="color" />
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  total: {
    type: [Number, null],
    required: true,
  },
  value: {
    type: [Number, null],
    required: true,
  },
  levels: {
    type: Array,
    default: () => { return [50, 70] }
  }
})
const percentage = computed(() => {
  const val = !props.total ? 0 : Math.round(props.value * 100 / props.total)
  return val > 100 ? 100 : (val < 0 ? 0 : val)
})
const color = computed(() => {
  if (percentage.value <= props.levels[0]) {
    return 'var(--el-color-success)'
  } else if (percentage.value > props.levels[1]) {
    return 'var(--el-color-danger)'
  } else {
    return 'var(--el-color-warning)'
  }
})
</script>

<style lang="scss" scoped>
</style>
