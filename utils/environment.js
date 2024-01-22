require("dotenv").config();

/* eslint no-process-env:0 */

module.exports.default = {
	chat_Id: process.env.CHAT_ID,
	admins: {
		mCoast: [
			process.env.SAHIL_ID,
			process.env.FABIAN_ID,
			process.env.SYSADMIN_ID,
		],
		aZ: [
			process.env.ALANTE_ID,
			process.env.MATTHEW_ID,
			process.env.SYSADMIN_ID,
		],
		bEI: [process.env.LINDA_ID, process.env.SYSADMIN_ID],
	},
};
