const electron = require('electron');
const { ipcRenderer } = require('electron')

const getDataButton = document.getElementById('getDataButton');
const postDataButton = document.getElementById('postDataButton');

getDataButton.addEventListener('click', function () {
    ipcRenderer.send('getData');
});

let rettr = 'new';

postDataButton.addEventListener('click', function () {
    ipcRenderer.send('postData', rettr);
});