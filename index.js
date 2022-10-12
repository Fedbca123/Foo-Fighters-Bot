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

// Login to Discord with your client's token
client.login(token);
