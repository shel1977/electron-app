const {ipcRenderer} = require('electron');

const getDataButton = document.getElementById('getDataButton');
const postDataButton = document.getElementById('postDataButton');

getDataButton.addEventListener('click', function () {
    ipcRenderer.send('getData');
    ipcRenderer.once('replyFromGet', (event, value) => {
        console.log('answer ' + value.data);
        showFunc(value.data)
    });
});

postDataButton.addEventListener('click', function () {
    const inputDataArea = document.getElementById('inputDataArea').value;
    ipcRenderer.send('postData', inputDataArea);
    ipcRenderer.once('replyFromPost', (event, value) => {
        console.log('answer ' + value.data);
        showFunc(value.data)
    });
});

//show answer
const showFunc = (value) => {
    document.getElementById('showResponseData').innerHTML = value;
};