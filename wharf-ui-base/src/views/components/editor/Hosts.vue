<template>
  <Editor
    ref="editorRef"
    class="hosts-editor"
    :model-value="props.modelValue"
    :readonly="props.readonly"
    :extra-config="mergedConfig"
    @update:model-value="$emit('update:modelValue', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)" />
</template>

<script setup>
import CodeMirror from 'codemirror';
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
  return Object.assign({}, props.extraConfig, {
    mode: 'hosts',
    gutters: [props.lint ? 'CodeMirror-lint-markers' : ''],
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

CodeMirror.defineMode('hosts', function () {
  function tokenBase (stream) {
    if (stream.eatSpace()) return null

    const sol = stream.sol()
    const ch = stream.next()

    const s = stream.string

    if (ch === '#') {
      stream.skipToEnd()
      return 'comment'
    }
    if (!s.match(/^\s*([\d.]+|[\da-f:.%lo]+)\s+\w/i)) {
      return 'error'
    }

    if (sol && ch && ch.match(/[\w.:%]/)) {
      stream.eatWhile(/[\w.:%]/)
      return 'ip'
    }

    return null
  }

  function tokenize (stream, state) {
    return (state.tokens[0] || tokenBase)(stream, state)
  }

  return {
    startState: function () {
      return { tokens: [] }
    },
    token: function (stream, state) {
      return tokenize(stream, state)
    },
    lineComment: '#'
  }
})
</script>

<style lang="scss" scoped>
.hosts-editor {
  :deep(.CodeMirror .cm-ip) {
    color: #4EC9B0;
    font-weight: bold;
  }
  :deep(.CodeMirror) {
    min-height: inherit;
  }
  :deep(.CodeMirror-scroll) {
    min-height: inherit;
  }
}
</style>
