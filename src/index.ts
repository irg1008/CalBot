import client from "./client";
import deploySlashCommands from "./utils/desploySlashCommands";

client.destroy();
client.init();
// Deploy commands so they update on the discord server.
(async () => await deploySlashCommands(client))();
