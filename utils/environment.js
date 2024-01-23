require("dotenv").config();

/* eslint no-process-env:0 */

module.exports.default = {
	chat_Id: process.env.CHAT_ID,
	admins: {
		sysAdmin: [
			process.env.SYSADMIN_ID,
			process.env.SAHIL_ID,
			process.env.ALANTE_ID,
			process.env.MATTHEW_ID,
			process.env.FABIAN_ID,
			process.env.LINDA_ID,
		],
		mCoast: [process.env.SAHIL_ID],
		aZ: [process.env.ALANTE_ID, process.env.MATTHEW_ID],
		paideia: [process.env.FABIAN_ID],
		bEI: [process.env.LINDA_ID],
	},
};
