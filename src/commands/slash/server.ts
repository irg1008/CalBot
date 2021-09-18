import { SlashCommand } from "../../types/Discord.types";

export const command: SlashCommand = {
	name: "server",
	description: "Replies with server info!",
	aliases: ["s"],
	execute: async (_, interaction) => {
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
	},
};
