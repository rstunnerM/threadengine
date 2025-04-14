<!-- /components/VisualElement.vue -->
<template>
  <div class="flex items-center justify-center">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="w-auto h-24 rounded-xl shadow-md object-cover"
    />
    <div v-else class="text-4xl">{{ fallback }}</div>
  </div>
</template>

<script setup>
defineProps({
  src: String,
  alt: String,
  fallback: {
    type: String,
    default: '✨'
  }
})
</script>

<style scoped>
img {
  transition: transform 0.3s ease-in-out;
}
img:hover {
  transform: scale(1.05);
}
</style>
