<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-zinc-900 p-6 rounded-lg w-full max-w-md text-white">
        <h2 class="text-lg font-semibold mb-4">New File</h2>
        <input
          v-model="name"
          class="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          placeholder="Enter filename"
        />
        <div class="mt-4 flex justify-end gap-2">
          <button @click="close" class="px-4 py-2 bg-zinc-700 rounded">Cancel</button>
          <button @click="submit" class="px-4 py-2 bg-green-600 rounded text-white">Create</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({ isOpen: Boolean, data: Object })
  const emit = defineEmits(['close', 'submit'])
  
  const name = ref('')
  
  const close = () => emit('close')
  const submit = () => emit('submit', name.value)
  </script>
  