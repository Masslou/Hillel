'use strict';
import localStorage from './LocalStorageService';
import $ from 'jquery';

$(function () {
    class ToDoList {

        static $todoList = $('#todoList');
        static $newTodoForm = $('#newTodoForm');
        static $todoItemTemplate = $('#toDoTemplate');

        static REMOVE_BTN_CLASS = `remove-btn`;


        constructor() {
            this.init();
        }

        init() {
            this.renderTodoList();
            this.bindListners();
        }

        bindListners() {
            $todoList.on('click', onToDoListClick);
        }


        onToDoListClick(e) {
            const $targetElem = $(this);
            const todoItems = $targetElem.parent();
            if ($targetElem.hasClass(ToDoList.REMOVE_BTN_CLASS)) {

            }
        }

        renderTodoList() {
            const todoListItemHtml = ToDoList.$todoList.map((element) => {
                return generateToDoItem(element)
            });

            ToDoList.$todoList.html(todoListItemHtml).join('');
        }


        generateToDoItem(id, description, isDone) {
            return ToDoList.$todoItemTemplate
                .replace('{{id}}', id)
                .replace('{{description}}', description)
                .replace('{{isDone}}', isDone ? 'done' : '');
        }

    }
});
