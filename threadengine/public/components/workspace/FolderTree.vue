<template>
    <div class="bg-zinc-900 text-white p-4 h-full w-64 overflow-y-auto border-r border-zinc-700">
      <h3 class="text-lg font-bold mb-4">📁 Project Files</h3>
      <ul>
        <template v-for="(content, path) in files">
          <FolderTree
            v-if="isFolder(path)"
            :key="path"
            :folder="path"
            :files="getFolderContents(path)"
            @open-file="handleOpen"
          />
          <FileNode
            v-else
            :key="path"
            :path="path"
            @open="handleOpen"
          />
        </template>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import FileNode from './FileNode.vue'
  import FolderTree from './FolderTree.vue'
  
  const props = defineProps({ files: Object })
  const emit = defineEmits(['open-file'])
  
  const handleOpen = (path) => {
    emit('open-file', path)
  }
  
  const isFolder = (path) => {
    return Object.keys(props.files).some(p => p.startsWith(path + '/') && p !== path)
  }
  
  const getFolderContents = (folder) => {
    const filesInFolder = {}
    for (const path in props.files) {
      if (path.startsWith(folder + '/') && path !== folder) {
        const relative = path.slice(folder.length + 1)
        const topLevel = relative.split('/')[0]
        filesInFolder[`${folder}/${topLevel}`] = props.files[`${folder}/${topLevel}`] || ''
      }
    }
    return filesInFolder
  }
  </script>
  