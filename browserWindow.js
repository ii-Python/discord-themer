// Copyright 2021 iiPython
// Based on Powercord (https://github.com/powercord-org/powercord)

const { join } = require("path");
const { BrowserWindow } = require("electron");
class PatchedBrowserWindow extends BrowserWindow {
    constructor(opts) {
        let originalPreload;
        if (opts.webContents) {
            // Popouts used by discord
        } else if (opts.webPreferences && opts.webPreferences.nodeIntegration) {
            opts.webPreferences.preload = join(__dirname, "./preloadSplash.js");
        } else if (opts.webPreferences && opts.webPreferences.offscreen) {
            originalPreload = opts.webPreferences.preload;
            opts.webPreferences.preload = join(__dirname, "./preload.js");
        } else if (opts.webPreferences && opts.webPreferences.preload) {
            originalPreload = opts.webPreferences.preload;
            if (opts.webPreferences.nativeWindowOpen) {
                opts.webPreferences.preload = join(__dirname, "./preload.js");
            } else {
                opts.webPreferences.preload = join(__dirname, "./preloadSplash.js");
            }
        }

        const win = new BrowserWindow(opts);
        win.webContents._iiPreload = originalPreload;
        return win;
    }
}

module.exports = PatchedBrowserWindow;
