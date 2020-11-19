const Discord = require("discord.js");
const fs = require("graceful-fs");
const ytdl = require("ytdl-core-discord"),
    ytpl = require("ytpl"),
    ytsearch = require("yt-search"),
    { Util } = require("discord.js");
const queue = new Map();

/**
 * @module play
 * @updated-by vypr-ysl on 11/11/2020
 - Changed ytdl-core to ytdl-core-discord.
 - ytdl(song.id) now uses await and a STREAM_TYPE is specified: { type: 'opus'}
 */

module.exports.run = async (client, msg, args) => {
    const voiceChannel = msg.member.voice.channel;
    if (!msg.member.voice.channel) return msg.channel.send("You are not in a voice channel.")

    const url = args.join(" ")
    if (url.includes("list=")) {
        const playlist = await ytpl(url.split("list=")[1]);
        const videos = playlist.items;
        msg.channel.send(`${playlist.title} (${videos.length}) was added to the queue.`)
        for (const video of videos) await queueSong(video, msg, voiceChannel, client)
    } else {
        let video;
        try {
            video = await ytdl.getBasicInfo(url);
        } catch (e) {
            try {
              
              const results = await ytsr(url);
                const videos = results.videos.slice(0, 10);
                let index = 0;
                await msg.channel.send([
                    "__**Song selection:**__",
                    videos.map(v => ++index + " - **" + v.title + "**").join("\n"),
                    ("*Please provide a value to select one of the search query ranging from 1 to [LIST_LENGTH]:*").replace("[LIST_LENGTH]", videos.length)
                ].join("\n\n"))
              
             let response;
                try {
                        response = await msg.channel.awaitMessages(msg => 0 < msg.content && msg.content < videos.length + 1 && msg.author.id == msg.author.id, {
                            max: 1,
                            time: 1e4,
                            errors: ['time']
                        });
                  
                        const videoIndex = parseInt(response.first().content);
                        video = await ytdl.getBasicInfo(videos[videoIndex - 1].videoId);
                    } catch (e) {
                        return msg.channel.send("`❌` An unknown error occurred upon trying to join the voice channel!");
                    }
                    
                   

            } catch (e) {
                console.log(e)
                return msg.channel.send("`❌` I have indexed thousands of multi-dimensional datasets from my backbrain and was unable to find what you were looking for.");
            }
        }
        await msg.channel.send(`${video.title} has been added to the queue.`)
        return await queueSong(video, msg, voiceChannel, client)
    }
  
} 

//Async - Music
async function queueSong(video, msg, voiceChannel, client) {

    const serverQueue = client.queue.get(msg.guild.id)
    let thumbnail = "";
    if (video.player_response) thumbnail = (video.player_response.videoDetails.thumbnail.thumbnails).slice(-1)[0]["url"];
    if (video.thumbnail) thumbnail = video.thumbnail;
    const song = {
        id: video.id || video.video_id,
        title: Util.escapeMarkdown(video.title),
        url: "https://www.youtube.com/watch?v=" + (video.id || video.video_url),
        thumbnail: thumbnail
    }
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel,
            connection: null,
            songs: [song],
            volume: 50, 
            playing: true
        }
        try {
            const connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            client.queue.set(msg.guild.id, queueConstruct);
            playSong(await msg.guild, queueConstruct.songs[0], msg, client, { type: 'opus'});
        } catch (e) {
            console.log(e)
            msg.channel.send("An unknown error occurred upon trying to join the voice channel!");
            return queue.delete(msg.guild.id);
        }
    } else serverQueue.songs.push(song);
    return;
}
async function playSong(guild, song, msg, client) {
    const serverQueue = client.queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        client.queue.delete(guild.id);
        return;
    }
    serverQueue.connection.play(await ytdl(song.id), { type: 'opus'})
        .once('finish', reason => {
      
            if(!serverQueue.loop) serverQueue.songs.shift();

            playSong(guild, serverQueue.songs[0], msg, client, { type: 'opus'});
        })
        .on("error", console.error)
        .setVolumeLogarithmic(serverQueue.volume / 250);
    serverQueue.textChannel.send(`Now playing ${song.title}`);
}
const ytsr = (url) => new Promise((resolve, reject) => ytsearch(url, (err, r) => err ? reject(err) : resolve(r)))

module.exports.help = {
    name: 'play'
}