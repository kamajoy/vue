<template>
  <span>
    <span class="hidden-token">{{ showToken }}</span>
    <el-tag
      v-if="hiddenToken"
      type="warning"
      size="small"
      class="btn"
      @click="hiddenToken = false"
      >显示</el-tag
    >
    <el-tag
      v-if="!hiddenToken"
      size="small"
      class="btn"
      @click="hiddenToken = true"
      >隐藏</el-tag
    >
  </span>
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
});
const hiddenToken = ref(true);
const showToken = computed(() => {
  if (!hiddenToken.value || !props.token) {
    return props.token;
  }
  return props.token
    .split("")
    .map((char, index) => {
      if (
        index >= props.before &&
        index <= props.token.length - (props.after + 1)
      ) {
        return "*";
      } else {
        return char;
      }
    })
    .join("");
});
</script>

<style lang="scss" scoped>
.hidden-token {
  font-family: Consolas, "Courier New", Courier, FreeMono, monospace;
  display: inline-block;
  font-size: 16px;
}
.btn {
  cursor: pointer;
  margin-left: 5px;
}
</style>
