const axios = require('axios');
const {ipcRenderer} = require('electron');
const request = require('request');


const getDataButton = document.getElementById('getDataButton');
const postDataButton = document.getElementById('postDataButton');

getDataButton.addEventListener('click', function () {
    getData()
});

postDataButton.addEventListener('click', function () {
    const inputDataArea = document.getElementById('inputDataArea').value;
    postData(inputDataArea);
    document.getElementById('inputDataArea').value = ''
});

/*getDataButton.addEventListener('click', function () {
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
});*/

//show answer
const showFunc = (value) => {
    document.getElementById('showResponseData').innerHTML = value;
};


const getData = () => {
    axios.get('http://localhost:8888/data')
        .then((response) => {
            console.log(response.data.data);

            showFunc(response.data.data)
        });
};

const postData = (text) => {
    axios.post('http://localhost:8888/post',
        {data: text})
        .then((response) => {
            showFunc(response.data.info)
        });
};