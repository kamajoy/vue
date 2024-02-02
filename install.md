# vue3

```doc 
安装nodejs,二进制文件直接安装：
https://nodejs.org/zh-cn

教程参考：
https://juejin.cn/post/7147353734912147470#heading-17

#安装pnpm
npm install -g pnpm

创建项目：
npm create vue@latest

✔ Project name（项目名）: toolsdog
✔ Add TypeScript（添加TS,如果需要用typescript则选择Yes）? : No
✔ Add JSX Support（添加JSX支持）? : No
✔ Add Vue Router for Single Page Application development（添加Vue-router）? : Yes
✔ Add Pinia for state management（添加状态管理Pinia）? : Yes
✔ Add Vitest for Unit testing（为单元测试添加Vitest）? : No
✔ Add Cypress for both Unit and End-to-End testing（为单元测试与端到端测试添加Cypress）? : No
✔ Add ESLint for code quality（为代码质量添加ESLint）? : Yes
✔ Add Prettier for code formatting（为代码格式添加Prettier）? : Yes

安装依赖：
-- https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application
npm install(加速：npm install --registry=https://registry.npm.taobao.org)

#格式化代码
npm format

运行：
npm run dev

发布到生产环境(./dist 文件夹中为你的应用创建一个生产环境的构建版本)：
npm run build

#vue cli tool说明:
vue create vue3-demo
# <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
✔ Project name（项目名）: vue-project
✔ Add TypeScript（添加TS）? : No
✔ Add JSX Support（添加JSX支持）? : No
✔ Add Vue Router for Single Page Application development（添加Vue-router）? : Yes
✔ Add Pinia for state management（添加状态管理Pinia）? : Yes
✔ Add Vitest for Unit testing（为单元测试添加Vitest）? : No
✔ Add Cypress for both Unit and End-to-End testing（为单元测试与端到端测试添加Cypress）? : No
✔ Add ESLint for code quality（为代码质量添加ESLint）? : Yes
✔ Add Prettier for code formatting（为代码格式添加Prettier）? : Yes


#安装组件(https://arco.design/vue/docs/start)：
pnpm add -D @arco-design/web-vue
或
npm install --save-dev @arco-design/web-vue


#安装自动加载基础组件
npm i unplugin-vue-components -D
npm i -D unplugin-auto-import
# or
pnpm add -D unplugin-vue-components
pnpm add -D unplugin-auto-import





```

demo_vue_project目录结构
├─.vscode # vscode配置文件
| └─extensions.json # 项目推荐插件列表（可把项目中用到的vscode插件ID写进去，跑项目时没有安装这些插件会推荐安装）
├─public/ # 公共资源目录
├─src/ # 核心开发目录
| ├─App.vue # 项目根组件
| ├─main.js # 项目入口文件
| ├─views/ # 项目视图目录
| | └─Home/index.vue
| ├─stores/ # 统一状态管理目录-pinia
| ├─router/ # 项目路由目录
| | └─index.js
| ├─components/ # 项目公共组件目录
| ├─assets/ # 项目静态资源目录
├─.eslintrc.cjs # eslint 配置文件
├─.gitignore # git忽略文件
├─.prettierrc.json # prettier 配置文件
├─README.md # 项目说明文件
├─index.html # html入口文件
├─package.json # 项目配置和包管理文件
├─vite.config.js # vite 配置文件




