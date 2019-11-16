import config from "../config";

export default class Collection {
    constructor() {
        console.log('collection started');
        this.setData = this.setData.bind(this)
    }

    fetch() {
        fetch(config.contactsURL).then(resp => resp.json())
            .then(this.setData);
    }


    setData(data){
        console.log('setting data', data)


    }
}
