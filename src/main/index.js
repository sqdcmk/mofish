import { app, BrowserWindow, ipcMain, Tray } from 'electron'
const fs = require('fs');
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 683,
    useContentSize: true,
    width: 1050,
    // frame: false, 
    // resizable: false
  })
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
const ipcMains = require('electron').ipcMain;
ipcMains.on('setIcon', function (event, arg) {
  fs.stat(arg, (err, status) => {
    if (!err) {
      // console.log(err)
      if (status.size > 0) {
        // console.log(status)
        mainWindow.setIcon(arg)
      }
    }
  })
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})