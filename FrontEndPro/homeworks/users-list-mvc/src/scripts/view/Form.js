import $ from 'jquery';

export default class Form {
    constructor(config) {
        this.config = config;
        this.$el = this.createElement();
        this.bindEvents();
    }


    bindEvents() {
        this.$el.on('submit', this.onSubmit.bind(this));
        this.$el.on('click', '#delete-btn', this.onDeleteListItemClick.bind(this));
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {};
        this.$el.serializeArray().forEach(({name, value}) => {
            obj[name] = value
        });
        this.config.onSubmit(obj);
        this.openFormNewUser()
    }

    onDeleteListItemClick(e) {
        e.stopPropagation();
        const id = $('#id-input').val();
        debugger
        this.config.onDelete(id);
        this.openFormNewUser();
    }

    renderItemInfo(data) {
        this.showDelBtn();
        $('#id-input').val(data.id);
        $('#name').val(data.name);
        $('#surname').val(data.surname);
        $('#email').val(data.email);
    }

    resetForm() {
        this.$el[0].reset();
    }

    createElement() {
        return $(`
            <form action="#" id="add-item-form" class="add-form">
                        <input type="text" name="name" id="name" placeholder="Name">
                        <input type="text" name="surname" id="surname" placeholder="Surname">
                        <input type="email" name="email" id="email" placeholder="E-mail">
                            <button type="submit" id="save-btn">Save</button>
                            <button type="button" id="delete-btn">Delete</button>
                    <input name = "id" type="hidden" id="id-input">
            </form>`
        );
    }

    openFormNewUser() {
        this.resetForm();
        $('#idInput').val('');
        this.removeDelBtn()
    }

    showDelBtn() {
        $('#delete-btn').removeClass('hidden');
    }

    removeDelBtn() {
        $('#delete-btn').addClass('hidden')
    }
}
