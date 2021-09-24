import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";

//
import { CronJob } from "cron";
import { Timezone } from "google-calendar-node-api/dist/types/Timezone.types";

const loopExecute: SlashCommandExecute = async (_, interaction) => {
	const msg = interaction.options.getString("command");

	const timeZone: Timezone = "Europe/Madrid";

	const cronString = "* * * * * *";

	let job = new CronJob(
		cronString,
		async () => {
			await interaction.followUp({
				content: msg,
			});
		},
		null,
		null,
		timeZone
	);

	job.start();
};

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("loop")
		.setDescription("Loops a command every x seconds")
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("Command you want to loop every x seconds")
				.setRequired(true)
		),
	execute: loopExecute,
};

export default command;
