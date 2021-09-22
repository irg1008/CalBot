import deploySlashCommands from "utils/desploySlashCommands";
import client from "client";

import GoogleCalendar from "google-calendar-node-api";
import { googleAPIKey } from "config";

const calId = "rcc5p5lpprm58409k39j6an06s%40group.calendar.google.com";

const gcal = new GoogleCalendar({ apiKey: googleAPIKey, calId });
(async () => {
	const { data: events } = await gcal.getEvents({ query: "[VALPRU]" });
	console.log(events);
})();


client.init();

// Deploy commands to test guild if development:
const { testGuildId } = client.config;
if (testGuildId) {
	// Deploy commands to the test guild.
	(async () => await deploySlashCommands(client, testGuildId))();
}

// GCalendar.
/*(async () => {
	const events = await example();
	console.log(events);
})();*/
