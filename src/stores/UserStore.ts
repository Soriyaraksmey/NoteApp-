import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/utils/Axios'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('User', () => {
  const user = ref(null)
  const isAuthenticated = ref(localStorage.getItem('token') ? true : false)

  const router = useRouter()

  const init = () => {
    if (localStorage.getItem('token')) {
      user.value = JSON.parse(localStorage.getItem('user'))
      router.push('/')
    } else {
      user.value = null
      router.replace('/login')
    }
  }
  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/login', { username, password })

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      user.value = response.user
      isAuthenticated.value = true

      return true // Login successful
    } catch (error) {
      console.error('Login failed:', error)
      return false // Login failed
    }
  }
  const logout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return { user, isAuthenticated, login, init, logout }
})
