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

    // let participants = [
    //   ['dossard', 'lastname', 'firstname', 'team'],
    //   ['1', 'a', 'a', 'a'],
    //   ['2', 'b', 'b', 'b'],
    //   ['3', 'c', 'c', 'c'],
    //   ['4', 'd', 'd', 'd'],
    //   ['5', 'e', 'e', 'e']
    // ];
    // participants.forEach(function (participant) {
    //   ExcelServices.add_participant(participant[0],participant[1],participant[2],participant[3]);
    // });

    ExcelServices.find_participant(4);
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
