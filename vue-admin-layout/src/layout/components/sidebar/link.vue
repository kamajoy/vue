<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  }
})

const isExt = computed(() => isExternal(props.to))

const type = computed(() => {
  if (isExt.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = () => {
  if (isExt.value) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: props.to
  }
}

</script>

<style lang="scss" scoped>

</style>
