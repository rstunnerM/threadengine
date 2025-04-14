<template>
    <div class="bg-zinc-900 text-white p-4 h-full w-64 overflow-y-auto border-r border-zinc-700">
      <h3 class="text-lg font-bold mb-4">📁 Project Files</h3>
      <ul>
        <FileNode
          v-for="(content, path) in files"
          :key="path"
          :path="path"
          @open="handleOpen"
        />
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import FileNode from './FileNode.vue'
  
  const props = defineProps({ files: Object })
  const emit = defineEmits(['open-file'])
  
  const handleOpen = (path) => {
    emit('open-file', path)
  }
  </script>
  