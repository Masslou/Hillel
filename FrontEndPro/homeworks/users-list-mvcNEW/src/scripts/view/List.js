import $ from 'jquery';


export default class ViewContacts{
    constructor(config){
        this.config = config;

        this.$containerUsers = this.createElement();
        this.$listContacts = this.$containerUsers.children('#list-contacts');
        this.$bttnAddContacts = this.$containerUsers.children('#add-user');

        this.$containerUsers.append(this.$listContacts)
            .append(this.$bttnAddContacts);

        this.bindEventListeners();
    }
    bindEventListeners(){
        this.$listContacts.on('click', '.list-contacts__user', this.onUserClick.bind(this));
        this.$bttnAddContacts.on('click', this.onBttnAddUserClick.bind(this));
    }
    onUserClick(e){
        const id = this.getElemId($(e.target));
        this.config.onContactClick(id);
    }
    onBttnAddUserClick(e){
        this.config.onAddBttnClick();
    }
    getElemId($elem) {
        return $elem.data('userId');
    }
    createElement(){
        return $(
            `<div class="container-users">
                <span class="like-h2">List of Users:</span>
                <ul id="list-contacts"  class="list-contacts"></ul>
                <button id="add-user" type="button" class="add-user">Add</button>
            </div>`
        );
    }
    renderContactsList(data){
        this.$listContacts.empty();
        data.forEach(item => this. renderContactsItem(item));
    }
    renderContactsItem({id, name}){
        this.$listContacts.append(
            `<li class="list-contacts__user" data-user-id="${id}">${name}</li>`
        );
    }
}
