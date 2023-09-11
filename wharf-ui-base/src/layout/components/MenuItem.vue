<template>
  <el-menu-item :index="computedIndex">
    <app-link :to="props.to" class="menu-link">
      <slot>
        <Icon v-if="props.icon" :icon="props.icon" class="mr-2" />
        {{ props.title }}
      </slot>
    </app-link>
  </el-menu-item>
</template>

<script setup>
import AppLink from '~/layout/components/Link.vue'
import { computed } from 'vue'

const props = defineProps({
    to: {
      type: [String, Object],
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    index: {
      type: String,
      default: null,
    },
  })

const computedIndex = computed(() => {
  if (props.index) {
    return props.index
  }
  if (typeof props.to === 'object' && props.to.name) {
    return props.to.name
  }
  return props.to
})
</script>

<style lang="scss" scoped>
.menu-link {
  display: block;
  width: 100%;
}
</style>
