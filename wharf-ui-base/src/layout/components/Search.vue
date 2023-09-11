<template>
  <div class="navbar-search">
    <el-input
      ref="inputRef"
      v-model="keyword"
      v-click-outside="inputOnClickOutside"
      placeholder="搜索..."
      :prefix-icon="Search"
      class="navbar-search-input"
      :style="inputStyle"
      clearable
      @keyup.enter="handleSearch"
      @focus="isFocus = true">
    </el-input>
    <el-popover
      ref="popoverRef"
      :virtual-ref="inputRef"
      :visible="isFocus"
      virtual-triggering
      placement="bottom-start"
      width="500px"
      :offset="2"
      :show-arrow="false"
      :teleported="false"
      popper-class="navbar-search-suggestions"
    >
      <div class="shotcut-tips desc-content">
        <code>⌘</code>+<code>K</code>或者<code>win</code>+<code>K</code>打开搜索框，<code>回车</code>执行搜索，<code>Esc</code>关闭搜索框
      </div>
      <div class="recents">
        <div class="recents-title group-title">
          最近搜索
          <Icon
            icon="ep:delete"
            class="show-remove-recents-icon"
            :class="{ 'is-recents-icon-removing': showRecentsRemove }"
            @click="showRecentsRemove = !showRecentsRemove" />
        </div>
        <div class="recents-tags">
          <el-tag
            v-for="(recent, index) in recents"
            :key="index"
            size="small"
            type="info"
            class="recents-tags-item"
            :closable="showRecentsRemove"
            @close="handleRecentsRemove(recent, index)"
            @click="handleRecentsSearch(recent, index)">
            {{ recent.k }}
          </el-tag>
        </div>
      </div>
      <el-divider class="divider-results"></el-divider>
      <div class="results">
        <el-row :gutter="20">
          <el-col :span="24" class="mt-15px">
            <div class="results-item results-item-menu">
              <div class="recents-title group-title">
                导航菜单
              </div>
              <div class="results-table results-table-menu">
                <el-link
                  v-for="(menu, index) in menus"
                  :key="index"
                  type="primary"
                  class="results-item-link-group">
                  <router-link :to="menu.to">
                    {{  menu.title }}
                  </router-link>
                </el-link>
                <div v-show="menus.length == 0" class="results-table-empty">
                  无相关记录
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useUserStore } from '~/store/modules/user'
import { useRouter } from 'vue-router'

const inputRef = ref()
const popoverRef = ref()
const inputOnClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
  isFocus.value = false
}

const userStore = useUserStore()
const keyword = ref('')
const isFocus = ref(false)
const showRecentsRemove = ref(false)
const recents = computed(() => userStore.recentsSearch)
const inputStyle = computed(() => {
  return isFocus.value ? { width: '240px' } : { width: '100px' }
})

// 监听快捷键
const handleShortcutKey = (event) => {
  if (event.keyCode === 27) {
    inputRef.value.blur()
    isFocus.value = false
  } else if (event.metaKey && event.keyCode === 75) {
    inputRef.value.focus()
  }
}

// 缓存搜索关键词
const storeRecentsSearch = (keyword) => {
  // 如果第一个记录即为当前，则跳过缓存
  if (recents.value[0] && recents.value[0].k == keyword) {
    return
  }

  const recentsFiltered = removeRecentsSearch(keyword, false)
  recentsFiltered.unshift({ k: keyword, t: Date.now() })
  userStore.setRecentsSearch(recentsFiltered)

  return recentsFiltered
}

// 移除关键词
const removeRecentsSearch = (keyword, directStore = true) => {
  const recentsFiltered = recents.value.filter(recent => recent.k != keyword)
  if (directStore) {
    userStore.setRecentsSearch(recentsFiltered)
  }

  return recentsFiltered
}

// 移除最近搜索
const handleRecentsRemove = (recent, index) => {
  removeRecentsSearch(recent.k, true)
}

// 使用最近搜索
const handleRecentsSearch = (recent, index) => {
  keyword.value = recent.k
  handleSearch()
}

onMounted(() => {
  window.addEventListener('keydown', handleShortcutKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleShortcutKey)
})

// 搜索
const handleSearch = () => {
  // 关键词为空时清空搜索结果
  if (!keyword.value) {
    menus.value = []
    return
  }
  // 关键词不为空时，将搜索结果写入到缓存
  storeRecentsSearch(keyword.value)

  const lowerKeyword = keyword.value.toLowerCase()

  handleSearchMenu(lowerKeyword)
}

// 搜索导航菜单
const menus = ref([])
const router = useRouter()
const handleSearchMenu = (keyword) => {
  const calcMenus = []
  router.getRoutes().forEach(route => {
    if (route.meta?.hidden == true || !route.meta?.title || !route.name) {
      return
    }
    // 包含路由参数的不展示
    if (route.path.indexOf(':') > -1) {
      return
    }
    if (route.path.toLowerCase().indexOf(keyword) > -1 || route.meta.title.toLowerCase().indexOf(keyword) > -1) {
      calcMenus.push({ title: route.meta.title, to: route })
    }
  })
  menus.value = calcMenus
}
</script>

<style lang="scss" scoped>
.navbar-search {
  position: relative;
  margin-right: 10px;
  .navbar-search-input {
    transition: width 0.3s;
  }
  .navbar-search-suggestions {
    padding: 15px 15px;
    line-height: normal;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    .shotcut-tips {
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 6px;
    }
    .recents, .results {
      padding: 0 10px;
    }
    .recents-title {
      position: relative;
      .show-remove-recents-icon {
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }
    .recents-tags-item {
      cursor: pointer;
      margin-bottom: 5px;
      &:not(:first-child) {
        margin-left: 5px;
      }
    }
    .results-middleware-cluster {
      display: flex;
      justify-content: space-between;
    }
    .results-middleware {
      width: 250px;
    }
    .results-cluster {
      width: 180px;
    }
    .results-table-empty {
      color: #909399;
      font-size: 12px;
    }
    .is-recents-icon-removing {
      color: red;
    }
  }
  .group-title {
    font-size: 13px;
    line-height: 1.5em;
    font-weight: 450;
    margin-bottom: 10px;
  }
  :deep(.divider-results) {
    margin: 5px 0 15px 0;
  }
  :deep(.divider-results-app) {
    margin: 10px 0;
  }
  :deep(.results-item-link-group:not(:first-of-type)) {
    margin-left: 10px;
  }
}
</style>
