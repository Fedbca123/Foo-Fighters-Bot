const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Shows what the current song is.'),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId);

		if (!queue) {
			return await interaction.editReply("There's nothing in here!");
		}

		let progBar = queue.createProgressBar({
			queue: false,
			length: 19,
		});

		const song = queue.current;

		await interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setThumbnail(song.thumbnail)
					.setDescription(
						`Currently Playing [${song.title}](${song.url})\n\n` +
							progBar,
					),
			],
		});
	},
};
