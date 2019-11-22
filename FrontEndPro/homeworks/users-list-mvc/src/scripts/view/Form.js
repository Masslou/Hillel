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


    createElement() {
        return $(`<form>
<input name="name" />
<input name="surname" />
<input name="email" />
<button>Save</button>
</form>`);
    }
}
