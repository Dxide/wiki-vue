<template>
  <el-main>
    <el-button type="primary" @click="clickInsert" style="float: right;margin-bottom: 10px">新增</el-button>

    <el-table :data="category" border style="width: 100%;" size="large" v-loading="tableLoading" >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="sort" label="排序" />
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
      <el-form :model="categoryForm">
        <el-form-item label="名称" >
          <el-input v-model="categoryForm.name" clearable/>
        </el-form-item>
        <el-form-item label="排序" >
          <el-input-number v-model.number="categoryForm.sort"/>
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

const category=ref()//电子书列表
const tableLoading=ref(true)//表格加载
const submitLoading=ref(false)//提交加载框
const dialogVisible=ref(false)//编辑页面对话框
const dialogTitle=ref()//对话框标签
const categoryForm=ref({})//电子书表单


const getCategory=()=>{
  tableLoading.value=true
  request.get("category").then((response)=>{
      category.value=response.data
      tableLoading.value=false
  })
}//获取电子书列表
const clickEdit=(row:object)=>{
  dialogTitle.value="编辑"
  dialogVisible.value=true
  categoryForm.value=JSON.parse(JSON.stringify(row))
}//编辑按钮点击事件
const clickInsert=()=>{
  dialogTitle.value="新增"
  categoryForm.value={}
  dialogVisible.value=true
}//新增点击事件
const submit=()=>{
  console.log(categoryForm.value)
  submitLoading.value=true
  request.post("category/admin",categoryForm.value).then((response:any)=>{
    ElMessage.success(response.message)
    dialogVisible.value=false
    getCategory()
  }).finally(()=>{
    submitLoading.value=false
  })
}//提交
const clickDelete=(id:string)=>{
  request.delete("category/admin/"+id).then((response:any)=>{
    ElMessage.success(response.message)
    getCategory()
  })
}//删除点击事件

onMounted(()=>{
  getCategory()
})//初始化
</script>

<style scoped>

</style>