import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

const echoExecute: SlashCommandExecute = async (_, interaction) => {
	const messageToEcho = interaction.options.getString("message");
	const target = interaction.options.getUser("user");

	if (target) {
		await target.send({
			content: messageToEcho,
		});
		await interaction.followUp({
			content: `${interaction.user} sent a message to ${target}`,
		});
	} else {
		await interaction.followUp({
			content: messageToEcho,
		});
	}
};

const command: SlashCommand = {
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

export default command;
