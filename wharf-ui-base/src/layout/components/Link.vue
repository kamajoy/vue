
<template>
  <a v-if="isExternalUrl" :href="props.to" target="_blank" ref="noopener"><slot/></a>
  <router-link v-else :to="props.to"><slot/></router-link>
</template>

<script setup>
import { isExternal } from '~/utils/validate'
import { ref } from 'vue'

const props = defineProps({
    to: {
      type: [String, Object],
      required: true
    }
  })

const isExternalUrl = ref(true)
isExternalUrl.value = typeof props.to === 'string' && isExternal(props.to)
</script>
