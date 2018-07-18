"use strict";

/* eslint-disable no-console */

const {
	init,
	server,
} = require("./server");

process.on("unhandledRejection", err => {
	console.log(err);
	process.exit(1);
});

(async () => {
	try {
		console.log("Starting server...");
		await init();
		await server.start();
		console.log(`Server running at: ${server.info.uri}`);
	} catch (err) {
		console.error("Unable to start server", err);
		process.exit(1);
	}
})();