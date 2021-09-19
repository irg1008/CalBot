import { Event } from "types/Discord.types";

const event: Event = {
	name: "ready",
	once: true,
	execute: (client) => {
		console.log(`Logged in as ${client.user?.tag}`);
	},
};

export default event;
