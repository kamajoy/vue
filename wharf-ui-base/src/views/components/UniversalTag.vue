<template>
  <el-tag :size="props.size" :type="tag.type" :effect="tag.effect || 'light'">{{ tag[props.label] }}</el-tag>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  field: {
    type: [String, Number],
    default: null,
  },
  size: {
    type: String,
    default: 'small'
  },
  label: {
    type: String,
    default: 'label'
  }
})
const tag = computed(() => {
  return props.data[props.field] || { type: 'danger', [props.label]: props.field }
})
</script>

<style lang="scss" scoped>
</style>
