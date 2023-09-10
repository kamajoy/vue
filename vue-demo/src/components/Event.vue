<template>
    <hr>
    <h3>事件处理</h3>

    <button @click="countSum">Add+1</button>
    <p>Count is: {{ count }}</p>
    <button @click="say('hi')">Say hi</button>
    <button @click="say('what')">Say what</button>
    <br><br>

    <!-- 使用特殊的 $event 变量 -->
    <button @click="warn('Form cannot be submitted yet.:', $event)">
        Submit
    </button>
    <!-- 使用内联箭头函数 -->
    <button @click="(event) => warn('Form cannot be submitted yet.', event)">
        Submit
    </button>

    <h5>事件修饰符(如点击一个链接阻止它跳转):</h5>
    <a href="https://www.baidu.com" @click="doThis">baidu(click.prevent)</a><br>
    <a href="https://www.baidu.com" @click.prevent="alertMsg()">baidu2(阻止跳转)</a>

    <br><br>
    <form action="https://www.baidu.com" @submit.prevent="warn('阻止表单提交.')">
        <!-- ... -->
        <button type="submit">Submit(submit.prevent)</button>
    </form>

    <br>
    <div @click="clickDiv">
        <!--click.stop防止clickDiv被触发-->
        <button @click.stop="clickP">阻止事件冒泡(click.stop)</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        countSum() {
            console.log('点击量：' + this.count)
            this.count++
        },
        say(message) {
            alert(message)
        },
        warn(message, event) {
            // 这里可以访问 DOM 原生事件
            if (event) {
                event.preventDefault()
            }
            alert(message)
        },
        alertMsg(event) {
            alert('alertMsg')
        },
        doThis(event) {
            //阻止事件
            event.preventDefault()
            alert('doThis')
        },
        clickDiv() {
            alert('clickDiv')
        },
        clickP() {
            alert('clickP')
        }
    },


}
</script>