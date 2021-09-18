import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ExtendedClient } from "../client";

const getClientCommands = (client: ExtendedClient) => {
	const slashCommands = Array.from(client.slashCommands.values());
	return slashCommands;
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
