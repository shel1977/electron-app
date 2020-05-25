const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const { ipcMain } = require('electron');
const request = require('request');


let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 600,
        height: 400,
        minWidth: 600,
        minHeight: 400,
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

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
};

ipcMain.on('getData', function (event) {
    console.log('ipc work');
    getData()
});
ipcMain.on('postData', function (event, rettr) {
    console.log('ipc post work');
    postData(rettr)
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {   //close app on macOs
    app.quit();
});

const getData = () => {
    request(
        'http://localhost:8888/data',
        {json: true},
        (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(body);
    });
};

let makePostData = {
    data: 'some'
};

const postData = () => {
    request.post({
        url: 'http://localhost:8888/post',
        json: true,
        body: makePostData},
        (err, res, body) => {
            if (err) {
            return console.log(err);
        }
        console.log(body);

    });
};

