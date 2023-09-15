import router from '@/router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['/login']

/**
 * @description: 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 你从哪里来
 * @param {*} next 是否要去?
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  NProgress.start()
  if (userStore.token) {
    // 1. 用户已登录，则不予许进入login
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 若不存在用户信息，则需要获取用户信息
      if (!userStore.hasUserInfo) {
        // 1. 获取用户信息
        await userStore.getUserInfoActions()
        // 2. 获取菜单权限
        const routes = await permissionStore.generateRoutes()
        // 3. 动态添加路由
        routes.forEach(route => {
          // 这里要判断外链接
          if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
            router.addRoute(route)
          }
        })
        return next({ ...to, replace: true })
        // next()
      }
      next()
    }
  } else {
    // 2. 用户未登录，只允许进入login
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
