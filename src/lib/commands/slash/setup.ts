import { SlashCommandBuilder } from "@discordjs/builders";
import { updateCalendarConfig } from "db/api";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

const setupExecute: SlashCommandExecute = async (_, { guildId, options }) => {
	const apiKey = options.getString("key");
	const calId = options.getString("id");

	await updateCalendarConfig(guildId, { apiKey, calId });
};

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("setup")
		.setDescription("Sets the bot calendar key and id")
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
