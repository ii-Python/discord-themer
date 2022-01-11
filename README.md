# discord-themer
### a simple discord canary CSS themer

---

### Installation

- Clone the repository
- Extract (if downloaded zip)
- Move folder to a reasonable location (home directory, etc)
- Locate your discord resources folder
    - On Windows, this is `%LocalAppData%\discordcanary\app-0.0.xx\resources`
    - On (most) Linux Distros, this is `/usr/share/discord-canary/resources`
- Inside the resources folder, make an `app` folder (if it doesn't exist)
- Copy all the files from this repositories `loader` folder into the `app` folder
- Edit the `index.js` file in the `app` folder and type the full path to where you placed this repository
- Relaunch discord canary and look for "[iiPython]" logs in the console (CTRL+SHIFT+I)
    - If found, you're good to go