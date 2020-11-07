const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    const checkmemb = msg.guild.member(msg.author);
    //you can make your own permissions
    if (checkmemb.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
    if (args == ``) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Error`)
        .addField('Сommand entered incorrectly', `Use !ban <user> <days> <reason>`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }else if (args != ``) {
        let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.fetch(args[1]))
        if (!args[1]) return;
        if (!args[2]) {
            reason = `Is not available`
        }else if (args[3] != ``) {
            reason = `${args[2]}`
        }
        let embed = new Discord.MessageEmbed()
        .setAuthor(`!ban`)
        .addField(`User ${person.nickname} has been baned`, `Reason: ${reason}, Days: ${args[1]}`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
        person.ban({ days: args[1], reason: `${args[2]}` })
    }
}else {
    msg.channel.send(`You don't have the rights to execute this command`)
}
}


module.exports.help = {
    name: 'ban'
}