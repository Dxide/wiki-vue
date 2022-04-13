<template>
  <el-main>
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
              title="确定删除这个用户吗?"
              @confirm="handleDeleteUserById(scope.row.id)">
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

    <el-dialog v-model="dialogEditVisible" title="编辑" width="40%">
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
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">提交</el-button>
      </span>
      </template>
    </el-dialog>
  </el-main>
</template>

<script lang="ts" setup>
import request from "@/util/request";
import {onMounted, ref} from "vue";
import {InfoFilled,Delete,Edit} from '@element-plus/icons-vue'

const ebooks=ref()//电子书列表
const tableLoading=ref(true)//表格加载
const submitLoading=ref(false)//提交加载框
const dialogEditVisible=ref(false)//编辑页面对话框
const ebookForm=ref({
  cover:'',
  name:'',
  categoryId:'',
  description:''
})//电子书表单
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
  dialogEditVisible.value=true
  ebookForm.value=JSON.parse(JSON.stringify(row))
}//编辑按钮点击事件

onMounted(()=>{
  getEbooks()
})//初始化
</script>

<style scoped>

</style>