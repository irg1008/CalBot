import { Event, Command } from "types/Discord.types";
import { Message } from "discord.js";
import { getGuildPrefix } from "db/api";

const event: Event = {
	name: "messageCreate",
	execute: async (client, message: Message) => {
		// Get guild prefix from db or fallback to default.
		const guildPrefix =
			(await getGuildPrefix(message.guildId)) || client.config.prefix;

		const isNotCommand =
			message.author.bot ||
			!message.guild ||
			!message.content.startsWith(guildPrefix);

		if (isNotCommand) return;

		const [commandName, ...args] = message.content
			.slice(client.config.prefix.length)
			.trim()
			.split(" "); // One or more spaces.

		const command =
			client.commands.get(commandName.toLowerCase()) ||
			client.aliases.get(commandName.toLowerCase());

		if (command) (command as Command).execute(client, message, args);
	},
};

export default event;
