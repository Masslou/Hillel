const $log = $('#log');
const $input = $('#message');
const name = 'Arthur Morgan';


$('#sendBtn').on('click', send)
const socket = new WebSocket('wss://fep-app.herokuapp.com/');

function addLog(message) {
    $log.append(`<div class="${message.type}"> ${message.name} : ${message.message}</div>`);
}


function sendMessage() {
    send('message', $input.val())
}

function send(type, message) {
    socket.send(
        JSON.stringify({
            name,
            type,
            message
        })
    )
}


socket.onopen = () => {
    send('Connected', 'Connected');
};

socket.onclose = () => {
  send('disconnected', 'Disconnected')
};


socket.onmessage = e => {
    const data = JSON.parse(e.data);

    addLog(data);
};
