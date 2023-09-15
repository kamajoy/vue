<template>
  <div class="header-container">
    <div class="left-menu">
      <logo v-if="isLogo" />
      <!-- 左则折叠按钮 -->
      <hamburger v-if="layout != 'transverse'" class="hamburger-container" :is-active="appStore.sidebar.opened" @toggleClick="toggleSidebar" />
      <horizontal v-if="layout === 'transverse'" />
      <!-- 面包屑 -->
      <breadcrumb v-else />
    </div>


    <div class="right-menu">
      <!-- 全屏组件 -->
      <screenfull class="right-menu-item hover-effect" />
      <!-- 国际化 -->
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-username">
          <img class="avatar" :src="avatar" />
          <span class="username">admin</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="handleLogout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 设置 -->
      <div class="setting-container" @click="handleSetting">
        <setting class="setting-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'
import { ElMessageBox } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import Logo from '@/layout/components/logo/index.vue'
import Horizontal from '@/layout/components/sidebar/horizontal.vue'
import Hamburger from '@/components/hamburger/index.vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import LangSelect from '@/components/lang-select/index.vue'
import Screenfull from '@/components/screenfull/index.vue'
import avatar from '@/assets/images/avatar.png'

const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const appStore = useAppStore()
const settingsStore = useSettingsStore()

// 显示或隐藏 logo
const isLogo = computed(() => {
  const { isSidebarLogo, layout } = settingsStore
  return (isSidebarLogo && layout === 'transverse') || (isSidebarLogo && layout === 'classic')
})

const layout = computed(() => settingsStore.layout)

const handleLogout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    type: 'warning'
  }).then(() => {
    userStore.logoutActions()
  }).catch(() => { })
}

const toggleSidebar = () => {
  appStore.toggleSidebarAction()
}

const handleSetting = () => {
  proxy.mittBus.emit('handleSetting')
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // border-bottom: 1px solid #f1f2f3;
  border-bottom: 1px solid #d8dce5;
  box-sizing: border-box;
  .left-menu {
    display: flex;
    align-items: center;
  }

  .right-menu {
    // float: right;
    display: flex;
    height: 100%;
    line-height: 50px;
    .right-menu-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      display: flex;
      align-items: center;
      // margin: 0 10px;

      .avatar-username {
        display: flex;
        align-items: center;
        cursor: pointer;

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }

        .username {
          margin-left: 4px;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }

    .setting-container {
      padding: 0 6px;
      margin: 0 4px;
      cursor: pointer;

      .setting-icon {
        width: 1.2em;
        height: 1.2em;
        fill: currentColor;
        vertical-align: middle;
      }
    }
  }
}
</style>
