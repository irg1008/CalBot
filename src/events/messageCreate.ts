import { Event, Command } from "types/Discord.types";
import { Message } from "discord.js";

export const event: Event = {
	name: "messageCreate",
	execute: (client, message: Message) => {
		const isNotCommand =
			message.author.bot ||
			!message.guild ||
			!message.content.startsWith(client.config.prefix);

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
