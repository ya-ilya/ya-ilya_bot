const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    const checkmemb = msg.guild.member(msg.author);
    //you can make your own permissions
    if (checkmemb.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
    if (args == ``) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Error`)
        .addField('Сommand entered incorrectly', `Use !mute <user> <reason>`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }else if (args != ``) {
        var role = msg.guild.roles.cache.find(role => role.name === "muted");
        let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.fetch(args[1]))
        if (!args[1]) {
            reason = `is not available`
        }else if (args[2] != ``) {
            reason = `${args[1]}`
        }
        person.roles.add(role)
        let embed = new Discord.MessageEmbed()
        .setAuthor(`!mute`)
        .addField(`User ${person.nickname} received a muted`, `Reason: ${reason}`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }
}else {
    msg.channel.send(`You don't have the rights to execute this command`)
}
}


module.exports.help = {
    name: 'mute'
}