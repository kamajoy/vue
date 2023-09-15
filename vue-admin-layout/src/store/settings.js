import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { Local } from '@/utils/storage'
import { KEY_LAYOUT_CONFIG } from '@/constants'

const { title, layout, isFixedHeader, isTagsView, isFooter, isSidebarLogo, isDynamicTitle, isWatermark, watermarkText } = defaultSettings
const storageSettings = Local.get(KEY_LAYOUT_CONFIG) || ''

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      globalTitle: '',
      layout: storageSettings.layout || layout,
      // 是否固定 header
      isFixedHeader: storageSettings.isFixedHeader === undefined ? isFixedHeader : storageSettings.isFixedHeader,
      // 是否显示 tagsView
      isTagsView: storageSettings.isTagsView === undefined ? isTagsView : storageSettings.isTagsView,
      // 是否显示底部 footer
      isFooter: storageSettings.isFooter || isFooter,
      // 是否在侧边栏显示logo
      isSidebarLogo: storageSettings.isSidebarLogo === undefined ? isSidebarLogo : storageSettings.isSidebarLogo,
      // 动态标题
      isDynamicTitle: storageSettings.isDynamicTitle || isDynamicTitle,
      // 是否开启水印
      isWatermark: storageSettings.isWatermark || isWatermark,
      // 水印文案
      watermarkText: storageSettings.watermarkText || watermarkText,
      // 主题色
      themeColor: '#409EFF'
    }
  },
  actions: {
    changeSettingsActions({key, value}) {
      this[key] = value
    }
  }
})
