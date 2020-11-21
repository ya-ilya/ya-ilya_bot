const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('ms')

module.exports.run = async (client, msg, args) => {
    if (!msg.member.roles.cache.find(role => "worker" === role.name)) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ You must have a `worker` role to get paid!\n')
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    let timeout = 86400000 // 24 hours in milliseconds, change if you'd like.
    let amount = 500

    let salary = await db.fetch(`salarytime_${msg.guild.id}_${msg.author.id}`);

    if (salary !== null && timeout - (Date.now() - salary) > 0) {
        let time = ms(timeout - (Date.now() - salary));

        msg.channel.send(`You've already taken your paycheck! following through **${time}**!`)
    } else {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription(`You have successfully received a salary in the amount of ${amount}`)
        .setColor(0x32d160)
        await msg.channel.send(embed)
        db.add(`money_${msg.guild.id}_${msg.author.id}`, amount)
        db.set(`salarytime_${msg.guild.id}_${msg.author.id}`, Date.now());
    }
}

module.exports.help = {
    name: 'salary'
}