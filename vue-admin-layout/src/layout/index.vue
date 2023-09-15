<template>
  <defaults v-if="layout === 'defaults'" />
  <classic v-else-if="layout === 'classic'" />
  <transverse v-else-if="layout === 'transverse'" />
  <columns v-else-if="layout === 'columns'" />
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import Defaults from './main/defaults.vue'
import Classic from './main/classic.vue'
import Transverse from './main/transverse.vue'
import Columns from './main/columns.vue'

const settingsStore = useSettingsStore()

const layout = computed(() => settingsStore.layout)
</script>

<style lang="scss" scoped>

</style>
