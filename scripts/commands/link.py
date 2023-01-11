from redbot.core import commands

class Link(commands.Cog):
    """Sends a link on the -link command"""

    @commands.command()
    async def link(self, ctx):
        """Sends the link to a webpage"""
        link = "https://github.com/WitheredKnights/"
        await ctx.send(link)

def setup(bot):
    bot.add_cog(Link())
