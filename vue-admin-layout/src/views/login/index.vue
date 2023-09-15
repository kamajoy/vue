<template>
  <div class="login">
    <div class="content-wrapper">
      <el-row class="content">
        <el-col :span="12">
          <img src="../../assets/images/logo.png" class="logo" />
          <img src="../../assets/images/big.png" class="pig" />
        </el-col>
        <el-col :span="12">
          <div class="title-wrapper">
            <h2 class="title">员工管理系统</h2>
            <span class="version">( Ver 1.0 )</span>
          </div>
          <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" :loading="loading">{{ $t('msg.login.login') }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSettingsStore } from '@/store/settings'

const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
settingsStore.changeSettingsActions({ key: 'title', value: '海洋' })

const loading = ref(false)
const loginRef = ref(null)
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = () => {
  loginRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    userStore.loginActions(loginForm.value).then(() => {
      loading.value = false
      router.push('/system/user')
    }).catch(error => {
      loading.value = false
    })
  })
}
</script>

<style lang="scss" scoped>
.login {
  background-image: url('../../assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  min-height: 346px;
  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .content {
      width: 800px;
      background-color: #fff;
      border-radius: 10px;
      padding: 50px 60px;
      .logo {
        width: 280px;
        height: 80px;
      }
      .pig {
        width: 280px;
        height: 160px;
      }
      .title-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        .title {
          font-size: 28px;
          font-weight: 700;
          color: #2691ff;
        }
        .version {
          font-size: 16px;
          // margin-top: 12px;
          margin-left: 10px;
          color: #999;
        }
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
