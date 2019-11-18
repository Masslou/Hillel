import config from "../config";
import Model from "./Model";

export default class Collection {
    constructor() {
        this.list = [];
        this.setData = this.setData.bind(this)
    }

    fetchServerData() {
        return fetch(config.url)
            .then(resp => resp.json())
            .then(this.setData)
    }

    getModelItemById(id) {

        return this.list.find((item) => item.id == id)

    }

    setData(data) {
        this.list = data.map((item) => new Model(item));
    }

    delete(id) {
        const model = this.getModelItemById(id);
        return this.list = this.list.filter(elem => elem != model);

    }

}
