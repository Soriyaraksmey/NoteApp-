<template>
  <Transition name="bounce">
    <div class="bg-white p-4 space-y-3 rounded-md shadow-sm my-4">
      <div class="flex flex-col">
        <p class="font-mono text-purple-600">
          {{ note.title }}
          <span v-if="note.edited" class="bg-gray-300 p-1 text-gray-600 rounded-sm">edited</span>
        </p>
        <div class="font-mono text-gray-400 mt-2">
          {{ note.content }}
        </div>
        <div class="font-mono text-gray-300 mt-2 flex justify-between items-center">
          <p>{{ datePosted }}</p>
          <p>Created By: {{ note.createdUser }}</p>
        </div>
      </div>
      <hr />
      <div class="flex space-x-3 items-center">
        <RouterLink :to="`/editNote/${note.id}`">
          <button class="btn-primary">Edit</button>
        </RouterLink>
        <button
          v-if="note.createdUser === storeuser.user.username"
          class="btn-danger"
          @click.prevent="isOpen = true"
        >
          Delete
        </button>
      </div>
      <Teleport to="body">
        <div
          class="modal fixed h-screen min-w-full z-99 top-0 overflow-y-hidden no-scrollbar"
          v-if="isOpen"
        >
          <div class="flex justify-center items-center bg-black-rgba min-h-full">
            <Modal @delete="handleDeleteClick" @close="isOpen = false" />
          </div>
        </div>
      </Teleport>
    </div>
  </Transition>
</template>

<script setup>
// import
import { computed, ref, Transition } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'
import { useNoteStore } from '@/stores/NoteStore'
import { useUserStore } from '@/stores/UserStore'
import Modal from '../modal/index.vue'

const StoreNotes = useNoteStore()
const storeuser = useUserStore(0)
const isOpen = ref(false)

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
})

const characterLength = computed(() => {
  const charactertext = props.note?.content?.length > 1 ? 'characters' : 'character'
  return `${props.note.content?.length}${charactertext}`
})

const datePosted = computed(() => {
  return useDateFormat(props.note?.CreatedDate?.toDate(), 'YYYY-MM-DD HH:mma').value
})

//delete
const handleDeleteClick = () => {
  StoreNotes.deleteNote(props.note.id)
  isOpen.value = false
}
</script>

<style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
