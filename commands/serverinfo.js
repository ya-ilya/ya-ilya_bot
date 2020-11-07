const Discord = require('discord.js');
const region = {
    'us-central': ':flag_us:  US Central',
    'us-east': ':flag_us:  US East',
    'us-south': ':flag_us:  US South',
    'us-west': ':flag_us:  US West',
    'europe': ':flag_eu:  Europe',
    'singapore': ':flag_sg:  Singapore',
    'japan': ':flag_jp:  Japan',
    'russia': ':flag_ru:  Russia',
    'hongkong': ':flag_hk:  Hong Kong',
    'brazil': ':flag_br:  Brazil',
    'sydney': ':flag_au:  Sydney',
    'southafrica': 'South Africa :flag_za:'
}
const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Highest'
}

module.exports.run = async (client, msg, args) => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Guild information for ${msg.guild.name}`)
    .addField('Owner', `${msg.guild.owner}`, true)
    .addField('ID', msg.guild.id, true)
    .addField('Region', region[msg.guild.region], true)
    .addField('Members', `${msg.guild.memberCount} total`, true)
    .addField('Channels', `${msg.guild.channels.cache.filter(channel => channel.type === 'text').size} text chanels\n${msg.guild.channels.cache.filter(channel => channel.type === 'voice').size} voice channels `, true)
    .addField('VerifiLevel', `${verificationLevels[msg.guild.verificationLevel]}`, true)
    .setColor(0x32d160)
    await msg.channel.send(embed)
}

module.exports.help = {
    name: 'serverinfo'
}