import { defineStore } from 'pinia'
import router from '@/router'
import { login, getUserInfo } from '@/api/login'
import { Session } from '@/utils/storage'
import { KEY_TOKEN } from '@/constants'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: Session.get(KEY_TOKEN) || '',
      userInfo: { }
    }
  },
  getters: {
    hasUserInfo(state) {
      return JSON.stringify(state.userInfo) !== '{}'
    }
  },
  actions: {
    loginActions(userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          this.token = res.token
          Session.set(KEY_TOKEN, res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getUserInfoActions() {
      const result = await getUserInfo()
      this.userInfo = result
      return result
    },
    logoutActions() {
      this.token = ''
      this.userInfo = { }
      Session.remove(KEY_TOKEN)
      router.push('/login')
    }
  }
})
