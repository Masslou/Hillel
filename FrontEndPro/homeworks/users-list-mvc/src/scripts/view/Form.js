import $ from 'jquery';

export default class Form {
    constructor(config) {
        this.config = config;
        this.$el = this.createElement();
        this.bindEvents();
    }


    bindEvents() {
        this.$el.on('submit', (e) => {
            e.preventDefault();
            this.onSubmit();
        })
    }

    onSubmit() {
        const obj = {};
        this.$el.serializeArray().forEach(({name, value}) => {
            obj[name] = value

        });


        this.config.onSubmit(obj);
        this.$el[0].reset();

    }

    renderItemInfo(data) {
        $('#name').val(data.name);
        $('#surname').val(data.surname);
        $('#email').val(data.email);
    }


    createElement() {
        return $(`<form>
<input id="name" name="name" />
<input id="surname" name="surname" />
<input id="email" name="email" />
<button>Save</button>
</form>`);
    }
}
