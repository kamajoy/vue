<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view />
    <settings ref="settingRef" />
  </el-config-provider>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, getCurrentInstance, onBeforeMount } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { Settings } from '@/layout/components'
import setIntroduction from '@/utils/setIconfont'

const { proxy } = getCurrentInstance()
const settingRef = ref(null)
const size = ref('large') // large default small

const handleSetting = () => {
  settingRef.value.openSetting()
}

onBeforeMount(() => {
  // 设置批量第三方 icon 图标
  setIntroduction.cssCdn()
})

onMounted(() => {
  nextTick(() => {
    proxy.mittBus.on('handleSetting', () => {
      handleSetting()
    })
  })
})

onUnmounted(() => {
  proxy.mittBus.off('handleSetting', () => {})
})
</script>

<style>

</style>
