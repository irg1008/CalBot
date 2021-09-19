"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = {
    name: "messageCreate",
    execute: (client, message) => {
        const isNotCommand = message.author.bot ||
            !message.guild ||
            !message.content.startsWith(client.config.prefix);
        if (isNotCommand)
            return;
        const [commandName, ...args] = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(" "); // One or more spaces.
        const command = client.commands.get(commandName.toLowerCase()) ||
            client.aliases.get(commandName.toLowerCase());
        if (command)
            command.execute(client, message, args);
    },
};
exports.default = event;
//# sourceMappingURL=messageCreate.js.map