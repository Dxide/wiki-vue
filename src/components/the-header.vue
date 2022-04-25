<template>
  <el-header style="width: 100%;border-bottom: 1px solid #dcdfe6">
    <el-row>
      <el-col :span="6" style="margin: auto;text-align: left">
        Wiki电子书
      </el-col>
      <el-col :span="12">
        <el-menu
            :default-active='currentPath'
            class="el-menu-demo"
            mode="horizontal"
            :router=true
            :ellipsis=false
            style="margin: 1px auto"
        >
          <el-menu-item index="/ebook" class="item">首页</el-menu-item>
          <el-menu-item index="/admin/ebook" class="item">电子书管理</el-menu-item>
          <el-menu-item index="/admin/category" class="item">分类管理</el-menu-item>
          <el-menu-item index="/admin/user" class="item">用户管理</el-menu-item>
          <el-menu-item index="/about" class="item">关于我们</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6" style="margin:  auto;text-align: right">
        <el-button type="text" style="font-size: 18px" @click="clickLogin" v-show="!isLogin">登录</el-button>
        <el-dropdown v-show="isLogin" size="large" style="cursor: pointer;align-items: center;">
           <span style="font-size: 18px">{{userInfo.userName}}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
  <el-dialog v-model="loginDialogVisible" title="登录" width="30%">
    <el-form :model="loginForm" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password" show-password/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ElMessage.warning('个人网站，暂未开放注册！')">注册</el-button>
        <el-button @click="loginDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import router from "@/router";
import {onMounted, ref} from "vue";
import request from "@/util/request";
import {ElMessage} from "element-plus";
import {ArrowDown} from "@element-plus/icons-vue";

const currentPath=ref(router.currentRoute.value.path)//设置高亮
const loginDialogVisible=ref(false)//登录对话框
const loginForm=ref({username:'',password:''})//登录表单
const isLogin=ref(false);//是否登陆
const userInfo=ref();//用户信息
userInfo.value={userName:'user'}//设置默认值以防报错

const clickLogin=()=>{
  loginForm.value={username: '',password: ''}
  loginDialogVisible.value=true
}//登录按钮点击事件
const login=()=>{
  request.post("user/login",loginForm.value).then((response:any)=>{
    ElMessage.success(response.message)
    loginDialogVisible.value=false
    localStorage.setItem("user",JSON.stringify(response.data))//保存登录信息
    getUserInfo()
  })
}//登录点击事件
const getUserInfo=()=>{
  let user = localStorage.getItem("user");
  if (user!=null){
    isLogin.value=true
    userInfo.value=JSON.parse(user)
  }
}//获取用户信息，本地
const logout=()=>{
  isLogin.value=false
  localStorage.clear()
}//登出

onMounted(()=>{
  getUserInfo()
})
</script>

<style scoped>
.item{
  font-size: 18px;
}
</style> 