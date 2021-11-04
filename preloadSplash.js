// Copyright 2021 iiPython
// Based on Powercord (https://github.com/powercord-org/powercord)

const { ipcRenderer } = require("electron");
const { join } = require("path");

// require iipython/util
require("module").Module.globalPaths.push(join(__dirname, "modules"));

// Discord's preload
const preload = ipcRenderer.sendSync("II_GET_PRELOAD");
if (preload) require(preload);

window.__SPLASH__ = true;

// CSS Injection
function init() {
    document.body.classList.add("iipython");
    iipython.ThemeManager.load_themes(
        activate = true
    );
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
