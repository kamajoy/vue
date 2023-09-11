import { defineStore } from 'pinia'
import defaultAvatar from '~/assets/imgs/avatar.gif'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      recentsSearch: []
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: sessionStorage,
        paths: ['user']
      },
      {
        key: 'user',
        storage: localStorage,
        paths: ['recentsSearch']
      }
    ]
  },
  getters: {
    getUser() {
      return this.user
    },
    getUserAvatar() {
      return this.user?.avatar || defaultAvatar
    },
    getUserEmail() {
      return this.user?.email || '<未设置>'
    },
    getUserName() {
      return this.user?.name || '<未设置>'
    },
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    // 设置最近搜索项
    setRecentsSearch(recents) {
      this.recentsSearch = recents.slice(0, 10)
    }
  }
})
