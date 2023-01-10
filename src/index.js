const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('../resources/config.js');
const { readdirSync } = require('fs');

const client = new Client({
    intents: Object.keys(GatewayIntentBits),
    partials: Object.keys(Partials)
});

client.commands = new Collection();

const commands = readdirSync(`${__dirname}/commands`).filter(e => e.endsWith('.js'));
for (let file of commands) {
    let command = require(`${__dirname}/commands/${file}`);
    client.commands.set(command.name, command);
}

const events = readdirSync(`${__dirname}/events`).filter(e => e.endsWith('.js'));
for (let file of events) {
    let eventName = file.split('.').at(0);
    let event = require(`${__dirname}/events/${file}`);
    client.on(eventName, event.bind(null, client));
} 

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;
    
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = client.commands.get(args.shift().toLowerCase());

    if (command) {
        await command.execute(client, message, args);
    } else {
        await message.channel.send('Unknown command.');
    }
});

process.on('uncaughtException', async (err, origin) => {
    let logs = await client.channels.fetch(config.channels.logs);

    let embed = new EmbedBuilder()
        .setTitle('An error has occured')
        .setDescription(`${err.message}`)
        .setColor(0xFFFF00).setTimestamp();

    if (logs) {
        await logs.send({ embeds: [ embed ] });
    }
});

client.login(config.bot.token);
