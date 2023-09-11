<template>
  <li class="menu-item" :class="{ 'menu-item-active': active }">
    <app-link :to="props.to">
      <Icon :icon="props.icon" />
      <span>{{ props.title }}</span>
    </app-link>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import AppLink from '~/layout/components/Link.vue'
import { useRoute } from 'vue-router';

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
  })
const route = useRoute()
const active = computed(() => {
  return route.fullPath == props.to.value || route.meta?.userNav
})
</script>

<style lang="scss" scoped>
.menu-item {
  font-size: 13px;
  line-height: 32px;
  color: #909399;
  :hover {
    color: rgba(0, 0, 0, 0.755);
  }
  svg {
    margin-right: 8px;
  }
  a {
    display: block;
  }
}
.menu-item-active {
  color: rgba(0, 0, 0, 0.755);
}
</style>
