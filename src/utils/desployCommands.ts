import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ExtendedClient } from "../client";
import { SlashCommand } from "../types/Discord.types";

const getClientCommands = (client: ExtendedClient) => {
	const slashCommands = Array.from(client.slashCommands.values());
	const slashAliasesEntries = client.slashAliases.entries();
	const slashAliasCommands: typeof slashCommands = [];

	while (true) {
		const { done, value } = slashAliasesEntries.next();
		if (done) break;

		const alias: string = value[0];
		const cmd: SlashCommand = value[1];

		// Change cmd name to alias:
		slashAliasCommands.push({ ...cmd, name: alias, aliases: [] });
	}

	return [...slashCommands, ...slashAliasCommands];
};

const deploycommands = async (client: ExtendedClient) => {
	if (!client) throw new Error("Please provide a valid client");

	const { token, clientId } = client.config;
	const rest = new REST({ version: "9" }).setToken(token);
	const commands = getClientCommands(client);

	// Rgister commands.
	try {
		await rest.put(Routes.applicationCommands(clientId), { body: commands });
		console.log("Successfully registered application commands.");
	} catch (error) {
		console.error(error);
	}
};

export default deploycommands;
