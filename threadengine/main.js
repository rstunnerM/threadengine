const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const AutoLaunch = require('auto-launch')
const { autoUpdater } = require('electron-updater')

const isDev = !app.isPackaged
const versionStorePath = path.join(app.getPath('userData'), 'version-store.json')

function createWindow() {
  const splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  })
  splash.loadFile('splash.html')

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'))
  }

  setTimeout(() => {
    splash.close()
    win.show()
  }, 2500)

  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify()
  }

  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update-downloaded')
  })

  autoUpdater.on('update-available', () => {
    win.webContents.send('update-available')
  })

  const currentVersion = app.getVersion()
  let lastVersion = null

  try {
    const versionData = JSON.parse(fs.readFileSync(versionStorePath, 'utf-8'))
    lastVersion = versionData.version
  } catch (err) {}

  if (lastVersion && lastVersion !== currentVersion) {
    win.webContents.once('did-finish-load', () => {
      win.webContents.send('version-updated', currentVersion)
    })
  }

  fs.writeFileSync(versionStorePath, JSON.stringify({ version: currentVersion }), 'utf-8')
}

const autoLauncher = new AutoLaunch({
  name: 'NexuCode',
  path: app.getPath('exe')
})

app.whenReady().then(() => {
  autoLauncher.isEnabled().then((enabled) => {
    if (!enabled) autoLauncher.enable()
  })
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

ipcMain.on('restart-app', () => {
  autoUpdater.quitAndInstall()
})
