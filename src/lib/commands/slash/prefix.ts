import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

const prefixExecute: SlashCommandExecute = async (client, interaction) => {
	const guildId = interaction.guildId;

	const newPrefix = interaction.options.getString("new");

	const { error } = await client.db
		.from("GuildConfig")
		.upsert([{ guildId, prefix: newPrefix }]);

	error && console.error(error);
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
