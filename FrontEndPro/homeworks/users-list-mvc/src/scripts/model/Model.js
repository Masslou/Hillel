import config from "../config";

export default class Model {
    constructor(data) {
        Object.assign(this, data);
    }

    update(data) {
        Object.assign(this, data);

        return this.save()
    }


    save() {
        return this.id ? this.saveUpdate() : this.saveCreate();
    }

    saveUpdate() {
        return fetch(config.url + `/${this.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }

    saveCreate() {
        return fetch(config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        }).then(res => res.json()).then(data => this.update(data));
    }

    toggle() {
        this.isDone = !this.isDone;
        return this.save();
    }

    delete(id) {
        return fetch(config.url + `/${id}`, {
            method: 'DELETE'
        })
    }
}
