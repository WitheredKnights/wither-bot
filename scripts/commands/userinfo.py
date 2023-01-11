import discord
from redbot.core import commands

class UserInfo(commands.Cog):
    """Sends information about the user who sent the -userinfo command"""

    @commands.command()
    async def userinfo(self, ctx):
        """Sends information about the user who sent the command"""
        user = ctx.message.author
        embed = discord.Embed(title=f"User Information - {user}", color=0x00ff00)
        embed.add_field(name="Name", value=user.name, inline=True)
        embed.add_field(name="ID", value=user.id, inline=True)
        embed.add_field(name="Status", value=user.status, inline=True)
        embed.add_field(name="Highest Role", value=user.top_role, inline=True)
        embed.add_field(name="Created At", value=user.created_at, inline=True)
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_cog(UserInfo())
