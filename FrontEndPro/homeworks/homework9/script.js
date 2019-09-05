'use strict';

const form = document.getElementById('submit_form');
const tasksList = document.getElementById('task_list');
const taskDescriptionInput = document.getElementById('task_description_field');
const taskTemplate = document.getElementById('task_template').innerHTML;

form.addEventListener("submit", onFormSubmit);
tasksList.addEventListener('click', eventHandler);

function onFormSubmit(event) {
    event.preventDefault();
    addTask();
}

function addTask() {
    if (!checkInputOnEmpty(taskDescriptionInput)) {
        addErrorColor(taskDescriptionInput);
        return;
    }
    let taskDescription = addText(taskTemplate, taskDescriptionInput.value);
    generateNewList(taskDescription);
    resetInput(taskDescriptionInput);
    moveCursorToInput(taskDescriptionInput);
}


function checkInputOnEmpty(elm) {
    return elm.value.trim() !== '';
}

function addText(elm, addedText) {
    return elm.replace('{{value}}', `${addedText}`);
}

function generateNewList(elm) {
    tasksList.innerHTML += elm;
}

function resetInput(elm) {
    clearInput(elm);
    removeErrorColor(elm);
}

function clearInput(elm) {
    elm.placeholder = '';
    elm.value = '';
}

function removeErrorColor(elm) {
    elm.classList.remove('error');
}

function eventHandler(event) {
    let target = event.target;

    if (target.classList.contains('task_item')) {
        markTask(target);
    }
    if (target.classList.contains('remove_elm')) {
        removeTaskElm(target);
    }
}

function markTask(elm) {
    elm.classList.toggle('colored');
}

function removeTaskElm(elm) {
    elm.parentElement.remove();
}

function moveCursorToInput(elm) {
    elm.focus();
}

function addErrorColor(elm) {
    elm.classList.add('error');
}
