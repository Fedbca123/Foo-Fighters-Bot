client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'One Piece') {
		await interaction.reply(
			'https://www.cbr.com/jojos-bizarre-adventure-best-anime-of-all-time/',
		);
	} else if (commandName === 'server') {
		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
		);
	} else if (commandName === 'user') {
		await interaction.reply(
			`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`,
		);
	}
});

client.login(token);
