import { Command } from "types/Discord.types";

export const command: Command = {
	name: "user",
	description: "Replies with user info!",
	aliases: ["u"],
	execute: async (client, message) => {
		const user = client.user;

		if (user) {
			await message.channel.send(`Your tag: ${user.tag}\nYour id: ${user.id}`);
		} else {
			await message.channel.send("User is not valid");
		}
	},
};
