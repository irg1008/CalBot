import { SlashCommandBuilder } from "@discordjs/builders";
import calendar from "calendar/client";
import { updateCalendarConfig } from "db/api";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

const setupExecute: SlashCommandExecute = async (_, interaction) => {
	const { guildId, options } = interaction;

	const apiKey = options.getString("key");
	const calId = options.getString("id");

	const updatedCorrectly = await updateCalendarConfig(guildId, {
		apiKey,
		calId,
	});

	if (updatedCorrectly) {
		await interaction.followUp({
			content: `We have changed calendar API key and id`,
		});
		// Change the config on the calendar object.
		calendar.updateConfig({ apiKey, calId });
	} else {
		await interaction.followUp({
			content: "We could't change the calendar API key and id. Try again",
		});
	}
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
