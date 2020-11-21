const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    if (args == ``) {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`🆘 Bot commands`)
    .addField('!help commands', `🥱 Commands`, true)
    .addField('!help moderator', `🗡️ Moderator commands`, true)
    .addField('!help fun', `😋 Fun commands`, true)
    .addField('!help music', `🎼 Music commands`, true)
    .addField('!help economy', `💵 Economy commands`, true)
    .setColor(0x32d160)
    await msg.channel.send(embed)
    }else if (args == `commands`) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`🆘 !help commands`)
        .addField('!serverinfo', `😂 Info about the server`, false)
        .addField('!userinfo <@user>', `👀 Info about the user`, false)
        .addField('!botinfo', `🔌 Info about the bot `, false)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    } else if (args == `fun`) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`🆘 !help fun`)
        .addField('!coinflip <heads/tails>', `💵 Flip a coin`, false)
        .addField('!8ball <question>', `❓ Ask a question about this strange ball`, false)
        .addField('!mcserver <ip>', `💾 Shows info about the minecraft server`, false)
        .addField('!mcskin <nickname>', `📡 sends the player's minecraft skin`, false)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    } else if (args == `moderator`) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`🆘 !help moderator`)
        .addField('!ban <user> <days>', `🤕 Ban a user`, false)
        .addField('!kick <user>', `🦶 Kick the user`, false)
        .addField('!mute <user>', `🥶 Mute the user `, false)
        .addField('!unmute <user>', `🥵 Unmute the user`, false)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }else if (args == `music`) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`🆘 !help music`)
        .addField('!play <name / url>', `Start playing music`, false)
        .addField('!stop', `Stop the music`, false)
        .addField('!fs', `Skip the music `, false)
        .addField('!pause', `Adjust your music`, false)
        .addField('!resume', `To continue the music`, false)
        .addField('!volume <number>', `Set the sound volume`, false)
        .addField('!queue', `To look at the music in the queue`, false)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }else if (args == `economy`) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`🆘 !help economy`)
        .addField('!balance', `Check your balance`, false)
        .addField('!work', `To go to make money`, false)
        .addField('!dep <all/amount>', `Deposit money in the Bank`, false)
        .addField('!withdraw <all/amount>', `Withdraw money from the Bank`, false)
        .addField('!rob <user>', `Rob a man`, false)
        .addField('!add-money <user> <amount>', `Add money to the user`, false)
        .addField('!remove-money <user> <amount>', `To remove money from the user`, false)
        .addField('!salary', `Gives you a salary if you have a specific role`, false)
        .addField('!pay <user> <amount>', `Transfer money to another user`, false)
        .setColor(0x32d160)
        await msg.channel.send(embed)
    }else {
        let embedtwo = new Discord.MessageEmbed()
        .setAuthor(`Error`)
        .addField('What happened?', `No such help page was found`, false)
        .setColor(0x32d160)
        await msg.channel.send(embedtwo)
    }
}

module.exports.help = {
    name: 'help'
}