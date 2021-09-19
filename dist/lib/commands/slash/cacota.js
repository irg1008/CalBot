"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const command = {
    data: new builders_1.SlashCommandBuilder()
        .setName("cacota")
        .setDescription("Replies with cacota!"),
    execute: async (_, interaction) => {
        await interaction.followUp({ content: `Una 💩 para ${interaction.user}!` });
    },
};
exports.default = command;
//# sourceMappingURL=cacota.js.map