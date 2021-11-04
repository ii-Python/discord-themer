// Copyright 2021 iiPython
// Based on Powercord (https://github.com/powercord-org/powercord)

const { join } = require("path");
const ThemeManager = require("./themes");
class iiPython {
    constructor(document) {
        this.user_dir = join(__dirname, "../user");
        this.document = document;
        this.ThemeManager = new ThemeManager(this);

        this.log("mod is now fully loaded.");
    }
    log(msg) {
        console.log(`[iiPython]: ${msg}`);
    }
}

module.exports = iiPython
