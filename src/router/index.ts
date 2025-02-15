import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/',
      name: 'Homepage',
      component: () => import('../views/Homepage.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/editNote/:id',
      name: 'edit-notes',
      component: () => import('../views/ViewEditNote.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useUserStore()

  if (to.name !== 'login' && to.meta.requiresAuth && !isAuthenticated) next({ name: 'login' })
  else next()
})

export default router
