<template>
  <el-pagination
    v-show="!props.hidden"
    :background="props.background"
    :current-page="props.page"
    :page-size="props.limit"
    :layout="props.layout"
    :page-sizes="props.pageSizes"
    :total="props.total"
    :hide-on-single-page="props.autoHidden"
    :small="props.small"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { scrollTo } from '~/utils/helper';

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  total: {
    type: Number,
    default: 0
  },
  pageSizes: {
    type: Array,
    default () { return [10, 20, 30, 50, 100] }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  scrollTo: {
    type: String,
    default: null,
  },
  hidden: {
    type: Boolean,
    default: false
  },
  autoHidden: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:page', 'update:limit', 'pagination'])

const handleSizeChange = (pageSize) => {
  emit('update:limit', pageSize)
  emit('pagination', { page: props.page, limit: pageSize })
  if (props.autoScroll) {
    if (!scrollTo(props.scrollTo)) {
      window.scrollTo(0, 0)
    }
  }
}
const handleCurrentChange = (page) => {
  emit('update:page', page)
  emit('pagination', { page, limit: props.limit })
  if (props.autoScroll) {
    if (!scrollTo(props.scrollTo)) {
      window.scrollTo(0, 0)
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
