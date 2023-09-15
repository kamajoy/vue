import installElementPlus from './element-plus'
import installElementPlusIocns from './element-plus-icons'
// import installI18n from './i18n'

export default app => {
  installElementPlus(app)
  installElementPlusIocns(app)
  // installI18n(app)
}