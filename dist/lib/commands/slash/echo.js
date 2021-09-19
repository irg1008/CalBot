"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const echoExecute = async (_, interaction) => {
    const messageToEcho = interaction.options.getString("message");
    const target = interaction.options.getUser("user");
    if (target) {
        await target.send({
            content: messageToEcho,
        });
        await interaction.followUp({
            content: `${interaction.user} sent a message to ${target}`,
        });
    }
    else {
        await interaction.followUp({
            content: messageToEcho,
        });
    }
};
const command = {
    data: new builders_1.SlashCommandBuilder()
        .setName("echo")
        .setDescription("Echo your message")
        .addStringOption((option) => option
        .setName("message")
        .setDescription("Message that you want to echo")
        .setRequired(true))
        .addUserOption((option) => option
        .setName("user")
        .setDescription("User to sent message to")
        .setRequired(false)),
    execute: echoExecute,
};
exports.default = command;
//# sourceMappingURL=echo.js.map