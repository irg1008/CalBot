import {
	Message,
	ClientEvents,
	CommandInteraction,
	ContextMenuInteraction,
} from "discord.js";
import { ExtendedClient } from "../client";

type EventExecute = (client: ExtendedClient, ...args: any[]) => void;

type CommandExecute = (
	client: ExtendedClient,
	message: Message,
	args?: string[]
) => void;

type SlashCommandExecute = (
	client: ExtendedClient,
	interaction: CommandInteraction | ContextMenuInteraction,
	args?: string[]
) => void;

interface Event {
	name: keyof ClientEvents;
	once?: boolean;
	execute: EventExecute;
}

interface BaseCommand {
	name: string;
	description?: string;
	aliases?: string[];
}

interface Command extends BaseCommand {
	execute: CommandExecute;
}

interface SlashCommand extends BaseCommand {
	execute: SlashCommandExecute;
}

interface Config {
	token: string;
	clientId: string;
	prefix: string;
}

export { Event, Command, SlashCommand, Config };
