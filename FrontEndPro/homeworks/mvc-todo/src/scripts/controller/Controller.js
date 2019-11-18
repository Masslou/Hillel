import $ from 'jquery';

import Collection from "../model/Collection";
import ListView from "../view/List";

export default class Controller{
    constructor(){

        this.collection = new Collection;
        this.listView = new ListView({
            onItemClick: this.onListItemClick.bind(this)
        });
        $(document.body).append(this.listView.$el);

        this.collection.fetchServerData()
            .then(() => this.listView.renderList(this.collection.list));
    }

    onListItemClick(id){
        console.log('clicked', id);

        const model = this.collection.list.find((item) => item.id == id);

        model.update({name: 'John', surname: 'Doe'})
            .then(() => this.listView.renderList(this.collection.list));
    }

    onDeleteButtonClick(id){
        const model = this.collection.list.find((item) => item.id == id);

    }
}
