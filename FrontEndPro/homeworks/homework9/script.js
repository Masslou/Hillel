'use strict';

const form = document.getElementById('submit_form');
const tasksList = document.getElementById('task_list');
const taskDescriptionField = document.getElementById('task_description_field');
const taskTemplate = document.getElementById('task_template').innerHTML;

form.addEventListener("submit", onAddButtonClick);
tasksList.addEventListener('click', eventHandler);

function onAddButtonClick(event) {
    event.preventDefault();
    let data = new FormData(form);
    console.log(data.get('listData'));



    if (!checkInputOnEmpty(taskDescriptionField)) {
        addErrorColor(taskDescriptionField);
        return;
    }
    let taskDescription = addText(taskTemplate, taskDescriptionField.value);
    generateNewList(taskDescription);
    resetInput(taskDescriptionField);
    moveCursorToInput(taskDescriptionField);

}


function checkInputOnEmpty(element) {
    return element.value.trim() !== '';
}

function addText(element, addedText) {
    return element.replace('{{value}}', `${addedText}`);
}

function generateNewList(elem) {
    tasksList.innerHTML += elem;
}

function resetInput(elm) {
    clearInput(elm);
    removeErrorColor(elm);
}

function clearInput(element) {
    element.placeholder = '';
    element.value = '';
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

function moveCursorToInput(element) {
    element.focus();
}

function addErrorColor(elm) {
    elm.classList.add('error');
}
