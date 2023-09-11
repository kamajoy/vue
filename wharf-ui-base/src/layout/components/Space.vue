<template>
  <div class="space-component">
    <div class="header-space">
      <el-tooltip
        effect="dark"
        content="系统管理"
        placement="bottom-end"
      >
        <app-link class="header-space-item" :to="{ name: 'DevLayout' }">
            <Icon icon="carbon:tool-kit" />
        </app-link>
      </el-tooltip>
      <!-- <el-popover
        placement="top-end"
        width="360"
        v-model="popoverNotifyVisiable"
      >
        <el-tabs v-model="activeNotifyTab">
          <el-tab-pane label="站内信" name="notify">
            <div class="notify-container">
              <ul class="notify-list">
                <template v-if="notifys.length > 0">
                  <li
                    v-for="(notify, index) in notifys"
                    :key="index"
                    class="notify-item"
                    @click="handleNotifyProfile(notify)"
                  >
                    <div
                      class="notify-title"
                      :class="{ 'notify-unread': notify.read_at == 0 }"
                    >
                      <el-badge is-dot :hidden="notify.read_at > 0"></el-badge>
                      {{ notify.title }}
                      <div class="notify-tag">
                        <el-tag
                          v-if="NOTIFY_SCENES[notify.scene]"
                          size="mini"
                          :type="NOTIFY_SCENES[notify.scene].type"
                        >
                          {{ NOTIFY_SCENES[notify.scene].label }}
                        </el-tag>
                      </div>
                    </div>
                    <div class="notify-desc">
                      2022-11-11 11:11:11
                    </div>
                  </li>
                </template>
                <li v-else class="notify-item">
                  <div class="notify-title">没有此类未读消息</div>
                </li>
              </ul>
            </div>
            <el-button-group style="width: 100%">
              <el-button
                plain
                :disabled="notifys.length == 0"
                style="width: 50%"
                size="small"
                @click="handleNotifySetReadAll"
              >
                全部设为已读
              </el-button>
              <el-button
                plain
                style="width: 50%"
                size="small"
                @click="handleNotifyMore"
              >
                查看更多
              </el-button>
            </el-button-group>
          </el-tab-pane>
        </el-tabs>
        <template #reference>
          <div class="header-space-item">
            <Icon v-if="dotNotification" icon="ep:message" />
            <el-badge
              v-else
              is-dot
              style="line-height: initial"
            >
              <Icon icon="ep:notification" />
            </el-badge>
          </div>
        </template>
      </el-popover>

      <el-tooltip
        effect="dark"
        content="点击查看使用文档"
        placement="bottom-end"
      >
        <app-link class="header-space-item" to="http://www.baidu.com">
            <Icon icon="ep:question-filled" />
        </app-link>
      </el-tooltip> -->

      <div class="header-space-item">
        <el-dropdown class="space-item-avatar" trigger="hover">
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar" alt="用户头像" />
            <Icon style="color: #fff" icon="ep:caret-bottom" />
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <div class="account-wrapper">
                <img :src="avatar" class="user-avatar" alt="用户头像" />
                <div class="user-name">
                  <span
                    class="user-nickname oneline-ellipsis"
                    :title="nickname"
                    >{{ nickname }}</span
                  >
                  <span class="user-email oneline-ellipsis" :title="email">{{
                    email
                  }}</span>
                </div>
              </div>
              <router-link :to="{ name: 'Root' }">
                <el-dropdown-item divided>
                  <router-link :to="{ name: 'User' }">
                    <Icon icon="ep:user-filled" class="mr-1" /> 个人中心
                  </router-link>
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item @click="handleLogout">
                <Icon icon="iconamoon:exit" class="mr-1" /> 退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- <notify-profile ref="notify-profile" /> -->
  </div>
</template>

<script setup>
import AppLink from '~/layout/components/Link.vue'
import { computed, nextTick, ref, onMounted } from 'vue'
import { userProfile } from '~/api/user'
import { logout } from '~/api/auth'
import { interceptRespJson } from '~/utils/request'
import { useUserStore } from '~/store/modules/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const popoverNotifyVisiable = ref(false)
const activeNotifyTab = ref('notify')
const notifys = ref([])
const nickname = computed(() => userStore.getUserName)
const email = computed(() => userStore.getUserEmail)
const avatar = computed(() => userStore.getUserAvatar)
const dotNotification = computed(() => notifys.value.filter((notify) => notify.read_at == 0).length == 0)

const handleLogout = () => {
  logout()
    .then(resp => interceptRespJson(resp))
    .then(res => {
      router.push({ name: 'Root' })
      nextTick(() => {
        location.reload()
      })
    })
}

// 更新用户信息
const updateUserProfile = () => {
  userProfile()
    .then(resp => interceptRespJson(resp))
    .then(res => {
      userStore.setUser(res.data)
    })
  //       if (this.$store.state.user.token) {
//         this.$store.dispatch('user/userProfile')
//       }
}
// 监听消息
const startListenNotify = (begin = null) => {
  // notifyListen(begin)
//         .then((res) => {
//           const messages = res.data.messages.sort(
//             (a, b) => a.notify_at - b.notify_at
//           )
//           if (messages.length > 0) {
//             begin = messages[messages.length - 1].notify_at
//             this.sendBrowserNotify(messages)
//           }
//         })
//         .finally(() => {
//           setTimeout(() => {
//             this.startListenNotify(begin)
//           }, 2000)
//         })
}

// 浏览器通知
const sendBrowserNotify = (messages) => {
  // if (!window.Notification || Notification.permission == 'denied') {
//         return
//       }

//       Notification.requestPermission((status) => {
//         if (status == 'granted') {
//           messages.forEach((message) => {
//             // eslint-disable-next-line no-new
//             new Notification(message.title, { body: message.body })
//           })
//         }
//       })
}

// 通知列表
const loadNotifys = () => {
  //       notifySimple().then((res) => {
//         this.notifys = res.data.notifys
//       })
}
// 前往通知列表
const handleNotifyMore = () => {
  popoverNotifyVisiable.value = false
}
// 设置为已读
const handleNotifySetReadAll = () => {
  //       notifySetReadAll().then((res) => {
//         this.$message.success('操作成功')
//         this.loadNotifys()
//       })
}
// 通知详情
const handleNotifyProfile = (row) => {
//       this.popoverNotifyVisiable = false
//       this.$refs['notify-profile'].handleDetail(row)
}

loadNotifys()
onMounted(() => {
  updateUserProfile()
//     // if (import.meta.env.VITE_NOTIFY_LISTEN !== 'disabled') {
//     //   // 监听消息
//     //   // this.startListenNotify()
//     // }
})

//     
//     
//   },
//   created() {
//     // 加载通知列表
//     // this.loadNotifys()
//   },
//   mounted() {

//   },

</script>

<style lang="scss" scoped>
.space-component {
  .header-space {
    float: right;
    font-size: 14px;
    color: #fff;
    .header-space-item {
      display: inline-block;
      padding: 0 12px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        background: #242d3c;
      }
      :deep(.el-dropdown) {
        line-height: inherit;
      }
      .space-item-avatar {
        .avatar-wrapper {
          .user-avatar {
            height: 24px;
            width: 24px;
            border-radius: 12px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}

// 用户下拉框
.user-dropdown {
  .account-wrapper {
    padding: 0 20px 0px 15px;
    .user-avatar {
      float: left;
      height: 48px;
      width: 48px;
      border-radius: 24px;
      vertical-align: middle;
    }
    .user-name {
      margin-left: 58px;
      .user-nickname {
        display: inline-block;
        width: 160px;
        font-size: 14px;
        line-height: 28px;
        color: rgba(0, 0, 0, 0.755);
      }
      .user-email {
        display: block;
        width: 160px;
        font-size: 12px;
        line-height: 20px;
        color: #909399;
      }
    }
  }
}

// 消息通知
.notify-container {
  .notify-list {
    .notify-item {
      padding: 8px 5px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      .notify-title {
        margin-bottom: 6px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.755);
        .notify-tag {
          float: right;
        }
        &.notify-unread {
          font-weight: 600;
        }
      }
      .notify-desc {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}
</style>
