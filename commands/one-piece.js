const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('one-piece')
		.setDescription('THE ONE PIECE IS REAAAAAL'),
	async execute(interaction) {
		await interaction.reply(
			'https://www.cbr.com/jojos-bizarre-adventure-best-anime-of-all-time/',
		);
	},
};
