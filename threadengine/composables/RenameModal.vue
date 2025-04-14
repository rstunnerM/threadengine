<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-xl">
      <h2 class="text-white text-lg font-semibold mb-4">Rename</h2>
      <input
        v-model="newName"
        type="text"
        class="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
        placeholder="New name"
      />
      <div class="mt-4 flex justify-end gap-2">
        <button @click="close" class="px-4 py-2 bg-zinc-700 text-white rounded">Cancel</button>
        <button @click="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Rename</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ isOpen: Boolean, data: Object })
const emit = defineEmits(['close', 'submit'])

const newName = ref('')

watch(() => props.data, (val) => {
  newName.value = val?.current || ''
})

const close = () => emit('close')
const submit = () => emit('submit', newName.value)
</script>
