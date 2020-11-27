const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('ms')

module.exports.run = async (client, msg, args) => {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let timeout = 1800000; //30m
    let robTimeout = await db.fetch(`robTimeout_${msg.guild.id}_${msg.author.id}`);
    let ment = msg.mentions.members.first();
    let User = msg.mentions.users.first();
    if (msg.author.bot) return;
    if (ment.bot) return msg.channel.send("you can't rob a bot!")
    if (!ment) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `Not enough arguments `\n')
        .addField("Usage:", '`!rob <user>`', false)
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    if (ment.id == msg.author.id) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription(':x:` You cant rob yourself!`')
        .setColor(0xff0000)
        return msg.channel.send(embed)
    }
    let mentmoney = await db.fetch(`money_${msg.guild.id}_${User.id}`);
    if (mentmoney < 0) {
        return msg.channel.send(`:x: ${ment.displayName} does not have anything to rob.`)
    }
    if (robTimeout !== null && timeout - (Date.now() - robTimeout) > 0) {
        let time = ms(timeout - (Date.now() - robTimeout));
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Error!`)
        .setDescription(`Wait another ${time} minutes`)
		.setColor(0x32d160)
        await msg.channel.send(embed)
    } else {
    let mentmoney = await db.fetch(`money_${ment.id}`)
    let sn = getRandomInt(1,2)

    if (sn == 1) {
        let random = Math.floor(Math.random() * 200) + 1;
        const messagesY = [
            `Fortunately, you were able to steal from ${ment.displayName} and got :dollar: ${random}`, 
            `You were on the verge of failure but you were able to commit this crime! you have earned :dollar: ${random}`, 
            `You already wanted to rob ${ment.displayName} but she gave you a bribe in the amount of :dollar: ${random}`
        ];
        const randomMessageY = messagesN[Math.floor(Math.random() * messagesY.length)];
        let embed = new Discord.MessageEmbed()
        .setAuthor(`!rob`)
        .setDescription(randomMessageY)
		.setColor(0x32d160)
        await msg.channel.send(embed)
        db.subtract(`money_${msg.guild.id}_${ment.user.id}`, random)
        db.add(`money_${msg.guild.id}_${msg.author.id}`, random)
        db.set(`robTimeout_${msg.guild.id}_${msg.author.id}`, Date.now());
    }else {
        let random = Math.floor(Math.random() * 200) + 1;
        const messagesN = [
            `You've been fined :dollar: ${random} for trying to rob a poor person`, 
            `You tried to steal ${ment.displayName}, but you were caught and lost :dollar: ${random}`, 
            `You were discovered before you managed to rob ${ment.displayName} and you lost :dollar: ${random}`, 
            `${ment.displayName} was armed and caught you! You lost :dollar: ${random}`
        ];
        const randomMessageN = messagesN[Math.floor(Math.random() * messagesN.length)];
        let embed = new Discord.MessageEmbed()
        .setAuthor(`!rob`)
		.setDescription(randomMessageN)
		.setColor(0xff0000)
        await msg.channel.send(embed)
        db.subtract(`money_${msg.guild.id}_${msg.author.id}`, random)
        db.set(`robTimeout_${msg.guild.id}_${msg.author.id}`, Date.now());
    }
}
}
module.exports.help = {
    name: 'rob'
}
