const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;
let inDev = true;
let splashDuration = 1000;

let preload = path.join(__dirname, 'preload.js');
let showGame = path.join(__dirname, 'index.html');
let showSplash = path.join(__dirname, 'splash.html');

/**
 * Create game window
 */
const createWindow = () => {

    // Check squirrel startup
    if(require('electron-squirrel-startup')) return;

    let timeStarted = Date.now();
    const discord = require('discord-rich-presence')('974804471752323112');

    let updateRichPresence = () => {
        discord.updatePresence({
            state: 'Teasing slimes...',
            details: 'Blorbed!',
            startTimestamp: timeStarted,
            largeImageKey: 'big-slime',
            largeImageText: 'UwU',
            instance: true,
        });
    }

    // Create browser window
    mainWindow = new BrowserWindow({
        show: false,
        frame: true,
        center: true,
        width: 1920,
        height: 1080,
        title: 'Slime Clicker',
        autoHideMenuBar: true,
        webPreferences: {
            preload: preload,
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            webviewTag: true
        }
    });

    mainWindow.unmaximize();
    mainWindow.show();

    // Show Splash
    mainWindow.loadFile(showSplash);

    setTimeout(() => {

        mainWindow.maximize();
        mainWindow.setResizable(true);

        // Show Game
        mainWindow.loadFile(showGame);

        // Show dev tools
        if(inDev) mainWindow.webContents.openDevTools();

        autoUpdater.checkForUpdatesAndNotify();

        updateRichPresence();

    }, splashDuration);

}

/* Open when ready */
app.whenReady().then(createWindow);

/* On activate */
app.on('activate', () => {
    if(mainWindow === null) createWindow();
});

/* On close window */
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});

/* Version from package.json */
ipcMain.on('game-version', (event) => {
    event.sender.send('game-version', { version: app.getVersion() });
});

/**
 * AutoUpdater
 * For game installer without platforms like steam.
 * https://medium.com/@johndyer24/creating-and-deploying-an-auto-updating-electron-app-for-mac-and-windows-using-electron-builder-6a3982c0cee6
 */

/*

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-available');
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded');
});

*/