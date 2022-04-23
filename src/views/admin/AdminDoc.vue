<template>
  <el-container>
    <el-aside width="200px" style="border-right: 1px solid lightgray">
      <el-scrollbar height="100%">
        <div style="margin-top: 10px;margin-bottom: 10px;text-align: center">
          <el-button type="primary" @click="getDoc">刷新</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </div>
        <el-tree :data="docs" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"
                 :default-expand-all="true" />
      </el-scrollbar>

    </el-aside>
    <el-main>
        <div style="display: flex;flex-flow: column;height: 100%">
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
              <el-button type="primary" @click="clickShowDrawer" >内容预览</el-button>
            </el-form-item>
          </el-form>

          <Toolbar
              style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;border-right: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              mode="default"/>
          <Editor
              style="height: 200px;flex:auto;border: 1px solid #ccc"
              v-model="valueHtml"
              mode="default"
              :defaultConfig="editorConfig"
              @onCreated="handleCreated"/>
        </div>
    </el-main>
     </el-container>
  <el-drawer
      v-model="drawerVisible"
      title="内容预览"
      size="70%"
      direction="ltr">
    <div v-html="valueHtml" class="editor-content-view"></div>
  </el-drawer>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {nextTick, onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
import request from "@/util/request";
import {Tools} from "@/util/Tools";
import {useRoute} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import "prismjs/themes/prism.css"//
import Prismjs from "prismjs";//

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
const docForm=ref({ebookId:ebookId,sort:0,id:'',content:''})//doc表单
const booleanSubmit=ref(true)//当前模式，true新增，false修改
const isReloadData=ref(true)//局部刷新组件
let ids: string[]=[]//要删除的ids
let names:string[]=[]//要删除的文档名称
const drawerVisible=ref(false)//内容预览是否可见

const getDoc = () => {
  request.get("doc?ebookId="+ebookId).then((response)=>{
    docs.value=response.data
    docs.value=Tools.toTree(docs.value,"0")//转换为树形结构
    treeSelect.value=Tools.copy(theRoot).concat(Tools.copy(docs.value))//添加无选项
    if (!Tools.isEmpty(docForm.value.id)){
      setDisable(treeSelect.value,docForm.value.id)
      reloadData()
    }
    if (booleanSubmit.value) resetDocForm()
  })
}//获取文档列表
const handleNodeClick = (data: any) => {
  booleanSubmit.value=false
  ids=[]//清空删除的选项
  names=[]
  docForm.value=Tools.copy(data)
  treeSelect.value=theRoot.concat(Tools.copy(docs.value))//重置treeSelect数据
  setDisable(treeSelect.value,data.id)
  request.get("content/"+data.id).then((response)=>{
    valueHtml.value=response.data.content
  })
}//节点点击事件
const submit=()=>{
  docForm.value.content=valueHtml.value
  request.post("doc/admin",docForm.value).then((response:any)=>{
    ElMessage.success(response.message)
    getDoc()
  })
}//提交
const deleteDoc=()=>{
  ElMessageBox.confirm(
      "删除后不可恢复，【"+names+"】都会被删除!",
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
      names.push(node.name)
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
  valueHtml.value=""
  treeSelect.value=Tools.copy(theRoot).concat(Tools.copy(docs.value))//添加无选项
}//添加按钮点击事件
const reloadData = () => {
  isReloadData.value=false
  nextTick(()=>{
    isReloadData.value=true
  })
}//局部刷新组件
const resetDocForm=()=>{
  docForm.value={ebookId:ebookId,sort:0,id:'',content: ''}
}//重置DOC表单
const clickShowDrawer=()=>{
  drawerVisible.value=true
  nextTick(()=>{
    Prismjs.highlightAll()
  })
}//抽屉的点击事件

//Editor
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
const toolbarConfig = {excludeKeys: 'fullScreen'}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const editorConfig:any = {MENU_CONF: {}}
editorConfig.MENU_CONF['codeSelectLang'] = {
  codeLangs: [
    {text: "Java", value: "java"},
    {text: "Typescript", value: "typescript"},
    {text: "Javascript", value: "javascript"},
    {text: "SQL", value: "sql"},
    {text: "Bash", value: "bash"},
    {text: "Yml", value: "yml"},
    {text: "CSS", value: "css"},
    {text: "HTML", value: "html"},
    {text: "XML", value: "xml"},
    {text: "C", value: "c"},
    {text: "C++", value: "cpp"},
    {text: "Python", value: "python"},
    {text: "Markdown", value: "markdown"}
  ]
} // 代码语言
const handleCreated = (editor:any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log(editor.getMenuConfig('codeSelectLang').codeLangs)
}
//Editor


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
.editor-content-view p,
.editor-content-view li {
  white-space: pre-wrap; /* 保留空格 */
}

.editor-content-view blockquote {
  border-left: 8px solid #d0e5f2;
  padding: 10px 10px;
  margin: 10px 0;
  background-color: #f1f1f1;
}

.editor-content-view pre>code {
  display: block;
  padding: 10px;
}

.editor-content-view table {
  border-collapse: collapse;
}
.editor-content-view td,
.editor-content-view th {
  border: 1px solid #ccc;
  min-width: 50px;
  height: 20px;
}
.editor-content-view th {
  background-color: #f1f1f1;
}

.editor-content-view ul,
.editor-content-view ol {
  padding-left: 20px;
}

.editor-content-view input[type="checkbox"] {
  margin-right: 5px;
}
</style>