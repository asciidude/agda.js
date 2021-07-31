import { options } from "../src/ws/WebSocketManager";

options.debugMode = true; /* Enable or disbale "Debug Mode" */
options.debugMode_connection = true; /* Log connection to the Discord Gateway */
options.debugMode_events = true; /* Log event names */
options.debugMode_heartbeats = true; /* Log heartbeats (ACK & SENT) */
options.debugMode_payloads = true; /* Log __all__ payloads */

options.intents = 513; /* Set intents, default is 513 */
options.useOS = 'linux'; /* Set the OS to use, default is Linux */