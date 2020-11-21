const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('ms')

module.exports.run = async (client, msg, args) => {
    let payment = Math.floor(Math.random() * 501)
    let timeout = 5 * 60000;
    const messages = [
        `You take a nice stroll around the park, looking down and finding :dollar: ${payment}. Congrats!`, 
        `You carefully clean the spring lock suits and receive :dollar: ${payment}`, 
        `Your level got featured epic and you won :dollar: ${payment}`, 
        `You fixed a broken down T-60 Tank in Afghanistan. The crew paid you :dollar: ${payment} when you got back home`, 
        `You sign up for a DJ job and you play Country Road. You make :dollar: ${payment} just for playing that song, so nice pick!`
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]; //if anything these are phrases UnbelievaBoat
    let work = await db.fetch(`work_${msg.guild.id}_${msg.author.id}`);
    if (work !== null && timeout - (Date.now() - work) > 0) {
        let time = ms(timeout - (Date.now() - work));
        return msg.channel.send(`Please wait 5 minutes before working again`)
    }else {
        db.add(`money_${msg.guild.id}_${msg.author.id}`, payment);
        db.set(`work_${msg.guild.id}_${msg.author.id}`, Date.now());
        let embed = new Discord.MessageEmbed()
        .setAuthor(`work`)
        .setDescription(randomMessage)
        .setColor(0x32d160)
        await msg.channel.send(embed)
}
}

module.exports.help = {
    name: 'work'
}