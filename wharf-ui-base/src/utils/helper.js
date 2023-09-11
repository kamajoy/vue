import moment from 'moment'
import { useRoute, useRouter } from 'vue-router'

/**
 * 根据路由计算面包屑导航.
 * @return {Array}
 */
export function routeBreadcrumb() {
  const breadcrumb = []
  const route = useRoute()
  const router = useRouter()
  const matcheds = route.matched
  let index = matcheds.length
  while (--index >= 0) {
    const matched = matcheds[index]

    // 设置了 breadcrumbIgnore 或者没有设置title、path、name的不加入面包屑导航
    if (!(matched.meta?.breadcrumbIgnore || !matched.meta?.title || !matched.path || !matched.name)) {
      breadcrumb.unshift({ title: matched.meta.title, to: { name: matched.name } })
    }

    // 匹配meta中配置的breadcrumbBefore前置路由
    if (matched.meta?.breadcrumbBefore) {
      let subIndex = matched.meta.breadcrumbBefore.length
      while (--subIndex >= 0) {
        const breadcrumbItem = routeBreadcrumbFind(router, matched.meta.breadcrumbBefore[subIndex])
        if (breadcrumbItem) {
          breadcrumb.unshift(breadcrumbItem)
        }
      }
    }

    // 匹配meta中配置的breadcrumbAfter后置路由
    if (matched.meta?.breadcrumbAfter) {
      matched.meta.breadcrumbAfter.forEach(rb => {
        const breadcrumbItem = routeBreadcrumbFind(router, rb)
        if (breadcrumbItem) {
          breadcrumb.push(breadcrumbItem)
        }
      })
    }
  }

  return breadcrumb
}

/**
 * 根据路由名称查询获得面包屑导航配置.
 * @param {Router} vm
 * @param {Object} to { name: RouterName } or { path: Path }
 * @return {Object|null}
 */
export function routeBreadcrumbFind(router, to, params = {}, query = {}) {
  if (!to.name && to.title) {
    return { title: to.title, to: null }
  }
  for (const route of router.resolve(to).matched) {
    if ((to.name && to.name == route.name) || (to.path && to.path == route.path)) {
      return { title: route.meta.title, to: { name: route.name, params, query } }
    }
  }

  return null
}

/**
 * 日期格式化
 * @param {Number} timestamp 时间戳
 * @param {String} format 格式，默认为 YYYY-MM-DD HH:mm:ss
 * @param {String} empty 为空时默认值
 * @return {String}
 */
export function formatDate(timestamp, format = null, empty = '-') {
  if (timestamp === 0 || !timestamp) {
    return empty
  }
  return moment.unix(timestamp).format(format || 'YYYY-MM-DD HH:mm:ss')
}

/**
 * 格式化百分比
 * @param {Number} value 值
 * @param {Number} total 总数
 * @param {Number} decimals 保留几位小数
 * @return {Number} 百分比
 */
export function percentage(value, total, decimals = 2) {
  total = Number(total)
  value = Number(value)
  if (isNaN(total) || !total || isNaN(value) || !value) {
    return 0
  }
  return parseInt(value * 100 * Math.pow(10, decimals) / total) / Math.pow(10, decimals)
}

/**
 * 格式化字节
 * @param {Number} size 字节大小
 * @param {Number} fixedLength 小数点个数
 * @param {Array} 单位
 * @return {String}
 */
export function formatBytes(size, fixedLength = 2, units = null) {
  if (units === null) {
    units = ['B', 'K', 'M', 'G', 'T', 'P']
  }
  let index = 0

  size = Number(size)
  if (isNaN(size)) {
    return '-' + units[index]
  }

  let sign = 1
  if (size < 0) {
    size *= -1
    sign *= -1
  }

  while (size >= 1024) {
    size /= 1024
    index++
  }

  return parseFloat(size.toFixed(fixedLength)) * sign + units[index]
}

/**
 * 将字符串格式化为数字
 * @param {String} str 要格式化的数字
 * @param {Number|null} defaultVal 默认值
 * @return {Number}
 */
export function toNumber(str, defaultVal = 0) {
  const num = Number(str)

  return isNaN(num) ? defaultVal : num
}

/**
 * 格式化数字（千位符）
 * @param  {Number} number        [number：要格式化的数字]
 * @param  {Number} decimals      [decimals：保留几位小数]
 * @param  {String} decPoint      [decPoint]
 * @param  {String} thousandsSep  [thousandsSep：千分位符号]
 * @param  {String} roundtag      [roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入]
 * @return {String}               [description]
 *
 */
export function formatNumber(number, decimals = 0, decPoint = '.', thousandsSep = ',', roundtag = 'round') {
  if (!number && number !== 0 && number !== '0') {
    return '-'
  }

  number = (number + '').replace(/[^0-9+-Ee.]/g, '')

  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const toFixedFix = function (nParams, precParams) {
    const k = Math.pow(10, precParams)

    return '' + parseFloat(Math[roundtag](parseFloat((nParams * k).toFixed(precParams * 2))).toFixed(precParams * 2)) / k
  }

  const s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')

  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + thousandsSep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
  }
  return s[1] === '' ? s[0] : s.join(decPoint)
}

/**
 * 格式化数组中的数字
 * @param {Array} array 要格式化的数组
 * @param {Array} keys 要格式化的keys
 */
export function formatInArrayNumber(target = [], keys = []) {
  return target.map(row => {
    keys.forEach(key => {
      row[key] = toNumber(row[key])
    })

    return row
  })
}

/**
 * 格式化对象中的数字
 * @param {Object} object 要格式化的对象
 * @param {Array} keys 要格式化的keys
 */
export function formatInObjectNumber(object = {}, keys = []) {
  for (const key in object) {
    if (keys.indexOf(key) > -1) {
      object[key] = toNumber(object[key])
    }
  }

  return object
}

/**
 * 格式化时间差
 * @param {Number} diff 时间差值，例如1234
 * @param {Number} length 描述长度，例如2，返回2分34秒
 * @returns {String} 描述，例如2分34秒
 */
export function formatTimeDiff(diff, length = 2) {
  if (diff == 0) {
    return '-'
  }

  const map = [
    { sec: 31536000, note: '年' },
    { sec: 2592000, note: '月' },
    { sec: 86400, note: '天' },
    { sec: 3600, note: '小时' },
    { sec: 60, note: '分' },
    { sec: 1, note: '秒' }
  ]

  let note = ''
  for (const item of map) {
    if (diff >= item.sec) {
      length--
      note += `${Math.floor(diff / item.sec)}${item.note}`
      diff = diff % item.sec
      if (length == 0) {
        break
      }
    }
  }

  return note
}

/**
 * 格式化与当前时间差
 * @param {Number} timestamp 要计算的时间，例如1637307189
 * @param {Number} length 描述长度，例如2，返回2分34秒
 * @returns {String} 描述，例如2分34秒
 */
export function formatTimeDiffNow(timestamp, length = 2) {
  const diff = parseInt(Date.now() / 1000) - timestamp
  return formatTimeDiff(diff, length)
}

/**
 * 从list中移除某个特征数据
 * @param {Array} list 列表数据
 * @param {Object} item 对象
 * @param {String} listKey 列表key
 * @param {String} itemKey item key，默认与list相同
 */
export function listRemove(list, item, listKey = 'id', itemKey = null) {
  if (!itemKey) {
    itemKey = listKey
  }
  list.forEach((row, index) => {
    if (row[listKey] == item[itemKey]) {
      list.splice(index, 1)
    }
  })
}

/**
 * 从list中更新某个item
 * @param {Array} list 列表数据
 * @param {Object} item 对象
 * @param {String} key key
 */
export function listUpdate(list, item, key = 'id') {
  list.forEach((row, index) => {
    if (row[key] == item[key]) {
      list.splice(index, 1, item)
    }
  })
}

/**
 * 从list中移除某个特征数据
 * @param {Array} list 列表数据
 * @param {String} listKey 列表key
 * @param {*} val 满足条件的值
 */
export function listRemoveVal(list, listKey = 'id', val) {
  list.forEach((row, index) => {
    if (row[listKey] == val) {
      list.splice(index, 1)
    }
  })
}

/**
 * form表单int类型处理
 */
export function formInt(val) {
  const num = parseInt(val)
  if (isNaN(num)) {
    return null
  }
  return num
}

/**
 * 下载Blob文件.
 */
export function downloadBlob(res, filename) {
  const blob = new Blob([res], { type: res.type })
  const dom = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  dom.href = url
  dom.download = decodeURI(filename)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode.removeChild(dom)
  window.URL.revokeObjectURL(url)
}

/**
 * 路由参数encode.
 */
const routeParamMap = {
  '.': '___',
}
export function routeParamEncode(param) {
  for (const src in routeParamMap) {
    param = param.replaceAll(src, routeParamMap[src])
  }
  return param
}

/**
 * 路由参数decode.
 */
export function routeParamDecode(param) {
  for (const src in routeParamMap) {
    param = param.replaceAll(routeParamMap[src], src)
  }
  return param
}

/**
 * 解析URL.
 * @param {String} url
 * @return {Object} { proto: 'http:', host: 'domain:8080', path: '/abc' }
 */
export function parseUrl(url) {
  let info
  if (!url) {
    info = { proto: location.protocol, host: location.host, path: '/' }
  } else if (/^https?:\/\//.test(url)) {
    const u = new URL(url)
    info = { proto: u.protocol, host: u.host, path: u.pathname }
  } else if (/^:\/\//.test(url)) {
    const u = new URL(location.protocol.substr(0, location.protocol.length - 1) + url)
    info = { proto: u.protocol, host: u.host, path: u.pathname }
  } else if (/\..*?($|\/)/.test(url)) {
    const u = new URL(location.protocol + '//' + url)
    info = { proto: u.protocol, host: u.host, path: u.pathname }
  } else {
    info = { proto: location.protocol, host: location.host, path: url }
  }

  if (info.path[info.path.length - 1] == '/') {
    info.path = info.path.substr(0, info.path.length - 1)
  }
  if (info.path != '') {
    info.path = '/' + info.path
  }
  return info
}

/**
 * 基于URL信息拼接URL.
 * @param {Object} base { proto: 'http:', host: 'domain:8080', path: '/abc' }
 * @param {String} url
 * @return {String}
 */
export function joinUrlByInfo(base, url) {
  if (!url) {
    return `${base.proto}//${base.host}${location.pathname}`
  } else if (/^(https?)?:\/\//.test(url)) {
    return url
  } else if (/\..*?($|\/)/.test(url)) {
    return `${base.proto}//${url}`
  } else if (url[0] == '/') {
    return `${base.proto}//${base.host}${url}`
  } else {
    return `${base.proto}//${base.host}${base.path}/${url}`
  }
}

/**
 * 读取枚举值.
 */
export function enums(fields, key) {
  return fields[key] || {}
}

/**
 * 滚动到指定元素.
 * @param {String} element ID
 * @return {Boolean} 是否找到元素
 */
export function scrollTo(id) {
  if (!id) {
    return false
  }
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView()
    return true
  } else {
    return false
  }
}

/**
 * 自动计算协议.
 * @param {String} url 传入域名，如果为空或者不是://开头，则不需要计算直接返回
 * @param {String} secure 安全协议
 * @param {String} noSecure 非安全协议
 * @return {String}
 */
export function calcProto(url, secure = 'https', noSecure = 'http') {
  if (!url || url.indexOf('://') != 0) {
    return url
  }
  if (location.protocol == 'https:') {
    return secure + url
  }
  return noSecure + url
}
