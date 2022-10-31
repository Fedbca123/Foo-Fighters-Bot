import { Collection } from "discord.js";

const Discord = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require("@discordjs/rest");
const { Routes } = require("@discord-api-types/v9");
const { Player } = require("discord-player");

const load_Slash:boolean = process.argv[2] == "load";

const { clientId, guildId, token } = require('./config.json');

const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] });

client.slashcommands = new Discord.Collection()

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}