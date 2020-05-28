const axios = require('axios');

const getDataButton = document.getElementById('getDataButton');
const postDataButton = document.getElementById('postDataButton');


const showServerStatus = (response) => {
    let setColor = document.getElementById('indicator');
    let serverText = document.getElementById('server__status__text');
    if (response.status === 200) {
        setColor.className = 'indicator';
        serverText.innerHTML = 'connect'
    } else {
        setColor.className = 'indicator__red';
        serverText.innerHTML = response
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


//Api
const getData = () => {
    let setting = window.state;
    axios.get(`${setting.serverURL}:${setting.serverPort}/data`)
        .then((response) => {
            console.log(response.data.data);
            showFunc(response.data.data)
        });
};

const postData = (text) => {
    let setting = window.state;
    axios.post(`${setting.serverURL}:${setting.serverPort}/post`,
        {data: text})
        .then((response) => {
            showFunc(response.data.info)
        });
};

//Show server status
const status = setInterval(() => {
    let setting = window.state;
    axios.get(`${setting.serverURL}:${setting.serverPort}`)
        .then((response) => {
            showServerStatus(response);
            console.log(response.status)
        })
        .catch((error) => {
            showServerStatus(error);
            console.log(error)
        })
}, 3000);