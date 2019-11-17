import Collection from "../model/Collection";

export default class Controller{
    constructor(){
        console.log('controller started');

        this.collection = new Collection();
    }
}
