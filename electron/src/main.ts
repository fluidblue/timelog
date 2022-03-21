import { app, BrowserWindow, ipcMain } from "electron";
import { dialog, FileFilter } from "electron";
import * as path from "path";
import DatabaseClient from "./DatabaseClient";
import Log from "./Log";

let databaseClient: DatabaseClient | null = null;

interface SelectDatabaseFileReturn {
    success: boolean,
    file: string | null,
    createNewFile: boolean
}

function selectDatabaseFile(): SelectDatabaseFileReturn {
    const createNewFile: boolean = dialog.showMessageBoxSync({
        message: "Do you want to create a new storage file or select an existing one?",
        type: "question",
        buttons: [ "Create a new file", "Use existing file" ],
        defaultId: 0,
        cancelId: 0
    }) !== 1;

    const filters: FileFilter[] = [
        {
            name: "TimeLog data file",
            extensions: [ "*.sqlite3" ]
        }
    ];

    let file: string | null = null;
    if (createNewFile) {
        file = dialog.showSaveDialogSync({
            filters: filters
        });
    } else {
        const files = dialog.showOpenDialogSync({
            properties: [
                "openFile",
                "createDirectory"
            ],
            filters: filters
        });
        if (files && files[0]) {
            file = files[0];
        }
    }

    return {
        success: file ? true : false,
        file: file ? file : null,
        createNewFile: createNewFile
    };
}

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
    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    // Setup database
    const selectDatabaseFileReturn = selectDatabaseFile();
    if (!selectDatabaseFileReturn.success) {
        app.quit();
        return;
    }
    databaseClient = new DatabaseClient(selectDatabaseFileReturn.file);
    if (selectDatabaseFileReturn.createNewFile) {
        databaseClient.createNewDatabase();
    }

    // Handle shutdown of app
    app.on("quit", () => {
        Log.info("Shutting down");

        databaseClient.close();
        databaseClient = null;
    });

    // Setup IPC
    ipcMain.handle("settings:get", () => { return databaseClient.settingsGet() });
    ipcMain.handle("settings:set", (event, settings) => { return databaseClient.settingsSet(settings); });
    ipcMain.handle("timelog:get", (event, date) => { return databaseClient.timeLogGet(date); });
    ipcMain.handle("timelog:add", (event, timeLogEntry) => { return databaseClient.timeLogAdd(timeLogEntry); });
    ipcMain.handle("timelog:remove", (event, timeLogEntry) => { return databaseClient.timeLogRemove(timeLogEntry); });

    // Create main window
    createWindow();
});

// Quit when all windows are closed, except on macOS.
// On macOS, it's common for applications and their menu bar to stay active until
// the user quits explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
