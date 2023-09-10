<template>
    <hr>
    <h1>表单输入绑定</h1>

    <form action="https://www.bilibili.com/">
        A(实时)：<input type="text" v-model="text"><br>
        A(失去焦点lazy)：<input type="text" v-model.lazy="text2"><br>
        age(自动转换数number)：<input type="number" v-model.number="age"><br>
        name(删除空格trim):<input type="text" v-model.trim="text3"><br>
        B:<input type="checkbox" v-model="checked"><br>
        C:<input type="radio" v-model="picked" value="one"><br>
        D:<input type="radio" v-model="picked" value="twoneo"><br>
        E:<select v-model="selected"><br>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select><br>
        多行文本:<textarea v-model="message" placeholder="add multiple lines"></textarea>

        <input type="submit" value="提交">
    </form>
    <p>{{ text }},{{ text2 }},{{ text3 }}, {{ checked }},{{ picked }},{{ selected }},{{ message }}</p>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            text2: '',
            checked: false,
            picked: '',
            selected: 'B',
            message: '',
            age: 0,
            text3: "",
        }
    }
}

</script>