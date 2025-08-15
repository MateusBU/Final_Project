/* eslint-env browser */

import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/MainHome.vue'
import AdminPages from '@/components/admin/AdminPages.vue'
import ArticleByCategory from '@/components/article/ArticleByCategory.vue'
import ArticleById from '@/components/article/ArticleById.vue'
import authUser from '@/components/auth/authUser.vue'

import { userKey } from '@/global'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'AdminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true}
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

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey);
    const user = JSON.parse(json);

    if(to.path === '/auth' && user){
        next({path: '/'});
    }
    else if(to.matched.some(record => record.meta.requiresAdmin)){
        user && user.admin ? next() : next({path: '/'});
    }
    else{
        next();
    }
})

export default router
