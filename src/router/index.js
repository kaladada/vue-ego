import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from '../views/Product/index.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Layout',
  component: Layout,
  children: [{
    path: '/',
    name: 'Product',
    component: Product,
    meta: {
      isLogin: true
    }
  }, {
    path: '/params',
    name: 'Params',
    component: () => import('../views/Params/index.vue'),
    meta: {
      isLogin: true
    }
  }, {
    path: '/content',
    name: 'Content',
    component: () => import('../views/Content/index.vue'),
    meta: {
      isLogin: true
    }
  }]
}, {
  path: '/ucenter',
  name: 'UCenter',
  component: () => import('../views/UCenter.vue'),
  meta: {
    isLogin: true
  }
}, {
  path: '/login',
  name: 'Login',
  component: () => import('../views/Login.vue'),
  
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router