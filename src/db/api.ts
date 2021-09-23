import {
	BaseConfig,
	CalendarConfig,
	GuildConfig,
	Table,
	GuildTags,
} from "types/Supabase.types";
import client from "./client";

const from = <T>(table: Table) => client.from<T>(table);

const getGuildPrefix = async (guildId: string) => {
	const { data, error } = await from<GuildConfig>("GuildConfig")
		.select("prefix")
		.filter("guildId", "eq", guildId);

	if (error) return null;

	const prefix = data[0].prefix;
	return prefix;
};

const updateCalendarConfig = async (
	guildId: string,
	{ apiKey, calId }: CalendarConfig
) => {
	const { error } = await from<GuildConfig>("GuildConfig").upsert([
		{ guildId, apiKey, calId },
	]);

	return !error;
};

const getCalendarConfig = async (guildId: string): Promise<CalendarConfig> => {
	const { data, error } = await from<GuildConfig>("GuildConfig")
		.select()
		.filter("guildId", "eq", guildId);

	if (error) return null;

	const { calId, apiKey } = data[0];
	return { calId, apiKey };
};

const updatePrefix = async (guildId: string, newPrefix: string) => {
	const { error } = await from<GuildConfig>("GuildConfig").upsert([
		{ guildId, prefix: newPrefix },
	]);

	return !error;
};

const createGuildEntry = async (baseConfig: BaseConfig) => {
	const { error } = await from<GuildConfig>("GuildConfig").upsert([baseConfig]);

	return !error;
};

const getTagsFromChannel = async ({
	guildId,
	channelId,
}: Omit<GuildTags, "tags">) => {
	const { data, error } = await from<GuildTags>("GuildTags")
		.select()
		.filter("guildId", "eq", guildId)
		.filter("channelId", "eq", channelId);

	if (error) return null;

	if (data.length === 0) return [];

	const tags = data[0].tags;
	return tags;
};

const linkTagsToChannel = async ({
	guildId,
	channelId,
	tags: newTags,
}: GuildTags) => {
	// Add to previous tags.
	const prevTags = await getTagsFromChannel({ guildId, channelId });
	newTags.push(...prevTags);
	newTags = [...new Set(newTags)]; // Remove duplicates.

	// If same tags => Do not update.
	if (prevTags.length === newTags.length) return false;

	const { error } = await from<GuildTags>("GuildTags").upsert([
		{ guildId, channelId, tags: newTags },
	]);

	return !error;
};

const removeTagsFromChannel = async ({
	guildId,
	channelId,
	tags: newTags,
}: GuildTags) => {
	// Remove new tags from previous tags.
	const prevTags = await getTagsFromChannel({ guildId, channelId });
	newTags = prevTags.filter((prevTag) => !newTags.includes(prevTag));

	// If same tags => Do not delete.
	if (prevTags.length === newTags.length) return false;

	const { error } = await from<GuildTags>("GuildTags")
		.update({
			tags: newTags,
		})
		.filter("guildId", "eq", guildId)
		.filter("channelId", "eq", channelId);

	return !error;
};

export {
	getGuildPrefix,
	updateCalendarConfig,
	updatePrefix,
	createGuildEntry,
	linkTagsToChannel,
	getTagsFromChannel,
	removeTagsFromChannel,
	getCalendarConfig,
};
