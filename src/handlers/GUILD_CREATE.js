export default function(client, payload) {
    
    client.emit('guildCreate', payload.d);
}