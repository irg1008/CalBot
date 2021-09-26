import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";
import { CronJob } from "cron";
import moment from "moment";
import eventCommand from "./events";
import createJob from "utils/createJob";

const loopExecute: SlashCommandExecute = async (client, interaction) => {
	const { channelId, options } = interaction;
	const subcommand = options.getSubcommand() as "start" | "stop";

	let job = client.activeJobs.get(channelId);
	let isJobRunning = job?.running;

	switch (subcommand) {
		case "start": {
			if (isJobRunning) job.stop();

			const time = options.getString("time");
			const isValid = moment(time, ["HH:mm"], true).isValid();

			if (isValid) {
				const [h, m] = time.split(":");
				const cronString = `${m} ${h} * * *`;

				console.log(
					`New job starting at ${time} for channel ${
						interaction.channelId
					}. Time: ${moment()}`
				);

				job = createJob(async () => {
					await interaction.followUp({
						content: "⏰ Daily events incoming!!",
					});
					await eventCommand.execute(client, interaction);
				}, cronString);

				job.start();

				client.activeJobs.set(channelId, job);

				await interaction.followUp({
					content: `⏰ The bot will notify daily at ${time}`,
				});
			} else {
				await interaction.followUp({
					content: `Invalid Time (${time})`,
				});
			}

			break;
		}
		case "stop": {
			if (isJobRunning) {
				console.log(`Job for channel ${channelId} stopped at ${moment()}`);

				job.stop();

				client.activeJobs.set(channelId, null);

				await interaction.followUp({
					content: "⏰ Loop Stopped!",
				});
			} else {
				await interaction.followUp({
					content: "No loop scheduled!",
				});
			}
			break;
		}
		default:
			break;
	}
};

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("loop")
		.setDescription("Sends that day calendar events to every channel"),
	execute: loopExecute,
};

// Subcommands.
command.data
	.addSubcommand((subcommand) =>
		subcommand
			.setName("start")
			.setDescription("Starts the daily remainder")
			.addStringOption((option) =>
				option.setName("time").setDescription("Format HH:MM").setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("stop").setDescription("Stops the daily remainder")
	);

export default command;
