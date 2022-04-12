<template>
  <el-header style="width: 100%;border-bottom: 1px solid lightgray">
    <el-row>
      <el-col :span="6" style="margin: 20px auto;text-align: left">
        Wiki电子书
      </el-col>
      <el-col :span="12">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            :router=true
            :ellipsis=false
            style="width: 274px;margin: 1px auto"
        >
          <el-menu-item index="/ebook">首页</el-menu-item>
          <el-menu-item index="/admin/ebook">电子书管理</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6" style="margin: 20px auto;text-align: right">
        登陆注册
      </el-col>
    </el-row>

  </el-header>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.item{
  font-size: 20px;
}
</style> 