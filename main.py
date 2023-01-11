import discord
from redbot.core import commands
from config import Config

bot = commands.Bot(command_prefix="-")

def setup(bot):
    bot.load_extension("userinfo")

def setup(bot):
    bot.load_extension("link")

bot.run(Config.TOKEN)
