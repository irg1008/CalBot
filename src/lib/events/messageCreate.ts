import { Event, Command } from "types/Discord.types";
import { Message } from "discord.js";

const event: Event = {
	name: "messageCreate",
	execute: async (client, message: Message) => {
		// Get guild prefix from db.
		const { data: guildConfig } = await client.db
			.from<{ prefix: string; guildId: string }>("GuildConfig")
			.select("prefix")
			.filter("guildId", "eq", message.guildId);
		const guildPrefix = guildConfig[0].prefix;

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
