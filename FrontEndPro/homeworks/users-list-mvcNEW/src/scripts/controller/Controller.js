import $ from 'jquery';

import CollectionUsers from "../model/Collection";
import ViewContacts from '../view/List';
import FormInfo from '../view/Form';


export default class Controller{
    constructor(){
        this.collection = new CollectionUsers;
        this.contactsList = new ViewContacts({
            onContactClick: this.onListContactsClick.bind(this),
            onAddBttnClick: this.onAddBttnItemClick.bind(this),
        });

        this.formView = new FormInfo({
            onSubmit: this.onFormSubmit.bind(this),
            onDelete: this.onDeleteUser.bind(this),
        });

        $('#container').append(this.contactsList.$containerUsers)
            .append(this.formView.$formInfo);

        this.renderData = this.renderData.bind(this);
        this.refreshData();
        this.formView.openFormNewUser();
    }

    refreshData(){
        this.collection
            .fetchServerData()
            .then(this.renderData)
    }
    renderData(){
        this.contactsList.renderContactsList(this.collection.contactListUsers)
    }

    onListContactsClick(id){
        const model = this.collection.getModelById(id);
        this.formView.showUserInfo(model);
    }
    onFormSubmit(data){
        if (data.id){
            this.collection.updateUser(data)
                .then(this.renderData);
        } else {
            this.collection.createUser(data)
                .then(this.renderData);
        }
    }
    onAddBttnItemClick(){
        this.formView.openFormNewUser();
    }
    onDeleteUser(id){
        this.collection.deleteUser(id)
            .then(this.renderData());
    }

}
