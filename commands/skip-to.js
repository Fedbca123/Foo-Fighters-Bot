const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Skipto')
		.setDescription('Skips to a certain track #')
		.addNumberOption((option) =>
			option
				.setName('tracknumber')
				.setDescription('The track to skip to')
				.setMinValue(1)
				.setRequired(true),
		),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId);

		if (!queue) {
			return await interaction.editReply("There's nothing in here!");
		}

		const currentSong = queue.current;

		const trackNum = interaction.options.getNumber('tracknumber');

		if (trackNum > queue.tracks.length) {
			return await interaction.editReply('Invalid track number');
		}

		queue.skipTo(trackNum - 1);

		await interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setDescription(
						`${currentSong.title} has been skipped, shit was lame anyways...`,
					)
					.setThumbnail(currentSong.thumbnail),
			],
		});
	},
};
