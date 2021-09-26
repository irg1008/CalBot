import moment from "moment";
import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";
import { getCalendarEvents, Event } from "google-calendar-node-api";
import { getTagsFromChannel, getCalendarConfig } from "db/api";
import getCalendarImgWithEvents from "utils/getCalendarImg";
import { MessageEmbed, MessageAttachment, EmbedFieldData } from "discord.js";

const createRichEmbedForEvents = async (
	events: Event[],
	tags: string[],
	all: boolean
) => {
	// Create embedded.
	const embed = new MessageEmbed()
		.setColor("#5A55F8")
		.setTitle("Próximos Eventos")
		.setDescription(
			all
				? "Estos son todos los eventos:"
				: "Estos son los próximos eventos para este canal:"
		)
		.setAuthor("CalBot - Tu calendario de confianza")
		.setFooter(
			all
				? "Mostrando todos los eventos."
				: `Etiquetas del canal: ${tags.join(", ")}.`
		);

	// Set thumbnail.
	const thumbFile = new MessageAttachment(
		"static/bot_medium.png",
		"thumbnail.png"
	);
	embed.setThumbnail("attachment://thumbnail.png");

	// Sort events by date.
	console.log("--------------------");
	console.log(events.map((event) => event.start));
	console.log("--");
	events = events.sort((a, b) => {
		const getDateFromEvent = (e: Event) =>
			moment(e.start.date || e.start.dateTime);
			
		const aDate = getDateFromEvent(a);
		const bDate = getDateFromEvent(b);

		if (bDate.isAfter(aDate)) return -1;
		if (bDate.isSame(aDate)) return 0;
		return 1;
	});
	console.log(events.map((event) => event.start));
	console.log("--------------------");

	// Loop all events to store first month and discord embed entries.
	const allMonths: Record<string, moment.Moment[]> = {}; // All months.
	const fields: EmbedFieldData[] = []; // Discord entries.
	events.forEach((event) => {
		const date = moment(event.start.date || event.start.dateTime);
		const key = date.format("MM/YYYY");
		let month = allMonths[key];

		// If empty => initialize.
		if (!month) month = [];
		month.push(date);

		allMonths[key] = month;

		// Add event entries.
		fields.push({
			name: event.summary,
			value: date.format("DD/MM/YYYY"),
		});
	});

	// Add events entries.
	embed.setFields(fields);

	// Set image of months.
	const monthValues = Object.values(allMonths);
	const base64Img = await getCalendarImgWithEvents(monthValues);
	const imageStream = Buffer.from(base64Img, "base64");
	const file = new MessageAttachment(imageStream, "img.png");
	embed.setImage("attachment://img.png");

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
	let channelTags: string[] = [];
	const now = moment().toISOString();

	if (getAllOption) {
		const { data: allEvents, error } = await getCalendarEvents({
			timeMin: now,
			...calendarConfig,
		});
		if (error) return await errorHappened();
		events = allEvents.items;
		if (allEvents.items.length === 0) return await errorHappened();
	} else {
		channelTags = await getTagsFromChannel({ guildId, channelId });

		if (channelTags.length === 0) {
			await interaction.followUp({
				content:
					"To retrieve channel events you must first add tags to the channel. Use /tags add",
			});
		} else {
			for (const tag of channelTags) {
				const { data: tagEvents, error } = await getCalendarEvents({
					q: tag,
					timeMin: now,
					...calendarConfig,
				});
				if (error) return await errorHappened();
				// Remove the tag string from the events and trim initial whitespaces.
				for (const item of tagEvents.items) {
					const newSum = item.summary.split(tag).join("").trimStart();
					item.summary = newSum;
					events.push(item);
				}
			}
		}
	}

	if (events.length > 0) {
		const { embeds, files } = await createRichEmbedForEvents(
			events,
			channelTags,
			getAllOption
		);
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
