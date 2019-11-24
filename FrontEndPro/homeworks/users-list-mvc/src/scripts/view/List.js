import $ from 'jquery';

export default class List {
    constructor(config) {
        this.config = config;
        this.$el = this.createElement();

        this.$listContainer = this.$el.children('#list-container');
        this.$addBtnElm = this.$el.children('#add-item__btn');

        this.$el.append(this.$listContainer)
            .append(this.$addBtnElm);

        this.bindEventListeners();
    }


    onItemClick(e) {
        const id = $(e.target).data('id');
        this.config.onItemClickGetInfo(id);
    }

    bindEventListeners() {
        this.$listContainer.on('click', '.list-item', this.onItemClick.bind(this));
        this.$addBtnElm.on('click', this.onAddBtnClick.bind(this));
    }

    onAddBtnClick() {
        debugger
        console.log('clicked');
        this.config.onAddBtnClick();
    }


    createElement() {
        return $(`<div>
          <ul id="list-container" class="list-container"></ul>
                <button id="add-item__btn" type="button" class="add-item__btn">ADD CONTACT</button>
        </div>`
        );
    }

    renderList(data) {
        this.$listContainer.empty();
        data.forEach(item => this.renderListItem(item));
    }


    renderListItem({id, name, surname}) {
        this.$listContainer.append(`<li class="list-item" data-id="${id}"> ${name} ${surname}</li>`);

    }


}
