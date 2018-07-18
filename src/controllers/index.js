"use strict";

const fs = require("fs");
const path = require("path");

let files = fs.readdirSync(__dirname);
module.exports = [];
for ( let i in files ) {
	let filename = files[i];
	if (filename.indexOf("Controller") != -1 && filename.charAt(0) !== ".")
		module.exports = module.exports.concat(require(path.join(__dirname, filename)));
}
