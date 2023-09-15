import { defineStore } from 'pinia'
import { Local } from '@/utils/storage'
import { KEY_LANGUAGE, KEY_APP_SIDEBAR } from '@/constants'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebar: {
        opened: true  // 左则是否折叠
      },
      language: Local.get(KEY_LANGUAGE) || 'zh' // 设置国际化
    }
  },
  actions: {
    toggleSidebarAction() {
      this.sidebar.opened = !this.sidebar.opened
      if (this.sidebar.opened) {
        Local.set(KEY_APP_SIDEBAR, true)
      } else {
        Local.set(KEY_APP_SIDEBAR, false)
      }
    },
    changeLanguage(language) {
      Local.set(KEY_LANGUAGE, language)
      this.language = language
    }
  }
})