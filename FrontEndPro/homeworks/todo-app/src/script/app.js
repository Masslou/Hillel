'use strict';

import '../assets/styles.css';
import $ from 'jquery';
import LocalStorageService from "./LocalStorageService";

$(function () {
    const $newTodoForm = $('#newTodoForm');
    const $todoItemTemplate = $('#toDoTemplate').html();

    const REMOVE_BTN_CLASS = `remove-btn`;
    const ADD_TODO_BTN_CLASS = 'add-todo-btn';
    const DONE_TODO_ITEM_CLASS = 'done';

    const localStorageService = new LocalStorageService();

    class Todo {

        constructor() {
            this.init();
        }

        init() {
            this.renderTodoList();
            this.bindEventListeners();
        }

        bindEventListeners() {
            $todoList.on('click', '.delete-bttn', this.onDeleteBtnClick.bind(this));
            $todoList.on('click', '.todo-item', this.onTodoItemClick.bind(this));
            $newTodoForm.on('submit', this.onNewTodoFormSubmit.bind(this));
        }

        onDeleteBtnClick(e) {
            e.stopPropagation();
            const $todoItem = $(e.target).parent();
            this.deleteTodoItem($todoItem.data('todoId'));
        }

        onTodoItemClick(e) {
            this.toggleTodoItem($(e.target).data('todoId'));
        }

        onNewTodoFormSubmit(e) {
            e.preventDefault();
            this.submitNewItem();

            localStorageService.setState('todo', this.todoListItems);

            e.target.reset();
        }

        deleteTodoItem(idToDelete) {
            this.todoListItems = this.todoListItems.filter(({id}) => id != idToDelete);
            localStorageService.setState('todo', this.todoListItems);

            ToDoList.getTodoElementById(idToDelete).remove();

        }

        toggleTodoItem(idToToggle) {
            const todoItem = this.todoListItems.find(({id}) => id == idToToggle);
            todoItem.isDone = !todoItem.isDone;
            localStorageService.setState('todo', this.todoListItems);

            this.toggleTodoElementState(todoItem);
        }

        submitNewItem() {
            const newTodoItem = {
                id: Date.now(),
                isDone: false
            };

            $newTodoForm.serializeArray().forEach(({name, value}) => {
                newTodoItem[name] = value;
            });

            this.todoListItems.push(newTodoItem);
            $todoList.append(this.getTodoItemHtml(newTodoItem))
        }

        renderTodoList() {
            const todoListItemsHtml = this.todoListItems.map(el => this.getTodoItemHtml(el));

            $todoList.html(todoListItemsHtml.join(''));
        }

        getTodoElementById(id) {
            return $(`[data-todo-index="${id}"]`);
        }

        toggleTodoElementState({id, isDone}) {
            const $todoItem = ToDoList.getTodoElementById(id);

            $todoItem.removeClass(TODO_ITEM_DONE_CLASS)
            if (isDone) {
                $todoItem.addClass(TODO_ITEM_DONE_CLASS);
            }
        }

        getTodoItemHtml({id, title, isDone}) {
            return $todoItemTemplate
                .replace('{{id}}', id)
                .replace('{{title}}', title)
                .replace('{{isDoneClass}}', isDone ? TODO_ITEM_DONE_CLASS : '')
        }
    }

    const todoList = new Todo();
});
