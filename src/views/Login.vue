<template>
  <form @submit.prevent="handleSubmit" class="max-w-2xl mx-auto p-10 bg-white rounded-md shadow-md">
    <h1 class="text-center mb-6 text-2xl font-semibold font-mono">Welcome to Notes 🌱☀️</h1>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> UserName </label>
      <input
        v-model="formData.username"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        id="email"
        type="text"
        placeholder="username"
      />
      <span
        v-if="errors.username"
        class="animate-pulse text-red-500 p-2 text-sm font-mono transition-all"
      >
        {{ errors.username[0] }}
      </span>
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password"> Password </label>
      <input
        v-model="formData.password"
        class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
        id="password"
        type="password"
        placeholder="remember your password?"
        autocomplete="on"
      />
      <span
        v-if="errors.password"
        class="animate-pulse text-red-500 p-2 text-sm font-mono transition-all"
      >
        {{ errors.password[0] }}
      </span>
    </div>
    <div class="mt-3 space-y-3">
      <button class="btn-primary w-full" type="submits">Sign In</button>
    </div>
  </form>
  <!-- Note for users -->
  <div class="mt-6 text-center text-sm text-gray-600">
    <p>
      Note: There is no "create user" functionality. Make sure you run the script insert user in
      database first Use the following existing users:
    </p>
    <ul class="list-disc list-inside mt-2">
      <li><strong>Admin</strong> - Username: <code>admin</code>, Password: <code>123</code></li>
      <li><strong>User 1</strong> - Username: <code>user1</code>, Password: <code>123</code></li>
      <li><strong>User 2</strong> - Username: <code>user2</code>, Password: <code>123</code></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

const formData = ref({
  username: '',
  password: '',
})

const router = useRouter()
const userStore = useUserStore()

const errors = ref<Record<string, string>>({})

// Handle form
const handleSubmit = async () => {
  console.log('🚀 ~ Click ~ error:')
  try {
    loginSchema.parse(formData.value)
    errors.value = {} // Clear errors if validation passes

    const success = await userStore.login(formData.value.username, formData.value.password)

    if (success) {
      router.push('/') //push to home page
      console.log('Login successful!')
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.formErrors.fieldErrors
    }
  }
}
</script>
