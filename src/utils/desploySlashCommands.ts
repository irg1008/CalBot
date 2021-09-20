import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ExtendedClient } from "client";

const getClientCommandsData = (client: ExtendedClient) => {
	const slashCommands = Array.from(client.slashCommands.values());
	const slashCommandsData = slashCommands.map((cmd) => cmd.data);
	return slashCommandsData;
};

const deploycommands = async (client: ExtendedClient, guildId?: string) => {
	if (!client) throw new Error("Please provide a valid client");

	const { token, clientId } = client.config;
	const rest = new REST({ version: "9" }).setToken(token);
	const commandsData = getClientCommandsData(client);

	// Rgister commands.
	try {
		// If guildId is set => Development on given guild id.
		if (guildId) {
			await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
				body: commandsData,
			});
		} else {
			await rest.put(Routes.applicationCommands(clientId), {
				body: commandsData,
			});
		}

		console.log("Slash commands deployed correctly");
	} catch (error) {
		console.error(error);
	}
};

export default deploycommands;
