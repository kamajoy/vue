<template>
    <hr>
    <h2>列表渲染</h2>
    <li v-for="(item, index) in items" :key="item.id">
        {{ index }} - {{ item.id }} - {{ item.text }}
    </li>
    <hr>
    <li v-for="id in ids" :key="id.id">
        {{ id }}
        <img :src="'https://picsum.photos/100/150?random=' + id" alt="">
    </li>
    <button @click="ids.push({ id: 4 })">追加数据</button>
    <button @click="addData">合并数组</button>

    <div v-for="ob in myObject">
        {{ ob }}
    </div>
</template>

<script>

export default {
    data() {
        return {
            items: [
                { id: 2, text: 'Learn Vue2' },
                { id: 1, text: 'Learn JavaScript1' },
                { id: 3, text: 'Build something awesome2' }
            ],
            ids: [1],
            userList: [
                { id: 1, name: 'John Doe1' },
                { id: 2, name: 'Jane Doe2' },
                { id: 3, name: 'John Smith3' }
            ],
            myObject: {
                title: 'How to do lists in Vue',
                author: 'Jane Doe',
                publishedAt: '2016-04-10'
            }
        }
    },
    methods: {
        addData() {
            //追加数据
            //this.ids.push({ id: 888 })
            //合并数组
            this.ids = this.ids.concat({ id: 888 })
        },
    }

}
</script>