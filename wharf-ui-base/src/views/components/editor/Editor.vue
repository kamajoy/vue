<template>
  <div class="editor" :class="{readonly: props.readonly}">
    <textarea ref="textareaRef"/>
  </div>
</template>

<script setup>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import { onMounted, watch, ref, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  extraConfig: {
    type: Object,
    default: () => { return {} }
  }
})
const textareaRef = ref()
let editor = null

const getValue = () => {
  return editor.getValue()
}
const refresh = () => {
  nextTick(() => {
    editor.refresh()
  })
}
const getEditor = () => {
  return editor
}
watch(() => props.modelValue, (val) => {
  if (val !== getValue()) {
    editor.setValue(val || '')
  }
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
onMounted(() => {
  editor = CodeMirror.fromTextArea(textareaRef.value, Object.assign({}, {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'rubyblue',
      lint: false,
      readOnly: props.readonly ? true : false,
    }, props.extraConfig)),

    editor.setValue(props.modelValue || '')
    editor.on('change', cm => {
      emit('update:modelValue', cm.getValue())
    })
    editor.on('focus', e => {
      emit('focus', e)
    })
    editor.on('blur', e => {
      emit('blur', e)
    })
})
defineExpose({
  getValue,
  refresh,
  getEditor,
})
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
  position: relative;
  :deep(.CodeMirror) {
    height: 100%;
    min-height: 300px;
  }
  :deep(.CodeMirror-scroll) {
    min-height: 300px;
  }
  :deep(.cm-s-rubyblue span.cm-string) {
    color: #F08047;
  }
  &.readonly {
    :deep(.CodeMirror-cursors) {
      display: none;
    }
  }
}
</style>
