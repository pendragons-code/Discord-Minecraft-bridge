const { db } = require("../../../Loaders/bot.js")
const { PermissionsBitField } = require("discord.js")
module.exports = {
	name: "setchannel",
	aliases: [],
	desc: "Sets the default channel for the discord bot to send!",
	utilisation: "setchannel <on/off> <channel-id> || setchannel <check>",
	category: "core",
	minperms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(bot, messageCreate, args, prefix) {
		const acceptedargs = ["on", "off", "check"]
		if(!args[0] || !acceptedargs.includes(args[0])) return messageCreate.channel.send("Invalid argument!")
		const channel = await db.get(`channel_${messageCreate.guild.id}`)
		if(args[0] === "check"){
			if(args[1]) return messageCreate.channel.send("You cannot have an argument behind `check`!")
			if(channel == null) channel = "Not set!"
			return messageCreate.channel.send(`The channel is: \`${channel}\``)
		}
		if(!args[1] || isNaN(parseInt(args[1]))) return messageCreate.channel.send("You need to provide valid integer values corresponding to the channel id!")
		if(!bot.channels.cache.get(args[1])) return messageCreate.channel.send("You need to provide a proper channel id!")
		if(args[0] == "on"){
			await db.set(`channel_${messageCreate.guild.id}`, args[1])
			.catch((error) => {
				console.error("Error", error)
				return messageCreate.channel.send("Something went wrong!")
			})
			return messageCreate.channel.send("Done!")
		}
		await db.delete(`channel_${messageCreate.guild.id}`)
			.catch((error) => {
				console.error("Error", error)
				return messageCreate.channel.send("Something went wrong!")
			})
			return messageCreate.channel.send("Done!")
	}
}
