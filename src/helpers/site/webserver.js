const { guildID, OwnerID } = require("../../../config.json")
const { db, bot } = require("../../../Loaders/bot.js")
const env = require("dotenv").config()
const express = require("express")
const port = process.env.port
const app = express()

app.use(express.json())
app.post("/", async function (req, res) {
	const channelFromDB = await db.get(`channel_${guildID}`)
	if (channelFromDB == null) {
		console.log(`The db for ${guildID} is null!`)
		bot.users.cache.get(OwnerID).send(`Need to set the channel for ${guildID}`)
			.catch((error) => {
				console.error(error)
			})
		return res.send(`{ "Error": "Default channel has not been set in the database!" }`)
	}
	let getChannel = bot.channels.cache.get(channelFromDB)
	if (!getChannel) {
		bot.users.cache.get(OwnerID).send(`Channel set in the database does not exist!`)
			.catch((error) => {
				console.error(error)
			})
		return res.send(`{ "Error": "Default set in the database channel does not exist!" }`)
	}
	let messageMinecraftRequest = await Object.keys(JSON.stringify(req.body))[0]
	let usernameMinecraftRequest = await Object.values(JSON.stringify(req.body))[0]
	if (!messageMinecraftRequest || messageMinecraftRequest.length == 0) return res.send(`{ "Error": "Messages cannot be empty" }`)
	if (!usernameMinecraftRequest) return res.send(`{ "Error": "Usernames cannot be empty!" }`)
	getChannel.send(`${usernameMinecraftRequest} sent: \`${messageMinecraftRequest}\``)
		.catch((error) => {
			res.send(`{ "Error": ${error} }`)
			console.error(error)
			bot.users.cache.get(OwnerID).send(`Error!: \`${error}\``)
			return getChannel.send("an error occurred!")
		})
})

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})
