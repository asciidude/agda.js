import Message from '../models/Message.js';

export default function(client, payload) {
    let message = new Message(
        payload.d.tts,
        payload.d.timestamp,
        payload.d.referenced_message,
        payload.d.pinned,
        payload.d.nonce,
        payload.d.mentions,
        payload.d.mention_roles,
        payload.d.mention_everyone,
        payload.d.member,
        payload.d.id,
        payload.d.flags,
        payload.d.embeds,
        payload.d.edited_timestamp,
        payload.d.content,
        payload.d.components,
        payload.d.channel_id,
        payload.d.author,
        client
    );

    client.emit('message', message);
}