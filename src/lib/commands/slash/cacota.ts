import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "types/Discord.types";

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("cacota")
		.setDescription("Replies with cacota!"),
	execute: async (_, interaction) => {
		await interaction.followUp({ content: `Una 💩 para ${interaction.user}!` });
	},
};

export default command;
