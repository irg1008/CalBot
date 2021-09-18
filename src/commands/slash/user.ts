import { SlashCommand } from "../../types/Discord.types";

export const command: SlashCommand = {
	name: "user",
	description: "Replies with user info!",
	execute: async (_, interaction) => {
		const user = interaction.user;

		if (user) {
			await interaction.followUp({
				content: `Your tag: ${user.tag}\nYour id: ${user.id}`,
			});
		} else {
			await interaction.followUp({ content: "User is not valid" });
		}
	},
};
