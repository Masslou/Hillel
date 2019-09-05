'use strict';

const form = document.getElementById('formSubmit');
const btn = document.getElementById('addTask');
const fieldValue = document.getElementById('taskField');
const tasksList = document.getElementById('list');
const taskTemplate = document.getElementById('taskTemplate').innerHTML;


form.addEventListener("submit", onAddButtonClick);
tasksList.addEventListener('click', eventHandler);

function onAddButtonClick(event) {
    console.log();
    event.preventDefault();
    if (!checkInputValue()) {
       error(fieldValue);
       return;
    }

    const messageElm = addText(fieldValue.value);
    generateNewList(messageElm);

}



function generateNewList(elem) {
    tasksList.innerHTML += elem;
}


function checkInputValue() {
    if (fieldValue.value.trim() === '') {

        return false;
    } else {

        return true;

    }
}


function eventHandler(event) {
    console.log(event);
    if (event.target.tagName === 'LI') {
        markTask(event);
    }
    if (event.target.tagName === 'SPAN') {
        removeTask(event);
    }
}

function markTask(event) {
    event.target.classList.toggle('colored');
}

function addText(text) {
    return taskTemplate.replace('{{value}}', `${text}`);
}


function removeTask(event) {
    event.target.parentElement.remove();
}

function error(elm) {
    elm.classList.add('error');
}

