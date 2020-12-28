const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    const checkmemb = msg.guild.member(msg.author);
    //you can make your own permissions
    if (checkmemb.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
    if (args == ``) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `Not enough arguments `\n')
        .addField("Usage:", '`!ban <user> <days> <reason>`', false)
        .setColor(0xFF0000)
        await msg.channel.send(embed)
    }else if (args != ``) {
        let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.fetch(args[0]))
        if (!person) return;
        if (!args[2]) {
            var reason = `Is not available`
        }else if (args[2] != ``) {
            let array = args.slice(2)
            let prereason = `${array}`
            var reason = prereason.replace(`,`, ` `)
        }
        let adays = args[1].replace(`d`, ``);
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .addField(`User ${person.displayName} has been baned`, `Reason: ${reason}, Days: ${adays}`, true)
        .setColor(0x32d160)
        await msg.channel.send(embed)
        person.ban({ days: adays, reason: `${reason}` })
    }
}else {
    msg.channel.send(`You don't have the rights to execute this command`)
}
}


module.exports.help = {
    name: 'ban'
}