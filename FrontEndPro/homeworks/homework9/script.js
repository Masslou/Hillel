'use strict';

const form = document.getElementById('submit_form');
const fieldValue = document.getElementById('task_description_field');
const tasksList = document.getElementById('task_list');
const taskTemplate = document.getElementById('task_template').innerHTML;


form.addEventListener("submit", onAddButtonClick);
tasksList.addEventListener('click', eventHandler);

function onAddButtonClick(event) {
    event.preventDefault();
    if (!checkInputValue()) {
        addErrorColor(fieldValue);
        return;
    }
    let taskText = addText(fieldValue.value);
    generateNewList(taskText);
    resetInput(fieldValue);

}


function checkInputValue() {
    return fieldValue.value.trim() !== '';
}

function addText(text) {
    return taskTemplate.replace('{{value}}', `${text}`);
}

function generateNewList(elem) {
    tasksList.innerHTML += elem;
}

function resetInput(elm) {
    clearInput(elm);
    removeErrorColor(elm);
}

function clearInput() {
    fieldValue.placeholder = '';
    fieldValue.value = '';
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

function markTask(event) {
    event.classList.toggle('colored');
}

function removeTaskElm(event) {
   event.parentElement.remove();
}

function addErrorColor(elm) {
    elm.classList.add('error');
}

