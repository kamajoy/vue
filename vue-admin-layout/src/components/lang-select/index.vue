<template>
  <div>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
      <!-- <el-tooltip content="国际化" placement="bottom" :effect="effect">
        <svg-icon icon-class="language" />
      </el-tooltip> -->
      <!-- <svg-icon icon-class="language" /> -->
      <div>语言</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
          <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/store/app'

// TODO: 有bug需要完善
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const { proxy } = getCurrentInstance()
const appStore = useAppStore()
const i18n = useI18n()

const language = computed(() => appStore.language)

const handleSetLanguage = lang => {
  i18n.locale.value = lang
  appStore.changeLanguage(lang)
  ElMessage.success(i18n.t('msg.tip.switchLanguage'))
}
</script>
