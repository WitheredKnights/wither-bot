const { Message, Client } = require('discord.js');
const config = require('../../resources/config');

module.exports = {
    name: 'link',
    description: 'Sends a link to the specified repository',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        await message.channel.send(config.links.github);
    }
};
