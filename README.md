![Docs Build](https://readthedocs.org/projects/agdajs/badge/?version=latest) ![Main Language](https://img.shields.io/github/languages/top/pxpcandy/agda.js)

# agda.js v1
a discord library, still in development

# example (currently outdated in v1)
```js
import { Client } from './src/client/Client.js';
const client = new Client();

client.on('ready', () => {
    console.log("I am now ready - and cool B)");
});

client.on('guildCreate', () => {
    console.log("A cool guild has been created");
});

client.login('token');
```