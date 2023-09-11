<template>
  <div class="app-container">
    <Breadcrumb/>

    <div class="app-main">
      <div class="table-tools">
        <div class="table-tools-left">
          <el-button type="primary">
            <router-link :to="{ name: 'DevAppCreate' }">
              新建应用
            </router-link>
          </el-button>
        </div>
        <div class="table-tools-right">
          <el-select
              v-model="filter.business"
              class="table-tools-input-keyword mr-5px"
              placeholder="业务组筛选，可搜索"
              filterable
              clearable
              @change="handleSearch"
          >
            <el-option
                v-for="(biz, index) in bizs"
                :key="index"
                :label="biz.name"
                :value="biz.uuid"
            />
          </el-select>
          <el-select
              v-model="filter.tag_id"
              class="table-tools-input-keyword mr-5px"
              placeholder="标签筛选，可搜索"
              filterable
              clearable
              @change="handleSearch"
          >
            <el-option
                v-for="(tag, index) in tags"
                :key="index"
                :label="tag.name"
                :value="tag.id"
            />
          </el-select>
          <el-input
              v-model="filter.keyword"
              class="table-tools-input-keyword"
              placeholder="关键词筛选"
              clearable
              :prefix-icon="Search"
              @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button type="primary" @click="handleSearch">筛选</el-button>
            </template>
          </el-input>
        </div>
      </div>

      <ul class="app-list" v-loading="tableLoading">
        <li
            v-for="(row, index) in tableData"
            :key="index"
            class="app-list-item"
        >
          <div class="app-list-title">
            {{ row.uuid }}
            <!-- <router-link
              :to="{ name: 'DevAppOverview', params: { business: row.business?.uuid, app: row.uuid } }"
              class="text-link"
            >
              {{ row.uuid }}
            </router-link> -->
            <span class="app-list-title-name">
              [{{ row.name }}]
            </span>
            <span class="app-list-tags">
              <el-tag
                  v-for="(tag, tagIndex) in row.tags"
                  :key="tagIndex"
                  size="small"
                  class="app-list-tags-item"
              >{{ tag.name }}</el-tag>
            </span>
          </div>
          <div class="app-list-remark">
            {{ row.remark }}
            <copy :value="row.remark"/>
          </div>
          <div class="app-list-info">
            <el-link type="primary" :underline="false">
              {{ row.business?.name }}
            </el-link>
            <el-divider direction="vertical"></el-divider>
            {{ row.member_count }}个成员
            <el-divider direction="vertical"></el-divider>
            {{ row.image_count }}个镜像
            <el-divider direction="vertical"></el-divider>
            {{ row.instance_count }}个实例
            <el-divider direction="vertical"></el-divider>
            最后部署时间：{{ formatDate(row.last_deploy_at) }}
            <el-divider direction="vertical"></el-divider>
            创建人：
            <user :user="row.creator"/>
          </div>
        </li>
      </ul>

      <!-- 分页组件 -->
      <pagination
          v-model:page="page"
          v-model:limit="pageSize"
          :total="total"
          class="pagination"
          @pagination="getList"
      />
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "~/components/Breadcrumb.vue";
import {Search} from "@element-plus/icons-vue";
import {onBeforeMount, reactive, ref} from "vue";
import {interceptRespJson} from "~/utils/request";
import User from '~/views/components/User.vue';
import Pagination from '~/views/components/Pagination.vue';
import {formatDate} from "~/utils/helper";
import Copy from "~/views/components/Copy.vue";

const filter = reactive({
  business: history.state?.business || null,
  tag_id: null,
  keyword: null
})

const bizs = ref([])
const tags = ref([])

const handleSearch = () => {
  page.value = 1
  getList()
}

const tableData = ref([])
const tableLoading = ref(false)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
// 加载列表
const getList = () => {
  tableLoading.value = true
  // 模拟调用接口
  setTimeout(() => {
    const res = {
      "code": 0,
      "msg": "ok",
      "data": {
        "page": 1,
        "pagesize": 20,
        "total": 3,
        "data": [
          {
            "uuid": "wharf",
            "name": "Wharf",
            "remark": "新发布系统",
            "business": {
              "uuid": "infra",
              "name": "基础架构组"
            },
            "member_count": 1,
            "image_count": 9,
            "instance_count": 2,
            "last_deploy_at": 1693366814,
            "tags": [
              {
                "id": 1,
                "name": "Wharf"
              }
            ],
            "creator": {
              "uid": "tianpian",
              "name": "行者（田片）",
              "email": "tianpian@soyoung.com",
              "avatar": "https://s1-imfile.feishucdn.com/static-resource/v1/v2_f015f572-cd57-4650-84c2-eaebe5a1fdbg~?image_size=72x72\u0026cut_type=\u0026quality=\u0026format=image\u0026sticker_format=.webp",
              "open_id": "ou_25b0eb4007cc8defa8867a8457aa05a6"
            }
          }
        ]
      }
    }
    page.value = res.data.page
    pageSize.value = res.data.pagesize
    total.value = res.data.total
    tableData.value = res.data.data
    tableLoading.value = false
  })
  // appList(filter.business, filter.tag_id, filter.keyword, page.value, pageSize.value)
  //   .then(resp => interceptRespJson(resp))
  //   .then(res => {
  //     page.value = res.data.page
  //     pageSize.value = res.data.pagesize
  //     total.value = res.data.total
  //     tableData.value = res.data.data
  //   }).finally(() => {
  //     tableLoading.value = false
  //   })
}
onBeforeMount(() => {
  getList()
  bizs.value = [{uuid: 'b1', name: '业务组1'}]
  tags.value = [{id: 1, name: 'tag1'}]
})
</script>

<style lang="scss" scoped>
.app-list {
  .app-list-item {
    padding: 8px 0;
    border-bottom: 1px solid var(--el-border-color);

    &:not(:first-of-type) {
      margin-top: 10px;
    }
  }

  .app-list-title {
    font-size: 16px;
  }

  .app-list-title-name {
    font-size: 14px;
    color: var(--el-color-warning);
    margin: 0 5px;
  }

  .app-list-tags-item {
    margin-left: 5px;
  }

  .app-list-remark {
    margin-top: 10px;
    font-size: 13px;
    color: var(--el-text-color-regular);
  }

  .app-list-info {
    margin-top: 5px;
    font-size: 13px;
  }
}
</style>
