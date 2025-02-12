const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.setMenu(null);
    win.loadFile('index.html');
}

function createWindow2() {
    let win2 = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win2.setMenu(null);
    win2.loadFile('index2.html');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('ready', () => {
    let window1 = createWindow;
    let window2 = createWindow2;
});




//reloader
//electron-reloader
/*
try {
    require('electron-reloader')(module)
  } catch (_) {}

  */