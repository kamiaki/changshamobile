import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/content1',
    children: [
      {
        path: 'content1',
        name: '综合监测',
        component: () => import('@/views/content1.vue')
      },
      {
        path: 'content2',
        name: '雷达预警',
        component: () => import('@/views/content2.vue')
      },
      {
        path: 'content3',
        name: '专项服务',
        component: () => import('@/views/content3.vue')
      }
    ]
  },
  {
    path: '/statistics',
    name: '统计',
    component: () => import('@/views/statistics.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
