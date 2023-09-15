import axios from 'axios'
import { ElMessage } from 'element-plus'
// import i18n from '@/i18n'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    // if (store.getters.token) {
    //   config.headers.Authorization = `Bearer ${store.getters.token}`
    // }
    // 配置接口国际化
    config.headers['Accept-Language'] = 'zh-cn'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    const { code, message } = res.data
    if (code === 0) {
      // ElMessage.success(i18n.global.t('msg.tip.switchLanguage'))
      return res.data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    console.error('响应拦截异常')
    return Promise.reject(error)
  }
)

export default service
