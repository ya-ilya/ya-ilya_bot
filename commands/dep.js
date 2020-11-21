const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, msg, args) => {
    let User = msg.mentions.users.first()
    if (args != '') {
        if (args[0] === "all") {
            let totalCash = db.fetch(`money_${msg.guild.id}_${msg.author.id}`)

            if(totalCash == 0) return msg.reply("You don't have that much in hand")

            db.subtract(`money_${msg.guild.id}_${msg.author.id}`, totalCash);
            db.add(`bank_${msg.guild.id}_${msg.author.id}`, totalCash);

            let embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
            .setDescription(`✅ Deposited :dollar: ${totalCash} to your bank`)
            .setColor(0x32d160)
            await msg.channel.send(embed)

        } else {
            let amount = parseInt(args[0])

            let totalAmountInHand = db.fetch(`money_${msg.guild.id}_${msg.author.id}`)

            if(amount > totalAmountInHand) return msg.reply("You don't have that much in hand")

            db.subtract(`money_${msg.guild.id}_${msg.author.id}`, amount);
            db.add(`bank_${msg.guild.id}_${msg.author.id}`, amount);

            let embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
            .setDescription(`✅ Deposited :dollar: ${amount} to your bank`)
            .setColor(0x32d160)
            await msg.channel.send(embed)
        }
    }else {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
        .setDescription('❌ `Not enough arguments `\n')
        .addField("Usage:", '`!dep <amount/all>`', false)
        .setColor(0xff0000)
        await msg.channel.send(embed)
    }
}

module.exports.help = {
    name: 'dep'
}