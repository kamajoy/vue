import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Profile from '@/views/profile/index.vue'

import User from '@/views/system/user/index.vue'
import Layout from '@/layout/index.vue'
import Home from '@/views/home/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    isHide: true
  },
  {
    path: '/',
    component: Layout,
    isHide: true,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          // title: 'msg.router.home'
          title: '首页',
          icon: 'icon-user'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
