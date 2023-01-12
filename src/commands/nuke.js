// Deletes the channel and makes a channel with the same name and permissions as the channel it deleted in Javascript using Discord.js, take help.js as an examople file?

const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX } = require('../../config');

module.exports = {
  name: 'deletechannel',
  description: 'Deletes the channel and makes a channel with the same name and permissions as the channel'
    
  options: [
    {
      name: 'channel',
      description: 'Channel to delete',
      type: 'CHANNEL',
      required: true
    }

]}
