const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
	if (msg.content === "ping") {
		msg.reply("pong");
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	switch (commandName) {
		case "ping":
			await interaction.reply("Pong!");
			break;

		case "server":
			const guild = interaction.guild;
			if (guild) {
				await interaction.reply(
					`Server name: ${guild.name}\nTotal members: ${interaction.guild.memberCount}`
				);
			}
			break;

		case "user":
			await interaction.reply(
				`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
			);
			break;

				case "cacota":
					await interaction.reply(
						"💩 Cacota!!! 💩"
					);

		default:
			break;
	}
});

client.login(token);
