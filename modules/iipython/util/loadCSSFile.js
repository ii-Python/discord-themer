const loadCSS = require("./loadCSS");
const { readFileSync } = require("fs");
module.exports = (path, ...args) => { loadCSS(readFileSync(path).toString(), ...args); };
