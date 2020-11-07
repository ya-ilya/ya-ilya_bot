const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    const checkmemb = msg.guild.member(msg.author);
    //you can make your own permissions
    if (checkmemb.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
    if (args == ``) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Error`)
        .addField('Сommand entered incorrectly', `Use !unmute <user>`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }else if (args != ``) {
        var role = msg.guild.roles.cache.find(role => role.name === "muted");
        let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.fetch(args[1]))
        let embed = new Discord.MessageEmbed()
        .setAuthor(`!unmute`)
        .addField(`User ${person.displayName} received a unmuted`, `Tell us how your life is? :^`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
        person.roles.remove(role)
    }
}else {
    msg.channel.send(`You don't have the rights to execute this command`)
}
}

module.exports.help = {
    name: 'unmute'
}