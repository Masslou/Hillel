'use strict';

const tasksList = document.getElementById('task_list');
const btn = document.getElementById('add_task_button');
const taskDescriptionField = document.getElementById('task_description_field');
const taskTemplate = document.getElementById('task_template').innerHTML;

btn.addEventListener("click", onAddButtonClick);
tasksList.addEventListener('click', actionHandler);

function onAddButtonClick() {

    if (!checkInputOnEmpty(taskDescriptionField)) {
        addErrorColor(taskDescriptionField);
        return;
    }

    let taskDescription = addText(taskDescriptionField.value);
    addElementToList(taskDescription);
    resetInput(taskDescriptionField);
    moveCursorToInput(taskDescriptionField);
}


function checkInputOnEmpty(element) {
    return element.value.trim() !== '';
}

function addText(addedText) {
    return taskTemplate.replace('{{value}}', `${addedText}`);
}

function addElementToList(elem) {
    tasksList.innerHTML += elem;
}

function resetInput(elm) {
    clearInput(elm);
    removeErrorColor(elm);
}

function clearInput(element) {
    element.value = '';
}

function removeErrorColor(elm) {
    elm.classList.remove('error');
}

function actionHandler(event) {
    let targetElm = event.target;

    if (targetElm.classList.contains('task_item')) {
        switchTaskColor(targetElm);
    }
    if (targetElm.classList.contains('remove_elm')) {
        removeTaskElm(targetElm);
    }
}

function switchTaskColor(event) {
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
