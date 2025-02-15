<template>
  <div>
    <label for="about" class="block text-lg font-semibold leading-6 text-gray-900">{{
      label
    }}</label>
    <div class="mt-2">
      <input
        class="block w-full p-3 bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
        id="username"
        type="text"
        ref="titleREf"
        placeholder="Title"
        v-model="note.title"
      />
      <p v-if="validationError" class="text-red-500 text-sm mt-1">{{ validationError }}</p>
    </div>
    <div class="mt-2">
      <textarea
        v-model="note.content"
        rows="3"
        placeholder="Content"
        class="block w-full p-3 bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
      ></textarea>
    </div>
    <div class="flex justify-between mt-3 items-center">
      <p class="text-sm leading-6 text-gray-600">Write a things that on your mind.</p>
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { z } from 'zod'

// emit
const emit = defineEmits(['update:modelValue', 'validationError'])

// Define the schema for validation
const noteSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().optional(),
})

const validationError = ref<string | null>(null)

const validateTitle = () => {
  const result = noteSchema.safeParse(note.value)
  if (!result.success) {
    validationError.value = result.error.errors[0].message // Set validation error message
    emit('validationError', true)
  } else {
    validationError.value = null
    emit('validationError', false)
  }
}
// props
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    defautl: { title: '', content: '' },
  },
  label: {
    type: String,
    default: 'Notes 📝',
  },
})

// Local state to sync with `modelValue`
const note = ref({ ...props.modelValue })

watch(
  () => note.value,
  (newVal) => {
    emit('update:modelValue', newVal)
    validateTitle()
  },
  { deep: true },
)
// focus textarea

const titleREf = ref(null)

const focusTextarea = () => {
  titleREf.value.focus()
}

defineExpose({
  focusTextarea,
})
</script>
