<template>
  <div class="desc-list">
    <slot></slot>
  </div>
</template>

<script setup>
import { provide } from "vue"

const props = defineProps({
  labelWidth: {
    type: String,
    default: null,
  },
  padding: {
    type: String,
    default: null,
  },
})
provide('list-label-width', props.labelWidth)
provide('list-padding', props.padding)
</script>

<style lang="scss" scoped>
.desc-list {
}
</style>
