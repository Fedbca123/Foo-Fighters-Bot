const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the current song'),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId);

		if (!queue) {
			return await interaction.editReply("There's nothing in here!");
		}

		queue.setPaused(false);
		await interaction.editReply(
			"Music has been paused! Use '/resume' to resume the music",
		);
	},
};
