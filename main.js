const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");
const { token } = require("./config.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Get commands files from commands folder.
client.commands = new Collection();
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

// Add the exported values of the commands
// files to the client commands collection.
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});

client.login(token);
