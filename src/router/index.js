import { createRouter, createWebHashHistory } from 'vue-router'

// 1. នាំចូល Login View
import LoginView from '../views/auth/LoginView.vue'

// 2. នាំចូល Layouts និង Views សម្រាប់ Owner
import OwnerLayout from '../layouts/OwnerLayout.vue'
import OwnerOverview from '../views/owner/Overview.vue'
import AdminManagement from '../views/owner/AdminManagement.vue'
import AdminDetails from '../views/owner/AdminDetails.vue' // <--- បន្ថែមថ្មី (នាំចូល AdminDetails)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // --- Public Routes (ផ្លូវសាធារណៈ) ---
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

    // --- Owner Routes (ផ្លូវសម្រាប់ Owner) ---
    {
      path: '/owner',
      component: OwnerLayout, // ប្រើ Layout នេះជាមេ
      meta: { requiresAuth: true, role: 'owner' },
      children: [
        {
          // ពេលចូល /owner ឱ្យរត់ទៅ /owner/overview ភ្លាម
          path: '',
          redirect: '/owner/overview'
        },
        {
          // ផ្លូវពេញ: /owner/overview
          path: 'overview',
          name: 'owner-overview',
          component: OwnerOverview,
          meta: { title: 'ទិដ្ឋភាពទូទៅ' } 
        },
        {
          // ផ្លូវពេញ: /owner/admin-management
          path: 'admin-management',
          name: 'admin-management',
          component: AdminManagement,
          meta: { title: 'គ្រប់គ្រង Admin' }
        },
        {
          // <--- Route ថ្មីសម្រាប់មើលព័ត៌មានលម្អិត Admin
          // ផ្លូវពេញ: /owner/admin-details/{id}
          path: 'admin-details/:id', 
          name: 'admin-details',
          component: AdminDetails,
          meta: { title: 'ព័ត៌មានលម្អិត Admin' }
        }
      ]
    },

    // --- Catch-all Route (ការពារ Error 404) ---
    // បើរកផ្លូវមិនឃើញ ឱ្យរត់ទៅ Login វិញ
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

export default router