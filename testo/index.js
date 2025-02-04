const container = document.getElementById('container');
const input = document.getElementById('input');
const button = document.getElementById('saveButton');

button.addEventListener('click', addItem);

function addItem(){
    const div = document.createElement('div');
    div.style.backgroundColor = 'yellow';
    div.style.color = 'black';
    div.style.padding = '5px';
    div.style.textTransform = 'uppercase';
    div.innerHTML = document.getElementById('input').value;
    container.appendChild(div);

}