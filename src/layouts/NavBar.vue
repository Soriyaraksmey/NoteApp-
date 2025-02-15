<template>
  <nav
    class="max-w-screen sticky top-0 p-4 bg-violet-500 flex justify-between items-center flex-wrap space-y-3 md:space-y-0 md:justify-between sm:justify-between"
  >
    <div class="logo">
      <RouterLink to="/">
        <h1 class="text-2xl text-white font-semibold">YaaNotes ☀️</h1>
      </RouterLink>
    </div>
    <ul>
      <RouterLink to="/profile">
        <div
          class="flex items-center space-x-2 border border-gray-400 px-4 py-1 rounded-full bg-white hover:cursor-pointer hover:scale-105 transition-all"
        >
          <span class="text-gray-900">{{ ShoulddisplayName }}</span>
        </div>
      </RouterLink>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'

const userAuth = useUserStore()
const { username } = storeToRefs(userAuth)

console.log('🚀 ~ username:', username)

const ShoulddisplayName = computed(() => {
  return userAuth.user?.username || 'NA'
})
</script>
