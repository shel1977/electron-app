const axios = require('axios');
const {ipcRenderer} = require('electron');
const request = require('request');


const getDataButton = document.getElementById('getDataButton');
const postDataButton = document.getElementById('postDataButton');
const showServerStatus = (response) => {
    let setColor = document.getElementById('indicator');
    if (response.status === 200){
        setColor.className = 'indicator'
    } else {
        setColor.className = 'indicator__red'
    }

};

getDataButton.addEventListener('click', function () {
    getData()
});

postDataButton.addEventListener('click', function () {
    const inputDataArea = document.getElementById('inputDataArea').value;
    postData(inputDataArea);
    document.getElementById('inputDataArea').value = ''
});

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

const status = setInterval(() => {

    axios.get('http://localhost:8888/')
        .then((response) => {
            showServerStatus(response);
            console.log(response.status)
        })
        .catch((error) => {
            showServerStatus(error);
            console.log(error)
        })

}, 3000);

