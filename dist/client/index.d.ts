import { Client, Collection } from "discord.js";
import { Command, SlashCommand, Event, Config } from "types/Discord.types";
declare class ExtendedClient extends Client {
    commands: Collection<string, Command>;
    slashCommands: Collection<string, SlashCommand>;
    events: Collection<string, Event>;
    config: Config;
    aliases: Collection<string, Command>;
    init(): Promise<void>;
}
declare const client: ExtendedClient;
export { ExtendedClient };
export default client;
