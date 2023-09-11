import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      mainPaddingTop: 48,
      // 登录重定向地址
      loginRedirect: null,
      // 顶层router key
      topRouterKey: Date.now()
    }
  },
  persist: {
    enabled: false
  },
  actions: {
    // 更新mainPaddingTop
    setMainPaddingTop(mainPaddingTop) {
      this.mainPaddingTop = mainPaddingTop
    },
    // 设置登录重定向地址
    setLoginRedirect(url) {
      this.loginRedirect = url
    },
    // pop登录重定向地址
    popLoginRedirect() {
      const url = this.loginRedirect
      this.loginRedirect = null
      return url
    },
    // 强制刷新
    forceReload() {
      this.topRouterKey = Date.now()
    },
  }
})
