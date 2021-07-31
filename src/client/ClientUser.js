export default class ClientUser {
    constructor(username, discriminator, verified, id, flags, bot, avatar, token) {
        this.username = username,
        this.discriminator = discriminator,
        this.verified = verified,
        this.id = id,
        this.flags = flags,
        this.bot = bot,
        this.avatar = avatar,
        this.token = token
    }
}