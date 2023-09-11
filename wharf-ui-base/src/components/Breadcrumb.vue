<template>
  <el-breadcrumb class="app-breadcrumb" :separator-icon="ArrowRight">
    <transition-group appear enter-active-class="animate__animated animate__fadeInRight">
      <el-breadcrumb-item v-for="(item, index) in props.breadcrumb" :key="index">
        <span
        v-if="item.redirect === 'noRedirect' || index == breadcrumb.length - 1 || !item.to"
        class="no-redirect"
        >{{ item.title }}</span>
        <router-link v-else :to="item.to">{{ item.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { routeBreadcrumb } from '~/utils/helper'

const props = defineProps({
  breadcrumb: {
    type: Array,
    required: false,
    default: () => routeBreadcrumb()
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 40px;
  padding: 0 15px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
