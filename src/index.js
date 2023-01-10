const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('../resources/config.js');
const { readdirSync } = require('fs');
const link = require('./commands/link.js');
const userinfo = require('./commands/userinfo.js');
const Discord = require('discord.js');
const capybara = require('./commands/capybara.js');

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
client.commands.set(capybara.name, capybara);

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        await client.commands.get(command).execute(client, message, args);
    } else if (command === 'capybara') {
        await capybara.execute(client, message, args);
    }
    else {
        await message.channel.send('Unknown command.');
    }
});

client.login(config.token);
