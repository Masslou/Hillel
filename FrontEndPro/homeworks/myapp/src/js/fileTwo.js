$(function(){
    const TODO_ITEM_DONE_CLASS = 'done';
    const $todoList = $('#todoList');
    const $newTodoForm = $('#newTodoForm');
    const $todoItemTemplate = $('#todoItemTemplate').html();

    const workWithData = new LocalStorage();

    class ToDoList{
        constructor(){
            this.todoListItems = workWithData.getDataLS('todoList');
            this.bindEventListeners();
            this.init();
        }

        init(){
            this.renderTodoList();
        }

        bindEventListeners() {
            $todoList.on('click', '.delete-bttn', this.onDeleteBtnClick.bind(this))
            $todoList.on('click', '.todo-item', this.onTodoItemClick.bind(this))
            $newTodoForm.on('submit', this.onNewTodoFormSubmit.bind(this))
        }

        onDeleteBtnClick(e){
            e.stopPropagation();
            const $todoItem = $(e.target).parent();
            this.deleteTodoItem($todoItem.data('todoIndex'));
        }
        onTodoItemClick(e){
            this.toggleTodoItem($(e.target).data('todoIndex'));
        }
        onNewTodoFormSubmit(e){
            e.preventDefault();
            this.submitNewItem();

            workWithData.setDataLS('todoList', this.todoListItems);

            e.target.reset();
        }

        deleteTodoItem(idToDelete){
            this.todoListItems = this.todoListItems.filter(({id}) => id != idToDelete);
            workWithData.setDataLS('todoList',this.todoListItems);

            ToDoList.getTodoElementById(idToDelete).remove();

        }
        toggleTodoItem(idToToggle){
            const todoItem = this.todoListItems.find(({id}) => id == idToToggle);
            todoItem.isDone = !todoItem.isDone;
            workWithData.setDataLS('todoList', this.todoListItems);

            ToDoList.toggleTodoElementState(todoItem);
        }
        submitNewItem(){
            const newTodoItem = {
                id: Date.now(),
                isDone: false
            }

            $newTodoForm.serializeArray().forEach(({name, value}) => {
                newTodoItem[name] = value;
            })

            this.todoListItems.push(newTodoItem);
            $todoList.append(ToDoList.getTodoItemHtml(newTodoItem))
        }

        renderTodoList(){
            const todoListItemsHtml = this.todoListItems.map(el => ToDoList.getTodoItemHtml(el));

            $todoList.html(todoListItemsHtml.join(''));
        }

        static getTodoElementById(id){
            return  $(`[data-todo-index="${id}"]`);
        }
        static toggleTodoElementState({id, isDone}){
            const $todoItem = ToDoList.getTodoElementById(id);

            $todoItem.removeClass(TODO_ITEM_DONE_CLASS)
            if(isDone) {
                $todoItem.addClass(TODO_ITEM_DONE_CLASS);
            }
        }
        static getTodoItemHtml({id, title, isDone}){
            return $todoItemTemplate
                .replace('{{id}}', id)
                .replace('{{title}}', title)
                .replace('{{isDoneClass}}', isDone ? TODO_ITEM_DONE_CLASS : '')
        }
    }
    const todoList = new ToDoList();
})
