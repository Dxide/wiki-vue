<template>
  <el-main>
    <el-form :inline="true" style="float: right">
      <el-form-item>
        <el-input v-model="search" placeholder="搜索" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUsers">搜索</el-button>
        <el-button type="primary" @click="clickInsert">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="users" border style="width: 100%;" size="large" v-loading="tableLoading" >
      <el-table-column prop="id" label="用户ID" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="name" label="昵称"/>
      <el-table-column label="操作" width="200px">
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
        @current-change="getUsers"
        @size-change="getUsers"
        style="margin-top: 10px;float: right"
    />

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
      <el-form :model="userForm" label-position="top">
        <el-form-item label="用户名" v-show="!userForm.id">
          <el-input v-model="userForm.userName" clearable/>
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input v-model="userForm.name" clearable/>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="userForm.password" clearable/>
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

const users=ref()//电子书列表
const tableLoading=ref(true)//表格加载
const submitLoading=ref(false)//提交加载框
const dialogVisible=ref(false)//编辑页面对话框
const dialogTitle=ref()//对话框标签
const search=ref();//搜索内容
const userForm=ref({})//电子书表单
const pageInfo=ref({
  total: 0,
  size: 5,
  current: 1
})//分页数据

const getUsers=()=>{
  tableLoading.value=true
  request.get("user/admin",{params:{
      currentPage:pageInfo.value.current,
      pageSize:pageInfo.value.size,
      search:search.value,
  }}).then((response)=>{
      pageInfo.value.total=response.data.total
      users.value=response.data.records
      tableLoading.value=false
  })
}//获取电子书列表
const clickEdit=(row:object)=>{
  dialogTitle.value="编辑"
  dialogVisible.value=true
  userForm.value=JSON.parse(JSON.stringify(row))
}//编辑按钮点击事件
const clickInsert=()=>{
  dialogTitle.value="新增"
  userForm.value={}
  dialogVisible.value=true
}//新增点击事件
const submit=()=>{
  submitLoading.value=true
  request.post("user/admin",userForm.value).then((response:any)=>{
    ElMessage.success(response.message)
    dialogVisible.value=false
    getUsers()
  }).finally(()=>{
    submitLoading.value=false
  })
}//提交
const clickDelete=(id:string)=>{
  request.delete("user/admin/"+id).then((response:any)=>{
    ElMessage.success(response.message)
    getUsers()
  })
}//删除点击事件


onMounted(()=>{
  getUsers()
})//初始化
</script>

<style scoped>

</style>