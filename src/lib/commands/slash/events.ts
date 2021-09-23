// Check if calendar has apiKey and calId
import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";
import { getCalendarEvents, Event } from "google-calendar-node-api";
import { getTagsFromChannel, getCalendarConfig } from "db/api";

const eventsExecute: SlashCommandExecute = async (_, interaction) => {
	const { guildId, options, channelId } = interaction;

	const getAllOption = options.getBoolean("all");
	const calendarConfig = await getCalendarConfig(guildId);

	const errorHappened = async () => {
		await interaction.followUp({
			content:
				"Some error ocurred while retrieving events. Make sure you added the calendar api key and id with /setup",
		});
	};

	let events: Event[] = [];

	if (getAllOption) {
		const { data: allEvents, error } = await getCalendarEvents({
			...calendarConfig,
		});
		if (error) return await errorHappened();
		events = allEvents.items;
	} else {
		const channelTags = await getTagsFromChannel({ guildId, channelId });

		if (channelTags.length === 0) {
			await interaction.followUp({
				content:
					"To retrieve events you must first add tags to the channel. Use /tags add",
			});
		} else {
			for (const tag of channelTags) {
				const { data: tagEvents, error } = await getCalendarEvents({
					q: tag,
					...calendarConfig,
				});
				if (error) return await errorHappened();
				events.push(...tagEvents.items);
			}
		}
	}

	const eventNames = events.map((event) => event.summary);

	await interaction.followUp({
		content: `Successfuly retrieved events. N: ${
			events.length
		}\n${JSON.stringify(eventNames, null, 2)}`,
	});
};

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("events")
		.setDescription(
			"Shows all events or only the ones with the tags of the channel you are in."
		)
		.addBooleanOption((option) =>
			option
				.setName("all")
				.setDescription("Shows all events")
				.setRequired(false)
		),
	execute: eventsExecute,
};

export default command;
