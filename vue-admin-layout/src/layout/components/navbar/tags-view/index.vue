<template>
  <div class="tags-view-container">
    <scroll-pane @scroll="handleScroll">
      <router-link
        class="tags-view-item"
        v-for="(tag, index) in tagsViewList"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :class="isActive(tag) ? 'active' : ''"
        :style="activeStyle(tag)"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}
        <!-- 删除图标 -->
        <span v-show="!isActive(tag)" @click.prevent.stop="handleCloseTag(index)">
          <close class="el-icon-close" style="width: 1em; height: 1em; vertical-align: middle" />
        </span>
      </router-link>
    </scroll-pane>

    <!-- contextMenu -->
    <context-menu v-show="visible" :style="menuStyle" :index="tagIndex" />
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsViewStore } from '@/store/tags-view'
import ContextMenu from './context-menu.vue'
import ScrollPane from './scroll-pane.vue'

const route = useRoute()
const tagsViewStore = useTagsViewStore()

const tagIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})

const tagsViewList = computed(() => tagsViewStore.tagsViewList)

// 不需要被保存为tag的路由
const whiteList = ['/login', '/404', '/401']

const isTags = path => {
  return !whiteList.includes(path)
}


const isActive = tag => {
  return tag.path === route.path
}

// TODO: 需要设置主题色
const activeStyle = (tag) => {
  if (!isActive(tag)) return {}
  return {
    'background-color': '#545c64'
    // 'border-color': theme.value
  }
}

// 关闭tag
const handleCloseTag = (index) => {
  tagsViewStore.removeTagsViewActions({
    type: 'index',
    index
  })
}

// 展示 menu
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  tagIndex.value = index
  visible.value = true
}

const closeMenu = () => {
  visible.value = false
}

// 生成 title
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = route.meta.title
  }
  return title
}

const handleScroll = () => {
  closeMenu()
}

// 监听路由变化
watch(
  route,
  (to, from) => {
    // 并不是所有的路由都需要保存的
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    tagsViewStore.addTagsViewActions({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  .tags-view-item {
    display: inline-block;
    position: relative;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    padding: 0 8px;
    margin-left: 5px;
    margin-top: 4px;
    font-size: 12px;
    color: #495060;
    background: #fff;
    cursor: pointer;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
  }
}
</style>
