"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    name: "server",
    description: "Replies with server info!",
    aliases: ["s"],
    execute: async (_, message) => {
        const guild = message.guild;
        if (guild) {
            await message.channel.send(`Server name: ${guild.name}\nTotal members: ${guild.memberCount}`);
        }
        else {
            await message.channel.send("You are not in a server right now");
        }
    },
};
exports.default = command;
//# sourceMappingURL=server.js.map