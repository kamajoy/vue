// 字体图标url
const cssCdnUrlList = [
  '//at.alicdn.com/t/font_2717060_6xnmzl6abjl.css'
]

// 第三方js url
const jsCdnUrlList = []

// 动态批量设置字体图标
export const setCssCdn = () => {
  if (cssCdnUrlList.length <= 0) return false
  cssCdnUrlList.map(v => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = v
    link.crossOrigin = 'anonymous'
    document.getElementsByTagName('head')[0].appendChild(link)
  })
}

// 动态批量设置第三方js
export const setJsCdn = () => {
  if (jsCdnUrlList.length <= 0) return false
  jsCdnUrlList.map(v => {
    const link = document.createElement('script')
    link.src = v
    document.body.appendChild(link)
  })
}

const setIntroduction = {
  cssCdn: () => {
    setCssCdn()
  },
  jsCdn: () => {
    setJsCdn()
  }
}

export default setIntroduction
