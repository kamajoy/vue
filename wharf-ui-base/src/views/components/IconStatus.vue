<template>
  <component :is="component" :color="props.color" />
</template>

<script setup>
import { computed } from "vue";
import IconError from "./IconError.vue";
import IconInfo from "./IconInfo.vue";
import IconSuccess from "./IconSuccess.vue";
import IconWarning from "./IconWarning.vue";
import IconQuestion from "./IconQuestion.vue";
import IconWarningTriangle from "./IconWarningTriangle.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  color: {
    type: Boolean,
    default: true
  }
})
const component = computed(() => {
  switch (props.type) {
    case 'error':
      return IconError
    case 'success':
      return IconSuccess
    case 'warning':
      return IconWarning
    case 'warning3':
      return IconWarningTriangle
    case 'question':
      return IconQuestion
    case 'info':
    default:
      return IconInfo
  }
})
</script>

<style lang="scss" scoped>
</style>
