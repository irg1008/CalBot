import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "../../types/Discord.types";

const serverExecute: SlashCommandExecute = async (_, interaction) => {
	const guild = interaction.guild;

	if (guild) {
		await interaction.followUp({
			content: `Server name: ${guild.name}\nTotal members: ${guild.memberCount}`,
		});
	} else {
		await interaction.followUp({
			content: "You are not in a server right now",
		});
	}
};

export const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Replies with server info!"),
	execute: serverExecute,
};
