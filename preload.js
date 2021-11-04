// Copyright 2021 iiPython
// Based on Powercord (https://github.com/powercord-org/powercord)

global.NEW_BACKEND = !process.versions.electron.startsWith("13");
const { ipcRenderer } = require("electron");
const { join } = require('path');

// Load my modules
require("module").Module.globalPaths.push(join(__dirname, "modules"));

// Initialize core class
const iiPython = require("./iipython");
global.iipython = new iiPython(document);

// Discord's preload
const preload = ipcRenderer.sendSync("II_GET_PRELOAD");
if (preload) require(preload);

setTimeout(() => DiscordNative.window.setDevtoolsCallbacks(null, null), 5e3);

// Load splash preload
if (!window.__SPLASH__) require("./preloadSplash");
