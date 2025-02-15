<template>
  <div
    ref="target"
    class="content relative max-w-md m-auto bg-white p-10 text-center space-y-7 rounded-md"
  >
    <span
      class="absolute top-0 right-0 p-3 bg-gray-200 rounded-md text-red-700 cursor-pointer"
      @click.prevent="$emit('close')"
      >x</span
    >
    <h3 class="text-xl font-semibold text-gray-700">You Sure bro there no way back !!!</h3>
    <button class="btn-primary" @click.prevent="$emit('delete')">Yes Delete!</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['delete', 'close'])
const target = ref(null)
onClickOutside(target, (event) => emit('close'))
</script>
