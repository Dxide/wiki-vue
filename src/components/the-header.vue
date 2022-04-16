<template>
  <el-header style="width: 100%;border-bottom: 1px solid #dcdfe6">
    <el-row>
      <el-col :span="6" style="margin: 20px auto;text-align: left">
        Wiki电子书
      </el-col>
      <el-col :span="12">
        <el-menu
            :default-active='currentPath'
            class="el-menu-demo"
            mode="horizontal"
            :router=true
            :ellipsis=false
            style="margin: 1px auto"
        >
          <el-menu-item index="/ebook" class="item">首页</el-menu-item>
          <el-menu-item index="/admin/ebook" class="item">电子书管理</el-menu-item>
          <el-menu-item index="/admin/category" class="item">分类管理</el-menu-item>
          <el-menu-item index="/about" class="item">关于我们</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6" style="margin: 20px auto;text-align: right">
        登陆注册
      </el-col>
    </el-row>

  </el-header>
</template>

<script lang="ts" setup>
import router from "@/router";
import {ref} from "vue";

const currentPath=ref(router.currentRoute.value.path)

</script>

<style scoped>
.item{
  font-size: 18px;
}
</style> 