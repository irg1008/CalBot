import { Event } from "types/Discord.types";
import { Guild } from "discord.js";
import deploySlashCommands from "utils/desploySlashCommands";

const event: Event = {
	name: "guildCreate",
	execute: async (client, guild: Guild) => {
		// Create entry in db with default prefix.
		const { error } = await client.db
			.from("GuildConfig")
			.upsert([{ guildId: guild.id, prefix: client.config.prefix }]);

		error && console.error(error);

		// Add client commands to guild when entering:
		deploySlashCommands(client, guild.id);
	},
};

export default event;
