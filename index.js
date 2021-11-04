// Copyright 2021 iiPython
// Based on Powercord (https://github.com/powercord-org/powercord)

const Module = require("module");
const { join, dirname } = require("path");

const electronPath = require.resolve("electron");
const discordPath = join(dirname(require.main.filename), "..", "app.asar");
require.main.filename = join(discordPath, "app_bootstrap/index.js");

// Patch browser window
require("./ipc/main");
const electron = require("electron");
const PatchedBrowserWindow = require("./browserWindow");
const electronExports = new Proxy(electron, {
    get(target, prop) {
        switch (prop) {
            case "BrowserWindow": return PatchedBrowserWindow;
            default: return target[prop];
        }
    }
});

delete require.cache[electronPath].exports;
require.cache[electronPath].exports = electronExports;

// Remove CSP
electron.app.once("ready", () => {
    electron.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders }, done) => {
        Object.keys(responseHeaders)
            .filter(k => (/^content-security-policy/i).test(k))
            .map(k => (delete responseHeaders[k]));
    
        done({ responseHeaders });
    });
  });

// Load Discord
const discordPackage = require(join(discordPath, "package.json"));
electron.app.setAppPath(discordPath);
electron.app.name = discordPackage.name;

Module._load(join(discordPath, discordPackage.main), null, true);  // Load module
