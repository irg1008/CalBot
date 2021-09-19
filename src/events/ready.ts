import { Event } from "types/Discord.types";

export const event: Event = {
	name: "ready",
	once: true,
	execute: (client) => {
		console.log(`Logged in as ${client.user?.tag}`);
	},
};
