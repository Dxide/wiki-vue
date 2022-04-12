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
      {path:'about',component:()=>import('@/views/About.vue')}
    ]
  }
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导出路由
export default router

