export default class Chat {
    constructor(config) {
        this.websocket = new WebSocket('ws://fep-app.herokuapp.com');

        this.onMsg = config.onMessage;

        this.onmessage();
        this.onopen();
    }

    send(name, message) {
        this.websocket.send(JSON.stringify({
            name,
            message
        }))
    }

    message(name, message){
        this.send(name,'message', message);
    }

    onopen(name) {
        this.websocket.onopen = () => {
            this.send(name, 'connected', 'connected')
        }
    }

    onmessage() {
        let data;
        this.websocket.onmessage = e => {
            data = JSON.parse(e.data);
            this.onMsg(data)
        }

    }


}
