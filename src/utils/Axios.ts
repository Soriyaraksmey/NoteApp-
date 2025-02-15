import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}`
// Create a configured Axios instance
console.log('🚀 ~ API_URL:', API_URL)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

// Request interceptor: Add authorization token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor: Handle success and error responses
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data // Return only the data part of the response
  },
  (error) => {
    // Handle errors
    if (error.response) {
      const { status, data } = error.response

      // Handle unauthorized (401) errors
      if (status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }

      // Return a consistent error format
      return Promise.reject({
        status,
        message: 'You dont have permission to accesss this',
      })
    } else {
      // Handle other errors
      return Promise.reject({
        status: null,
        message: 'An unexpected error occurred',
      })
    }
  },
)

// Export the configured Axios instance
export default api
