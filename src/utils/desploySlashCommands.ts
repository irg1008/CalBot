import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ExtendedClient } from "../client";

const getClientCommandsData = (client: ExtendedClient) => {
	const slashCommands = Array.from(client.slashCommands.values());
	const slashCommandsData = slashCommands.map((cmd) => cmd.data);
	return slashCommandsData;
};

const deploycommands = async (client: ExtendedClient) => {
	if (!client) throw new Error("Please provide a valid client");

	const { token, clientId, guildId } = client.config;
	const rest = new REST({ version: "9" }).setToken(token);
	const commandsData = getClientCommandsData(client);

	// Rgister commands.
	try {
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
			body: commandsData,
		});
		console.log("Slash commmands desployed correctly");
	} catch (error) {
		console.error(error);
	}
};

export default deploycommands;
