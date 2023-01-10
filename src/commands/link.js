module.exports = {
    name: 'link',
    description: 'Sends a link to the specified repository',
    execute(client, message, args) {
        message.channel.send('https://github.com/witheredknights');
    },
};
