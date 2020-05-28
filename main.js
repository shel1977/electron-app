const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');



let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 600,
        height: 500,
        minWidth: 600,
        minHeight: 500,
        icon: __dirname + '/resource/img/icon.png',
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

//    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {   //close app on macOs
    app.quit();
});


