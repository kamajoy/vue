<template>
  <div v-loading="loading" class="card">
    <div class="card-header">
      <div class="card-header-title">
        <slot name="title">{{ props.title }}</slot>
      </div>
      <div class="card-header-options">
        <slot name="options"></slot>
        <el-link type="primary"
          v-if="props.foldable"
          :underline="false"
          class="ml-15px"
          style="select: none;"
          @click="folded = !folded; showBody = true">
          <template v-if="folded">展开<Icon icon="ep:arrow-down" class="ml-5px" /></template>
          <template v-else>折叠<Icon icon="ep:arrow-up" class="ml-5px" /></template>
        </el-link>
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="!folded" class="card-body">
        <slot v-if="showBody"></slot>
      </div>
  </el-collapse-transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  folded: {
    type: Boolean,
    default: false,
  },
  foldable: {
    type: Boolean,
    default: false,
  },
  lazy: {
    type: Boolean,
    default: false,
  },
})
const folded = ref(props.folded)
const showBody = ref(!props.lazy)
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 20px;
  .card-header {
    background: #F5F5F5;
    border-bottom: 1px solid #dcdfe6;
    padding: 6px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-header-title {
      font-size: 14px;
      font-weight: 600;
      line-height: 28px;
      display: inline-block;
    }
    .card-header-options {
      display: inline-flex;
    }
  }
  .card-body {
    padding: 15px;
  }
}
</style>
