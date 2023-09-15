import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index.vue'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../views/**/*.vue')

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: [],
      addRoutes: []
    }
  },
  actions: {
    // 生成路由
    async generateRoutes() {
      const { data } = await getRouters()
      const routes = filterAsyncRouter(data)
      this.routes = constantRoutes.concat(routes)
      this.addRoutes = routes
      return routes
    }
  }
})

const filterAsyncRouter = routes => {
  return routes.filter(route => {
    if (route.component) {
      switch(route.component) {
        case 'Layout':
          route.component = Layout
          break
        case 'InnerLink':
          route.component = 'test'
          break
        default:
          route.component = loadView(route.component)
          break
      }
    }
    if (route.children && route.children !== null && route.children.length > 0) {
      route.children = filterAsyncRouter(route.children)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

const loadView = view => {
  let res
  for (const test in modules) {
    const dir = test.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[test]()
    }
  }
  return res
}
