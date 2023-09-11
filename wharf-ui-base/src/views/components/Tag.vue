<template>
  <span v-if="!props.tag">-</span>
  <el-tag
    v-else
    :type="props.tag.type"
    :size="props.size"
    :effect="props.tag.effect || 'light'">
    {{ props.tag[props.label] }}
  </el-tag>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: Object,
    default: null,
  },
  label: {
    type: String,
    default: 'label'
  },
  size: {
    type: String,
    default: 'small',
  },
})
</script>

<style lang="scss" scoped>
</style>
