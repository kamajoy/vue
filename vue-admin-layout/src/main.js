import { createApp } from 'vue'
import mitt from 'mitt'

import router from './router'
import store from './store'

import App from './App.vue';

import installPlugins from './plugins'
import i18n from './i18n'

// 初始化css样式
import 'normalize.css'
import './styles/index.scss'
import './permission'

const app = createApp(App)
installPlugins(app)
app.config.globalProperties.mittBus = mitt()
app.use(store).use(router).use(i18n).mount('#app')
