import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

const setupExecute: SlashCommandExecute = async (client, interaction) => {
	const guildId = interaction.guildId;

	const apiKey = interaction.options.getString("key");
	const calId = interaction.options.getString("id");

	const { error } = await client.db
		.from("GuildConfig")
		.upsert([{ guildId, apiKey, calId }]);

	error && console.error(error);
};

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("setup")
		.setDescription("Sets the bot calendar key or/id")
		.addStringOption((option) =>
			option
				.setName("key")
				.setDescription("API key to allow access to the calendar")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("id")
				.setDescription("Calendar ID of the calendar to get events from")
				.setRequired(true)
		),
	execute: setupExecute,
};

export default command;
