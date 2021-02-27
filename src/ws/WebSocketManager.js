const WebSocket = require('ws');
const { Constants, OPCode } = require('../constants/Constants');
const { Heartbeat, Identify } = require('../constants/Payloads.js');
const { Client } = require('../client/Client.js');

class WebSocketManager {
    interval = 0;
    
    constructor() {
        this.socket = new WebSocket(Constants.GATEWAY);
    }

    async login(token) {
        try {
            this.socket.on('message', async message => {
                const payload = JSON.parse(message.toString());
                console.log(payload);
                
                const { t: event, s, op, d } = payload;
                
                switch(op) {
                    case OPCode.HELLO:
                        console.log("An event was triggered");
                        break;

                    case OPCode.HELLO:
                        const { heartbeatInterval } = d;
                        this.interval = this.heartbeat(heartbeatInterval);
                        await this.identify(token);
                        break;
                    
                    case OPCode.HEARTBEAT_ACK:
                        break;
                }

                if (event) {
                    console.log(event);
                }
            });
        } catch(err) {
            console.log("An unexpected error occured, error: \n" + err);
            return err;
        }
    }

    heartbeat(ms) {
        return setInterval(() => {
            this.socket.send(JSON.stringify(Heartbeat));
        }, ms);
    }

    async identify(token) {
        Identify.d.token = token;
        return this.socket.send(JSON.stringify(Identify))
    }
}


module.exports.WebSocketManager = WebSocketManager;