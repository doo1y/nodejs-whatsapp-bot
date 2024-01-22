const Grapheme = require("grapheme-splitter");
const grapheme = new Grapheme();
const config = require("../utils/environment");

const showHelp = () => {
	const header1 = "GENERAL COMMANDS:";
	const getCurr = "!getcurrent";
	const updateTCD2D =
		"!updatetc1 [name]\n[activation emojis here]\n[metrics emojis here]";
	const updateVZN =
		"!updatevzn [name]\n[sales emojis here]\n[addon emojis here]";
	const updateTCFOTS =
		"!updatetc2 [name]\n[activation emojis here]\n[metrics emojis here]";

	const header2 = "ADMIN COMMANDS:";
	const teamname = "!setteamname [team name]";
	const adduser = "!adduser [name]";
	const bulkAddUser = "!bulkadduser [name 1, name 2, ...]";
	const delUser = "!deluser [name]";

	return `*${header1}*\n* ${getCurr}\n* ${updateTCD2D}\n* ${updateVZN}\n* ${updateTCFOTS}\n*${header2}*\n* ${teamname}\n* ${adduser}\n* ${bulkAddUser}\n* ${delUser}\n`;
};

const setTeamName = (senderId, data, text) => {
	const messageText = text.slice(text.indexOf(" ") + 1);
	try {
		if (config.default.admins.mCoast.includes(senderId)) {
			data.tcD2D.name = messageText;
			return "TC D2D name set successfully";
		} else if (config.default.admins.aZ.includes(senderId)) {
			data.vzn.name = messageText;
			return "VZN name set successfully";
		} else if (config.default.admins.bEI.includes(senderId)) {
			data.tcFOTS.name = messageText;
			return "TC FOTS names set successfully";
		} else throw new Error();
	} catch (err) {
		return false;
	}
};

const addUser = (senderId, data, text) => {
	const messageText = text.slice(text.indexOf(" ") + 1);
	let member = {
		NAME: messageText.toUpperCase(),
		TOTAL: "",
		METRICS: "",
	};

	try {
		if (Object.values(config.default.admins.mCoast).includes(senderId)) {
			data.tcD2D.members.push(member);
			return `Added ${messageText} to TC D2D`;
		} else if (Object.values(config.default.admins.aZ).includes(senderId)) {
			data.vzn.members.push(member);
			return `Added ${messageText} to VZN`;
		} else if (Object.values(config.default.admins.bEI).includes(senderId)) {
			data.tcFOTS.members.push(member);
			return `Added ${messageText} to TC FOTS`;
		} else throw new Error();
	} catch (err) {
		return false;
	}
};

const bulkAddUser = (senderId, data, text) => {
	const nameArray = text
		.slice(text.indexOf(" ") + 1)
		.replace(/\s*,\s*/g, ",")
		.toUpperCase()
		.split(",");

	const memberArray = nameArray.map((name) => {
		return {
			NAME: name,
			TOTAL: "",
			METRICS: "",
		};
	});

	try {
		if (Object.values(config.default.admins.mCoast).includes(senderId)) {
			data.tcD2D.members.push(...memberArray);
			return `Added ${nameArray.join(", ").toLowerCase()} to TC D2D`;
		} else if (Object.values(config.default.admins.aZ).includes(senderId)) {
			data.vzn.members.push(...memberArray);
			return `Added ${nameArray.join(", ").toLowerCase()} to VZN`;
		} else if (Object.values(config.default.admins.bEI).includes(senderId)) {
			data.tcFOTS.members.push(...memberArray);
			return `Added ${nameArray.join(", ").toLowerCase()} to TC FOTS`;
		} else throw new Error();
	} catch (err) {
		return false;
	}
};

const updateTcD2D = (data, text) => {
	const textArray = text.slice(text.indexOf(" ") + 1).split("\n");
	try {
		const memberIdx = data.tcD2D.members.findIndex(
			(member) => member.NAME.toLowerCase() === textArray[0].toLowerCase()
		);
		if (memberIdx < 0) throw new Error();

		data.tcD2D.members[memberIdx].TOTAL = textArray[1];
		data.tcD2D.members[memberIdx].METRICS = textArray[2];
		return `${textArray[0]} has been successsfully updated.`;
	} catch (err) {
		return false;
	}
};

const updateVzn = (data, text) => {
	const textArray = text.slice(text.indexOf(" ") + 1).split("\n");
	try {
		const memberIdx = data.vzn.members.findIndex(
			(member) => member.NAME.toLowerCase() === textArray[0].toLowerCase()
		);
		if (memberIdx < 0) throw new Error();

		data.vzn.members[memberIdx].TOTAL = textArray[1];
		data.vzn.members[memberIdx].METRICS = textArray[2];
		return `${textArray[0]} has been successsfully updated.`;
	} catch (err) {
		return false;
	}
};

const updateTcFOTS = (data, text) => {
	const textArray = text.slice(text.indexOf(" ") + 1).split("\n");
	try {
		const memberIdx = data.tcFOTS.members.findIndex(
			(member) => member.NAME.toLowerCase() === textArray[0].toLowerCase()
		);
		if (memberIdx < 0) throw new Error();

		data.tcFOTS.members[memberIdx].TOTAL = textArray[1];
		data.tcFOTS.members[memberIdx].METRICS = textArray[2];
		return `${textArray[0]} has been successsfully updated.`;
	} catch (err) {
		return false;
	}
};

const getCurr = (data) => {
	try {
		let tcD2DCount = 0;
		let tcD2DData = data.tcD2D.members.map((member) => {
			tcD2DCount += grapheme.splitGraphemes(member.TOTAL).length;
			if (grapheme.splitGraphemes(member.TOTAL).length) {
				return member.NAME + " " + member.TOTAL + "\n" + member.METRICS;
			}
			return member.NAME;
		});

		let vznCount = 0;
		let vznData = data.vzn.members.map((member) => {
			vznCount += grapheme.splitGraphemes(member.TOTAL).length;
			if (grapheme.splitGraphemes(member.TOTAL).length) {
				return member.NAME + " " + member.TOTAL + "\n" + member.METRICS;
			}
			return member.NAME;
		});

		let tcFOTSCount = 0;
		let tcFOTSData = data.tcFOTS.members.map((member) => {
			tcFOTSCount += grapheme.splitGraphemes(member.TOTAL).length;
			if (grapheme.splitGraphemes(member.TOTAL).length) {
				return member.NAME + " " + member.TOTAL + "\n" + member.METRICS;
			}
			return member.NAME;
		});

		return (
			"*" +
			data.tcD2D.name +
			"*\n" +
			tcD2DData.join("\n") +
			`\n${tcD2DCount} / ${data.tcD2D.goal}\n\n` +
			"*" +
			data.vzn.name +
			"*\n" +
			vznData.join("\n") +
			`\n${vznCount} / ${data.vzn.goal}\n\n` +
			"*" +
			data.tcFOTS.name +
			"*\n" +
			tcFOTSData.join("\n") +
			`\n${tcFOTSCount} / ${data.tcFOTS.goal}`
		);
	} catch (err) {
		console.log(err);
	}
};

const delUser = (senderId, data, text) => {
	const messageText = text.slice(text.indexOf(" ") + 1);

	try {
		if (Object.values(config.default.admins.mCoast).includes(senderId)) {
			const idx = data.tcD2D.members.findIndex(
				(member) => member.NAME.toLowerCase() == messageText.toLowerCase()
			);
			if (idx === -1) return -1;
			data.tcD2D.members.splice(idx, 1);
			return `Removed ${messageText} from TC D2D`;
		} else if (Object.values(config.default.admins.aZ).includes(senderId)) {
			const idx = data.vzn.members.findIndex(
				(member) => member.NAME.toLowerCase() == messageText.toLowerCase()
			);
			if (idx === -1) return -1;
			data.vzn.members.splice(idx, 1);
			return `Removed ${messageText} from VZN`;
		} else if (Object.values(config.default.admins.bEI).includes(senderId)) {
			const idx = data.tcFOTS.members.findIndex(
				(member) => member.NAME.toLowerCase() == messageText.toLowerCase()
			);
			if (idx === -1) return -1;
			data.tcFOTS.members.splice(idx, 1);
			return `Removed ${messageText} from TC FOTS`;
		} else throw new Error();
	} catch (err) {
		return false;
	}
};

module.exports = {
	setTeamName,
	updateTcD2D,
	updateTcFOTS,
	updateVzn,
	getCurr,
	bulkAddUser,
	addUser,
	delUser,
	showHelp,
};
