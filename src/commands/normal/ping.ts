import { Command } from "../../types/Discord.types";

export const command: Command = {
	name: "ping",
	description: "Replies with Pong!",
	aliases: ["p"],
	execute: async (client, message) => {
		await message.channel.send(`${client.ws.ping} ping!`);
	},
};
