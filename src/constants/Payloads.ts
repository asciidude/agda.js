export const Heartbeat = {
    op: 1,
    d: null
}

export const Identify = {
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