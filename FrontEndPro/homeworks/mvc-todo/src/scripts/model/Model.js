import config from "../config";

export default class Model{
    constructor(data){
        // console.log('model started', data);
        Object.assign(this, data);
    }

    update(data){
        Object.assign(this, data);

        return this.save()
    }


    save(){
        return this.id ? this.saveUpdate() : this.saveCreate();
    }

    saveUpdate(){
        return fetch(config.toDosUrl+`/${this.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }
}
