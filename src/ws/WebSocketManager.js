//import { connectWebSocket, WebSocket } from "https://deno.land/std@0.68.0/ws/mod.ts";
//import { Heartbeat, Identify } from '../constants/Payloads.ts';
//import { Constants, OPCode } from '../constants/Constants.ts';
//import { Payload } from '../interfaces/Payloads.ts';
//import Client from '../client/Client.ts';

const WebSocket = require('ws');
const { Constants, OPCode } = require('../constants/Constants');
const { Heartbeat, Identify } = require('../constants/Payloads.js');
const { Client } = require('../client/Client.js');

class WebSocketManager {
    socket;
    interval = 0;
    socket = new WebSocket(Constants.GATEWAY);

    async login(token) {
        try {
            this.socket.on('message', async(message) => {
                const payload = JSON.parse(message.toString());
                console.log(payload);
                
                const { t: event, op } = payload;

                switch(op) {
                    case OPCode.HELLO:
                        console.log("An event was triggered");
                        break;

                    case OPCode.HELLO:
                        const { heartbeatInterval } = payload.d;
                        this.interval = this.heartbeat(heartbeatInterval);
                        await this.identify(token);
                        break;
                    
                    case OPCode.HEARTBEAT_ACK:
                        break;
                }

                if(event) {
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