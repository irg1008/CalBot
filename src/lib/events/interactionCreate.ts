import { Event } from "types/Discord.types";
import { GuildMember, Interaction } from "discord.js";

const event: Event = {
	name: "interactionCreate",
	execute: async (client, interaction: Interaction) => {
		if (interaction.channel.type === "DM") return;

		// Slash Command Handling
		if (interaction.isCommand()) {
			await interaction.deferReply({ ephemeral: false }).catch(() => {});

			const commandName = interaction.commandName.toLowerCase();

			const command = client.slashCommands.get(commandName);
			if (!command)
				return interaction.followUp({ content: "An error has occured " });

			const args: string[] = [];

			for (let option of interaction.options.data) {
				if (option.type === "SUB_COMMAND") {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value.toString());
					});
				} else if (option.value) args.push(option.value.toString());
			}

			interaction.member = interaction.guild?.members.cache.get(
				interaction.user.id
			) as GuildMember;

			command.execute(client, interaction, args);
		}

		// Context Menu Handling.
		if (interaction.isContextMenu()) {
			await interaction.deferReply({ ephemeral: false });
			const command = client.slashCommands.get(interaction.commandName);
			if (command) command.execute(client, interaction);
		}
	},
};

export default event;
