type Tables = "GuildConfig" | "GuildTags";

interface GuildTags {
	guildId: string; // id compuesto
	channelId: string; // id compuesto
	tags: string[];
}

interface GuildConfig {
	guildId: string; // id
	calId: string;
	apiKey: string;
	prefix: string; // i.e: ! or #
}
