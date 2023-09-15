import * as Icons from '@element-plus/icons-vue'

export default (app) => {
  // icon 图标
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
  })
}
