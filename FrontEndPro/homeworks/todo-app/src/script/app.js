'use strict';
import LocalStorageService from './LocalStorageService';
import $ from 'jquery';

$(function () {
    class Todo {

        constructor() {
            this.localStorageService = new LocalStorageService();
            this.$newTodoForm = $('#newTodoForm');
            this.$todoItemTemplate = $('#toDoTemplate').html();
            this.REMOVE_BTN_CLASS = `remove-btn`;
            this.ADD_TODO_BTN_CLASS = 'add-todo-btn';
            this.init();
        }

        init() {
            this.todoList = this.localStorageService.getState();
            this.renderTodoList();
            this.bindListners();
        }

        bindListners() {

            $todoList.on('click', '.delete-bttn', this.onDeleteBtnClick.bind(this));
            $todoList.on('click', '.todo-item', this.onTodoItemClick.bind(this));
            $newTodoForm.on('submit', this.addNewItem.bind(this));

        }


        onTodoListClick(e) {
            const $targetElem = $(this);
            const todoItems = $targetElem.parent();
            if ($targetElem.hasClass(this.REMOVE_BTN_CLASS)) {

            }
        }

        addNewItem(){
            const newTodoItem = {
                id: Date.now(),
                isDone: false
            };

            this.$newTodoForm.serializeArray().forEach(({name, value}) => {
                newTodoItem[name] = value;
            });

            this.todoListItems.push(newTodoItem);
            this.$todoList.append(ToDoList.getTodoItemHtml(newTodoItem))
        }

        renderTodoList() {
            const todoListItemHtml = this.todoList.map((element) => {
                return this.generateTodoItem(element)
            });

            this.$todoList.html(todoListItemHtml).join('');
        }


        generateTodoItem(id, description, isDone) {
            return this.$todoItemTemplate
                .replace('{{id}}', id)
                .replace('{{description}}', description)
                .replace('{{isDone}}', isDone ? 'done' : '');
        }

    }

    const todoList = new Todo();
});
