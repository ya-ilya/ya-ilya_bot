const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let boticon = client.user.displayAvatarURL();
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Info about bot`)
    .setThumbnail(boticon)
    .addField('Name', `${client.user.username}`)
    .addField('Bot Create Date', `${client.user.createdAt}`)
    .addField('Uptime', `${days}d ${hours}h ${minutes}m ${seconds}s`, false)
    .setColor(0x32d160)
    await msg.channel.send(embed)
}

module.exports.help = {
    name: 'botinfo'
}