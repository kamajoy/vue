<template>
  <header ref="headerRef" class="header">
    <el-alert
      v-show="noticeShow"
      ref="headerNoticeRef"
      class="header-notice"
      :title="noticeContent"
      :type="noticeType"
      show-icon>
    </el-alert>
    <div class="header-line">
      <logo />
      <navbar />
      <space />
    </div>
  </header>
</template>

<script setup>
import { nextTick, onMounted, watch, ref, onBeforeUnmount } from "vue"
import Logo from '~/layout/components/Logo.vue'
import Navbar from '~/layout/components/Navbar.vue'
import Space from '~/layout/components/Space.vue'
import { useAppStore } from '~/store/modules/app'

const headerRef = ref(null)
const headerNoticeRef = ref(null)
const appStore = useAppStore()
// 计算main paddingTop
const mainPaddingTopCalc = () => {
  nextTick(() => {
    appStore.setMainPaddingTop(headerRef.value.offsetHeight)
  })
}
// 初始化DOM监听
const noticeObserver = new MutationObserver(mutations => {
    mainPaddingTopCalc()
})

const noticeShow = ref(false)
const noticeContent = ref('消息提示内容xxxx')
const noticeType = ref('success')

onMounted(() => {
  mainPaddingTopCalc()
  // 注册DOM监听
  noticeObserver.observe(headerNoticeRef.value.$el, { attributes: true, childList: true, subtree: true, characterData: true })
})
onBeforeUnmount(() => {
  // 卸载DOM监听
  noticeObserver.disconnect()
})

</script>

<style lang="scss" scoped>
.header-line {
  display: flex;
  height: 48px;
  line-height: 48px;
  background: #2d384b;
}
</style>
