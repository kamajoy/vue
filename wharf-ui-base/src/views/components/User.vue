<template>
  <el-popover
    :placement="props.position"
    width="300"
    class="user"
    trigger="hover"
    :open-delay="100"
  >
    <div class="popover-info">
      <div class="account-wrapper">
        <el-tooltip
        effect="dark"
        content="打开飞书与我联系"
        placement="top"
        :disabled="profile.uid == ''"
      >
        <a
          :href="`https://applink.feishu.cn/client/chat/open?openId=${encodeURIComponent(profile.open_id)}`"
          target="lark">
          <img :src="profile.avatar" class="user-avatar" alt="用户头像">
        </a>
      </el-tooltip>
        
        <div class="user-name">
          <span class="user-nickname oneline-ellipsis">
            {{ profile.name }}
            <Copy v-if="profile.uid != ''" :value="profile.name" />
          </span>
          <span class="user-email oneline-ellipsis">
            {{ profile.email }}
            <Copy v-if="profile.uid != ''" :value="profile.name" />
          </span>
        </div>
      </div>
    </div>
    <template #reference>
      <el-link
        class="user-name"
        type="primary"
        :underline="false">
        {{ (props.prefix || '') + profile.name }}
      </el-link>
    </template>
  </el-popover>
</template>

<script setup>
import defaultAvatar from '~/assets/imgs/avatar.gif'
import Copy from './Copy.vue'

import { computed } from 'vue'
const props = defineProps({
  position: {
    type: String,
    default: 'bottom'
  },
  user: {
    type: Object,
    required: false,
    default: null
  },
  prefix: {
    type: String,
    default: null,
  },
})

const profile = computed(() => {
  return {
    uid: props.user?.uid || '',
    name: props.user?.name || '<unknown>',
    email: props.user?.email || '<unknown>',
    avatar: props.user?.avatar || defaultAvatar,
    open_id: props.user?.open_id || '',
  }
})
</script>

<style lang="scss" scoped>
.account-wrapper {
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
      line-height: 24px;
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
</style>
