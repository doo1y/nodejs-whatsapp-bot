const fs = require("fs");
const {
	updateTcD2D,
	updateTcFOTS,
	setTeamName,
	updateVzn,
	updateTcSc,
	getCurr,
	addUser,
	bulkAddUser,
	delUser,
	showHelp,
	sysAddUser1,
	sysAddUser2,
	sysAddUser3,
	sysAddUser4,
	sysDelUser1,
	sysDelUser2,
	sysDelUser3,
	sysDelUser4,
} = require("./commands");
const color = require("./color");

module.exports = messageHandler = async (client, filePath, message, chatID) => {
	try {
		if (message.chatId === chatID) {
			let {
				from, // the chat from which the message was sent
				sender, // the contact object of the account that sent the message
				chat, // the chat object
				caption, // caption on a media type message
				isMedia, // boolean
				body,
				text,
			} = message;
			const senderId = sender.id;
			const { name, formattedTitle } = chat;

			let idx = text.indexOf(" ");
			let command;
			if (idx === -1) command = text;
			else command = text.slice(0, idx);
			if (command.startsWith("!")) {
				let res;
				// let jsonFile = fs.readFileSync("./log/test.json", "utf-8");
				let jsonFile = fs.readFileSync(filePath, "utf-8");
				let data = JSON.parse(jsonFile);

				switch (command.toLowerCase()) {
					case "!help":
						console.log("command !help used");
						res = showHelp();
						break;
					case "!setteamname":
						console.log("command !setteamname used");
						res = setTeamName(senderId, data, text);
						if (!res) res = "You do not have permission to change team name.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!adduser":
						console.log("command !adduser used");
						res = addUser(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!bulkadduser":
						console.log("command !bulkadduser used");
						res = bulkAddUser(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!updatetc1":
						console.log("command !updatetc1 used");
						res = updateTcD2D(data, text);
						if (!res) res = "Member does not exist on the TC D2D scoreboard.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!updatetc2":
						console.log("command !updatetc2 used");
						res = updateTcFOTS(data, text);
						if (!res) res = "Member does not exist on the TC FOTS scoreboard.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!updatetc3":
						console.log("command !updatetc3 used");
						res = updateTcSc(data, text);
						if (!res)
							res = "Member does not exist on the TC COLUMBIA scoreboard.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!updatevzn":
						console.log("command !updatevzn used");
						res = updateVzn(data, text);
						if (!res) res = "Member does not exist on the VZN scoreboard.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!getcurrent":
						console.log("command !getcurrent used");
						res = getCurr(data);
						break;
					case "!deluser":
						console.log("command !deluser used");
						res = delUser(senderId, data, text);
						if (!res) res = "You do not have permission to delete members.";
						else if (res === -1)
							res = "The member you specified does not exist.";
						break;
					case "!addusertcd2d":
						console.log("command !sysadduser1 used");
						res = sysAddUser1(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!adduservzn":
						console.log("command !sysadduser2 used");
						res = sysAddUser2(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!adduserfots":
						console.log("command !sysadduser3 used");
						res = sysAddUser3(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!addusertcsc":
						console.log("command !sysadduser4 used");
						res = sysAddUser4(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!delusertcd2d":
						console.log("command !sysdeluser1 used");
						res = sysDelUser1(senderId, data, text);
						if (!res) res = "You do not have permission to delete members.";
						else if (res === -1)
							res = "The member you specified does not exist.";
						break;
					case "!deluservzn":
						console.log("command !sysdeluser2 used");
						res = sysDelUser2(senderId, data, text);
						if (!res) res = "You do not have permission to delete members.";
						else if (res === -1)
							res = "The member you specified does not exist.";
						break;
					case "!delusertcfots":
						console.log("command !sysdeluser3 used");
						res = sysDelUser3(senderId, data, text);
						if (!res) res = "You do not have permission to delete members.";
						else if (res === -1)
							res = "The member you specified does not exist.";
						break;
					case "!delusertcsc":
						console.log("command !sysdeluser3 used");
						res = sysDelUser4(senderId, data, text);
						if (!res) res = "You do not have permission to delete members.";
						else if (res === -1)
							res = "The member you specified does not exist.";
						break;
					default:
						break;
				}
				if (res) {
					client.sendText(chatID, res);
				}
			}
		}
	} catch (err) {
		console.log(color("[ERROR]", "red"), err);
		//client.kill().then(a => console.log(a))
	}
};
