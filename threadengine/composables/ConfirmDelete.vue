<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-zinc-900 p-6 rounded-lg max-w-sm w-full shadow-xl text-white">
      <h2 class="text-lg font-bold mb-4">Delete File</h2>
      <p>Are you sure you want to delete <strong>{{ data?.name }}</strong>?</p>
      <div class="mt-6 flex justify-end gap-3">
        <button @click="close" class="bg-zinc-700 px-4 py-2 rounded">Cancel</button>
        <button @click="confirm" class="bg-red-600 px-4 py-2 rounded text-white">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ isOpen: Boolean, data: Object })
const emit = defineEmits(['close', 'confirm'])

const close = () => emit('close')
const confirm = () => emit('confirm')
</script>
