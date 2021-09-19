import deploySlashCommands from "utils/desploySlashCommands";
import client from "client";

client.init();

// Deploy commands so they update on the discord server.
(async () => await deploySlashCommands(client))();
