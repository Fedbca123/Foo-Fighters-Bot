const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quit')
		.setDescription('Stops the current song and clears the queue.'),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId);

		if (!queue) {
			return await interaction.editReply("There's nothing in here!");
		}

		queue.destroy();
		await interaction.editReply('Bye!');
	},
};
