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
      <pre>{{ ebooks }}</pre>

    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import request from "@/util/request";
import {onMounted, ref} from "vue";

const ebooks=ref()//电子书列表

onMounted(()=>{
  request.get("ebook",{params:{search:"spring"}}).then((response)=>{
    ebooks.value=response.data
  })
})

</script>

<style scoped>

</style>