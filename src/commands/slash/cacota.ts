import { SlashCommand } from "../../types/Discord.types";

export const command: SlashCommand = {
	name: "cacota",
	description: "Replies with cacota!",
	execute: async (_, interaction) => {
		await interaction.followUp({ content: `Una 💩 para ${interaction.user}!` });
	},
};
