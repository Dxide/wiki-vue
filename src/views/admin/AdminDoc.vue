<template>
  <el-container>
    <el-aside width="200px" style="border-right: 1px solid lightgray">
      <div style="margin-top: 10px;margin-bottom: 10px;text-align: center">
        <el-button type="primary" @click="getDoc">刷新</el-button>
        <el-button type="primary" >新增</el-button>
      </div>
      <el-tree :data="docs" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true" />
    </el-aside>
    <el-main>
      <el-form :model="docForm" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="docForm.name"></el-input>
        </el-form-item>
        <el-form-item label="父文档">
          <el-tree-select v-model="docForm.parent" :data="theRoot" :props="defaultProps" check-strictly />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="docForm.sort"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
     </el-container>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import request from "@/util/request";
import {Tools} from "@/util/Tools";
import {useRoute} from "vue-router";

const theRoot=ref([{
  id:"0",
  parent:"0",
  name:"无",
}])//树根
const docs=ref()//文档列表
const defaultProps = {
  children: 'children',
  label: 'name',
  value:'id',
  emitPath:false
}//默认配置
const ebookId=useRoute().params.ebookId//ebookId
const docForm=ref({ebookId:ebookId,sort:0})//doc表单

const getDoc = () => {
  request.get("doc?ebookId="+ebookId).then((response)=>{
    docs.value=response.data
    docs.value=Tools.toTree(docs.value,"0")//转换为树形结构
    theRoot.value=theRoot.value.concat(docs.value)
  })
}//获取文档列表
const handleNodeClick = (data: any) => {
  console.log(data.id)
}//节点点击事件
const submit=()=>{
  console.log(docForm.value)
}//提交

onMounted(()=>{
  getDoc()
})
</script>

<style scoped>

</style>