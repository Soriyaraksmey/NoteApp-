<template>
  <AddEditNote
    v-model="editNoteContent"
    ref="addEditNoteRef"
    label="Edit Notes 📝"
    @validationError="handleValidationError"
  >
    <template #buttons>
      <div class="space-x-3">
        <RouterLink to="/"><button class="btn-secondary">Cancel</button></RouterLink>
        <button class="btn-primary" :disabled="!editNoteContent.title" @click="updateNote">
          Save Changes
        </button>
      </div>
    </template>
  </AddEditNote>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import AddEditNote from '@/components/AddEditNote.vue'
import { useNoteStore } from '@/stores/NoteStore'

const route = useRoute()
const router = useRouter()
const storeNotes = useNoteStore()
const editNoteContent = ref({
  title: '',
  content: '',
})
// const test = storeNotes.getNoteContent(route.params.id)

const isFormInvalid = ref(false)

const handleValidationError = (hasError: boolean) => {
  isFormInvalid.value = hasError
}

editNoteContent.value = storeNotes.getNoteContent(route.params.id)
const updateNote = () => {
  if (!isFormInvalid.value) {
    const editNoteObject = {
      title: editNoteContent.value.title,
      content: editNoteContent.value.content,
    }

    storeNotes.UpdateNote(route.params.id, editNoteObject)

    router.push({ path: '/', name: 'Homepage' })
  } else {
    console.error('Title is required')
  }
}
</script>
