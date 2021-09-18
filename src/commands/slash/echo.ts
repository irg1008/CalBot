import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "../../types/Discord.types";

const echoExecute: SlashCommandExecute = async (_, interaction) => {
	const messageToEcho = interaction.options.getString("message");
	const user = interaction.options.getUser("target");

	if (user) {
		await user.send({
			content: messageToEcho,
		});
		await interaction.followUp({
			content: `Message sent to ${user.tag}`,
		});
	}

	await interaction.followUp({
		content: messageToEcho,
	});
};

export const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Echo your message")
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription("Message that you want to echo")
				.setRequired(true)
		)
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("User to sent message to")
				.setRequired(false)
		),
	execute: echoExecute,
};
