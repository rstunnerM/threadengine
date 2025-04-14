<!-- /components/GenerateImageForm.vue -->
<template>
  <div class="p-4 max-w-xl mx-auto">
    <form @submit.prevent="generateImage" class="space-y-4">
      <input v-model="prompt" type="text" placeholder="Describe your image..." class="w-full p-2 border rounded" required />

      <select v-model="model" class="w-full p-2 border rounded">
        <option value="openai">OpenAI (DALL·E)</option>
        <option value="replicate">Replicate (Stable Diffusion)</option>
      </select>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Generate & Upload
      </button>
    </form>

    <div v-if="imageUrl" class="mt-6 text-center">
      <p class="mb-2">Generated Image:</p>
      <img :src="imageUrl" alt="Generated" class="mx-auto rounded shadow-md max-h-96" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const prompt = ref('')
const model = ref('openai')
const imageUrl = ref('')

const generateImage = async () => {
  const res = await axios.post('/api/generate-image', {
    prompt: prompt.value,
    model: model.value,
    upload: true
  })
  imageUrl.value = res.data.imageUrl
}
</script>

<style scoped>
img {
  transition: transform 0.2s ease-in-out;
}
img:hover {
  transform: scale(1.02);
}
</style>
