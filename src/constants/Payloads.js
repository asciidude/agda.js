const Heartbeat = {
    op: 1,
    d: null
}

const Identify = {
    op: 10,
    d: {
        token: '',
        properties: {
            $os: 'linux',
            $browser: 'agda-discord-lib',
            $device: 'agda-discord-lib'
        }
    }
}

module.exports.Heartbeat = Heartbeat;
module.exports.Identify = Identify;