import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/tokenUtils'
import { useStaffStore } from '../stores/staff-management'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterOrg.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/dashboard',
    name: 'staffDashboard',
    component: () => import('@/views/StaffDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/setup',
    name: 'orgSetup',
    component: () => import('@/views/OrgSetup.vue'),
    meta: { requiresAuth: true, requiresSuperAdmin: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const staffStore = useStaffStore()

  if (requiresAuth && !token) {
    // Redirect to login if authentication is required but no token is present
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (requiresAuth) {
    // If the route requires auth and we have a token, ensure we have the current user
    if (!staffStore.currentUser) {
      try {
        await staffStore.fetchCurrentUser()
        next()
      } catch (error) {
        console.error('Failed to fetch current user:', error)
        // If fetching the user fails, redirect to login
        next({ name: 'login', query: { redirect: to.fullPath } })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
