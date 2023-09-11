import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '~/store/modules/app';

// 登录重定向
export const loginRedirect = () => {
  const router = useRouter()
  const route = useRoute()
  const appStore = useAppStore()

  appStore.setLoginRedirect(route.fullPath)
  router.push({ name: 'Login' })
}

// 登录回调
export const loginCallback = () => {
  const router = useRouter()
  const appStore = useAppStore()
  const redirect = appStore.popLoginRedirect()
  if (redirect) {
    router.push(redirect)
  } else {
    router.push({ name: 'Root' })
  }
}
