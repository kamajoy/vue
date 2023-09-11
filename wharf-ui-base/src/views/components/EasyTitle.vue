<template>
  <div class="easy-title" :class="`easy-title-${props.level}`" :style="style">
    <slot>{{ props.title }}</slot>
    <div class="easy-title-options clearfix">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  marginSet: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    default: 'h1'
  }
})
const style = computed(() => {
  const style = {}
  if (!props.marginSet) {
    return style
  }

  const margin = props.marginSet.split(' ')
  if (margin[0]) {
    style['margin-top'] = margin[0] + 'px'
  }
  if (margin[1]) {
    style['margin-bottom'] = margin[1] + 'px'
  }

  return style
})
</script>

<style lang="scss" scoped>
.easy-title {
  // margin-top: 24px;
  // margin-bottom: 16px;
  // font-weight: 600;
  // line-height: 1.25;
  font-weight: 600;
  line-height: 1.25;
}
.easy-title-h1 {
  // padding-bottom: .3em;
  // font-size: 2em;
  // border-bottom: 1px solid #dcdfe6;
  font-size: 24px;
  border-left: 4px solid #1890ff;
  padding-left: 10px;
}
.easy-title-h2 {
  // padding-bottom: .3em;
  // font-size: 1.5em;
  // border-bottom: 1px solid #dcdfe6;
  font-size: 20px;
  border-left: 3px solid #1890ff;
  padding-left: 8px;
}
.easy-title-h3 {
  // font-size: 1.25em;
  font-size: 16px;
  border-left: 2px solid #1890ff;
  padding-left: 6px;
}
.easy-title-h4 {
  // font-size: 1em;
  font-size: 14px;
}
.easy-title-h5 {
  // font-size: .875em;
  font-size: 14px;
  color: #57606a;
}
.easy-title-h6 {
  // font-size: .85em;
  // color: #57606a;
  font-size: 13px;
  color: #57606a;
}
.easy-title-options {
  float: right;
}
</style>
