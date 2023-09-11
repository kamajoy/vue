<template>
  <el-tooltip
    effect="dark"
    :content="tips"
    placement="top"
    @hide="handleHide"
  >
    <el-icon
      v-if="props.el == 'icon'"
      ref="copyRef"
      :class="props.iconClass"
      class="copy"
      v-bind="$attrs"
      :data-clipboard-text="String(props.value)"
      @click="handleCopy"
    >
      <slot><Icon icon="ep:copy-document" /></slot>
    </el-icon>
    <el-button
      v-else
      ref="copyRef"
      v-bind="$attrs"
      :data-clipboard-text="String(props.value)"
      @click="handleCopy"
    >
      <slot>复制</slot>
    </el-button>
  </el-tooltip>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import Clipboard from "clipboard";

const props = defineProps({
  value: {
    type: [String, Number],
    default: null,
  },
  iconClass: {
    type: Array,
    default () { return [] }
  },
  tips: {
    type: String,
    default: 'Copy me'
  },
  time: {
    type: Number,
    default: 3000
  },
  el: {
    type: String,
    default: 'icon' // icon/button
  }
})
// 禁用属性继承
defineOptions({
  inheritAttrs: false
})
const copyRef = ref()
let clip = null

// 复制
const handleCopy = () => {
  clip.on('success', (e) => {
    setTips('Copied!')
    
  })
  clip.on('error', (e) => {
    setTips('Copy failed')
  })
}

// tooltip隐藏回调
const handleHide = () => {
  if (timer) {
    clearTimeout(timer)
  }
  tips.value = props.tips
}

const tips = ref(props.tips)
// 设置tips，并倒计时重新设置恢复原来的tips
let timer = null
const setTips = (newTips) => {
  if (timer) {
    clearTimeout(timer)
  }
  tips.value = newTips
  timer = setTimeout(() => {
    tips.value = props.tips
  }, props.time)
}
onMounted(() => {
  clip = new Clipboard(copyRef.value.$el)
})
onBeforeUnmount(() => {
  // 清理定时器
  if (timer) {
    clearTimeout(timer)
  }
  clip?.destroy()
})
</script>

<style lang="scss" scoped>
.copy {
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
