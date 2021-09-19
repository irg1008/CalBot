"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const getClientCommandsData = (client) => {
    const slashCommands = Array.from(client.slashCommands.values());
    const slashCommandsData = slashCommands.map((cmd) => cmd.data);
    return slashCommandsData;
};
const deploycommands = async (client) => {
    if (!client)
        throw new Error("Please provide a valid client");
    const { token, clientId, guildId } = client.config;
    const rest = new rest_1.REST({ version: "9" }).setToken(token);
    const commandsData = getClientCommandsData(client);
    // Rgister commands.
    try {
        await rest.put(v9_1.Routes.applicationCommands(clientId), {
            body: commandsData,
        });
        console.log("Slash commands desployed correctly");
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = deploycommands;
//# sourceMappingURL=desploySlashCommands.js.map