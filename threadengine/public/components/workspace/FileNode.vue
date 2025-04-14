<template>
    <li class="group">
      <div
        class="flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-zinc-800"
        :class="{ 'bg-zinc-700': isActive }"
        @click="toggleOpen"
        @contextmenu.prevent="openContextMenu"
        draggable="true"
        @dragstart="onDragStart"
        @drop.prevent="onDrop"
        @dragover.prevent
      >
        <!-- Dynamic icon + name -->
        <span class="flex items-center gap-2 text-sm">
          <span class="w-5">{{ getIcon() }}</span>
          <span class="truncate">{{ name }}</span>
        </span>
      </div>
  
      <!-- Recursive rendering if directory is open -->
      <ul v-if="isDir && isOpen" class="pl-4">
        <FileNode
          v-for="(child, childPath) in content.children"
          :key="childPath"
          :path="childPath"
          :content="child"
          :activePath="activePath"
          @open="emitOpen"
          @context="openContextMenu"
        />
      </ul>
    </li>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue'
  import FileNode from './FileNode.vue'
  
  const props = defineProps({
    path: String,
    content: Object,
    activePath: String,
  })
  
  const emit = defineEmits(['open', 'context'])
  
  const name = computed(() => props.path.split('/').pop())
  const isDir = computed(() => props.content.type === 'directory')
  const isOpen = ref(false)
  const isActive = computed(() => props.path === props.activePath)
  
  // ✅ Updated icon logic
  const getIcon = () => {
    if (isDir.value) return isOpen.value ? '📂' : '📁'
  
    const ext = name.value.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'js':
        return '🟨'
      case 'ts':
        return '🟦'
      case 'vue':
        return '🟩'
      case 'md':
      case 'mdx':
        return '📘'
      case 'json':
        return '🧾'
      case 'html':
      case 'htm':
        return '🌐'
      case 'css':
        return '🎨'
      default:
        return '📄'
    }
  }
  
  const toggleOpen = () => {
    if (isDir.value) {
      isOpen.value = !isOpen.value
    } else {
      emit('open', props.path)
    }
  }
  
  const emitOpen = (path) => emit('open', path)
  
  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', props.path)
  }
  
  const onDrop = (e) => {
    const sourcePath = e.dataTransfer.getData('text/plain')
    console.log(`Move ${sourcePath} to ${props.path}`)
  }
  
  const openContextMenu = (e) => {
    emit('context', props.path, e)
  }
  </script>
  