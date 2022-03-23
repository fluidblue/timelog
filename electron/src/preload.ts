// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { contextBridge, ipcRenderer } from "electron"
import { TimelogAPI } from "./api";

const api: TimelogAPI = {
    settingsGet: () => ipcRenderer.invoke("settings:get"),
    settingsSet: (settings) => ipcRenderer.invoke("settings:set", settings),
    timeLogGet: (date) => ipcRenderer.invoke("timelog:get", date),
    timeLogAdd: (timeLogEntry) => ipcRenderer.invoke("timelog:add", timeLogEntry),
    timeLogRemove: (timeLogEntry) => ipcRenderer.invoke("timelog:remove", timeLogEntry),
    timeLogGetFirstRecordDate: () => ipcRenderer.invoke("timelog:getFirstRecordDate")
};

contextBridge.exposeInMainWorld("timelogAPI", api);
