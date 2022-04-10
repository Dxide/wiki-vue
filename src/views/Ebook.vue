<template>
  <el-container>
    <el-aside width="200px" style="border-right: 1px solid lightgray">
      <el-scrollbar>
        <el-menu>
          <el-menu-item >
            <span>hello</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-main>
      main1223
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import request from "@/util/request";

request.get("ebook").then((response)=>{
  console.log(response.data)
})
</script>

<style scoped>

</style>