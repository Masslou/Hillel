import $ from 'jquery';

import Collection from "../model/Collection";
import ListView from "../view/List";
import Form from "../view/Form"

export default class Controller {
    constructor() {

        this.container = $(document.body);
        this.collection = new Collection;
        this.listView = new ListView({
            onItemToggleClick: this.onElementClickToggle.bind(this),
            onDeleteItemClick: this.onDeleteButtonClick.bind(this)
        });

        this.formView = new Form({
            onSubmit: this.onFormSubmit.bind(this)
        });

        this.container.append(this.listView.$el);
        this.container.append(this.formView.$el);


        this.collection.fetchServerData()
            .then(() => this.listView.renderList(this.collection.list));
    }

/// тут сделать логику подставления данных вместо toggle
    onElementClickToggle(id) {
        const model = this.collection.getModelItemById(id);
        model.toggle()
            .then(() => this.listView.renderList(this.collection.list));
    }

    onDeleteButtonClick(id) {
        this.collection.delete(id)
            .then(() => this.listView.renderList(this.collection.list));
    }

    onFormSubmit(data) {
        this.collection.add(data)
            .then(() => this.listView.renderList(this.collection.list));
    }
}
