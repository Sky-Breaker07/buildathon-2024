import { createRouter, createWebHistory } from 'vue-router'
import RegisterSuperAdmin from '../components/RegisterSuperAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: RegisterSuperAdmin
    }
    // You can add more routes here as needed
  ]
})

export default router
