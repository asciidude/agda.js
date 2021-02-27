const { WebSocketManager } = require('./src/ws/WebSocketManager.js');
const ws = new WebSocketManager();

ws.login('token');
