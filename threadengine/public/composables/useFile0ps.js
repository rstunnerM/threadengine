// composables/useFileOps.js
import axios from 'axios'

export default function useFileOps() {
  const deleteFile = async (path) => {
    await axios.delete('/api/files', { data: { path } })
  }

  const renameFile = async (oldPath, newPath) => {
    await axios.put('/api/files', { oldPath, newPath })
  }

  const createFile = async (path, isDir = false) => {
    await axios.post('/api/files', { path, isDir })
  }

  const moveFile = async (source, destination) => {
    await renameFile(source, destination) // same as rename!
  }

  return {
    deleteFile,
    renameFile,
    createFile,
    moveFile,
  }
}
