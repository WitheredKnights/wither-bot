module.exports = {
    name: 'userinfo',
    description: 'Sends the user\'s public information',
    execute(client, message, args) {
        const user = message.author;
        const embed = {
            title: `${user.username}'s Public Information`,
            fields: [
                { name: 'Username', value: user.username, inline: true },
                { name: 'Discriminator', value: user.discriminator, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Status', value: user.presence.status, inline: true },
                { name: 'Created At', value: user.createdAt, inline: true }
            ],
            timestamp: new Date(),
            footer: {
                text: `Requested by ${user.username}`,
                icon_url: user.avatarURL()
            },
        };
        message.channel.send({ embed });
    },
};
