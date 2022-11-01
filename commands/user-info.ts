const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription(
			'Replies with user tag and avatar, can be yourself or someone else.',
		)
		.addUserOption((option) =>
			option
				.setName('target')
				// eslint-disable-next-line quotes
				.setDescription("The user's avatar to show"),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user)
			// eslint-disable-next-line curly
			return interaction.reply(
				`Your tag: ${interaction.user.tag}\n${
					user.username
				}'s avatar: ${user.displayAvatarURL({
					dynamic: true,
				})}`,
			);
	},
};
