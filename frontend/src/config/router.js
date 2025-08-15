import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/MainHome.vue'
import AdminPages from '@/components/admin/AdminPages.vue'
import ArticleByCategory from '@/components/article/ArticleByCategory.vue'
import ArticleById from '@/components/article/ArticleById.vue'
import authUser from '@/components/auth/authUser.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'AdminPages',
    path: '/admin',
    component: AdminPages
  },
  {
    name: 'articleByCategory',
    path: '/categories/:id/articles',
    component: ArticleByCategory
  },
  {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
  },
  {
    name: 'auth',
    path: '/auth',
    component: authUser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
