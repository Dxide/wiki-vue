<template>
  <el-container>
    <el-aside width="200px" style="border-right: 1px solid lightgray">
      <div style="margin-top: 10px;margin-bottom: 10px;text-align: center">
        <el-button type="primary" @click="getDoc">刷新</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <el-tree :data="docs" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"
               :default-expand-all="true"/>
    </el-aside>
    <el-main>
      <el-form :model="docForm" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="docForm.name"></el-input>
        </el-form-item>
        <el-form-item label="父文档">
          <el-tree-select v-if="isReloadData" v-model="docForm.parent" :data="treeSelect" :props="defaultProps" check-strictly
                          :default-expand-all="true"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="docForm.sort"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" v-show="booleanSubmit">提交</el-button>
          <el-button type="primary" @click="submit" v-show="!booleanSubmit">保存</el-button>
          <el-button type="danger" @click="deleteDoc" v-show="!booleanSubmit">删除</el-button>
        </el-form-item>
      </el-form>
    </el-main>
     </el-container>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import request from "@/util/request";
import {Tools} from "@/util/Tools";
import {useRoute} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";

const theRoot=[{
  id:"0",
  parent:"0",
  name:"无",
  children: []
}]//树根
const treeSelect=ref()//树形选择器的数据
const docs=ref()//文档列表
const defaultProps = {
  children: 'children',
  label: 'name',
  value:'id',
  disabled:'disabled',
  emitPath:false,
}//默认配置
const ebookId=useRoute().params.ebookId//ebookId
const docForm=ref({ebookId:ebookId,sort:0,id:''})//doc表单
const booleanSubmit=ref(true)//当前模式，true新增，false修改
const isReloadData=ref(true)//局部刷新组件
let ids: string[]=[]//要删除的ids

const getDoc = () => {
  request.get("doc?ebookId="+ebookId).then((response)=>{
    docs.value=response.data
    docs.value=Tools.toTree(docs.value,"0")//转换为树形结构
    treeSelect.value=Tools.copy(theRoot).concat(Tools.copy(docs.value))//添加无选项
    if (!Tools.isEmpty(docForm.value.id)){
      setDisable(treeSelect.value,docForm.value.id)
      reloadData()
    }
    if (booleanSubmit) resetDocForm()
  })
}//获取文档列表
const handleNodeClick = (data: any) => {
  booleanSubmit.value=false
  ids=[]//清空删除的选项
  docForm.value=Tools.copy(data)
  treeSelect.value=theRoot.concat(Tools.copy(docs.value))//重置treeSelect数据
  setDisable(treeSelect.value,data.id)
}//节点点击事件
const submit=()=>{
  request.post("doc/admin",docForm.value).then((response:any)=>{
    ElMessage.success(response.message)
    getDoc()
  })
}//提交
const deleteDoc=()=>{
  ElMessageBox.confirm(
      '删除后不可恢复，且其子文档也会被删除!',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
        request.delete("doc/admin/"+ids).then((response:any)=>{
          ElMessage.success(response.message)
          add()
          getDoc()
        })
      })
}//删除文档
const setDisable=(treeSelectData:any,id:string)=>{
  //遍历某一层节点
  for (let i=0;i<treeSelectData.length;i++){
    const node=treeSelectData[i]
    if (node.id==id){//发现当前节点与与传入节点一样，禁用此选项
      ids.push(id)
      node.disabled=true
      const children=node.children
      if (!Tools.isEmpty(children)){
        for (let j=0;j<children.length;j++){//将其子节点禁用
          setDisable(children,children[j].id)
        }
      }
      break
    }else {
      const children=node.children
      if (!Tools.isEmpty(children)){
          setDisable(children,id)
      }
    }
  }
}//设置不可用选项
const add=()=>{
  booleanSubmit.value=true
  resetDocForm()
  treeSelect.value=Tools.copy(theRoot).concat(Tools.copy(docs.value))//添加无选项
}//添加按钮点击事件
const reloadData = () => {
  isReloadData.value=false
  nextTick(()=>{
    isReloadData.value=true
  })
}//局部刷新组件
const resetDocForm=()=>{
  docForm.value={ebookId:ebookId,sort:0,id:''}
}//重置DOC表单

onMounted(()=>{
  getDoc()
})
</script>

<style scoped>

</style>