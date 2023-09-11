<template>
  <div class="layout">
    <app-header class="layout-header" />
    <section class="layout-main" :style="{ paddingTop: mainPaddingTop }">
      <router-view>
        <template #default="{ Component }">
          <component :is="Component" :key="routerKey" />
        </template>
      </router-view>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppHeader from '~/layout/components/Header.vue'
import { useAppStore } from "~/store/modules/app"

const appStore = useAppStore()
const mainPaddingTop = computed(() => appStore.mainPaddingTop + 'px')
const routerKey = computed(() => appStore.topRouterKey)
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  .layout-header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .layout-main {
    padding-top: 48px;
  }
}
</style>
