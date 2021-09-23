import {
	BaseConfig,
	CalendarConfig,
	GuildConfig,
	Table,
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

const updatePrefix = async (guildId: string, newPrefix: string) => {
	const { data, error } = await from<GuildConfig>("GuildConfig").upsert([
		{ guildId, prefix: newPrefix },
	]);

	return !error;
};

const createGuildEntry = async ({ guildId, prefix }: BaseConfig) => {
	const { error } = await from<GuildConfig>("GuildConfig").upsert([
		{ guildId, prefix },
	]);

	return !error;
};

export { getGuildPrefix, updateCalendarConfig, updatePrefix, createGuildEntry };
