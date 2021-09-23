import {
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { SlashCommand, SlashCommandExecute } from "types/Discord.types";
import {
	linkTagsToChannel,
	removeTagsFromChannel,
	getTagsFromChannel,
} from "db/api";

const setupExecute: SlashCommandExecute = async (_, interaction) => {
	const { guildId, options } = interaction;
	const subcommand = options.getSubcommand() as "add" | "remove" | "list";

	const tag = options.getString("tag");
	const channel = options.getChannel("channel") || interaction.channel;
	const channelId = channel.id;

	switch (subcommand) {
		case "add": {
			const added = await linkTagsToChannel({
				guildId,
				channelId,
				tags: [tag],
			});

			if (added) {
				interaction.followUp({
					content: `Tag ${tag} has been added to the channel.`,
				});
			} else {
				interaction.followUp({
					content: "We couldn't add the tag",
				});
			}

			break;
		}

		case "remove": {
			const removed = await removeTagsFromChannel({
				guildId,
				channelId,
				tags: [tag],
			});

			if (removed) {
				interaction.followUp({
					content: `Tag ${tag} has been removed from the channel.`,
				});
			} else {
				interaction.followUp({
					content: "We couldn't remove the tag",
				});
			}

			break;
		}

		case "list": {
			const tags = await getTagsFromChannel({ guildId, channelId });

			if (tags && tags.length > 0) {
				interaction.followUp({ content: tags.join(", ") });
			} else {
				interaction.followUp({
					content: "There are no tags linked with the channel. Use /tags add",
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
		.setName("tags")
		.setDescription("Sets the channel tags"),
	execute: setupExecute,
};

interface Options {
	tag?: boolean;
	channel?: boolean;
}

// Options for different subcommands.
const withOptions = (
	subcommand: SlashCommandSubcommandBuilder,
	{ tag, channel }: Options
) => {
	if (tag) {
		subcommand.addStringOption((option) =>
			option
				.setName("tag")
				.setDescription("Tag to link with this or another channel")
				.setRequired(true)
		);
	}
	if (channel) {
		subcommand.addChannelOption((channel) =>
			channel
				.setName("channel")
				.setDescription("Channel to add the tag to")
				.setRequired(false)
		);
	}
	return subcommand;
};

// Subcommands.
command.data
	.addSubcommand((subcommand) =>
		withOptions(
			subcommand.setName("add").setDescription("Adds calendar tag to channel"),
			{ tag: true, channel: true }
		)
	)
	.addSubcommand((subcommand) =>
		withOptions(
			subcommand.setName("remove").setDescription("Removes the calendar"),
			{ tag: true, channel: true }
		)
	)
	.addSubcommand((subcommand) =>
		withOptions(
			subcommand
				.setName("list")
				.setDescription("List all events for this or other channel"),
			{ channel: true }
		)
	);

export default command;
