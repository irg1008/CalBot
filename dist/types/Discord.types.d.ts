import { SlashCommandBuilder } from "@discordjs/builders";
import { Message, ClientEvents, CommandInteraction, ContextMenuInteraction } from "discord.js";
import { ExtendedClient } from "client";
declare type EventExecute = (client: ExtendedClient, ...args: any[]) => void;
declare type CommandExecute = (client: ExtendedClient, message: Message, args?: string[]) => void;
declare type SlashCommandExecute = (client: ExtendedClient, interaction: CommandInteraction | ContextMenuInteraction, args?: string[]) => void;
interface Event {
    name: keyof ClientEvents;
    once?: boolean;
    execute: EventExecute;
}
interface Command {
    name: string;
    description: string;
    aliases?: string[];
    execute: CommandExecute;
}
interface SlashCommand {
    data: Partial<SlashCommandBuilder>;
    execute: SlashCommandExecute;
}
interface Config {
    token: string;
    clientId: string;
    guildId: string;
    prefix: string;
}
export { Event, Command, SlashCommand, Config, SlashCommandExecute, CommandExecute, EventExecute, };
