<template>
  <el-main>

    <div style="margin-bottom: 10px;float: right">
      <el-button type="primary" @click="clickInsert">新增</el-button>
    </div>

    <el-table :data="ebooks" border style="width: 100%;" size="large" v-loading="tableLoading" >
      <el-table-column label="封面" width="100px">
        <template #default="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.cover" style="width: 50px;"/>
          </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="categoryId" label="分类"/>
      <el-table-column prop="docCount" label="文档数" />
      <el-table-column prop="viewCount" label="阅读数" />
      <el-table-column prop="voteCount" label="点赞数" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button  @click="clickEdit(scope.row)">编辑</el-button>
          <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="red"
              title="删除后不可恢复，确认删除?"
              @confirm="clickDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:currentPage="pageInfo.current"
        v-model:page-size="pageInfo.size"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next"
        :total="pageInfo.total"
        @current-change="getEbooks"
        @size-change="getEbooks"
        style="margin-top: 10px;float: right"
    />

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
      <el-form :model="ebookForm">
        <el-form-item label="封面" >
          <el-input v-model="ebookForm.cover" clearable/>
        </el-form-item>
        <el-form-item label="名称" >
          <el-input v-model="ebookForm.name" clearable/>
        </el-form-item>
        <el-form-item label="分类" >
          <el-input v-model="ebookForm.categoryId" />
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="ebookForm.description" type="textarea" clearable/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit" :loading="submitLoading">提交</el-button>
      </span>
      </template>
    </el-dialog>
  </el-main>
</template>

<script lang="ts" setup>
import request from "@/util/request";
import {onMounted, ref} from "vue";
import {InfoFilled} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

const ebooks=ref()//电子书列表
const tableLoading=ref(true)//表格加载
const submitLoading=ref(false)//提交加载框
const dialogVisible=ref(false)//编辑页面对话框
const dialogTitle=ref()//对话框标签
const ebookForm=ref({})//电子书表单
const pageInfo=ref({
  total: 0,
  size: 5,
  current: 1
})//分页数据

const getEbooks=()=>{
  tableLoading.value=true
  request.get("ebook",{params:{currentPage:pageInfo.value.current
      ,pageSize:pageInfo.value.size}}).then((response)=>{
      pageInfo.value.total=response.data.total
      ebooks.value=response.data.records
      tableLoading.value=false
  })
}//获取电子书列表
const clickEdit=(row:object)=>{
  dialogTitle.value="编辑"
  dialogVisible.value=true
  ebookForm.value=JSON.parse(JSON.stringify(row))
}//编辑按钮点击事件
const clickInsert=()=>{
  dialogTitle.value="新增"
  ebookForm.value={}
  dialogVisible.value=true
}//新增点击事件
const submit=()=>{
  submitLoading.value=true
  request.post("ebook/admin",ebookForm.value).then((response:any)=>{
    ElMessage.success(response.message)
    dialogVisible.value=false
    getEbooks()
  }).finally(()=>{
    submitLoading.value=false
  })
}//提交
const clickDelete=(id:string)=>{
  request.delete("ebook/admin/"+id).then((response:any)=>{
    ElMessage.success(response.message)
    getEbooks()
  })
}//删除点击事件

onMounted(()=>{
  getEbooks()
})//初始化
</script>

<style scoped>

</style>