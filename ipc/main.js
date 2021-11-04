// Copyright 2021 iiPython
// Based on Powercord (https://github.com/powercord-org/powercord)

const { ipcMain } = require("electron");
if (!ipcMain) throw new Error("IPC isn't ready to be required, don't be stupid.");

ipcMain.on("II_GET_PRELOAD", e => e.returnValue = e.sender._iiPreload);
