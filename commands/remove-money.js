const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, msg, args) => {
    if (!msg.member.roles.cache.find(role => "economist" === role.name)) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ You dont have permissions to use the `add-money` command\n')
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    let ment = msg.mentions.members.first() || msg.author;
    if (!args) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `Not enough arguments `\n')
        .addField("Usage:", '`!remove-money <user> <amount>`', false)
        .setColor(0xff0000)
        await msg.channel.send(embed)
    }else {
        if (args[1] > 0) {
        let amount = args[1]
        db.subtract(`money_${msg.guild.id}_${ment.id}`, amount);
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription(`${amount} :dollar: was removed from ${ment.displayName} balance`)
        .setColor(0xff0000)
        await msg.channel.send(embed)
        }else {
            let embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
            .setDescription('❌ `The amount of money is not specified `\n')
            .addField("Usage:", '`!remove-money <user> <amount>`', false)
            .setColor(0xff0000)
            await msg.channel.send(embed) 
        }
    }
}

module.exports.help = {
    name: 'remove-money'
}