<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/layouts/NavBar.vue'
import { useUserStore } from '@/stores/UserStore'
import { onMounted } from 'vue'
const userAuth = useUserStore()

onMounted(() => {
  userAuth.init()
})
</script>

<template>
  <NavBar />
  <div class="container mx-auto my-10 px-10 lg:max-w-4xl">
    <RouterView />
  </div>
</template>
