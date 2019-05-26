// This file is needed on every html page

let $ = require('jquery');
require('popper.js');
require('bootstrap');
require('flipclock');

// window titlebar
const customTitlebar = require('custom-electron-titlebar');

// communication front / back
const { ipcRenderer } = require('electron');
const {remote} = require('electron');

