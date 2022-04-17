<template>
  <el-container>
    <el-tree :data="docs" :props="defaultProps" @node-click="handleNodeClick" highlight-current="true" />
  </el-container>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import request from "@/util/request";
import {Tools} from "@/util/Tools";

const docs=ref()//文档列表
const defaultProps = {
  children: 'children',
  label: 'name',
}//默认配置
const getDoc = () => {
  request.get("doc?ebookId=1515252213008568322").then((response)=>{
    docs.value=response.data
    docs.value=Tools.toTree(docs.value,"0")//转换为树形结构
  })
}//获取文档列表
const handleNodeClick = (data: any) => {
  console.log(data.id)
}//节点点击事件



onMounted(()=>{
  getDoc()

})
</script>

<style scoped>

</style>