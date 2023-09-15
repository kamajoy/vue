<template>
  <div class="icon-selector">
    <el-popover
      placement="bottom"
      :width="fontIconWidth"
      v-model="fontIconVisible"
      popper-class="icon-selector-popper"
    >
      <template #reference>
        <el-input
          v-model="fontIconSearch"
          :placeholder="fontIconPlaceholder"
          :clearable="clearable"
          :disabled="disabled"
          :size="size"
          ref="inputWidthRef"
          @clear="onClearFontIcon"
          @focus="onIconFocus"
          @blur="onIconBlur"
        >
          <template #prepend>
            <i
              :class="[
                fontIconPrefix === '' ? prepend : fontIconPrefix,
                { iconfont: fontIconTabsIndex === 0 },
                { ele: fontIconTabsIndex === 1 },
                { fa: fontIconTabsIndex === 2 }
              ]"
            />
          </template>
        </el-input>
      </template>
      <transition name="el-zoom-in-top">
        <div class="icon-selector-warp" v-show="fontIconVisible">
          <div class="icon-selector-warp-title">{{ title }}</div>
          <div class="icon-selector-warp-row">
            <el-scrollbar>
              <el-row :gutter="10" v-if="fontIconSheetsFilterList.length > 0">
                <el-col
                  :xs="6"
                  :sm="4"
                  :md="4"
                  :lg="4"
                  :xl="4"
                  @click="onColClick(v)"
                  v-for="(v, k) in fontIconSheetsFilterList"
                  :key="k"
                >
                  <div
                    class="icon-selector-warp-item"
                    :class="{ 'icon-selector-active': fontIconPrefix === v }"
                  >
                    <div class="flex-margin">
                      <div class="icon-selector-warp-item-value">
                        <i :class="v" />
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-empty
                :image-size="100"
                v-if="fontIconSheetsFilterList.length <= 0"
                :description="emptyDescription"
              />
            </el-scrollbar>
          </div>
        </div>
      </transition>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed, watch, toRefs } from 'vue'
import initIconfont from './getStyleSheets'

const props = defineProps({
  // 输入框前置内容
  prepend: {
    type: String,
    default: () => 'el-icon-thumb'
  },
  // 输入框占位文本
  placeholder: {
    type: String,
    default: () => '请输入内容搜索图标或者选择图标'
  },
  // 输入框占位文本
  size: {
    type: String,
    default: () => 'small'
  },
  // 弹窗标题
  title: {
    type: String,
    default: () => '请选择图标'
  },
  // icon 图标类型
  type: {
    type: String,
    default: () => 'ele'
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: () => false
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: () => true
  },
  // 自定义空状态描述文字
  emptyDescription: {
    type: String,
    default: () => '无相关图标'
  },
  // 双向绑定值，字段名为固定，改了之后将不生效
  // 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'get', 'clear'])

const inputWidthRef = ref(null)
const fontIconPrefix = ref('')
const fontIconVisible = ref(false)
const fontIconWidth = ref(0)
const fontIconSearch = ref('')
const fontIconTabsIndex = ref(0)
const fontIconSheetsList = ref([])
const fontIconPlaceholder = ref('')

// 处理 input 获取焦点时，modelValue 有值时，改变 input 的 placeholder 值
const onIconFocus = () => {
  if (!props.modelValue) return false
  fontIconSearch.value = ''
  fontIconPlaceholder.value = props.modelValue
}
// 处理 input 失去焦点时，为空将清空 input 值，为点击选中图标时，将取原先值
const onIconBlur = () => {
  setTimeout(() => {
    const icon = fontIconSheetsList.value.filter((icon) => icon === fontIconSearch.value)
    if (icon.length <= 0) fontIconSearch.value = ''
  }, 300)
}
// 处理 icon 双向绑定数值回显
const initModeValueEcho = () => {
  if (props.modelValue === '') return false
  fontIconPlaceholder.value = props.modelValue
  fontIconPrefix.value = props.modelValue
}
// 图标搜索及图标数据显示
const fontIconSheetsFilterList = computed(() => {
  if (!fontIconSearch.value) return fontIconSheetsList.value
  let search = fontIconSearch.value.trim().toLowerCase()
  return fontIconSheetsList.value.filter((item) => {
    if (item.toLowerCase().indexOf(search) !== -1) return item
  })
})
// 获取 input 的宽度
const getInputWidth = () => {
  nextTick(() => {
    fontIconWidth.value = inputWidthRef.value.$el.offsetWidth
  })
}
// 监听页面宽度改变
const initResize = () => {
  window.addEventListener('resize', () => {
    getInputWidth()
  })
}
// 初始化数据
const initFontIconData = async () => {
  if (props.type === 'ali') {
    await initIconfont.ali().then((res) => {
      fontIconTabsIndex.value = 0
      // 阿里字体图标使用 `iconfont xxx`
      fontIconSheetsList.value = res.map((i) => `iconfont ${i}`)
    })
  } else if (props.type === 'ele') {
    await initIconfont.ele().then((res) => {
      fontIconTabsIndex.value = 1
      fontIconSheetsList.value = res
    })
  } else if (props.type === 'awe') {
    await initIconfont.awe().then((res) => {
      fontIconTabsIndex.value = 2
      // fontawesome字体图标使用 `fa xxx`
      fontIconSheetsList.value = res.map((i) => `fa ${i}`)
    })
  }
  // 初始化 input 的 placeholder
  // 参考（单项数据流）：https://cn.vuejs.org/v2/guide/components-props.html?#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81
  fontIconPlaceholder.value = props.placeholder
  // 初始化双向绑定回显
  initModeValueEcho()
}

// 获取当前点击的 icon 图标
const onColClick = (v) => {
  fontIconPlaceholder.value = v
  fontIconVisible.value = false
  if (fontIconTabsIndex.value === 0) fontIconPrefix.value = `${v}`
  else if (fontIconTabsIndex.value === 1) fontIconPrefix.value = `${v}`
  else if (fontIconTabsIndex.value === 2) fontIconPrefix.value = `${v}`
  emit('get', fontIconPrefix.value)
  emit('update:modelValue', fontIconPrefix.value)
}

// 清空当前点击的 icon 图标
const onClearFontIcon = () => {
  fontIconPrefix.value = ''
  emit('clear', fontIconPrefix.value)
  emit('update:modelValue', fontIconPrefix.value)
}

// 页面加载时
onMounted(() => {
  initFontIconData()
  initResize()
  getInputWidth()
})

// 监听双向绑定 modelValue 的变化
watch(
  () => props.modelValue,
  () => {
    initModeValueEcho()
  }
)
</script>

<style lang="scss" scoped>
.icon-selector-popper {
  padding: 0 !important;
  .icon-selector-warp {
    height: 260px;
    overflow: hidden;
    .icon-selector-warp-title {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
    }
    .icon-selector-warp-row {
      height: 230px;
      overflow: hidden;
      border-top: var(--el-border-base);
      .el-row {
        padding: 15px;
      }
      .el-scrollbar__bar.is-horizontal {
        display: none;
      }
      .icon-selector-warp-item {
        display: flex;
        border: var(--el-border-base);
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
        .icon-selector-warp-item-value {
          i {
            font-size: 20px;
            color: var(--el-text-color-regular);
          }
        }
        &:hover {
          cursor: pointer;
          background-color: var(--color-primary-light-9);
          border: 1px solid var(--color-primary-light-6);
          .icon-selector-warp-item-value {
            i {
              color: var(--color-primary);
            }
          }
        }
      }
      .icon-selector-active {
        background-color: var(--color-primary-light-9);
        border: 1px solid var(--color-primary-light-6);
        .icon-selector-warp-item-value {
          i {
            color: var(--color-primary);
          }
        }
      }
    }
  }
}
</style>
