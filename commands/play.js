const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } =  require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("play")
        .setDescription("laods songs from youtube")
        .addSubcommand((subcommand) => {
            subcommand.setName("song")
                .setDescription("Loads a single song from a url")
                .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
        })
        .addSubcommand((subcommand) => {
            subcommand
                .setName("playlist")
                .setDescription("Loads a playlist of songs from a url")
                .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
        })
        .addSubcommand((subcommand) => {
            subcommand
            .setName("search")
            .setDescription("Searches for song based on provided keywords")
            .addStringOption((option) =>
                option.setName("searchterms").setDescription("the keywords to search").setRequired(true)
            )
        })
        run: async({ client, interaction }) => {
            if(interaction.member.voice.channel){
                return interaction.editReply("You need to be in a voice channel to use this command")
            }

            const queue = await client.player.createQueue(interaction.guild);

            if(!queue.connection) await queue.connect(interaction.member.voice.channel);
        }
}