import * as websockets from "https://deno.land/std@0.88.0/ws/mod.ts";
import { Heartbeat, Identify } from '../constants/Payloads.ts';
import { Constants, OPCode } from '../constants/Constants.ts';

export default class WebSocketManager {
    private ws: WebSocket | undefined;
    private interval: any;

    // Connect to WebSocket
    async login(token: string) {
        try {
            // Connect to the gateway
            try {
                this.ws = new WebSocket(Constants.GATEWAY);
            } catch(e) {
                console.error(new Error("Unable to connect to gateway, detailed error:\n" + e))
            }

            if(!this.ws) return;

            // Notify the user they connected to the Discord Gateway
            this.ws.onopen = (() => console.log("Connected to Discord Gateway"));

            this.ws.onmessage = (async(message) => {
                // Get payload data
                const payload = JSON.parse(message.data);
                //console.log(payload);

                const { t: event, s, op, d } = payload;
                const { heartbeatInterval } = d;

                // op codes, woohoo!
                switch(op) {
                    // Send hearbeat & identify ourselves
                    case OPCode.TEN:
                        this.interval = this.heartbeat(heartbeatInterval);
                        await this.identify(token);
                        break;
                }
            });
        } catch (e) {
            return e;
        }
    }

    heartbeat(ms: number) {
        return setInterval(async() => {
            if(!this.ws) return; if(this.ws.readyState !== 1) return;
            await this.ws.send(JSON.stringify(Heartbeat));
        }, ms);
    }

    async identify(token: string) {
        if(!this.ws) return; if(this.ws.readyState !== 1) return;
        Identify.d.token = token;
        return this.ws.send(JSON.stringify(Identify));
    }
}
