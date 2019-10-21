'use strict';

let todoListItems = [
    {
        id: 1,
        isDone: false,
        title: 'Do something'
    },

    {
        id: 2,
        isDone: false,
        title: 'Have some rest'
    },

    {
        id: 3,
        isDone: false,
        title: 'sleep'
    },
];

const TODO_ITEM_DONE_CLASS = 'done';

const todoListElement = document.getElementById('todo-list');
const todoListTemplate = document.getElementById('todo-list-template');


init();


function onTodoListElementClick(event) {

}

function init() {
    renderList(todoListItems)
}

function renderList(list) {
    const todoItemsHTML = list.map((todo) => {
        return todoListTemplate.innerHTML.replace('{{id}}', todo.id)
            .replace('{{title}}', todo.title)
            .replace('{{class}}', todo.isDone ? TODO_ITEM_DONE_CLASS : '')
    });

    todoListElement.innerHTML = todoItemsHTML.join('\n');
}

function deleteTodoItem(todoId) {
    todoListItems = todoListItems.filter(el => el.id != todoId);

    deleteTodoItemElement(todoId);
}

function deleteTodoItemElement(id) {
    const element = getTodoItemElement(id);

    element && element.remove();
}

function getTodoItemElement(id) {
    return todoListElement.querySelector(`[data-todo-id="${id}"]`)
}

function toggleTodoItem(id) {
    const todo = todoListItems.find((el) => el.id == id)

    todo.isDone = !todo.isDone;
}

function setTodoElementClass(todo) {
    const element = getToDoItemElement(todo.id);

    if (todo.isDone) {
        element.classList.add(TODO_ITEM_DONE_CLASS)
    } else {
        element.classList.remove(TODO_ITEM_DONE_CLASS);
    }
}
