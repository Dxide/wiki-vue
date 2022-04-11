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
            <el-container direction="vertical">
              <el-container>
                <el-avatar shape="square" :size="50" :src="ebook.cover" style="width: 50px;"/>
                <el-container direction="vertical" style="margin-left: 10px">
                  <span>{{ebook.name}}</span>
                  <el-container style="margin-top: 10px">
                    <el-icon><Document/></el-icon>
                    &nbsp;{{ebook.docCount}}&nbsp;&nbsp;
                    <el-icon><View/></el-icon>
                    &nbsp;{{ebook.viewCount}}&nbsp;&nbsp;
                    <el-icon><Star/></el-icon>
                    &nbsp;{{ebook.voteCount}}
                  </el-container>
                </el-container>
              </el-container>
                <span style="font-size: 12px;color: #909090;margin-top: 5px">{{ebook.description}}</span>
            </el-container>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import request from "@/util/request";
import {onMounted, ref} from "vue";
import {Star,View,Document} from '@element-plus/icons-vue'

const ebooks=ref()//电子书列表

onMounted(()=>{
  request.get("ebook").then((response)=>{
    ebooks.value=response.data
  })
})

</script>

<style scoped>

</style>