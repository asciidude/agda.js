import Client from '../src/client/Client.js';
let client = new Client();

import dotenv from 'dotenv';
import { options } from '../src/ws/WebSocketManager.js';
dotenv.config();

options.debugMode = true;
options.debugMode_queue = true;

client.on('ready', async() => {
    await console.log(`${client.user.username} is now ready`);
});

client.on('message', async message => {
    if(message.content.toLowerCase() == 'ping') {
        message.channel.send('Pong');
    }
});

client.login(process.env.TOKEN);