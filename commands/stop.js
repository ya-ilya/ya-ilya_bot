const Discord = require("discord.js");
const fs = require("graceful-fs");
const ytdl = require("ytdl-core-discord"),
    ytpl = require("ytpl"),
    ytsearch = require("yt-search"),
    { Util } = require("discord.js");
const queue = new Map();

module.exports.run = async (client, msg, args) => { 
  const voiceChannel = msg.member.voice.channel;
  if (!msg.member.voice.channel) return msg.channel.send("You are not in a voice channel.")

  const serverQueue = client.queue.get(msg.guild.id);
  if (!serverQueue || !serverQueue.songs) return msg.channel.send("`❌` I am not currently playing music.");

  const { channel } = msg.member.voice;
  if (serverQueue && channel !== msg.guild.me.voice.channel) return msg.channel.send(` \`❌\` You must be in the same voice channel as the bot to use this command!`).catch(console.error);
  serverQueue.songs = [];
  if (serverQueue.connection.dispatcher == null) return serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  return msg.channel.send("`⏹` Song stopped.");
  
} 

module.exports.help = {
    name: 'stop'
}