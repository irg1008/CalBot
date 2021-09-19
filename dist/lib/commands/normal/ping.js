"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    name: "ping",
    description: "Replies with Pong!",
    aliases: ["p"],
    execute: async (client, message) => {
        await message.channel.send(`${client.ws.ping} ping!`);
    },
};
exports.default = command;
//# sourceMappingURL=ping.js.map