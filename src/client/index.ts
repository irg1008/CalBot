import { CronJob } from "cron";
import { Command, SlashCommand, Event, Config } from "types/Discord.types";
import { Client, Collection } from "discord.js";
import { commands, slashCommands } from "lib/commands";
import { discordConfig } from "config";
import events from "lib/events";

class ExtendedClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public slashCommands: Collection<string, SlashCommand> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public config: Config = discordConfig;
	public aliases: Collection<string, Command> = new Collection();
	public activeJobs: Collection<string, CronJob> = new Collection();

	public async init() {
		this.login(this.config.token);

		// Commands.
		commands.forEach((command) => {
			this.commands.set(command.name, command);

			if (command?.aliases?.length !== 0) {
				command.aliases?.forEach((alias) => {
					this.aliases.set(alias, command);
				});
			}
		});

		// Slash Commands.
		slashCommands.forEach((command) => {
			this.slashCommands.set(command.data.name, command);
		});

		// Events.
		events.forEach(async (event) => {
			this.events.set(event.name, event);

			if (event.once) {
				this.once(event.name, event.execute.bind(null, this));
			} else {
				this.on(event.name, event.execute.bind(null, this));
			}
		});
	}
}

const client = new ExtendedClient({
	intents: [
		"GUILDS",
		"GUILD_MESSAGES",
		"GUILD_EMOJIS_AND_STICKERS",
		"GUILD_MESSAGE_REACTIONS",
	],
});
export { ExtendedClient };
export default client;
