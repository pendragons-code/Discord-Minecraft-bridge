const { db } = require("../../../Loaders/bot.js")
const { minecraftEndPoint, guildID } = require("../../../config.json")
module.exports = {
	name: "bridge",
	aliases: [],
	category: "core",
	desc: "Sends message to minecraft!",
	utilisation: "bridge <message>",
	async execute(bot, messageCreate, args, mainprefix){
		if(!args[0]){
			messageCreate.react("❌")
			return messageCreate.channel.send("You cannot send empty messages!")
		}
		const replyChannel = await db.get(`channel_${guildID}`)
		if(replyChannel == null){
			messageCreate.reply("Channel has not been set for the guild!")
			return messageCreate.channel.react("❌")
		}
		messageCreate.react("👍")
		const axios = await import("axios")
		let username = messageCreate.author.tag
		let messageToMinecraft = await args.join(" ")
		let contentJson = JSON.stringify({ username: messageToMinecraft })
		await axios.post(minecraftEndPoint, contentJson)
			.catch((error) => {
				console.error("Error!", err)
				return messageCreate.reply("Something went wrong!")
			})
			.then(() => {
				if(messageCreate.channel.id != replyChannel) return messageCreate.reply(`You need to go to #${replyChannel} to see the messages that are sent back!`)
				return messageCreate.react("✅")
			})
	}
}
