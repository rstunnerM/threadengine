<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-[340px]">
      <h2 class="text-xl font-bold mb-2">🔄 Update Ready</h2>
      <p class="text-sm opacity-80 mb-4">A new version has been downloaded. Restart to apply the update?</p>
      <div class="flex justify-end gap-2">
        <button @click="cancel" class="px-4 py-2 rounded bg-gray-300 dark:bg-zinc-700 hover:opacity-80">Later</button>
        <button @click="restart" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Restart Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const show = () => (visible.value = true)
const cancel = () => (visible.value = false)
const restart = () => {
  window.electron?.restartApp?.() || window.close()
}

defineExpose({ show })
</script>
