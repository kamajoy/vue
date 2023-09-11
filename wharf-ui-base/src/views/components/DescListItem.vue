<template>
  <div class="list-item" :style="{ padding }">
    <div class="list-item-label oneline-ellipsis desc-label" :style="{ width: labelWidth }" :class="props.labelClass">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="list-item-calon desc-label" v-if="calon" :class="props.calonClass">：</div>
    <div class="list-item-content desc-content" :class="props.contentClass">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  labelClass: {
    type: [String, Array],
    default: null,
  },
  contentClass: {
    type: [String, Array],
    default: null,
  },
  calon: {
    type: Boolean,
    default: true,
  },
  calonClass: {
    type: [String, Array],
    default: null,
  },
})
const injectLabelWidth = inject('list-label-width')
const injectPadding = inject('list-padding')
const labelWidth = computed(() => {
  return injectLabelWidth || '5em'
})
const padding = computed(() => {
  return `${injectPadding || '5px'} 0`
})
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
}
.list-item-label {
}
.list-item-content {
  flex: 1;
}
</style>
