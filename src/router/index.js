import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import ButtonLayout from '@/layouts/ButtonLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ButtonLayout,
    children: [
      {
        path: '/:id',
        name: 'button',
        component: Home
      },
      {
        path: '/upload',
        name: 'upload',
        component: Upload
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
