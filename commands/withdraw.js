const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, msg, args) => {
    let User = msg.mentions.users.first()
    if (args != '') {
    if (args[0] === "all") {
        let totalCash = db.fetch(`bank_${msg.guild.id}_${msg.author.id}`)
        db.add(`money_${msg.guild.id}_${msg.author.id}`, totalCash);
        db.subtract(`bank_${msg.guild.id}_${msg.author.id}`, totalCash);

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription(`✅ You have withdrawn :dollar: ${totalCash} from your bank`)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    } else {
        let amount = parseInt(args[0])
        
        let bankAmount = db.fetch(`bank_${msg.guild.id}_${msg.author.id}`)
        if(amount > bankAmount) return msg.reply("You don't have that much in your bank")

        db.add(`money_${msg.guild.id}_${msg.author.id}`, amount);
        db.subtract(`bank_${msg.guild.id}_${msg.author.id}`, amount);

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription(`✅ You have withdrawn :dollar: ${amount} from your bank`)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }
}else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
    .setDescription('❌ `Not enough arguments `\n')
    .addField("Usage:", '`!withdraw <amount/all>`', false)
    .setColor(0xff0000)
    await msg.channel.send(embed)
}
}

module.exports.help = {
    name: 'withdraw'
}