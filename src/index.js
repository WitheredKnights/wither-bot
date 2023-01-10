const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('../resources/config.js');
const { readdirSync } = require('fs');

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
