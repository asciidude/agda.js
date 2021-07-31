import WebSocketManager from '../ws/WebSocketManager.js';
import EventEmitter from 'events';

export default class Client extends EventEmitter {
    constructor() {
        super();
        this.wsc = new WebSocketManager(this);
    }

    user;
    login(token) {
        this.wsc.connect(token);
        this.token = token;
    }

    set user(user) {
        this.user = user;
    }

    get user() {
        return this.user;
    }
}