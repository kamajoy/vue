import { nextTick } from 'vue'

// 获取阿里字体图标
const getAlicdnIconfont = () => {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      const styles = document.styleSheets
      const sheetsList = []
      const sheetsIconList = []

      for (let i = 0; i < styles.length; i++) {
        if (styles[i].href && styles[i].href.indexOf('at.alicdn.com') > -1) {
          sheetsList.push(styles[i])
        }
      }

      for (let i = 0; i < sheetsList.length; i++) {
        for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
          if (sheetsList[i].cssRules[j].selectorText && sheetsList[i].cssRules[j].selectorText.indexOf('.icon-') > -1) {
            sheetsIconList.push(
              `${sheetsList[i].cssRules[j].selectorText
                .substring(1, sheetsList[i].cssRules[j].selectorText.length)
                .replace(/\:\:before/gi, '')}`
            )
          }
        }
      }

      if (sheetsIconList.length > 0) resolve(sheetsIconList)
      else reject('未获取到值，请刷新重试')
    })
  })
}

const initIconfont = {
  ali: () => getAlicdnIconfont()
}

export default initIconfont
