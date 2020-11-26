const Discord = require('discord.js');

//if an error occurs please contact here - https://github.com/ya-ilya/ya-ilya_bot/issues

module.exports.run = async (client, msg, args) => {
    let amount = args[0] % 100
    const checkmemb = msg.guild.member(msg.author);
    if (checkmemb.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
        if (args != ``) {
            if (amount > 0) {
                msg.channel.bulkDelete(amount)
                let embed = new Discord.MessageEmbed()
                .setAuthor(`Clear`)
                .setDescription("✅ `" + `${msg.author.tag}` + "`" + ` deleted` + " `" + `${args[0]}` + "`" + ` messages in this channel`)
                .setColor(0x32d160)
                await msg.channel.send(embed)
            }else {
                let embed = new Discord.MessageEmbed()
                .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
                .setDescription('❌ `Specify the number of messages`\n')
                .addField("Usage:", '`!clear <limit>`', false)
                .setColor(0xff0000)
                await msg.channel.send(embed)
            }
        }else {
            let embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
            .setDescription('❌ `Too few arguments given`\n')
            .addField("Usage:", '`!clear <limit>`', false)
            .setColor(0xff0000)
            await msg.channel.send(embed)
        }
    }else {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ You dont have permissions to use the `clear` command\n')
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
}

module.exports.help = {
    name: 'clear'
}
