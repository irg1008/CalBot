import { Command } from "types/Discord.types";

const command: Command = {
	name: "ping",
	description: "Replies with Pong!",
	aliases: ["p"],
	execute: async (client, message) => {
		await message.channel.send(`${client.ws.ping} ping!`);
	},
};

export default command;
