
const {app, BrowserWindow} = require('electron');
const log = require('electron-log');
const {ipcMain} = require('electron'); // get html events

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

  mainWindow.loadFile(__dirname + '/app/arrive.html')
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

// CONTROLLER
ipcMain
    .on('arrivee-add-coureur', (event, arg) => {
      // Displays the object sent from the renderer process:
      //{
      //    message: "Hi",
      //    someData: "Let's go"
      //}
      console.log(
          arg
      );
    })
    .on('depart-add-equipe', (event, arg) => {
      // Displays the object sent from the renderer process:
      //{
      //    message: "Hi",
      //    someData: "Let's go"
      //}
      console.log(
          arg
      );
    });
