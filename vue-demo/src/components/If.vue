<template>
    <hr>
    <h3>if条件渲染</h3>
    <div v-if="seen">Now you see me</div>
    <div v-else>Now you don't</div>
</template>

<script>
export default {
    data() {
        return {
            seen: true
        }
    }
}
</script>