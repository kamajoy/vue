import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      tagsViewList: []
    }
  },
  actions: {
    addTagsViewActions(tagsView) {
      if (this.tagsViewList.some(v => v.path === tagsView.path)) return
      this.tagsViewList.push(tagsView)
    },
    removeTagsViewActions(payload) {
      const { type, index } = payload
      const len = this.tagsViewList.length
      switch (type) {
        case 'index':
          // 删除当前
          this.tagsViewList.splice(index, 1)
          break
        case 'left':
          // 删除左侧
          this.tagsViewList.splice(0, index)
          break
        case 'right':
          // 删除右侧
          this.tagsViewList.splice(index + 1, len - index + 1)
          break
        case 'other':
          // 删除其它(就是删除左则和右侧)
          this.tagsViewList.splice(index + 1, len - index + 1)
          this.tagsViewList.splice(0, index)
          break
        default:
          break
      }
    }
  }
})
