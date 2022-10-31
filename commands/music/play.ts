const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("play")
        .setDescription("laods songs from youtube")
        .addSubcommand((subcommand) => {
            subcommand.setName("song")
        })
}