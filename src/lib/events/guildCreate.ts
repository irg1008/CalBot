import { Event } from "types/Discord.types";
import { Guild } from "discord.js";
import deploySlashCommands from "utils/desploySlashCommands";
import { createGuildEntry } from "db/api";

const event: Event = {
	name: "guildCreate",
	execute: async (client, guild: Guild) => {
		// Create entry in db with default prefix.
		await createGuildEntry({ guildId: guild.id, prefix: client.config.prefix });
		// Add client commands to guild when entering:
		deploySlashCommands(client, guild.id);
	},
};

export default event;
