import config from "../config";
import Model from "./Model";

export default class Collection {
    constructor() {
        console.log('Collection started');
        this.list = [];
        this.setData = this.setData.bind(this)
    }

    fetchServerData() {
        return fetch(config.url)
            .then(resp => resp.json())
            .then(this.setData)
    }

    getModelItemById(id) {
        console.log('get model item by ID ' + id);

        console.log(this.list.find((item) => item.id == id));
        return this.list.find((item) => item.id == id)

    }

    setData(data) {
        this.list = data.map((item) => new Model(item));
    }

    delete(id) {
        const model = this.getModelItemById(id);
        console.log('model for delete' + model);
        this.list = this.list.filter(elem => elem != model);
    }

}
