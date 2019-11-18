import $ from 'jquery';

import Collection from "../model/Collection";
import ListView from "../view/List";
import config from "../config.js";

export default class Controller {
    constructor() {

        this.collection = new Collection;
        this.listView = new ListView({
            onItemToggleClick: this.onElementClickToggle.bind(this),
            onDeleteItemClick: this.onDeleteButtonClick.bind(this)
        });
        $(document.body).append(this.listView.$el);

        this.collection.fetchServerData()
            .then(() => this.listView.renderList(this.collection.list));
    }


    onElementClickToggle(id) {
        const model = this.collection.getModelItemById(id);
        model.toggleElement()
            .then(() => this.listView.renderList(this.collection.list));
    }

    onDeleteButtonClick(id) {
        fetch(config.url + `/${id}`, {
            method: 'DELETE'
        }).then(() => this.collection.delete(id)).then(() => this.listView.renderList(this.collection.list));
    }
}
