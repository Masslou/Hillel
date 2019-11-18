import config from "../config";
import Model from "./Model";

export default class Collection{
    constructor(){
        console.log('Collection started');
        this.list = [];
        this.setData = this.setData.bind(this)
    }

    fetchServerData(){
        return fetch(config.contactsUrl)
            .then(resp => resp.json())
            .then(this.setData)
    }

    setData(data){
        // console.log('setting Data', data)

        this.list = data.map((item) => new Model(item));
        // console.log(this.list)
    }
}
