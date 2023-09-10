<template>
    <hr>
    <h1>组合式 API (Composition API)</h1>

    <button @click="increment">Count is: {{ count }}</button>

    <li v-for="(item, index) in items">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)
// 用来修改状态、触发更新的函数
function increment() {
    count.value++
}

const parentMessage = ref('print')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

// 生命周期钩子
onMounted(() => {
    console.log(`The initial count is ${count.value}.`)
})

</script>
