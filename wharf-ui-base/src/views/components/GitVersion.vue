<template>
  <component :is="component" :href="url" target="_blank" class="git-version">
    <span v-if="showBranch" class="git-version-branch">
      {{ showBranch }}
    </span>
    <span class="git-version-commitid">
      {{ showCommitID }}
    </span>
  </component>
</template>

<script setup>
import { ElLink } from 'element-plus';
import { computed, inject } from 'vue';

const props = defineProps({
  version: {
    type: Object,
    default: null,
  },
  link: {
    type: Boolean,
    default: true,
  },
})
const appInfo = inject('app')
const showBranch = computed(() => {
  if (!props.version) {
    return 'tag'
  } else if (props.version.tag) {
    return 'tag'
  } else {
    return props.version.branch
  }
})
const showCommitID = computed(() => {
  if (!props.version) {
    return 'unknown'
  } else if (props.version.tag) {
    return props.version.tag
  } else {
    return String(props.version.commit_id).substring(0, 8)
  }
})
const url = computed(() => {
  if (!props.link || !props.version || !appInfo?.value?.git_urls?.http_url) {
    return null
  }
  const base = appInfo.value.git_urls.http_url
  if (props.version.tag) {
    return `${base}/-/tags/${props.version.tag}`
  } else if (props.version.commit_id) {
    return `${base}/-/commit/${props.version.commit_id}`
  }
  return null
})
const component = computed(() => {
  if (url) {
    return ElLink
  } else {
    return 'span'
  }
})
</script>

<style lang="scss" scoped>
.git-version {
  color: #fff;
  line-height: 20px;
  font-size: 12px;
  .git-version-branch {
    display: inline-block;
    background: #4B4B4B;
    padding: 0 5px;
    border-radius: 4px 0 0 4px;
    & + .git-version-commitid {
      border-radius: 0 4px 4px 0;
    }
  }
  .git-version-commitid {
    display: inline-block;
    background: #59C52D;
    padding: 0 5px;
    border-radius: 4px;
  }
}
</style>
