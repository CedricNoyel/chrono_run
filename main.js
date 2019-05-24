
const {app, BrowserWindow} = require('electron');
const log = require('electron-log');

let mainWindow;

// Example sending var to frontend
global.sharedObj = {myvar: "hellofrommainjs"};

function createWindow () {
  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    width: 1060,
    height: 820,
    icon: __dirname + '/app/img/logo.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile(__dirname + '/app/nouvelle-course.html')
  log.info('mainwindow open file' + __dirname + '/app/index.html');

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', function() {
    mainWindow.show();
    mainWindow.focus();
    log.info('mainwindow open');
  });

  mainWindow.on('closed', function () {
    log.info('mainwindow closed');
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') { app.quit(); }
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
