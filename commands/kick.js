const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    const checkmemb = msg.guild.member(msg.author);
    //you can make your own permissions
    if (checkmemb.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
    let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.fetch(args[1]))
    if (args == ``) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Error`)
        .addField('Сommand entered incorrectly', `Use !kick <user> <reason>`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }else if (args != ``) {
        if (!args[1]) {
            reason = `is not available`
        }else if (args[2] != ``) {
            reason = `${args[1]}`
        }
        let embed = new Discord.MessageEmbed()
        .setAuthor(`!kick`)
        .addField(`User ${person.displayName} was kicked`, `Reason: ${reason}`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
        person.kick([reason])
    }
}else {
    msg.channel.send(`You don't have the rights to execute this command`)
}
}


module.exports.help = {
    name: 'kick'
}
