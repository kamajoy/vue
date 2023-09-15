import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh-cn'
import enLocale from './lang/en'
// import { useAppStore } from '@/store/app'

// 1. 创建 message 数据源
const messages = {
  zh: {
    msg: {
      ...zhLocale
    }
  },
  en: {
    msg: {
      ...enLocale
    }
  }
}

// TODO: 使用pinia报错
// const appStore = useAppStore()

// 获取当前的语言
const getLanguage = () => {
  return appStore.language
}

// 2. 初始化 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Component API 模式，则需要将其设置 false
  globalInjection: true, // 全局注入 $t 函数
  locale: 'zh',
  messages
})

export default i18n
