<template>
  <div class="user-layout-container">
    <div class="user-layout-nav">
      <div class="user-layout-nav-header">
        <router-link :to="{ name: 'User' }">
          <img class="user-avatar clearfix" :src="avatar" alt="用户头像" />
          <div class="user-name">
            <span class="user-nickname oneline-ellipsis" :title="nickname">{{
              nickname
            }}</span>
            <span class="user-email oneline-ellipsis" :title="email">{{
              email
            }}</span>
          </div>
        </router-link>
      </div>
      <div class="user-layout-nav-main">
        <div class="menu-container">
          <user-submenu title="基本信息">
            <user-menu-item @click.stop="onClickDeveloping" to="" icon="ep:avatar" title="帐号信息" />
            <!-- <user-menu-item to="/user/account" icon="ep:avatar" title="帐号信息" /> -->
          </user-submenu>
          <user-submenu title="消息中心">
            <user-menu-item :to="{ name: 'UserNotify' }" icon="ep:message" title="我的消息" />
            <user-menu-item :to="{ name: 'UserNotifySetting' }" icon="ep:message-box" title="通知设置" />
          </user-submenu>
          <user-submenu title="安全设置">
            <user-menu-item :to="{ name: 'UserLoginLog' }" icon="ep:set-up" title="登录日志" />
          </user-submenu>
        </div>
      </div>
    </div>
    <div class="user-layout-main">
      <router-view>
        <template #default="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import UserSubmenu from '~/layout/apps/user/Submenu.vue'
import UserMenuItem from '~/layout/apps/user/MenuItem.vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '~/store/modules/user';

const userStore = useUserStore()
const nickname = computed(() => userStore.getUserName)
const email = computed(() => userStore.getUserEmail)
const avatar = computed(() => userStore.getUserAvatar)

const onClickDeveloping = () => {
  ElMessage.warning('此功能正在加紧开发中...')
}
</script>

<style lang="scss" scoped>
.user-layout-container {
  position: relative;
  margin: 25px auto 0 auto;
  max-width: 1400px;
  min-width: 1024px;
  .user-layout-nav {
    width: 260px;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .user-layout-nav-header {
      padding: 15px;
      background: #f2f2f2;
      .user-avatar {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        vertical-align: middle;
      }
      .user-name {
        margin-left: 70px;
        .user-nickname {
          display: inline-block;
          width: 160px;
          font-size: 14px;
          line-height: 32px;
          color: rgba(0, 0, 0, 0.755);
        }
        .user-email {
          display: block;
          width: 160px;
          font-size: 13px;
          line-height: 28px;
          color: #909399;
        }
      }
    }
    // .user-layout-nav-main {
    //   .menu-container {
    //   }
    // }
  }
  .user-layout-main {
    position: absolute;
    left: 280px;
    right: 0;
    top: 0;
  }
}
</style>
