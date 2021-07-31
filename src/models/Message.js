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
}