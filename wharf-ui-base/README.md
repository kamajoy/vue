# 中后台前端模板

为架构组定制的中后台前端模板，采用 `Vue3`（组合式API）+ `ElementPlus` + `pnpm` + `vite` 技术或者框架。

## 依赖安装

依赖管理采用性能更高、更节省磁盘空间的 `pnpm` ，`NodeJs` 版本建议使用 `v18` 的 `LTS` 版本。

```shell
npm install -g pnpm
pnpm install
```

> `.gitignore` 默认忽略了 `yarn.lock`、`package-lock.json`，如果需要使用 `yarn`、`npm` 作为包管理工具，请手动删掉相关忽略。

## 开发预览

端口以及 `API` 代理前往 `vite.config.js` 中修改 `server` 配置项，如下图所示：

```javascript
export default defineConfig({
    ...,
    server: {
        port: 4001,
        proxy: {
        '/api': {
            target: 'http://127.0.0.1:8071',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
        },
        hmr: {
        overlay: false
        },
        host: '0.0.0.0'
    }
})
```

启动开发服务：

```shell
npm run dev
```

## 配置环境变量

支持本地 `.env`、测试 `.env.test`、预发 `.env.preview`、生产 `.env.prod` 四种环境，其中 `.env` 会被 Git 忽略。

环境变量一般以 `VITE_` 开头，否则可能会导致在代码中无法识别。

## 打包

打包生成的文件在 `dist/` 文件夹中：

```shell
# 打包测试，会使用 .env.test 环境变量配置文件
npm run build:test

# 打包预发，会使用 .env.preview 环境变量配置文件
npm run build:preview

# 打包生产，会使用 .env.prod 环境变量配置文件
npm run build
```

## 注意事项

如果需要使用 `~/views/components/editor` 中的组件，需要先安装 `codemirror v5`，安装命令：`pnpm add codemirror@5'
