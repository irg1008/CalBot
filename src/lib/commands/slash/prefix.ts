import { SlashCommandBuilder } from "@discordjs/builders";
import { updatePrefix } from "db/api";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

const prefixExecute: SlashCommandExecute = async (_, interaction) => {
	const { guildId, options } = interaction;

	const newPrefix = options.getString("new");
	const updatedCorrectly = await updatePrefix(guildId, newPrefix);

	if (updatedCorrectly) {
		await interaction.followUp({
			content: `Command prefix has been updated to ${newPrefix}`,
		});
	} else {
		await interaction.followUp({
			content: "We could't update the prefix. Try again",
		});
	}
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
