<template>
  <div>
    用户管理:<el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="text" @click="open">点击打开 Message Box</el-button>

    <el-tag>标签一</el-tag>
    <el-tag type="success">标签二</el-tag>
    <el-tag type="info">标签三</el-tag>
    <el-tag type="warning">标签四</el-tag>
    <el-tag type="danger">标签五</el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',

    }
  },

  methods: {
    open() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    },

  }
}
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
