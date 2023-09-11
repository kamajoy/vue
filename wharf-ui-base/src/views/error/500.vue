<template>
  <Error type="500" @error-click="errorClick" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import Error from '~/components/Error.vue'

const { push } = useRouter()

const errorClick = () => {
  push({ name: 'Root' })
}
</script>
