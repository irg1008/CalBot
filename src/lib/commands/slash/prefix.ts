import { SlashCommandBuilder } from "@discordjs/builders";
import { updatePrefix } from "db/api";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

const prefixExecute: SlashCommandExecute = async (_, { guildId, options }) => {
	const newPrefix = options.getString("new");
	await updatePrefix(guildId, newPrefix);
};

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("prefix")
		.setDescription("Updates the guild prefix for commands")
		.addStringOption((option) =>
			option
				.setName("new")
				.setDescription("New prefix for the commands")
				.setRequired(true)
		),
	execute: prefixExecute,
};

export default command;
