import WebSocket from 'ws';
import { Gateway } from '../constants/Constants.js';
import { OPCodes } from '../constants/OPCodes.js';
import { Heartbeat, Identify } from '../constants/Payloads.js';

export default class WebSocketManager {
    constructor() {
        this.options = {
            debugMode: true,
            debugMode_payloads: true,
            debugMode_connection: true,
            debugMode_heartbeats: true,
            useOS: 'linux',
            intents: 513,
            gateway_version: '9'
        };

        Gateway.VERSION = this.options.gateway_version;
        this.wsc = new WebSocket(Gateway.URL);
    }

    async connect(token) {
        try {
            this.wsc.on('message', async (data) => {
                let payload = JSON.parse(data.toString());
                if(this.options.debugMode && this.options.debugMode_payloads) {
                    console.warn('--- DEBUG: PAYLOAD RECIEVED ---');
                    console.warn(payload)
                }

                /* https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure */
                switch(payload.op) {
                    case OPCodes.DISPATCH:
                        if(this.options.debugMode && this.options.debugMode_payloads) {
                            console.warn('--- DEBUG: EVENT TRIGGERED ---');
                            console.warn(payload)
                        }
                        break;
                    case OPCodes.HELLO:
                        let { t: event, s, op, d } = payload;
                        this.sendHeartbeat(d.heartbeat_interval, { t: OPCodes.IDENTIFY, d: null });
                        await this.identify(token);
                    case OPCodes.HEARTBEAT_ACK:
                        if(this.options.debugMode && this.options.debugMode_payloads) {
                            console.warn('--- DEBUG: HEARTBEAT ACKNOWLEDGED ---');
                            console.warn(payload)
                        }
                        break;
                }
            });
        } catch(error) {
            throw error;
        }
    }

    async sendHeartbeat(interval_ms, data) {
        setInterval(async () => {
            if(this.options.debugMode && this.options.debugMode_heartbeats) {
                console.log('--- DEBUG: HEARTBEAT SENT ---');
                console.log(`Heartbeat sent with data ${JSON.stringify(data)}`);
            }
            await this.wsc.send(JSON.stringify(Heartbeat));
        }, interval_ms);
    }

    async identify(token) {
        try {
            Identify.d.token = token;
            Identify.d.intents = this.options.intents;
            return this.wsc.send(JSON.stringify(Identify));
        } catch(error) {
            throw error;
        }
    }
}