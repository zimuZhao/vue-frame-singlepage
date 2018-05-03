import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = () => import('@/views/index.vue')
const Another = () => import('@/views/another.vue')

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/index',
    },
    {
      path: '/index',
      component: Index,
      name: 'index',
    },
    {
      path: '/another',
      component: Another,
      name: 'another',
    },
  ],
})

export default router
