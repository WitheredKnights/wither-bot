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
    if (message.content.indexOf(config.prefix) != 0) return;
    
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = client.commands.get(args.shift().toLowerCase());

    if(command) {
        await command.execute(client, message, args);
    } else {
        await message.channel.send('Unknown command.');
    }
});

client.login(config.token);