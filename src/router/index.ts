import { createRouter,  createWebHistory ,RouteRecordRaw} from 'vue-router'
import Home from '@/views/Home.vue'
// 下面使用了es6的对象增强写法，命名必须是routes
const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    redirect:'ebook',
    children:[
      {path:'ebook',component:()=>import('@/views/Ebook.vue')},
      {path:'about',component:()=>import('@/views/About.vue')},
      {path:'admin/ebook',component:()=>import('@/views/admin/AdminEbook.vue')},
      {path:'admin/category',component:()=>import('@/views/admin/AdminCategory.vue')},
      {path:'admin/doc/:ebookId',component:()=>import('@/views/admin/AdminDoc.vue')},
    ]
  },
  //404NotFound界面
  { path: '/:pathMatch(.*)*', component: ()=>import('@/views/NotFound.vue') }
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导出路由
export default router

