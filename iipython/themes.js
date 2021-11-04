// Copyright 2021 iiPython
// Based on Powercord (https://github.com/powercord-org/powercord)

const { join } = require("path");
const { readdirSync, existsSync } = require("fs");
const { loadCSSFile } = require("iipython/util");
class ThemeManager {
    constructor (core) {
        this.core = core;
        this.themes = {};
        this.theme_dir = join(core.user_dir, "themes");
    }
    validate_manifest(manifest) {
        if (!manifest.name || !manifest.author) throw new Error("no name or author");
        if (typeof manifest.name !== "string" || typeof manifest.author !== "string") throw new Error("name or author is not a string");
    }
    async mount(tid, fn) {
        const theme_folder = join(this.theme_dir, fn);
        const manifest_path = join(theme_folder, "manifest.json");

        // Theme validation
        try {
            const manifest = require(manifest_path);
            this.validate_manifest(manifest);

            // Give the author a choice of CSS entry, or use theme.css
            const css_file = manifest.css_entry || join(theme_folder, "theme.css");
            if (!existsSync(css_file)) throw new Error("invalid css file or none exists");

            // Save internally
            this.themes[tid] = { manifest: manifest, css_file: css_file, active: existsSync(join(theme_folder, ".active")) }
        } catch (e) { return this.core.log("ThemeLoader", `failed loading ${tid} manifest!`); }
    }
    async load_themes(activate) {
        for (const fn of readdirSync(this.theme_dir)) {
            if (fn.startsWith(".")) continue;

            const tid = fn.toLowerCase().replace(" ", "_");
            await this.mount(tid, fn);
        }
        if (activate) this.activate_themes();
    }
    async activate_themes() {
        for (const tid in this.themes) if (this.themes[tid].active) loadCSSFile(this.themes[tid].css_file, tid);
    }
}

module.exports = ThemeManager;
