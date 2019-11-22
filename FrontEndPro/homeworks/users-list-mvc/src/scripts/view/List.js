import $ from 'jquery';

export default class List {
    constructor(config) {
        this.config = config;
        this.$el = this.createElement();

        this.$el.on('click', '.list-item', this.onItemRequestClick.bind(this));
        this.$el.on('click', '.delete-item-btn', this.onDeleteListItemClick.bind(this));
    }

    onItemRequestClick(e) {
        const id = $(e.target).data('id');
        this.config.onItemClickGetInfo(id);
    }

    onDeleteListItemClick(e) {
        e.stopPropagation();
        const id = $(e.target.parentElement).data('id');
        this.config.onDeleteItemClick(id);
    }

    createElement() {
        return $('<ul></ul>');
    }

    renderList(data) {
        console.log('rendering list', data);
        this.$el.empty();
        data.forEach(item => this.renderListItem(item));
    }

    renderListItem({id, name, surname, email}) {
        this.$el.append(`<li class="list-item" data-id="${id}"> ${name} ${surname} ${email} <span class="delete-item-btn">x</span> </li>`)

    }


}
