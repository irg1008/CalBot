import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "../../types/Discord.types";

const userEsecute: SlashCommandExecute = async (_, interaction) => {
	const user = interaction.user;

	if (user) {
		await interaction.followUp({
			content: `Your tag: ${user.tag}\nYour id: ${user.id}`,
		});
	} else {
		await interaction.followUp({ content: "User is not valid" });
	}
};

export const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Replies with user info!"),
	execute: userEsecute,
};
