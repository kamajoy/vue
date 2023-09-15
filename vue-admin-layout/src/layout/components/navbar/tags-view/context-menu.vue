<template>
  <ul class="context-menu-container">
    <li @click="handelRefreshTag">刷新页面</li>
    <li @click="closeCurrentTag">关闭当前</li>
    <li @click="closeOtherTags">关闭其它</li>
    <li @click="closeLeftTags">关闭左则</li>
    <li @click="closeRightTags">关闭右则</li>
    <li @click="closeAllTags">全部关闭</li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTagsViewStore } from '@/store/tags-view'

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const tagsViewStore = useTagsViewStore()

// 刷新当前页
const handelRefreshTag = () => {
  router.go(0)
}

// 关闭当前
const closeCurrentTag = () => {
  tagsViewStore.removeTagsViewActions({
    type: 'index',
    index: props.index
  })
}

// 关闭其它
const closeOtherTags = () => {
  tagsViewStore.removeTagsViewActions({
    type: 'other',
    index: props.index
  })
}

// 关闭左则
const closeLeftTags = () => {
  tagsViewStore.removeTagsViewActions({
    type: 'left',
    index: props.index
  })
}

// 关闭右则
const closeRightTags = () => {
  tagsViewStore.removeTagsViewActions({
    type: 'right',
    index: props.index
  })
}

// 关闭全部
const closeAllTags = () => {}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
