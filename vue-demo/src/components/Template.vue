<template>
    <hr>
    <h1>模板引用</h1>

    <ul>
        <li v-for="item in list" ref="items">
            {{ item }}
        </li>
    </ul>
    <input type="text" ref="userName"><button @click="getUserName">获取</button>
</template>

<script>
export default {
    data() {
        return {
            list: [1, 2, 3],
        }
    },
    methods: {
        getUserName() {
            console.log(this.$refs.items)
            //获取userName文本框的值
            console.log(this.$refs.userName.value)
        }
    }
}
</script>
