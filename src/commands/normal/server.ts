import { Command } from "../../types/Discord.types";

export const command: Command = {
	name: "server",
	description: "Replies with server info!",
	aliases: ["s"],
	execute: async (_, message) => {
		const guild = message.guild;

		if (guild) {
			await message.channel.send(
				`Server name: ${guild.name}\nTotal members: ${guild.memberCount}`
			);
		} else {
			await message.channel.send("You are not in a server right now");
		}
	},
};
