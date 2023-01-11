import discord
from redbot.core import commands
from config import Config
from scripts.config import Config

bot = commands.Bot(command_prefix="-")

for filename in os.listdir('./commands'):
    if filename.endswith('.py'):
        module = filename[:-3]
        importlib.import_module(f'commands.{module}')

def setup(bot):
    bot.load_extension("userinfo")

def setup(bot):
    bot.load_extension("link")

bot.run(Config.TOKEN)
