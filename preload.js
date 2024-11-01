// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    for (const versionType of ['chrome', 'electron', 'node']) {
        document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
    }
    document.getElementById('serialport-version').innerText = require('serialport/package').version
})

// contextBridge.exposeInMainWorld('electronAPI', {
//     saveFile: (content) => ipcRenderer.invoke('save-file', content)
// });