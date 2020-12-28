const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, msg, args) => {
    let user = msg.mentions.members.first() 
    let member = db.fetch(`money_${msg.guild.id}_${msg.author.id}`)
    if (!user) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `Mention the user `\n')
        .addField("Usage:", '`!pay <user> <amount>`', false)
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    if (user.id == msg.author.id) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌` You cant transfer money to yourself`')
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    if (!args[1]) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `Specify the amount of money `\n')
        .addField("Usage:", '`!pay <user> <amount>`', false)
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    if (msg.content.includes('-')) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `Negative money can not be paid.`\n')
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    if (member < args[1]) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `You dont have that much money on your hands!`')
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
    .setDescription(`✅  <@${user.id}> has recived your :dollar: ${args[1]}`)
    .setColor(0x32d160)
    await msg.channel.send(embed)
    db.add(`money_${msg.guild.id}_${user.id}`, args[1])
    db.subtract(`money_${msg.guild.id}_${msg.author.id}`, args[1])

}

module.exports.help = {
    name: 'pay'
}