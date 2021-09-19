import deploySlashCommands from "utils/desploySlashCommands";
import client from "client";
import { example } from "gcalendar/getCalendarEvents";

client.init();

// Deploy commands so they update on the discord server.
(async () => await deploySlashCommands(client))();

// GCalendar.
/*(async () => {
	const events = await example();
	console.log(events);
})();*/
