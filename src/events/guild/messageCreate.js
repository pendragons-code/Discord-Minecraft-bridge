const { prefix, botID, guildID } = require("../../../config.json")
const { db } = require("../../../Loaders/bot.js")
module.exports = async (bot, messageCreate) => {
	let mainprefix = messageCreate.content.includes(prefix) ? prefix : `<@${botID}>`
	if(messageCreate.guild.id != guildID || messageCreate.author.bot || messageCreate.channel.type == "dm" || messageCreate.content.indexOf(mainprefix) !== 0) return
	const args = messageCreate.content.slice(mainprefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = bot.commands.get(command) || bot.command.find(cmd => cmd.aliases && cmd.aliases.includes(command))
	if(!cmd) return
	if(cmd.minperms) for(let i = 0; i < cmd.minperms.length; i++) if(!messageCreate.member.permissions.has(cmd.minperms[i])){
		const PermList = require("../../assets/permissions.json")
		if(Array.isArray(cmd.minperms[i])){
			let query = ""
			for(let perarray = 0; perarray < cmd.minperms[i].length; perarray++){
				let BitToPerm = PermList[cmd.minperms[i][perarray]]
				query + `\`${BitToPerm}\``
				if(cmd.minperms[i][perarray + 1]) query + ", "
			}
		}
		let query = PermList[cmd.minperms[i]]
		return messageCreate.channel.send(`Missing permissions! \`${query}\``)
	}
	cmd.execute(bot, messageCreate, args, mainprefix)
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send("Something went wrong!")
		})
	console.log(`${messageCreate.author.username} ran ${cmd.name} in ${messageCreate.guild.id}!`)
}
