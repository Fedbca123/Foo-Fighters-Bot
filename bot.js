const { Collection } = require("discord.js");

const Discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js/node_modules/discord-api-types/v9");
const { Player } = require("discord-player");

const load_Slash = process.argv[2] == "load";

const { clientId, guildId, token } = require("./config.json");

const client = new Discord.Client({
	intents: ["GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILDS"],
});

client.slashcommands = new Discord.Collection();

client.commands = new Collection();

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
});

const commands = [];

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
	if (load_Slash) commands.push(command.data.toJSON());
}

if (load_Slash) {
	const rest = new REST({ version: "10" }).setToken(token);
	rest.put(Routes.applicationGuildCommands(clientId, guildId), {
		body: commands,
	})
		.then(() => {
			console.log("Successfully loaded application commands.");
			process.exit(0);
		})
		.catch((err) => {
			if (err) {
				console.log(err);
				process.exit(1);
			}
		});
	// eslint-disable-next-line brace-style
} else {
	client.on("ready", () => {
		console.log(`Logged in as ${client.user.tag}`);
	});
	client.on("interactionCreate", (interaction) => {
		async function handleCommand() {
			if (!interaction.isCommand()) return;

			const command = client.slashcommands.get(interaction.commandName);

			if (!command) {
				interaction.reply("Not a valid command!");
			}

			await interaction.deferReply();
			await command.run({ client, interaction });
		}
		handleCommand();
	});

	client.login(token);
}
