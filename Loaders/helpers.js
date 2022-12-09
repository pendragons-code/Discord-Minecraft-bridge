const fs = require("fs")
const { decorpiece, decorpiece2 } = require("../config.json")
const { bot } = require("./bot.js")
function helper() {
	console.log(`${decorpiece} Helpers ${decorpiece2}`)
	fs.readdirSync("./src/helpers").forEach(dirs => {
		const helperfile = fs.readdirSync(`./src/Autotask/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of helperfile){
			require(`../src/helpers/${dirs}/${file}`)(bot)
			console.log(`Loading helper: ${file} from ${dirs} succeeded!`)
		}
	})
	console.log(`${decorpiece} End of Helpers! ${decorpiece2}`)
}
module.exports = { helper }
