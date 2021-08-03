import fetch from 'node-fetch';
import { Gateway } from '../constants/Constants.js';

import Ratelimit from '../utils/Ratelimit.js';
let rl = new Ratelimit(5, 4000);
import Queue from 'promise-queue';
var queue = new Queue(1, Infinity);

export default class MessageChannel {
    constructor(channelID, client) {
        this.channelID = channelID;
        this.client = client;
    }

    /**
     * Sends a message to a channel
     * @param {String} content The message content
     * @param {Object} options tts?: boolean
    */
    async send(content, options = {
        tts: false
    }) {
        await queue.add(async () => {
            await rl.ready();

            await fetch(`${Gateway.API}/channels/${this.channelID}/messages`, {
                method: 'POST',
                body: JSON.stringify({
                    'content': content,
                    'tts': options.tts
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${this.client.token}`
                }
            });
        });
    }
}