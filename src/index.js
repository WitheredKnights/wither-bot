const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('../resources/config.js');
const { readdirSync } = require('fs');
const link = require('./commands/link.js');
const userinfo = require('./commands/userinfo.js');
const Discord = require('discord.js');

const client = new Client({
    intents: Object.keys(GatewayIntentBits),
    partials: Object.keys(Partials)
});

client.commands = new Collection();

const files = readdirSync(`${__dirname}/commands`).filter(e => e.endsWith('.js'));
for (let file of files) {
    let command = require(`${__dirname}/commands/${file}`);
    client.commands.set(command.name, command);
}
client.commands.set(link.name, link);
client.commands.set(userinfo.name, userinfo);
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = client.commands.get(args.shift().toLowerCase());

    if(command) {
        await command.execute(client, message, args);
    } else {
        await message.channel.send('Unknown command.');
    }
});

client.login(config.token);
