import client from "./client";
import deployCommands from "./utils/desployCommands";

client.init();
// Deploy commands so they update on the discord server.
(async () => await deployCommands(client))();
