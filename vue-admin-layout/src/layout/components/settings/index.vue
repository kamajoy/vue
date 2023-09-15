<template>
  <div class="setting-container">
    <el-drawer
      title="布局配置"
      size="270px"
      destroy-on-close
      v-model="showSettings"
      @close="handleDrawerClose"
    >
      <el-scrollbar class="layout-setting-bar">
        <!-- 布局切换 -->
        <el-divider content-position="left">布局切换</el-divider>
        <div class="layout-drawer-content-flex">
          <!-- defaults 布局 -->
          <div class="layout-drawer-content-item" @click="handleLayout('defaults')">
            <section
              class="el-container el-circular"
              :class="{ 'drawer-layout-active': settingsStore.layout === 'defaults' }"
            >
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div
              class="layout-tips-warp"
              :class="{ 'layout-tips-warp-active': settingsStore.layout === 'defaults' }"
            >
              <div class="layout-tips-box">
                <p class="layout-tips-txt">默认</p>
              </div>
            </div>
          </div>
          <!-- classic 布局 -->
          <div class="layout-drawer-content-item" @click="handleLayout('classic')">
            <section
              class="el-container is-vertical el-circular"
              :class="{ 'drawer-layout-active': settingsStore.layout === 'classic' }"
            >
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container">
                <aside class="el-aside" style="width: 20px"></aside>
                <section class="el-container is-vertical">
                  <main class="el-main"></main>
                </section>
              </section>
            </section>
            <div
              class="layout-tips-warp"
              :class="{ 'layout-tips-warp-active': settingsStore.layout === 'classic' }"
            >
              <div class="layout-tips-box">
                <p class="layout-tips-txt">经典</p>
              </div>
            </div>
          </div>
          <!-- transverse 布局 -->
          <div class="layout-drawer-content-item" @click="handleLayout('transverse')">
            <section
              class="el-container is-vertical el-circular"
              :class="{ 'drawer-layout-active': settingsStore.layout === 'transverse' }"
            >
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container">
                <section class="el-container is-vertical">
                  <main class="el-main"></main>
                </section>
              </section>
            </section>
            <div
              class="layout-tips-warp"
              :class="{ 'layout-tips-warp-active': settingsStore.layout === 'transverse' }"
            >
              <div class="layout-tips-box">
                <p class="layout-tips-txt">横向</p>
              </div>
            </div>
          </div>
          <!-- columns 布局 -->
          <div class="layout-drawer-content-item" @click="handleLayout('columns')">
            <section
              class="el-container el-circular"
              :class="{ 'drawer-layout-active': settingsStore.layout === 'columns' }"
            >
              <aside class="el-aside-dark" style="width: 10px"></aside>
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div
              class="layout-tips-warp"
              :class="{ 'layout-tips-warp-active': settingsStore.layout === 'columns' }"
            >
              <div class="layout-tips-box">
                <p class="layout-tips-txt">分栏</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 界面设置 -->
        <el-divider content-position="left">界面设置</el-divider>
        <div class="layout-drawer-item">
          <span>固定 Header</span>
          <el-switch v-model="isFixedHeader" />
        </div>
        <div class="layout-drawer-item">
          <span>开启 TagsView</span>
          <el-switch v-model="isTagsView" />
        </div>
        <div class="layout-drawer-item">
          <span>开启 Footer</span>
          <el-switch v-model="isFooter" />
        </div>
        <div class="layout-drawer-item">
          <span>侧边栏 Logo</span>
          <el-switch v-model="isSidebarLogo" />
        </div>
        <div class="layout-drawer-item">
          <span>动态标题</span>
          <el-switch v-model="isDynamicTitle" />
        </div>
        <div class="layout-drawer-item">
          <span>开启水印</span>
          <el-switch v-model="isWatermark" @click="changeWatermark" />
        </div>
        <div class="layout-drawer-item">
          <span>水印文案</span>
          <el-input
            v-model="watermarkText"
            size="small"
            style="width: 100px"
            placeholder="水印文案"
            :disabled="!isWatermark"
            @input="inputWatermarkText($event)"
            clearable
          />
        </div>

        <!-- 主题设置 -->
        <el-divider content-position="left">主题设置</el-divider>
        <div class="layout-drawer-item">
          <span>主题颜色</span>
          <el-color-picker v-model="settingsStore.themeColor" size="small" />
        </div>

        <!-- <el-divider /> -->
      </el-scrollbar>
      <div class="layout-footer-button">
        <el-button type="primary" plain :icon="DocumentAdd" @click="handleSave">保存配置</el-button>
        <el-button plain :icon="Refresh" @click="handleReset">重置配置</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { ElLoading } from 'element-plus'
import { DocumentAdd, Refresh } from '@element-plus/icons-vue'
import { Local } from '@/utils/storage'
import { KEY_LAYOUT_CONFIG } from '@/constants'
import Watermark from './watermark'

const settingsStore = useSettingsStore()

const showSettings = ref(false)

// 布局切换
const handleLayout = (value) => {
  settingsStore.changeSettingsActions({
    key: 'layout',
    value
  })
}

// 是否需要固定 Header
const isFixedHeader = computed({
  get: () => settingsStore.isFixedHeader,
  set: (value) => {
    settingsStore.changeSettingsActions({
      key: 'isFixedHeader',
      value
    })
  }
})

// 是否需要 TagsView
const isTagsView = computed({
  get: () => settingsStore.isTagsView,
  set: (value) => {
    settingsStore.changeSettingsActions({
      key: 'isTagsView',
      value
    })
  }
})

// 是否需要 Footer
const isFooter = computed({
  get: () => settingsStore.isFooter,
  set: (value) => {
    settingsStore.changeSettingsActions({
      key: 'isFooter',
      value
    })
  }
})

// 则边栏 Logo
const isSidebarLogo = computed({
  get: () => settingsStore.isSidebarLogo,
  set: (value) => {
    settingsStore.changeSettingsActions({
      key: 'isSidebarLogo',
      value
    })
  }
})

// 动态标题
const isDynamicTitle = computed({
  get: () => settingsStore.isDynamicTitle,
  set: (value) => {
    settingsStore.changeSettingsActions({
      key: 'isDynamicTitle',
      value
    })
  }
})

// 开启水印
const isWatermark = computed({
  get: () => settingsStore.isWatermark,
  set: (value) => {
    settingsStore.changeSettingsActions({
      key: 'isWatermark',
      value
    })
  }
})

// 水印文案
const watermarkText = computed({
  get: () => settingsStore.watermarkText,
  set: (value) => {
    settingsStore.changeSettingsActions({
      key: 'watermarkText',
      value
    })
  }
})

const changeWatermark = () => {
  isWatermark.value ? Watermark.set(watermarkText.value) : Watermark.del()
}

const inputWatermarkText = (val) => {
  if (watermarkText.value === '') return false
  if (isWatermark.value) Watermark.set(watermarkText.value)
}

// 打开布局配置
const openSetting = () => {
  showSettings.value = true
}

// 关闭弹窗
const handleDrawerClose = () => {
  showSettings.value = false
}

// 保存配置
const handleSave = () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: '正在保存到本地，请稍候...',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  const layoutConfig = {
    layout: settingsStore.layout,
    isFixedHeader: settingsStore.isFixedHeader,
    isTagsView: settingsStore.isTagsView,
    isFooter: settingsStore.isFooter,
    isSidebarLogo: settingsStore.isSidebarLogo,
    isDynamicTitle: settingsStore.isDynamicTitle,
    isWatermark: settingsStore.isWatermark,
    watermarkText: settingsStore.watermarkText
  }

  Local.set(KEY_LAYOUT_CONFIG, layoutConfig)

  setTimeout(() => {
    loadingInstance.close()
  }, 1000)
}

// 重置配置
const handleReset = () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: '正在清除设置缓存并刷新，请稍候...',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  Local.remove(KEY_LAYOUT_CONFIG)

  setTimeout(() => {
    // 重新刷新页面
    window.location.reload()
  }, 1000)
}

onMounted(() => {
  // 刷新页面的时，显示水印
  changeWatermark()
})

defineExpose({
  openSetting
})
</script>

<style lang="scss">
.el-drawer {
  .el-drawer__header {
    padding: 0 15px !important;
    height: 50px;
    display: flex;
    align-items: center;
    margin-bottom: 0 !important;
    border-bottom: 1px solid #e6e6e6;
  }
  .el-drawer__body {
    padding: 0;
  }
}
</style>

<style lang="scss" scoped>
.setting-container {
  .layout-setting-bar {
    height: calc(100vh - 120px);
    padding: 0 20px 20px;

    ::v-deep(.el-scrollbar__view) {
      overflow-x: hidden !important;
    }
  }
  // 布局切换
  .layout-drawer-content-flex {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    // margin: 0 -5px;
    .layout-drawer-content-item {
      width: 50%;
      height: 70px;
      cursor: pointer;
      border: 1px solid transparent;
      position: relative;
      padding: 5px;
      box-sizing: border-box;
      .el-container {
        height: 100%;
        .el-aside-dark {
          background-color: #b3c0d1;
        }
        .el-aside {
          background-color: #d3dce6;
        }
        .el-header {
          background-color: #b3c0d1;
        }
        .el-main {
          background-color: #e9eef3;
        }
      }
      .el-circular {
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid transparent;
        transition: all 0.3s ease-in-out;
        box-sizing: border-box;
      }
      .drawer-layout-active {
        border: 1px solid;
        border-color: var(--color-primary);
        box-sizing: border-box;
      }
      .layout-tips-warp,
      .layout-tips-warp-active {
        transition: all 0.3s ease-in-out;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid;
        border-color: var(--color-primary-light-4);
        border-radius: 100%;
        padding: 4px;
        box-sizing: border-box;
        .layout-tips-box {
          transition: inherit;
          width: 30px;
          height: 30px;
          z-index: 9;
          border: 1px solid;
          border-color: var(--color-primary-light-4);
          border-radius: 100%;
          .layout-tips-txt {
            transition: inherit;
            position: relative;
            top: 5px;
            font-size: 12px;
            line-height: 1;
            letter-spacing: 2px;
            white-space: nowrap;
            color: var(--color-primary-light-4);
            text-align: center;
            transform: rotate(30deg);
            left: -1px;
            background-color: #e9eef3;
            width: 32px;
            height: 17px;
            line-height: 17px;
          }
        }
      }
      .layout-tips-warp-active {
        border: 1px solid;
        border-color: var(--color-primary);
        .layout-tips-box {
          border: 1px solid;
          border-color: var(--color-primary);
          .layout-tips-txt {
            color: var(--color-primary) !important;
            background-color: #e9eef3 !important;
          }
        }
      }
      &:hover {
        .el-circular {
          transition: all 0.3s ease-in-out;
          border: 1px solid;
          border-color: var(--color-primary);
        }
        .layout-tips-warp {
          transition: all 0.3s ease-in-out;
          border-color: var(--color-primary);
          .layout-tips-box {
            transition: inherit;
            border-color: var(--color-primary);
            .layout-tips-txt {
              transition: inherit;
              color: var(--color-primary) !important;
              background-color: #e9eef3 !important;
            }
          }
        }
      }
    }
  }

  // 界面设置
  .layout-breadcrumb-setting-bar-flex {
    display: flex;
    align-items: center;
    &-label {
      flex: 1;
      color: #666666;
    }
  }

  .layout-drawer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    color: #666666;
    font-size: 14px;
  }

  .layout-footer-button {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0;
    border-top: 1px solid #e6e6e6;
  }
}
</style>
