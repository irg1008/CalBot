import {
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import {
	Message,
	ClientEvents,
	CommandInteraction,
	ContextMenuInteraction,
} from "discord.js";
import { ExtendedClient } from "client";

type EventExecute = (client: ExtendedClient, ...args: any[]) => void;

type CommandExecute = (
	client: ExtendedClient,
	message: Message,
	args?: string[]
) => Promise<void>;

type SlashCommandExecute = (
	client: ExtendedClient,
	interaction: CommandInteraction | ContextMenuInteraction,
	args?: string[]
) => Promise<void>;

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
	testGuildId: string;
	prefix: string;
}

export {
	Event,
	Command,
	SlashCommand,
	Config,
	SlashCommandExecute,
	CommandExecute,
	EventExecute,
};
