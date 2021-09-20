import { Event } from "types/Discord.types";
import { Guild } from "discord.js";
import deploySlashCommands from "utils/desploySlashCommands";

const event: Event = {
	name: "guildCreate",
	execute: (client, guild: Guild) => {
		// Add client commands to guild when entering:
		deploySlashCommands(client, guild.id);
	},
};

export default event;
