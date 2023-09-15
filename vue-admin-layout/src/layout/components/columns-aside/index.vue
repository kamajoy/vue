<template>
  <div class="layout-columns-aside">
    <div class="aminui-aside-split">
      <div class="aminui-aside-split-top">
        <router-link to="/home">
          <img class="logo" src="../../../assets/images/badge.png" />
        </router-link>
      </div>
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul>
            <li v-for="route in routes" :key="route">
              <div v-if="!route.isHide && route.meta" class="test">
                <i class="iconfont" :class="route.meta.icon" />
                <p>{{ route.meta.title }}</p>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePermissionStore } from '@/store/permission'

const permissionStore = usePermissionStore()

const routes = computed(() => permissionStore.routes)
console.log(!routes.value[0].isHide)
console.log(routes.value[0].meta)
console.log(!routes.value[0].isHide && routes.value[0].meta)
</script>

<style lang="scss" scoped>
.layout-columns-aside {
  width: 70px;
  height: 100%;
  background: #304156;

  .logo {
    width: 40px;
    height: 40px;
  }

  .adminui-side-split-scroll {
    overflow: auto;
    overflow-x: hidden;
    height: 100%;
    flex: 1;
    .test {
      cursor: pointer;
      width: 65px;
      height: 65px;
      color: #fff;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &.active {
        background: #409eff;
      }
    }
  }
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
</style>
