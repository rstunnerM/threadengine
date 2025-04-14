<script setup>
import { ref } from 'vue'
import { defineEmits, defineProps } from 'vue'
import FileNode from './FileNode.vue'
import ContextMenu from './ContextMenu.vue'
import RenameModal from './RenameModal.vue'
import ConfirmDelete from './ConfirmDelete.vue'
import NewFileModal from './NewFileModal.vue'
import useModal from '@/composables/useModal.js'
import useFileOps from '@/composables/useFileOps.js'

const props = defineProps({
  files: Object,
})

const emit = defineEmits(['open-file'])

// Active + context menu
const activeFile = ref(null)
const contextVisible = ref(false)
const contextX = ref(0)
const contextY = ref(0)
const contextPath = ref(null)

// File ops
const { deleteFile, renameFile, createFile } = useFileOps()
const reloadFiles = async () => {
  window.location.reload() // Swap out for dynamic reload if desired
}

// Modals
const renameModal = useModal()
const deleteModal = useModal()
const newFileModal = useModal()

// Context Menu Items
const menuItems = [
  {
    label: 'Open',
    action: () => {
      emit('open-file', contextPath.value)
      contextVisible.value = false
    },
  },
  {
    label: 'Rename',
    action: () => {
      renameModal.open({ current: contextPath.value })
      contextVisible.value = false
    },
  },
  {
    label: 'Delete',
    action: () => {
      deleteModal.open({ name: contextPath.value })
      contextVisible.value = false
    },
  },
  {
    label: 'New File',
    action: () => {
      newFileModal.open({ base: contextPath.value })
      contextVisible.value = false
    },
  },
]
{
  label: 'New Folder',
  action: () => {
    newFileModal.open({ base: contextPath.value, isFolder: true })
    contextVisible.value = false
  },
},

// Event Handlers
const showContextMenu = (path, event) => {
  event.preventDefault()
  contextX.value = event.clientX
  contextY.value = event.clientY
  contextPath.value = path
  contextVisible.value = true
}

const handleOpen = (path) => {
  activeFile.value = path
  emit('open-file', path)
  contextVisible.value = false
}

const handleClickOutside = () => {
  contextVisible.value = false
}

// Modal Callbacks
const handleRename = async (newName) => {
  const oldPath = renameModal.data.value.current
  if (newName && newName !== oldPath) {
    await renameFile(oldPath, newName)
    reloadFiles()
  }
  renameModal.close()
}

const handleDelete = async () => {
  const filePath = deleteModal.data.value.name
  await deleteFile(filePath)
  deleteModal.close()
  reloadFiles()
}

const handleNewFile = async (name) => {
  if (!name) return

  const base = newFileModal.data.value.base
  const isFolder = newFileModal.data.value.isFolder === true // 👈 checks if it's a folder

  const newPath = base.endsWith('/') ? base + name : base + '/' + name

  await createFile(newPath, isFolder) // 👈 use the isFolder flag (true = folder)
  newFileModal.close()
  reloadFiles()
}
</script>

<template>
  <div
    class="bg-zinc-900 text-white p-4 h-full w-64 overflow-y-auto border-r border-zinc-700"
    @click="handleClickOutside"
  >
    <h3 class="text-lg font-bold mb-4">📁 Project Files</h3>
    <ul>
      <FileNode
        v-for="(content, path) in files"
        :key="path"
        :path="path"
        :content="content"
        :activePath="activeFile"
        @open="handleOpen"
        @context="showContextMenu"
      />
    </ul>

    <ContextMenu
      :x="contextX"
      :y="contextY"
      :visible="contextVisible"
      :menuItems="menuItems"
    />

    <!-- Modal Overlays -->
    <RenameModal
      :isOpen="renameModal.isOpen"
      :data="renameModal.data"
      @submit="handleRename"
      @close="renameModal.close"
    />

    <ConfirmDelete
      :isOpen="deleteModal.isOpen"
      :data="deleteModal.data"
      @confirm="handleDelete"
      @close="deleteModal.close"
    />

    <NewFileModal
      :isOpen="newFileModal.isOpen"
      :data="newFileModal.data"
      @submit="handleNewFile"
      @close="newFileModal.close"
    />
  </div>
</template>
