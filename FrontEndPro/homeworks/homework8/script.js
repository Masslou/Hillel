'use strict';

const btn = document.getElementById('addBtn');
const count = document.getElementById('count');
const elementsList = document.getElementById('list');

btn.addEventListener("click", changeElm);


function changeElm() {

    elementsList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= count.value; i++) {
        const newElem = createElm('li', i);
        fragment.appendChild(newElem);
    }

    elementsList.append(fragment)
}


function createElm(tagName, text) {
    let newElm = document.createElement(tagName);
    newElm.innerText = text;
    return newElm;
}


/*
My second solution

const btn = document.getElementById('addBtn');
const count = document.getElementById('count');
const tasksList = document.getElementById('list');

btn.addEventListener("click", addElm);


function addElm() {
    tasksList.innerHTML = '';
    let fragment = ``;

    for (let i = 1; i <= count.value; i++) {
        const li = addElm('li', i);
        fragment += li;
    }
    tasksList.innerHTML = fragment;
}

function addElm(tagName, text) {
    return `<${tagName}>${text}</${tagName}>`;
}*/
