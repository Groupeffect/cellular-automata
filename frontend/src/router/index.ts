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
      children: [
        {
          path: '/edit',
          name: 'Editor',
          // @ts-ignore
          component: () => import('@/components/automata/EditorCanvas.vue')
        }
      ]
    }
  ]
})

export default router
