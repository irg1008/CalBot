import { SlashCommand } from "../../types/Discord.types";

export const command: SlashCommand = {
	name: "cacota",
	description: "Replies with cacota!",
	aliases: ["c", "m"],
	execute: async (_, interaction) => {
		await interaction.followUp({ content: `Una 💩 para ${interaction.user}!` });
	},
};
