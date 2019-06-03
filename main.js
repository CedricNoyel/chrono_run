
const {app, BrowserWindow} = require('electron');
const log = require('electron-log');
const {ipcMain} = require('electron'); // get html events
const ExcelServices = require('./app_server/js/ExcelServices');
const {convert} = require('xlsx-converter');


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
  });

  mainWindow.loadFile(__dirname + '/app/depart.html')
  log.info('mainwindow open file' + __dirname + '/app/index.html');

  // mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', function() {
    mainWindow.show();
    mainWindow.focus();
    log.info('mainwindow open');
    ExcelServices.createCsv();
    ExcelServices.convertXlsxToCsv();
    // let participants = [
    //   ['1', 'a', 'a', 'a'],
    //   ['2', 'b', 'b', 'b'],
    //   ['3', 'c', 'c', 'c'],
    //   ['4', 'd', 'd', 'd'],
    //   ['5', 'e', 'e', 'e']
    // ];
    // participants.forEach(function (participant) {
    //   ExcelServices.addParticipant(participant[0],participant[1],participant[2],participant[3]);
    // });



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
    .on('end-add-participant', (event, arg) => {
      let currentTimestamp = new Date().getTime();
      ExcelServices.addStopTime(arg, currentTimestamp);
    })
    .on('add-team', (event, arg) => {
        console.log("TODO add participant to a team");
    })
    .on('add-participant', (event, arg) => {
      ExcelServices.addParticipant(arg.dossard, arg.lastname, arg.firstname, arg.team);
    })
    .on('start-add-participants', (event, arg) => {
      let currentTimestamp = new Date().getTime();
      ExcelServices.addStartTime(arg, currentTimestamp);
    })
    .on('start-add-team', (event, arg) => {
      let currentTimestamp = new Date().getTime();
      ExcelServices.findTeamParticipants(arg, function (res) {
        res.forEach(function (participant) {
          ExcelServices.addStartTime(participant.dossard, currentTimestamp);
        })
      });
    });
