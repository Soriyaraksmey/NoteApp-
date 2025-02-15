import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/Axios'

interface Note {
  id: string
  title: string
  content: string
}

export const useNoteStore = defineStore('noteStore', () => {
  const notes = ref<Note[]>([])

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes')
      notes.value = response
      console.log('🚀 ~ fetchNotes ~ data:', response)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  // Add a new note
  const addNote = async ({ title, content }) => {
    try {
      const data = await api.post('/notes', { title, content })
      notes.value.push(data) // Add to local state
      console.log('🚀 ~ addNote ~ data:', data)
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  // Add a new note
  const UpdateNote = async (noteId: string, { title, content }) => {
    try {
      const data = await api.put(`/notes/${noteId}`, { title, content })
      console.log('🚀 ~ UpdateNote ~ data:', data)
      return data
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  // Delete a note
  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`)
      notes.value = notes.value.filter((note) => note.id !== id)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  //getnote by id
  const getNoteContent = (id: string) => {
    const editNote = notes.value.find((note) => note.id === id)
    if (!editNote) return { title: '', content: '' }
    return { title: editNote.title, content: editNote.content }
  }

  return { notes, fetchNotes, addNote, deleteNote, getNoteContent, UpdateNote }
})
