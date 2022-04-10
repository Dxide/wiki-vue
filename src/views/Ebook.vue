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
      <el-row :gutter="30">
        <el-col :span="8" v-for="ebook in ebooks" style="margin-bottom: 30px">
          <el-card>
            <template #header>
              <div>
                <span>{{ ebook.name}}</span>
              </div>
            </template>
            <div>{{ebook.description}}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import request from "@/util/request";
import {onMounted, ref} from "vue";

const ebooks=ref()//电子书列表

onMounted(()=>{
  request.get("ebook").then((response)=>{
    ebooks.value=response.data
  })
})

</script>

<style scoped>

</style>