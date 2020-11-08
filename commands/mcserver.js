const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
    const res = await fetch(`https://api.mcsrvstat.us/2/${args}`)
    if(!res) {
		return false
    }else {
		const body = await res.json()
        const status = (body.online ? "Online" : "Offline")
        const players = body.players.online
        const playersMax = body.players.max
        const playerCount = players + '/' + playersMax;
        const motd = body.motd.clean
        const ver = body.version
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${args}`)
        .addField("🍪 Status", `${status}`, false)
        .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${args}`)
        .addField("🎃 Online", `${playerCount}`, false)
        .addField("📺 Motd", `${motd}`, false)
        .addField("🔧 Version", `${ver}`, false)
		.setColor(0x32d160)
        await msg.channel.send(embed)
    }
}

module.exports.help = {
    name: 'mcserver'
}