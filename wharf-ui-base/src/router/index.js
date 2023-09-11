import {createRouter, createWebHistory} from 'vue-router'
import Layout from '~/layout/Layout.vue'
import UserLayout from '~/layout/apps/User.vue'
import DevIntegrateLayout from '~/layout/apps/DevIntegrate.vue'
import {registerHooks} from './hook'

export const constRouters = [
    {
        path: '/',
        name: 'Root',
        component: Layout,
        redirect: {name: 'DevLayout'},
        meta: {hidden: true},
        children: [
            {
                path: '/dev/_',
                name: 'DevLayout',
                redirect: {name: 'DevApp'},
                component: DevIntegrateLayout,
                meta: {hidden: true, title: '开发集成'},
                children: [
                    {
                        path: '/dev/app',
                        name: 'DevApp',
                        component: () => import('~/views/dev/app/List.vue'),
                        meta: {title: '应用', breadcrumbBefore: []}
                    },
                    {
                        path: '/dev/app/create',
                        name: 'DevAppCreate',
                        component: () => import('~/views/dev/app/Create.vue'),
                        meta: {title: '创建应用', appNav: 'DevApp', breadcrumbBefore: [{name: 'DevApp'}]}
                    },
                    {
                        path: '/dev/business',
                        name: 'DevBusiness',
                        component: () => import('~/views/dev/business/List.vue'),
                        meta: {title: '业务组', breadcrumbBefore: []}
                    },
                ],
            },
            {
                path: '/user/_',
                name: 'UserLayout',
                redirect: {name: 'User'},
                component: UserLayout,
                meta: {hidden: true},
                children: [
                    {
                        path: '/user',
                        name: 'User',
                        component: () => import('~/views/user/User.vue'),
                        meta: {title: '个人中心'}
                    },
                    {
                        path: '/user/loginlog',
                        name: 'UserLoginLog',
                        component: () => import('~/views/user/LoginLog.vue'),
                        meta: {title: '登录日志'}
                    },
                    {
                        path: '/user/notify',
                        name: 'UserNotify',
                        component: () => import('~/views/user/notify/Notify.vue'),
                        meta: {title: '我的消息'}
                    },
                    {
                        path: '/user/notify/setting',
                        name: 'UserNotifySetting',
                        component: () => import('~/views/user/notify/Setting.vue'),
                        meta: {title: '通知设置'}
                    },
                    {
                        path: '/user/notify/:notifyId(\\d+)/detail',
                        name: 'UserNotifyDetail',
                        component: () => import('~/views/user/notify/Detail.vue'),
                        meta: {title: '消息详情', hidden: true}
                    },
                ]
            }
        ]
    },
    {
        path: '/403',
        component: () => import('~/views/error/403.vue'),
    },
    {
        path: '/404',
        component: () => import('~/views/error/404.vue'),
    },
    {
        path: '/500',
        component: () => import('~/views/error/500.vue'),
    },
    {path: '/:path(.*)*', redirect: '/404', hidden: true}
]

const router = createRouter({
    history: createWebHistory(),
    strict: true,
    routes: constRouters,
    scrollBehavior: () => ({left: 0, top: 0})
})

registerHooks(router)

export const setupRouter = (app) => {
    app.use(router)
}

export default router
