const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    if (args == ``) {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Error`)
    .addField('Reason', `you didn't specify a user`, true)
    .setColor(0x32d160)
    await msg.channel.send(embed)
    }else if (args != ``) {
        let memba = msg.guild.member
        let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.fetch(args[1]))
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Info about ${person.nickname}`)
        .setThumbnail(msg.mentions.users.first().displayAvatarURL())
        .addField('Id', `${person.id}`, true)
        .addField('Display Name', `${person.displayName}`, true)
        .addField('Roles:', person.roles.cache.map(r => `${r}`).join(', '), true)
        .addField('Last Message', `${person.lastMessage}`, true)
        .addField('Join Date', `${person.joinedAt}`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }
}

module.exports.help = {
    name: 'userinfo'
}