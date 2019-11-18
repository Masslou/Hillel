import $ from 'jquery';

export default class List {
    constructor(config){
        this.config = config;

        this.$el = this.createElement();

        this.$el.on('click', '.list-item', this.onListItemClick.bind(this))
    }

    onListItemClick(e){
        const id = $(e.target).data('id');

        this.config.onItemClick(id);
    }

    createElement(){
        return $('<ul></ul>');
    }

    renderList(data){
        console.log('rendering list', data);
        this.$el.empty();
        data.forEach(item => this.renderListItem(item));
    }

    renderListItem({id, title}){
        this.$el.append(`<li class="list-item" data-id="${id}">${title}</li>`)
    }


}
