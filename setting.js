

window.state = {
    serverPort: '8888',
    serverURL: 'http://localhost'
}


const setting = document.getElementById('setting');
const settingBtnSave = document.getElementById('settingBtnSave');
const settingBtnReset = document.getElementById('settingBtnReset');
const settingBtnClose = document.getElementById('settingBtnClose');
const menu = document.getElementById('setting_menu')


setting.addEventListener('click', function () {
    menu.classList.add('show_menu')
});

settingBtnClose.addEventListener('click', function () {
    menu.classList.remove('show_menu')
});

settingBtnSave.addEventListener('click', function () {
    const setPort = document.getElementById('settingPort').value;
    const setURL = document.getElementById('settingUrl').value;
    let newSetting = {
        serverPort: setPort,
        serverURL: setURL
    };
    window.state = newSetting;
    document.getElementById('settingPort').value = '';
    document.getElementById('settingUrl').value = '';
    console.log(state)
});

settingBtnReset.addEventListener('click', function () {
    state.serverPort = '8888';
    state.serverURL = 'http://localhost';
    console.log(state)
});