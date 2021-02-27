const Constants = {
    GATEWAY: 'wss://gateway.discord.gg/?v=6&encoding=json'
}

const OPCode = {
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    PRESENCE_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    RESUME: 6,
    RECONNECT: 7,
    REQUEST_GUILD_MEMBERS: 8,
    INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11
}

module.exports.Constants = Constants;
module.exports.OPCode = OPCode;