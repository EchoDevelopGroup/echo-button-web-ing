import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Config from '../views/Config.vue'
import Links from '../views/Links.vue'
import ButtonLayout from '@/layouts/ButtonLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ButtonLayout,
    children: [
      {
        path: '/b/:id',
        name: 'button',
        component: Home
      },
      {
        path: '/config',
        name: 'config',
        component: Config
      },
      {
        path: '/links',
        name: 'links',
        component: Links
      },
      {
        path: '/upload',
        name: 'upload',
        component: () => import(/* webpackChunkName: "upload" */ '../views/Upload.vue')
      },
      {
        path: '/audit',
        name: 'audit',
        component: () => import(/* webpackChunkName: "audit" */ '../views/Audit.vue')
      },
      {
        path: '*',
        redirect: '/b/20f6e01d'
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
