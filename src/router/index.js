import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/tokenUtils'
import { useStaffStore } from '../stores/staff-management'
import ProtectedLayout from '../layouts/ProtectedLayout.vue'
import RegisterPatient from '@/views/Patients/Him/RegisterPatient.vue'
import AllPatients from '@/views/Patients/Him/AllPatients.vue'

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
    meta: { requiresAuth: true, layout: ProtectedLayout }
  },
  {
    path: '/setup',
    name: 'orgSetup',
    component: () => import('@/views/OrgSetup.vue'),
    meta: { requiresAuth: true, requiresSuperAdmin: true, layout: ProtectedLayout }
  },
  {
    path: '/admin-setup',
    name: 'adminSetup',
    component: () => import('@/views/AdminSetup.vue'),
    meta: { 
      requiresAuth: true, 
      requiresAdminHCP: true, 
      layout: ProtectedLayout 
    }
  },
  {
    path: '/patient/register',
    name: 'registerPatient',
    component: RegisterPatient,
    meta: { 
      requiresAuth: true, 
      requiresHIM: true, 
      layout: ProtectedLayout 
    }
  },
  {
    path: '/patients',
    name: 'allPatients',
    component: AllPatients,
    meta: { 
      requiresAuth: true, 
      requiresHIM: true, 
      layout: ProtectedLayout 
    }
  },
  {
    path: '/patients/:hospital_id',
    name: 'PatientDetails',
    component: () => import('@/views/Patients/Him/PatientDetails.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/hcp/all-patients',
    name: 'AllPatientsHCP',
    component: () => import('@/views/Patients/HCP/AllPatients.vue'),
    meta: { 
      requiresAuth: true, 
      requiresAdminHCP: true, 
      layout: ProtectedLayout 
    }
  },
  {
    path: '/hcp/patient/:hospital_id',
    name: 'PatientDetailsHCP',
    component: () => import('@/views/Patients/HCP/PatientDetails.vue'),
    meta: { requiresAuth: true, requiresAdminHCP: true }
  },
  {
    path: '/hcp/assigned-patients',
    name: 'AssignedPatients',
    component: () => import('@/views/Patients/HCP/AssignedPatients.vue'),
    meta: { 
      requiresAuth: true, 
      requiresHCP: true, 
      layout: ProtectedLayout 
    }
  },
  {
    path: '/hcp/assigned/:hospital_id',
    name: 'AssignedPatientDetails',
    component: () => import('@/views/Patients/HCP/AssignedPatientDetails.vue'),
    meta: { 
      requiresAuth: true, 
      requiresHCP: true, 
      layout: ProtectedLayout 
    }
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
  const requiresAdminHCP = to.matched.some(record => record.meta.requiresAdminHCP)
  const staffStore = useStaffStore()

  if (requiresAuth && !token) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (requiresAuth) {
    if (!staffStore.currentUser) {
      try {
        await staffStore.fetchCurrentUser()
        if (requiresAdminHCP && (!staffStore.currentUser.isAdmin || staffStore.currentUser.role !== 'HealthCareProfessional')) {
          next({ name: 'staffDashboard' })
        } else {
          next()
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error)
        next({ name: 'login', query: { redirect: to.fullPath } })
      }
    } else {
      if (requiresAdminHCP && (!staffStore.currentUser.isAdmin || staffStore.currentUser.role !== 'HealthCareProfessional')) {
        next({ name: 'staffDashboard' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
