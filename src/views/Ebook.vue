<template>
  <el-container>
    <el-aside width="200px" style="border-right: 1px solid lightgray">
      <el-scrollbar>
        <el-menu @select="onSelect">
          <el-menu-item v-for="category in categories" :index="category.id">{{ category.name }}</el-menu-item>
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
const categories=ref()//分类列表


const getEbooks=(category:string)=>{
  request.get("ebook/all",{params:{category:category}}).then((response)=>{
    ebooks.value=response.data
  })
}//获取电子书列表
const getCategory=()=>{
  request.get("category").then((response)=>{
    categories.value=response.data
    getEbooks("")
  })
}//获取分类列表
const onSelect=(index:string)=>{
  getEbooks(index)
}//选择事件

onMounted(()=>{
  getCategory()
})

</script>

<style scoped>

</style>