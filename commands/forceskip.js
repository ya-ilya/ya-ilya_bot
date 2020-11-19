const Discord = require("discord.js");
const fs = require("graceful-fs");
const ytdl = require("ytdl-core-discord"),
    ytpl = require("ytpl"),
    ytsearch = require("yt-search"),
    {
        Util
    } = require("discord.js");
const queue = new Map();

module.exports.run = async (client, msg, args) => {
    const voiceChannel = msg.member.voice.channel;
    if (!msg.member.roles.cache.find(role => "dj_role" === role.name)) return msg.channel.send("You do not have permissions to force skip!"); // role => "your role"
    if (!msg.member.voice.channel) return msg.channel.send("You are not in a voice channel.")

    const serverQueue = client.queue.get(msg.guild.id)
    if (!serverQueue || !serverQueue.songs) return msg.channel.send("`❌` I am not currently playing music.")

    const { channel } = msg.member.voice;
    if (serverQueue && channel !== msg.guild.me.voice.channel) return msg.channel.send(` \`❌\` You must be in the same voice channel as the bot to use this command!`).catch(console.error);

    serverQueue.playing = false
    await msg.channel.send("`⏩`Song skipped.")
    serverQueue.connection.dispatcher.end();

}

module.exports.help = {
    name: 'fs'
}