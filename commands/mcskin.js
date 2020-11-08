const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
    const res = await fetch(`https://mcapi.cf/api/player/${args}`)
    if(!res) {
		return false
    }else {
		const body = await res.json()
        const playerskin = body.img.skin.large
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${args} skin`)
        .setImage(`${playerskin}`)
		.setColor(0x32d160)
        await msg.channel.send(embed)
    }
}

module.exports.help = {
    name: 'mcskin'
}