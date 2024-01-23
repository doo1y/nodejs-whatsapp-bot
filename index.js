const { create, Client } = require("@open-wa/wa-automate");
const messageHandler = require("./lib/messageHandler");
const config = require("./config");
const fs = require("fs");
const environ = require("./utils/environment");

const chatID = environ.default.chat_Id;

const start = async (client = new Client()) => {
	console.log("[SERVER] server started!");

	// Open a new log file
	const date = new Date(),
		day = date.getDate(),
		month = date.getMonth() + 1,
		year = date.getFullYear();

	const filePath = `./log/log-${day}${month}${year}.json`;

	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, fs.readFileSync("./utils/format.json", "utf-8"));
		client.sendText(chatID, "☀️ GOOD MORNING EVERYONE ☀️");
	}

	// client.getAllChats().then((chats) => {
	// 	for (const chat of chats) {
	// 		console.log(chat.name, " ", chat.id);
	// 	}
	// });

	// Force current session persistance
	client.onStateChanged((state) => {
		console.log("[Client] ", state);
		if (state === "CONFLICT" || state === "UNLAUNCHED") client.forceRefocus();
	});

	// Listen to GC messages
	client.onMessage(async (message) => {
		const cached = await client.getAmountOfLoadedMessages();
		if (cached >= 3000) await client.cutMsgCache();
		messageHandler(client, filePath, message, chatID);
	});
};

create(config(true, start))
	.then((client) => start(client))
	.catch((error) => console.log(error));
