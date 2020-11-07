const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json')
client.commands = new Discord.Collection()

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

let token = config.token
client.login(token); //bot token
