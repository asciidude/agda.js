export const Hello = {
    op: 10,
    d: null
}

export const Heartbeat = {
    op: 1,
    d: null
}

export const Identify = {
    op: 2,
    d: {
        token: '', /* Identify.d.token */
        intents: 513, /* Identify.d.intents */
        properties: {
            $os: 'linux',
            $browser: 'agdajs',
            $device: 'agdajs'
        }
    }
}