const fs = require("fs");
const Grapheme = require("grapheme-splitter");
const grapheme = new Grapheme();

fs.readFile("../test.json", "utf-8", (err, jsonFile) => {
	try {
		let data = JSON.parse(jsonFile);
		let count = 0;
		let tcData = data.tc.members.map((member) => {
			console.log(grapheme.splitGraphemes(member.TOTAL).length);
			count += member.TOTAL.length;
			return member.NAME + " " + member.TOTAL + "\n" + member.METRICS;
		});
		console.log(
			data.tc.name + "\n" + tcData.join("\n") + "\n" + `${count}/ 40`
		);
	} catch (err) {
		console.log(err);
	}
});
