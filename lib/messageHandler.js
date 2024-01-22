const fs = require("fs");
const {
	updateTcD2D,
	updateTcFOTS,
	setTeamName,
	updateVzn,
	getCurr,
	addUser,
	bulkAddUser,
	delUser,
	showHelp,
} = require("./commands");
const color = require("./color");

module.exports = messageHandler = async (client, filePath, message, chatID) => {
	try {
		if (message.chatID === chatID) {
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

			let idx = body.indexOf(" ");
			const command = text.slice(0, idx < 0 ? text.length : idx);
			if (command.startsWith("!")) {
				let res;
				// let jsonFile = fs.readFileSync("./log/test.json", "utf-8");
				let jsonFile = fs.readFileSync(filePath, "utf-8");
				let data = JSON.parse(jsonFile);

				switch (command.toLowerCase()) {
					case "!help":
						res = showHelp();
						break;
					case "!setteamname":
						res = setTeamName(senderId, data, text);
						if (!res) res = "You do not have permission to change team name.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!adduser":
						res = addUser(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!bulkadduser":
						res = bulkAddUser(senderId, data, text);
						if (!res) res = "You do not have permission add members.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!updatetc1":
						res = updateTcD2D(data, text);
						if (!res) res = "Member does not exist on the TC D2D scoreboard.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!updatetc2":
						res = updateTcFOTS(data, text);
						if (!res) res = "Member does not exist on the TC FOTS scoreboard.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!updatevzn":
						res = updateVzn(data, text);
						if (!res) res = "Member does not exist on the VZN scoreboard.";
						else fs.writeFileSync(filePath, JSON.stringify(data));
						break;
					case "!getcurrent":
						res = getCurr(data);
						break;
					case "!deluser":
						res = delUser(senderId, data, text);
						if (!res) res = "You do not have permission to delete members.";
						else if (res === -1)
							res = "The member you specified does not exist.";
						break;
					default:
						break;
				}
				if (res) {
					client.sendText(chat.id, res);
				}
			}
		}
	} catch (err) {
		console.log(color("[ERROR]", "red"), err);
		//client.kill().then(a => console.log(a))
	}
};
