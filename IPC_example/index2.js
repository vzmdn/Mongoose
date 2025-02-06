const { ipcRenderer } = require("electron");

const body = document.querySelector('body');
body.style.backgroundColor = 'darkblue';

const table = document.createElement('table');
const button = document.createElement('button');
button.innerText = 'Click me!';
button.onclick = () => {
  ipcRenderer.send('button-clicked');
};