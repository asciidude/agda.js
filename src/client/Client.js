const { EventEmitter } = require('events');
const WebSocketManager = require('../ws/WebSocketManager');

class Client extends EventEmitter {
    socket = new WebSocketManager(this);
}

module.exports.Client = Client;