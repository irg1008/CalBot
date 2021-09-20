import deploySlashCommands from "utils/desploySlashCommands";
import client from "client";

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
