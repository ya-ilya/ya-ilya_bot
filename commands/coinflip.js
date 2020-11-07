const Discord = require('discord.js');

var res = [
	"Heads",
	"Tails",
	"Heads",
    "Tails",
    "Heads",
    "Tails"
]

module.exports.run = async (client, msg, args) => {
	if(!args[0]){
		msg.channel.send('Heads or tails?')
	}else if (args != `heads` & `tails`) {
        msg.channel.send('Heads or tails?')
    }else if (args == `tails`) {
    let embed = new Discord.MessageEmbed()
        .setAuthor(`Coinflip`)
        .setThumbnail(`https://media1.tenor.com/images/938e1fc4fcf2e136855fd0e83b1e8a5f/tenor.gif?itemid=5017733`)
		.addField("What happened?", `${(res[Math.floor(Math.random() * res.length)])}`, false)
		.setColor(0x32d160)
        await msg.channel.send(embed)
    }else if (args == `heads`) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Coinflip`)
        .setThumbnail(`https://media1.tenor.com/images/938e1fc4fcf2e136855fd0e83b1e8a5f/tenor.gif?itemid=5017733`)
		.addField("What happened?", `${(res[Math.floor(Math.random() * res.length)])}`, false)
		.setColor(0x32d160)
        await msg.channel.send(embed)
    }else {
        msg.channel.send('Heads or tails?')
    }
}

module.exports.help = {
    name: 'coinflip'
}