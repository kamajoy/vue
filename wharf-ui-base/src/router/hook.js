import { scrollTo } from "~/utils/helper"

// 注册路由钩子
export function registerHooks(router) {
  router.afterEach((to, from) => {
    // 路由中包含 router.push({ name: 'RouterName', state: { scrollTo: 'ID' } }) 的可以自动滚动定位，在定位处元素增加 id='ID' 属性即可
    setTimeout(() => {
      scrollTo(history.state.scrollTo)
    }, 500)
  })
}
