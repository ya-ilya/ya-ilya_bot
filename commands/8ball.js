const Discord = require('discord.js');

var res = [
	"Yes",
	"No",
	"Maybe",
	"Probably",
	"Probably not",
]

module.exports.run = async (client, msg, args) => {
	if(!args[0]){
		msg.channel.send('Please ask a question.')
	}else if (args != ``) {
    let embed = new Discord.MessageEmbed()
        .setAuthor(`8ball`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/773931546201423874/773997068707561492/eight-ball-8ball-mjg-magic-8-ball-eightball-store-logo-rapper-skull.png`)
		.addField("Question", args, false)
		.addField("Answer", (res[Math.floor(Math.random() * res.length)]), false)
		.setColor(0x32d160)
        await msg.channel.send(embed)
    }
}

module.exports.help = {
    name: '8ball'
}