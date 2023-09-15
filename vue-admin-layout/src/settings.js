export default {
  /**
   * @description: 网页标题
   * @type {string}
   */
  title: 'vue admin layout',
  /**
   * @description: 布局切换
   * @type {string} <defaults|classic|transverse|columns> 默认 defaults
   */
  layout: 'defaults',
  /**
   * @description: 是否开启固定 header
   * @type {boolean} true | false
   */
  isFixedHeader: true,
  /**
   * @description: 是否开启 tagsView
   * @type {boolean} true | false
   */
  isTagsView: true,
  /**
   * @description: 是否开启 footer 底部版权信息
   * @type {boolean} true | false
   */
  isFooter: false,
  /**
   * @description: 是否在侧边栏显示logo
   * @type {boolean} true | false
   */
  isSidebarLogo: true,
  /**
   * @description: 动态标题
   * @type {boolean} true | false
   */
  isDynamicTitle: false,
  /**
   * @description: 是否开启水印
   * @type {boolean} true | false
   */
  isWatermark: false,
  /**
   * @description: 水印文案
   * @type {string} '开启水印'
   */
  watermarkText: '开启水印'
}
