import moment from "moment";
import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";
import { getCalendarEvents, Event } from "google-calendar-node-api";
import { getTagsFromChannel, getCalendarConfig } from "db/api";
import getCalendarImgWithEvents from "utils/getCalendarImg";
import Discord, {
	MessageEmbed,
	MessageAttachment,
	EmbedFieldData,
} from "discord.js";

const createRichEmbedForEvents = async (events: Event[]) => {
	// TODO: Create embedded and avoid numerous loops here.
	// TODO: Get as much images as events on different months.
	// TODO: Implement these with the loop command. Maybe disbale loop public state and only use here.

	const eventDates = events.map((event) => moment(event.end.date));
	const eventDays = eventDates.map((date) => date.date() - 1);
	const month = eventDates[0].month();
	const year = eventDates[0].year();

	// Create embedded.
	const embed = new MessageEmbed()
		.setColor("#099ff")
		.setTitle("Próximos Eventos")
		.setDescription("Estos son los próximos eventos para este canal:")
		.setAuthor("CalBot - Tu calendario de confianza");

	// Set thumbnail.
	const thumbFile = new MessageAttachment(
		"static/bot_medium.png",
		"thumbnail.png"
	);
	embed.setThumbnail("attachment://thumbnail.png");

	// Set images.
	const base64Img = await getCalendarImgWithEvents(month, year, eventDays);
	const imageStream = Buffer.from(base64Img, "base64");
	const file = new MessageAttachment(imageStream, "img.png");
	embed.setImage("attachment://img.png");

	// Add events entries.
	const fields: EmbedFieldData[] = events.map((event, i) => ({
		name: event.summary,
		value: moment(event.start.date).format("DD/MM/YYYY"),
	}));
	embed.setFields(fields);

	return { embeds: [embed], files: [file, thumbFile] };
};

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
		if (allEvents.items.length === 0) return await errorHappened();
	} else {
		const channelTags = await getTagsFromChannel({ guildId, channelId });

		if (channelTags.length === 0) {
			await interaction.followUp({
				content:
					"To retrieve channel events you must first add tags to the channel. Use /tags add",
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

	if (events.length > 0) {
		const { embeds, files } = await createRichEmbedForEvents(events);
		await interaction.followUp({ embeds, files });
	}
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
