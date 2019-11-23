import config from '../config';


export default class Model{
    urlTask(){
        return config.url + `/${this.id}`
    }

    constructor(data){
        this.setData(data);
    }
    setData(data){
        Object.assign(this, data);
    }
    saveContact(){
        return this.id ? this.updateContact() : this.createContact();
    }
    updateContact(){
        return fetch(`${this.urlTask()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }
    createContact(){
        return fetch(config.contactsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        })
            .then(res => res.json())
            .then((data) => {
                this.setData(data)
            });
    }
    deleteContact(){
        return fetch(`${this.urlTask()}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
