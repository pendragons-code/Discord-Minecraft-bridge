# Discord-Minecraft-bridge
Discord bot element and backend of the system         
The way this works is that it receives a post request from the minecraft element and it sends the username(minecraft) and the message to discord


# Minecraft side:
[Thanks DiffuseHyperion!](https://github.com/DiffuseHyperion/DiscordMinecraftBridge)


# note:
Project is still not done yet! And yes I am working on Jasbot while this is all happening!

# configuration
```
.env

token = TokenHere
port = portHere
```

```
config.json

{	
  "minecraftEndPoint": "",
	"prefix": "",
	"botID": "",
	"OwnerID": "",
	"guildID": "",
	"decorpiece": "-=-=-=-=-=-=",
	"decorpiece2": "=-=-=-=-=-=-"
}
```


```
npm i
npm run deploy
```
# Status:
works, but not sure if the minecraft client can receive it (I tried and it should work in theory)


# better-sqlite3:
Depending on your operating system, you may have to run `npm i better-sqlite3 promise-mysql`. I am not sure why, since I don't have a copy of windows, but it seems consistently, windows and certains installs of nodeos (yes) could not get the dev dependencies right and got really weird results. This is subjected to updates and version of the runtime too. (It seems that some versions of npm can do the install right, but when you upgrade the problems comes back again because old-lockfile. I can't figure out what the error is, but this is the best solution.)
