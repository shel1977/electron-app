const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');
const request = require('request');


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

ipcMain.on('getData', function (event) {
    console.log('ipc work');
    getData();
    event.sender.send('replyFromGet', responseData)


});
ipcMain.on('postData', function (event, inputDataArea) {
    console.log('ipc post work');
    postData(inputDataArea);
    event.reply('replyFromPost', responseData)
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {   //close app on macOs
    app.quit();
});

let responseData;

const getData = () => {
    request(
        'http://localhost:8888/data',
        {json: true},
        (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            responseData = body;
            console.log(body);

        }
    )
};

const postData = (data) => {
    let createDataObject = {
        data: data
    };
    request.post({
            url: 'http://localhost:8888/post',
            json: true,
            body: createDataObject
        },
        (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            responseData = body
        }
    )
};

