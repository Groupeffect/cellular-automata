import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import ("@/views/AboutView.vue"),
    }
  ]
})

export default router
