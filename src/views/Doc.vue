<template>
  <el-container>
    <el-affix style="border-right: 1px solid lightgray">
    <el-aside width="200px" >
      <el-scrollbar height="100%">
        <el-tree :data="docs" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"
                 :default-expand-all="true" />
      </el-scrollbar>
    </el-aside>
    </el-affix>
    <el-main>
      <div v-html="valueHtml" id="innerHtml" style="width: 100%;"></div>
    </el-main>
  </el-container>
  <el-backtop />
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import request from "@/util/request";
import {Tools} from "@/util/Tools";
import {useRoute} from "vue-router";
import "prismjs/themes/prism.css"//
import Prismjs from "prismjs";//

const docs=ref()//文档列表
const defaultProps = {
  children: 'children',
  label: 'name',
  value:'id',
  emitPath:false,
}//默认配置
const ebookId=useRoute().params.ebookId//ebookId
const valueHtml=ref()

const getDoc = () => {
  request.get("doc?ebookId="+ebookId).then((response)=>{
    docs.value=response.data
    docs.value=Tools.toTree(docs.value,"0")//转换为树形结构
    handleNodeClick(docs.value[0])
  })
}//获取文档列表
const handleNodeClick = (data: any) => {
  request.get("content/"+data.id).then((response)=>{
    valueHtml.value=response.data.content
    nextTick(()=>{
      Prismjs.highlightAll()
      window.scrollTo(0,0)//回到顶部
    })
  })

}//节点点击事件


onMounted(()=>{
  getDoc()

})
</script>

<style>

.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-tree>.el-tree-node {
  min-width: 100%;
  display:inline-block;
}

</style>