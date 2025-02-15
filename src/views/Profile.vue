<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore' //
const userStore = useUserStore()
</script>

<template>
  <div class="flex items-center justify-center bg-gray-100 rounded-2xl">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Profile👤</h2>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">ID</label>
        <div class="mt-1 p-2 bg-gray-50 rounded-md">
          <p class="text-lg text-gray-900">{{ userStore.user?.id || 'N/A' }}</p>
        </div>
      </div>
      <!-- Display user name -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Username</label>
        <div class="mt-1 p-2 bg-gray-50 rounded-md">
          <p class="text-lg text-gray-900">{{ userStore.user?.username || 'N/A' }}</p>
        </div>
      </div>

      <!-- Display user ID -->

      <!-- Optional: Add a logout button -->
      <button
        @click="userStore.logout"
        class="w-full bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  </div>
</template>
