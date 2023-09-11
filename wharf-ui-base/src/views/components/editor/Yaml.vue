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
import 'codemirror/addon/lint/lint.css'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/yaml-lint'
import YAML from 'yaml'
import * as jsyaml from 'js-yaml'
window.jsyaml = jsyaml
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
    mode: 'text/yaml',
    gutters: [props.lint ? 'CodeMirror-lint-markers' : ''],
    lint: props.lint,
  }, props.extraConfig)
})

const editorRef = ref()
const getValue = () => {
  return YAML.stringify(editorRef.value.getValue())
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
