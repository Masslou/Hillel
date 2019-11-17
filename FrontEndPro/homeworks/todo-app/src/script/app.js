'use strict';

import '../assets/styles.css';
import $ from 'jquery';
import LocalStorageService from "./LocalStorageService";

$(function () {
    const $todoList = $('#todoList');
    const $newTodoForm = $('#newToDoForm');
    const $todoItemTemplate = $('#toDoTemplate').html();

    const REMOVE_BTN_CLASS = `remove-btn`;
    const ITEM_CLASS = 'todo-item';
    const ITEM_DONE_CLASS = 'done';

    const localStorageService = new LocalStorageService();

    class Todo {

        constructor() {
            this.todoList = this.getTodoDataStorage();
            this.init();
        }

        init() {
            this.renderTodoList();
            this.bindEventListeners();
        }

        bindEventListeners() {
            $todoList.on('click', `.${REMOVE_BTN_CLASS}`, this.onDeleteBtnClick.bind(this));
            $todoList.on('click', `.${ITEM_CLASS}`, this.onTodoItemClick.bind(this));
            $newTodoForm.on('submit', this.onNewTodoFormSubmit.bind(this));
        }

        onDeleteBtnClick(e) {
            debugger
            e.stopPropagation();
            const $todoItem = $(e.target).parent();
            this.deleteTodoItem($todoItem.data('todoId'));
            this.renderTodoList();
        }

        onTodoItemClick(e) {
            this.toggleTodoItem($(e.target).data('todoId'));
        }

        onNewTodoFormSubmit(e) {
            e.preventDefault();
            this.submitNewItem();
            this.updateTodoDataStorage();
            e.target.reset();
        }

        deleteTodoItem(deleteID) {
            this.todoList = this.todoList.filter(({id}) => id != deleteID);
            this.updateTodoDataStorage();
            this.getTodoElementById(deleteID).remove();

        }

        toggleTodoItem(idToToggle) {
            const todoItem = this.todoList.find(({id}) => id == idToToggle);
            todoItem.isDone = !todoItem.isDone;
            this.updateTodoDataStorage();
            this.renderTodoList();
        }

        submitNewItem() {
            const newTodoItem = {
                id: Date.now(),
                isDone: false
            };

            $newTodoForm.serializeArray().forEach(({name, value}) => {
                newTodoItem[name] = value;
            });

            this.todoList.push(newTodoItem);
            $todoList.append(this.getTodoItemHtml(newTodoItem))
        }

        renderTodoList() {
            const todoListItemsHtml = this.todoList.map(el => this.getTodoItemHtml(el));

            $todoList.html(todoListItemsHtml.join(''));
        }

        getTodoElementById(id) {
            return $(`[data-todo-index="${id}"]`);
        }

        updateTodoDataStorage() {
            localStorageService.setState('todo', this.todoList);
        }

        getTodoDataStorage() {
            return localStorageService.getState('todo');
        }


        getTodoItemHtml({id, description, isDone}) {
            return $todoItemTemplate
                .replace('{{id}}', id)
                .replace('{{description}}', description)
                .replace('{{isDoneClass}}', isDone ? ITEM_DONE_CLASS : '')
        }
    }

    const todoList = new Todo();
});
