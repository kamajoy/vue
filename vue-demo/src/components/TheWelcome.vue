<template>
  <hr>
  <div :class="{ active: isActive }" :id="ID"></div>

  <p>{{ msg }}</p>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App来了。。。',
      isActive: false,
      ID: 'welcome'
    }
  }
}
</script>
