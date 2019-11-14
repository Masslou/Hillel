'use strict';
import localStorageService from './LocalStorageService'
import $ from 'jquery';

$(function () {
    class ToDoList {

        static $todoList = $('#todoList');
        static $newTodoForm = $('#newTodoForm');
        static $todoItemTemplate = $('#toDoTemplate');


        constructor() {
            init();
        }

        init() {
            bindEventListners();
        }


        bindEventListners() {

        }

        // localStorageService
    }
});
