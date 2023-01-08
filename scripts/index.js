const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const fs = require('fs');

client.on('message', async message => {
  if (message.content === '!capybara') {
    // Get a list of all files in the 'capybara_images' folder
    const files = fs.readdirSync('./resources/imgs');
    // Choose a random file
    const file = files[Math.floor(Math.random() * files.length)];
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
    let commitMessage = '';
    commits.forEach(commit => {
      commitMessage += `Commit by ${commit.commit.author.name}: ${commit.commit.message}\n`;
    });
    message.channel.send(commitMessage);
  } else if (message.content === '!link') {
    message.channel.send('https://github.com/witheredknights/');
  }
});

client.login('MTA1NTg2ODM5NjM0MTgyOTczMw.GARLgW.2dx_pqBHjUyy2RVXig6-A7IatfBqCXqhcz7PEo');
