const { Message, Client } = require('discord.js');

module.exports = {
    name: 'link',
    description: 'Sends a link to the specified repository',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        message.channel.send('https://github.com/witheredknights');
    }
};
