import fetch from 'node-fetch';
import Client from '../client/Client.js';
import { Gateway } from '../constants/Constants.js';

export default class Message {
    constructor(
        isTTS, timestamp, repliedTo, isPinned, nonce, mentions, mentionedRoles,
        mentionedEveryone, member, id, flags, embeds, editedTimestamp, content, components,
        channelID, author
        ) {
        this.isTTS = isTTS,
        this.timestamp = timestamp,
        this.repliedTo = repliedTo,
        this.isPinned = isPinned,
        this.nonce = nonce,
        this.mentions = mentions,
        this.mentionedRoles = mentionedRoles,
        this.mentionedEveryone = mentionedEveryone,
        this.member = member,
        this.id = id,
        this.flags = flags,
        this.embeds = embeds,
        this.editedTimestamp = editedTimestamp,
        this.content = content,
        this.components = components,
        this.channelID = channelID,
        this.author = author
    }

    /**
    * Sends a message to a channel
    * @param {String} content The message content
    * @param {Number} channel The channel ID that the message will be sent in
    * @param {Client} client The client class that you are using, used for API auth
    * @param {Object} options tts?: boolean
    */
    async send(content, channel, client, options={tts:false}) {
       let data = {
           'content': content,
           'tts': options.tts
       };

       await fetch(`${Gateway.API}/channels/${channel}/messages`, {
           method: 'POST',
           body: JSON.stringify(data),
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bot ${client.token}`
           }
       });
    }
}