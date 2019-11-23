import config from '../config';
import Model from './Model';


export default class CollectionUsers{
    constructor(){
        this.contactListUsers = [];
    }
    fetchServerData(){
        return fetch(config.contactsUrl)
            .then(resp => resp.json())
            .then((data) => {
                this.setData(data)
            })
    }
    setData(data){
        this.contactListUsers = data.map((elem ) => new Model(elem));
    }
    getModelById(id) {
        return this.contactListUsers.find((elem) => elem.id == id);
    }
    deleteUser(id){
        const model = this.getModelById(id);
        this.contactListUsers = this.contactListUsers.filter(elem => elem != model);
        return model.deleteContact();
    }
    createUser(data){
        const model = new Model(data);
        this.contactListUsers.push(model);
        return model.saveContact();
    }
    updateUser(data) {
        this.contactListUsers.forEach(elem => {
            if (elem.id == data.id) {
                elem.name = data.name;
                elem.surname = data.surname;
                elem.email = data.email;
                elem.phone = data.phone;
            }
        });

        const model = this.getModelById(data.id);

        return model.saveContact();
    }
}
