const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Replies with server info!"),
	execute: async (interaction) => {
		const guild = interaction.guild;
		await interaction.reply(
			`Server name: ${guild.name}\nTotal members: ${interaction.guild.memberCount}`
		);
	},
};
