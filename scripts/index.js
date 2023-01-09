const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [Object.keys(Discord.GatewayIntentBits)],
    partials: [Object.keys(Discord.Partials)]
});
const axios = require('axios');
const fs = require('fs');

// Read the list of files in the 'capybara_images' folder when the bot starts up
const capybaraFiles = fs.readdirSync('./resources/imgs');

client.on('message', async message => {
  if (message.content === '!capybara') {
    // Choose a random file from the list of files
    const file = capybaraFiles[Math.floor(Math.random() * capybaraFiles.length)];
    // Send the file as an attachment
    message.channel.send({
      files: [{
        attachment: `./capybara_images/${file}`,
        name: file
      }]
    });
  } else if (message.content === '!commit') {
    async function getCommits(repo) {
      try {
        const response = await axios.get(`https://api.github.com/repos/${repo}/commits`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    const commits = await getCommits('WitheredKnights');
    // Send a summary message instead of a message for every commit
    message.channel.send(`There are ${commits.length} commits in the repository.`);
  } else if (message.content === '!link') {
    message.channel.send('https://github.com/witheredknights/');
  } else if (message.content === '!userinfo') {
    const user = message.author;
    message.channel.send(`Username: ${user.username}\nDiscriminator: ${user.discriminator}\nID: ${user.id}\nAvatar: ${user.avatarURL()}`);
  }
});

client.login('MTA1NTg2ODM5NjM0MTgyOTczMw.GARLgW.2dx_pqBHjUyy2RVXig6-A7IatfBqCXqhcz7PEo');
