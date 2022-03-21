import { app, BrowserWindow } from "electron";
import * as path from "path";
import DatabaseClient from "./DatabaseClient";

const databaseClient = new DatabaseClient();

function createWindow() {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 350,
        minHeight: 350,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    if (app.isPackaged) {
        // Load the index.html of the app
        mainWindow.loadFile(path.join(__dirname, "./timelog/index.html"));
    } else {
        // Hot reload in dev mode
        mainWindow.loadURL("http://localhost:4200");

        // Open the DevTools
        mainWindow.webContents.openDevTools();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS.
// On macOS, it's common for applications and their menu bar to stay active until
// the user quits explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
