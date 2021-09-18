import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../../types/Discord.types";

export const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	execute: async (client, interaction) => {
		await interaction.followUp({ content: `${client.ws.ping}ms!` });
	},
};
