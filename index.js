const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json')
client.commands = new Discord.Collection()
const logchannel = `` //log channel id. if you don't need logs ignore this
const db = require('quick.db')
const DiscordRPC = require('discord-urpc');
const uRPC = new DiscordRPC({ clientID: '770678007538122786', debug: false });

client.queue = new Map();

fs.readdir('./commands', (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Commands not found')

    console.log(`Loading commands...`)
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        client.commands.set(props.help.name, props)
    })
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`for ${client.guilds.cache.size} server`,{ type: 'WATCHING'})
});

client.on('message', msg => {
  let prefix = config.prefix
  let messageArray = msg.content.split(' ')
  let command = messageArray[0]
  let args = messageArray.slice(1)

  let command_file = client.commands.get(command.slice(prefix.length))
  if (command_file) command_file.run(client, msg, args)

  if (command === 'help commands') {
    client.commands.get('help-cmd').execute(message, args)
  }
  if (msg.content.startsWith(prefix + "ping")) {
    msg.reply('Pong!');
  }
});


//SIMPLE EVENTS.
//They are very easy to make. go to the site https://discord.js.org/#/docs/main/stable/class/Client and look at the event column

//EVENT ROLE DELETE
client.on('roleDelete', function(role) {
  let embed = new Discord.MessageEmbed()
  .setAuthor(`Logs`)
  .addField(`Role log`, 'Role `' + role.name + '` has been removed', true)
  .setThumbnail(`https://i.gifer.com/7L6q.gif`)
  .setColor(0x32d160)
  client.channels.cache.get(`${logchannel}`).send(embed);
});

//EVENT ROLE UPDATE
client.on('roleUpdate', function(oldRole, newRole) {
  let embed = new Discord.MessageEmbed()
  .setAuthor(`Logs`)
  .addField(`Role log`, 'the role has been updated', true)
  .addField(`Old name`, `${oldRole.name}`, false) //Old role name
  .addField(`New name`, `${newRole.name}`, false) //New role name
  .setThumbnail(`https://media1.tenor.com/images/70ecbf36cd9cf9f23efaba96afc46cbc/tenor.gif?itemid=18284635`) //I didn't find a normal GIF. You can insert your own here
  .setColor(0x32d160)
  client.channels.cache.get(`${logchannel}`).send(embed);
});

let token = config.token
client.login(token); //bot token
