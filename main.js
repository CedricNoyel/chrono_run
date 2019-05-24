
const {app, BrowserWindow} = require('electron');
const log = require('electron-log');
const ExcelServices = require('./app_server/js/ExcelServices');

let mainWindow;

// Example sending var to frontend
global.sharedObj = {myvar: "hellofrommainjs"};

function createWindow () {
  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    width: 960,
    height: 720,
    icon: __dirname + '/app/img/logo.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile(__dirname + '/app/index.html')
  log.info('mainwindow open file' + __dirname + '/app/index.html');

  // mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', function() {
    mainWindow.show();
    mainWindow.focus();
    log.info('mainwindow open');

    const excelServices = new ExcelServices();
    // excelServices.add_participant('2', 'GENEVE', 'Jordan', 'boss');
    excelServices.add_participant('3', 'NOYEL', 'Cédric', 'boss');
    excelServices.read_participants();

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
