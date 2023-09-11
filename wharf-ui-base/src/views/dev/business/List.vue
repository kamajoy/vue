<template>
  <div class="app-container">
    <Breadcrumb/>

    <div class="app-main">
      <div class="table-tools">
        <div class="table-tools-left"></div>
        <div class="table-tools-right">
          <el-input
              v-model="filter.keyword"
              class="table-tools-input-keyword"
              placeholder="业务组筛选"
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

      <el-table
          style="width: 100%; margin-top: 20px"
          :data="tableData"
          v-loading="tableLoading"
          fit
          highlight-current-row
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column align="center" width="100" label="应用数量">
          <template #default="{ row }">
            <router-link
                :to="{ name: 'DevApp', state: { business: row.uuid } }"
                class="text-link"
            >
              {{ row.app_count }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="成员数量">
          <template #default="{ row }">
            {{ row.mem_count }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="负责人">
          <template #default="{ row }">
            <user :user="row.manager"/>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template #default="{ row }">
            <!-- <router-link
              :to="{ name: 'DevBusinessSetting', params: { business: row.uuid } }"
              class="text-link"
            >
              配置
            </router-link>
            <el-divider direction="vertical"></el-divider> -->
            <router-link
                :to="{ name: 'DevLayout', state: { business: row.uuid } }"
                class="text-link"
            >
              成员
            </router-link>
          </template>
        </el-table-column>
      </el-table>

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
import User from "~/views/components/User.vue";
import Pagination from "~/views/components/Pagination.vue";
// import { businessList } from "~/api/dev/business";

const filter = reactive({
  keyword: null,
});
const handleSearch = () => {
  page.value = 1;
  getList();
};

const tableData = ref([]);
const tableLoading = ref(false);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
// 加载列表
const getList = () => {
  tableLoading.value = true;
  setTimeout(() => {
    const res = {
      code: 0,
      msg: "ok",
      data: {
        page: 1,
        pagesize: 20,
        total: 12,
        data: [
          {
            uuid: "infra",
            name: "基础架构组",
            remark: "",
            created_at: 1693204277,
            app_count: 3,
            mem_count: 2,
            manager: {
              uid: "huangwenmin",
              name: "乔峰（黄文敏）",
              email: "huangwenmin@soyoung.com",
              avatar:
                  "https://s1-imfile.feishucdn.com/static-resource/v1/v2_872a0ed8-0173-4401-8f48-afce3d1cacbg~?image_size=noop\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp",
              open_id: "ou_5fe1b2e8a22e971340a8296847a19b67",
            },
          },
          {
            uuid: "infra",
            name: "基础架构组2",
            remark: "",
            created_at: 1693204277,
            app_count: 3,
            mem_count: 2,
            manager: {
              uid: "xxxx",
              name: "soyoung",
              email: "abc@soyoung.com",
              avatar:
                  "https://s1-imfile.feishucdn.com/static-resource/v1/v2_872a0ed8-0173-4401-8f48-afce3d1cacbg~?image_size=noop\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp",
              open_id: "ou_5fe1b2e8a22e971340a8296847a19b67",
            },
          }
        ],
      },
    };
    page.value = res.data.page;
    pageSize.value = res.data.pagesize;
    total.value = res.data.total;
    tableData.value = res.data.data;

    tableLoading.value = false
  }, 200);
  // businessList(filter.keyword, page.value, pageSize.value)
  //   .then(resp => interceptRespJson(resp))
  //   .then(res => {
  //     page.value = res.data.page
  //     pageSize.value = res.data.pagesize
  //     total.value = res.data.total
  //     tableData.value = res.data.data
  //   }).finally(() => {
  //     tableLoading.value = false
  //   })
};
onBeforeMount(() => {
  getList();
});
</script>

<style lang="scss" scoped>
</style>
