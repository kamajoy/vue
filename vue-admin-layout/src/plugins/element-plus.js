// // 按需引入
// import {
//   ElButton,
//   ElInput,
//   ElSwitch,
//   ElColorPicker,
//   ElForm,
//   ElFormItem,
//   ElRadioGroup,
//   ElRadio,
//   ElCascader,
//   ElScrollbar,
//   ElContainer,
//   ElHeader,
//   ElMain,
//   ElAside,
//   ElRow,
//   ElCol,
//   ElMenu,
//   ElSubMenu,
//   ElDrawer,
//   ElDivider,
//   ElDropdown,
//   ElDropdownMenu,
//   ElDropdownItem,
//   ElTable,
//   ElTableColumn,
//   ElPopover,
//   ElEmpty
// } from 'element-plus'
// import 'element-plus/es/components/message/style/css' // 引入 message 样式
// import 'element-plus/es/components/message-box/style/css' // 引入 message-box 样式
// import 'element-plus/es/components/loading/style/css' // 引入 loading 样式

// const components = [
//   ElButton,
//   ElInput,
//   ElSwitch,
//   ElColorPicker,
//   ElForm,
//   ElFormItem,
//   ElRadioGroup,
//   ElRadio,
//   ElCascader,
//   ElScrollbar,
//   ElContainer,
//   ElHeader,
//   ElMain,
//   ElAside,
//   ElRow,
//   ElCol,
//   ElMenu,
//   ElSubMenu,
//   ElDrawer,
//   ElDivider,
//   ElDropdown,
//   ElDropdownMenu,
//   ElDropdownItem,
//   ElTable,
//   ElTableColumn,
//   ElPopover,
//   ElEmpty
// ]

// export default app => {
//   components.forEach(component => {
//     app.component(component.name, component)
//   })
// }

// 全局引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default (app) => {
  app.use(ElementPlus)
}
