<template>
  <section class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      label="New Notes 📝"
      @validationError="handleValidationError"
    >
      <template #buttons>
        <button class="btn-primary" :disabled="!newNote.title" @click="addNote">Post</button>
      </template>
    </AddEditNote>
    <div class="mt-4 flex gap-2">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search notes by title..."
        class="block w-full p-3 bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
      />
      <button class="btn-secondary" @click="toggleSortOrder">
        Sort Date: {{ sortOrder === 'asc' ? 'Asc' : 'Des' }}
      </button>
    </div>
    <!--  content -->
    <div class="cards mt-10" id="notesList">
      <Note v-for="note in filteredNotes" :key="note.id" :note="note" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/NoteStore'
import AddEditNote from '@/components/AddEditNote.vue'
import Note from '@/components/Note.vue'
import { computed, onMounted, ref } from 'vue'

const newNote = ref({
  title: '',
  content: '',
})
const StoreNotes = useNoteStore()

const addEditNoteRef = ref(null)

onMounted(() => {
  StoreNotes.fetchNotes()
})

const isFormInvalid = ref(false)

const handleValidationError = (hasError: boolean) => {
  isFormInvalid.value = hasError
}

const addNote = () => {
  if (!isFormInvalid.value) {
    console.log(newNote.value)
    StoreNotes.addNote(newNote.value)

    StoreNotes.fetchNotes()

    //clear
    Object.assign(newNote.value, { title: '', content: '' })

    addEditNoteRef.value.focusTextarea()
  } else {
    console.error('Title is required')
  }
}

//serch
const searchQuery = ref('')
const filteredNotes = computed(() => {
  const filtered = StoreNotes.notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
  return filtered.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
  })
})

//sort

const sortOrder = ref<'asc' | 'desc'>('desc')

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>
