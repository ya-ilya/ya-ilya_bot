const Discord = require("discord.js");
const fs = require("graceful-fs");
const ytdl = require("ytdl-core-discord"),
    ytpl = require("ytpl"),
    ytsearch = require("yt-search"),
    { Util } = require("discord.js");

module.exports.run = async (client, msg, args) => {
  config = client.config;  
  const voiceChannel = msg.member.voice.channel;
  if (!msg.member.voice.channel) return msg.channel.send("You are not in a voice channel.")

  const serverQueue = client.queue.get(msg.guild.id)
  if (!serverQueue || !serverQueue.songs) return msg.channel.send("`❌` I am not currently playing music.")

  const { channel } = msg.member.voice;
  if (serverQueue && channel !== msg.guild.me.voice.channel) return msg.channel.send(` \`❌\` You must be in the same voice channel as the bot to use this command!`).catch(console.error);
  if (!args[0]) return msg.channel.send("`🔊` The volume is now " +  serverQueue.volume);
  const volume = parseInt(args[0])
  if (volume >= 200) {
      volume = 200
  }
  serverQueue.volume = volume;
  serverQueue.connection.dispatcher.setVolumeLogarithmic(volume / 250);
  return msg.channel.send("`🔊` The volume is now " +  volume);
}

module.exports.help = {
    name: 'volume'
}