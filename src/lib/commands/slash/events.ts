// Check if calendar has apiKey and calId
import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";
import { Events } from "google-calendar-node-api";
import { getTagsFromChannel } from "db/api";

const eventsExecute: SlashCommandExecute = async (
	{ calendar },
	interaction
) => {
	const { guildId, options, channelId } = interaction;

	const getAllOption = options.getBoolean("all");

	const errorHappened = () => {
		interaction.followUp({
			content:
				"Some error ocurred while retrieving events. Make sure you added the calendar api key and id with /setup",
		});
	};

	let events: Events[] = [];

	if (getAllOption) {
		const { data: allEvents, error } = await calendar.getEvents({});
		if (error) return errorHappened();
		events[0] = allEvents;
	} else {
		const channelTags = await getTagsFromChannel({ guildId, channelId });

		if (channelTags.length === 0) {
			interaction.followUp({
				content:
					"To retrieve events you must first add tags to the channel. Use /tags add",
			});
		} else {
			channelTags.forEach(async (tag) => {
				const { data: tagEvents, error } = await calendar.getEvents({ q: tag });
				console.log(error);
				if (error) return errorHappened();
				events.push(tagEvents);
			});
		}
	}

	interaction.followUp({
		content: "Successfuly retrieved events",
	});

	console.log(events);
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
