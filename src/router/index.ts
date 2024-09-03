import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../views/home.vue'
import MainLayout from '@/layouts/main-layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "main",
      component: MainLayout,
      redirect: {
        name: "home-page"
      },
      children: [
        {
          name: 'home',
          path: "/",
          component: () => import("@/views/home.vue")
        },
        {
          path: '/convert',
          name: 'convert',
          component: () => import('../views/convert.vue')
        }
      ]
    },

  ]
})

export default router
