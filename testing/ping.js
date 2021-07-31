import Client from '../src/client/Client.js';
let client = new Client();

client.on('ready', async() => {
    await console.log(`${client.user.username} is now ready`);
});

client.on('message', async message => {
    if(message.content.toLowerCase() == "joe") {
        message.send('mama', message.channelID, client);
    }
});

/* Finally, log in */
client.login('ODAxNjQxNDU0NjAyMDI3MDE5.YAjoyA.tYMmIhZzgCQ9rdcn6OZ_3yIlCXY');