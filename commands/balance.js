const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, msg, args) => {
    let User = msg.mentions.users.first() || msg.author;
    let image = User.displayAvatarURL()
    let bal = await db.fetch(`money_${msg.guild.id}_${User.id}`);
    let bank = await db.fetch(`bank_${msg.guild.id}_${User.id}`)
    let allmoney = bal + bank
    if (bal === null) bal = 0;
    if (bank === null) bank = 0;
    if (allmoney === null) allmoney = 0;
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${msg.author.tag}`, `${image}`)
    .addField("Cash", `:dollar: ${bal}`, false)
    .addField("Bank", `:dollar: ${bank}`, false)
    .addField("Net Worth", `:dollar: ${allmoney}`, false)
    .setColor(0x32d160)
    await msg.channel.send(embed)
}

module.exports.help = {
    name: 'balance'
}