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
          <el-button  @click="editUser(scope.row)">编辑</el-button>
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
  </el-main>
</template>

<script lang="ts" setup>
import request from "@/util/request";
import {onMounted, ref} from "vue";
import {InfoFilled,Delete,Edit} from '@element-plus/icons-vue'

const ebooks=ref()//电子书列表
const tableLoading=ref(true)//表格加载
const pageInfo=ref({//分页数据
  total: 0,
  size: 5,
  current: 1
})

const getEbooks=()=>{//获取电子书列表
  tableLoading.value=true
  request.get("ebook",{params:{currentPage:pageInfo.value.current
      ,pageSize:pageInfo.value.size}}).then((response)=>{
      pageInfo.value.total=response.data.total
      ebooks.value=response.data.records
      tableLoading.value=false
  })
}

onMounted(()=>{
  getEbooks()
})
</script>

<style scoped>

</style>