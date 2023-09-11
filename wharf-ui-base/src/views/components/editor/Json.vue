<template>
  <Editor
    ref="editorRef"
    :model-value="props.modelValue"
    :readonly="props.readonly"
    :extra-config="mergedConfig"
    @update:model-value="$emit('update:modelValue', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)" />
</template>

<script setup>
import 'codemirror/mode/javascript/javascript'
import { computed, ref } from 'vue';
import Editor from './Editor.vue';

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
  },
  lint: {
    type: Boolean,
    default: true
  }
})
const mergedConfig = computed(() => {
  return Object.assign({}, {
    mode: 'application/json',
    gutters: [props.lint ? 'CodeMirror-lint-markers' : ''],
  }, props.extraConfig)
})

const editorRef = ref()
const getValue = () => {
  return editorRef.value.getValue()
}
const refresh = () => {
  return editorRef.value.refresh()
}
const getEditor = () => {
  return editorRef.value.getEditor()
}
defineEmits(['update:modelValue', 'focus', 'blur'])
defineExpose({
  getValue,
  refresh,
  getEditor,
})
</script>
