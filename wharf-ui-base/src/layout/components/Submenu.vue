<template>
  <el-sub-menu :index="props.index">
    <template #title>
      <slot name="title">
        <Icon v-if="props.icon" :icon="props.icon" class="mr-2" />
        {{ props.title }}
      </slot>
    </template>
    <slot></slot>
  </el-sub-menu>
</template>

<script setup>
const props = defineProps({
  index: {
      type: String,
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
</script>

<style lang="scss" scoped>
</style>
