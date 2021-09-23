interface SupabaseConfig {
	endpoint: string;
	apiKey: string;
}

type Table = "GuildConfig" | "GuildTags";

interface CalendarConfig {
	calId: string;
	apiKey: string;
}

interface BaseConfig {
	guildId: string; // id
	prefix: string; // i.e: ! or #
}

interface GuildTags {
	guildId: string; // id compuesto
	channelId: string; // id compuesto
	tags: string[];
}

type GuildConfig = BaseConfig & CalendarConfig;

export {
	SupabaseConfig,
	GuildTags,
	Table,
	GuildConfig,
	CalendarConfig,
	BaseConfig,
};
