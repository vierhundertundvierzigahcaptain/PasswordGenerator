const path = require('path');
const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 500,
        height: 400,
        resizable: false,
        icon: path.join(__dirname, '/img/icon.png')
    });

    win.setMenuBarVisibility(false);
    win.setTitle('PasswordGenerator')
    win.loadFile('src/index.html');
}

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => { app.quit(); });
