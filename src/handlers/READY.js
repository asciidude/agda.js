import ClientUser from "../client/ClientUser.js";
import { Identify } from "../constants/Payloads.js";

export default function(client, payload) {
    client.user = new ClientUser(
        payload.d.user.username,
        payload.d.user.discriminator,
        payload.d.user.verified,
        payload.d.user.id,
        payload.d.user.flags,
        payload.d.user.email,
        payload.d.user.bot,
        payload.d.user.avatar
    );
    
    client.emit('ready', client);
}