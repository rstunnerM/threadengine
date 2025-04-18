const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('threadAPI', {
  speak(command) {
    console.log('[VOICE COMMAND]', command)
  },
  getLastCommand() {
    return 'Simulated command for demo purposes 🎤'
  },
  onUpdateDownloaded(callback) {
    ipcRenderer.on('update-downloaded', () => callback())
  },
  onUpdateAvailable(callback) {
    ipcRenderer.on('update-available', () => callback())
  },
  onVersionUpdated(callback) {
    ipcRenderer.on('version-updated', (_, version) => callback(version))
  }
})
