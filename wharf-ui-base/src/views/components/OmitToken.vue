<template>
  <el-tooltip
    effect="dark"
    :content="props.token"
    :placement="props.placement"
    :disabled="!omit"
  >
    <slot :token="showToken">
      {{ showToken }}
    </slot>
  </el-tooltip>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  token: {
    type: String,
    default: null,
  },
  before: {
    type: Number,
    default: 4,
  },
  after: {
    type: Number,
    default: 4,
  },
  placement: {
    type: String,
    default: "top",
  },
  dotCount: {
    type: Number,
    default: 3,
  },
});
const omit = ref(false);
const showToken = computed(() => {
  const len = props.token?.length;
  if (!props.token || len <= props.before + props.after + 3) {
    omit.value = false;
    return props.token;
  }

  omit.value = true;
  return (
    props.token.substring(0, props.before) +
    ".".repeat(props.dotCount) +
    props.token.substring(len - props.after, len)
  );
});
</script>

<style lang="scss" scoped>
</style>
