// A = 123 B = 456 DISCORD_TOKEN =MTAyOTU3MjU4MzM3MDI2ODc3Mg.G_Ov1Q.Q2Ir8rzTefrfX9Kxj6Xys6Lb1aBq7D7UqoE5Lo node index.js https://discordjs.guide/creating-your-bot/#using-environment-variables

// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName == 'one-piece') {
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

// Login to Discord with your client's token
client.login(token);
