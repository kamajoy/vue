<template>
  <div class="app-container">
    <Breadcrumb />

    <div class="app-main">
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="100px"
        class="main-form"
        @submit.prevent="handleSubmit"
      >
        <easy-title title="基础信息" level="h2" margin-set="0 20" />
        <el-form-item prop="business" label="业务组">
          <el-select
            v-model="form.business"
            filterable
            placeholder="请选择业务组，可用关键词搜索过滤"
            class="form-item-control"
          >
            <el-option
              v-for="(biz, index) in bizs"
              :key="index"
              :label="biz.name"
              :value="biz.uuid"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="uuid" label="UUID">
          <el-input
            v-model="form.uuid"
            class="form-item-control"
            placeholder="唯一ID，必须由数字字母-组成，且以字母开头、结尾"
          />
        </el-form-item>
        <el-form-item prop="name" label="应用名称">
          <el-input
            v-model="form.name"
            class="form-item-control"
            placeholder="应用名称"
          />
        </el-form-item>
        <el-form-item prop="tags" label="应用标签">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            :reserve-keyword="false"
            placeholder="可选，可用关键词搜索过滤，回车自动创建新标签"
            class="form-item-control"
          >
            <el-option
              v-for="(tag, index) in tags"
              :key="index"
              :label="tag.name"
              :value="tag.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" label="应用介绍">
          <el-input
            v-model="form.remark"
            class="form-item-control"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="应用简要介绍"
          />
        </el-form-item>
        <easy-title title="构建配置" level="h2" margin-set="20 20" />
        <el-form-item prop="gitrepo" label="Git仓库">
        </el-form-item>
        <el-form-item prop="pipeline_rels" label="流水线">
          <div class="pipeline-rels-control">
            <el-link type="primary" :underline="false" @click="handlePipelineRel">
              选择流水线
            </el-link>
            <span class="little-tips">
              （选择镜像构建所需默认流水线，可以在新建应用之后重新关联）
            </span>
          </div>
          <div class="pipeline-rels-template">
            <el-tag
              v-for="(rel, index) in pipelineRels"
              :key="index"
              class="mr-2"
              closable
              @close="handleRemovePipelineRel(index)"
            >
              {{ rel.name }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item prop="registry" label="镜像名称">
        </el-form-item>
        <el-form-item class="form-buttons">
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onBeforeMount, provide, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Breadcrumb from "~/components/Breadcrumb.vue";
import { UUID_REGEX } from "~/consts/app";
import { interceptRespJson } from "~/utils/request";
import EasyTitle from '~/views/components/EasyTitle.vue';

const router = useRouter()

const formRef = ref()
const bizs = ref([])
const tags = ref([])
const form = reactive({
  business: null,
  uuid: null,
  name: null,
  tags: [],
  remark: null,
  gitrepo: null,
  pipeline_rels: [],
  registry_id: null,
  registry_image: null,
})
// 为了避免流水线关联组件PipelineRel缺少参数警告注入冗余变量
provide('business', form.business)
provide('uuid', form.uuid)
const pipelineRels = ref([])
const pipelineRelRef = ref()
// 验证Registry
const validRegistry = (rule, value, callback) => {
  if (!form.registry_id) {
    return callback(new Error('请选择镜像仓库'))
  }
  if (!form.registry_image) {
    return callback(new Error('请填写镜像名称'))
  }
  return callback()
}
const formRules = {
  business: [
    { required: true, message: '请选择业务组' }
  ],
  uuid: [
    { required: true, message: '请填写UUID' },
    { max: 50, message: 'UUID不能超过50个字符串长度' },
    { pattern: UUID_REGEX, message: 'UUID格式不合法' },
  ],
  name: [
    { required: true, message: '请填写应用名称' },
    { max: 50, message: '应用名称不能超过50个字符串长度' }
  ],
  remark: [
    { max: 200, message: '应用介绍不能超过200个字符串长度' }
  ],
  gitrepo: [
    { required: true, message: '请选择或者填写Git仓库地址' },
  ],
  registry: [
    { required: true, validator: validRegistry, trigger: ['blur'] },
  ]
}
onBeforeMount(() => {
})

const submitLoading = ref(false)

// 提交表单
const handleSubmit = () => {
  if (!formRef.value) {
    return
  }
  formRef.value.validate((valid) => {
    if (valid) {
      submitLoading.value = true
      ElMessage.success('表单提交了')
      setTimeout(() => {
        submitLoading.value = false
      }, 200)
      // appCreate(Object.assign({}, form, {
      //   registry_id: form.registry_id[1] || null,
      //   pipeline_rels: pipelineRels.value.map(row => {
      //     return { tpl_id: row.id }
      //   })
      // }))
      //   .then(resp => interceptRespJson(resp))
      //   .then(res => {
      //     ElMessage.success('创建成功')
      //     router.push({ name: 'DevAppOverview', params: { business: res.data.app.business, app: res.data.app.uuid } })
      //   })
      //   .finally(() => {
      //     submitLoading.value = false
      //   })
    }
  })
}
// 取消提交
const handleCancel = () => {
  window.history.length > 1 ? router.go(-1) : router.push({ name: 'DevApp' })
}

// 选择流水线关联
const handlePipelineRel = () => {
  pipelineRelRef.value.show()
}

</script>

<style lang="scss" scoped>
.pipeline-rels-control {
  width: 100%;
}
.pipeline-rels-template {
  display: block;
}
</style>
