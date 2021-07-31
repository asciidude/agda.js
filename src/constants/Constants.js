export const Gateway = {
    URL: undefined,
    API: undefined,
    VERSION: 9,
}

Gateway.URL = `wss://gateway.discord.gg/?v=${Gateway.VERSION}&encoding=json`;
Gateway.API = `https://discord.com/api/v${Gateway.VERSION}`;