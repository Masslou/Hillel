'use strict';

const btn = document.getElementById('addBtn');
const count = document.getElementById('count');
const elementsList = document.getElementById('list');

btn.addEventListener("click", changeElm);


function changeElm() {

    elementsList.innerHTML = '';
    const elmCount = count.value;

    for (let i = 1; i <= elmCount; i++) {
        const newElem = document.createElement('li');
        newElem.innerText = i;
        elementsList.appendChild(newElem);
    }
}
