import WebSocket from 'ws';
import { Gateway } from '../constants/Constants.js';
import { OPCodes } from '../constants/OPCodes.js';
import { Heartbeat, Identify } from '../constants/Payloads.js';

export let options = {
    debugMode: false,
    debugMode_payloads: false,
    debugMode_connection: false,
    debugMode_heartbeats: false,
    debugMode_events: false,
    
    useOS: 'linux',
    intents: 513,
    gateway_version: '9'
};

export default class WebSocketManager {
    constructor(client, token) {
        Gateway.VERSION = options.gateway_version;
        this.wsc = new WebSocket(Gateway.URL);
        this.client = client;
    }

    async connect(token) {
        try {
            this.wsc.on('message', async (data) => {
                let payload = JSON.parse(data.toString());
                let { t: event, op, d } = payload;

                if(options.debugMode && options.debugMode_payloads) {
                    console.warn('--- DEBUG: PAYLOAD RECIEVED ---');
                    console.warn(payload);
                }

                /* https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure */
                switch(op) {
                    case OPCodes.DISPATCH:
                        if(options.debugMode && options.debugMode_payloads) {
                            console.warn('--- DEBUG: EVENT PAYLOAD RECIEVED ---');
                            console.warn(payload);
                        }
                        break;
                    case OPCodes.HELLO:
                        this.sendHeartbeat(d.heartbeat_interval, { t: OPCodes.IDENTIFY, d: null });
                        await this.identify(token);
                    case OPCodes.HEARTBEAT_ACK:
                        if(options.debugMode && options.debugMode_payloads) {
                            console.warn('--- DEBUG: HEARTBEAT ACKNOWLEDGED ---');
                            console.warn(payload);
                        }
                        break;
                }

                if(event) {
                    if(options.debugMode && options.debugMode_events) {
                        console.warn('--- DEBUG: EVENT TRIGGERED ---');
                        console.warn(event);
                    }
                    
                    try {
                        await import(`../handlers/${event}.js`).then(module => module.default(this.client, payload));
                    } catch(error) {
                        throw error;
                    }
                }
            });
        } catch(error) {
            throw error;
        }
    }

    async sendHeartbeat(interval_ms, data) {
        setInterval(async () => {
            if(options.debugMode && options.debugMode_heartbeats) {
                console.log('--- DEBUG: HEARTBEAT SENT ---');
                console.log(`Heartbeat sent with data ${JSON.stringify(data)}`);
            }
            await this.wsc.send(JSON.stringify(Heartbeat));
        }, interval_ms);
    }

    async identify(token) {
        try {
            Identify.d.token = token;
            Identify.d.intents = options.intents;
            return this.wsc.send(JSON.stringify(Identify));
        } catch(error) {
            throw error;
        }
    }
}