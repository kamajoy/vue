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
import 'codemirror/mode/dockerfile/dockerfile';
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
  }
})
const mergedConfig = computed(() => {
  return Object.assign({}, props.extraConfig, {
    mode: 'text/x-dockerfile',
    gutters: [],
  })
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

<style lang="scss" scoped>
</style>
