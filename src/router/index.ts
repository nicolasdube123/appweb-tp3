import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.loadPersistedToken()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      name: 'Login'
    }
  } else if (to.name === 'Login' && authStore.isLoggedIn) {
    return {
      name: 'Home'
    }
  } else {
    return true
  }
})

export default router