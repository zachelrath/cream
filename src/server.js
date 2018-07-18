
/* eslint-disable no-console */

"use strict";

const Hapi = require("hapi");
const Path = require("path");

const server = new Hapi.server({
	port: 4321,
	host: "localhost",
	debug: {
		request: [
			"error",
		],
	},
	routes: {
		files: {
			relativeTo: Path.join(__dirname, "static"),
		},
	},
});

const appContext = {
	modstamp: new Date().getTime(),
};

async function init() {

	await Promise.all([
		server.register(require("inert")),
		server.register(require("vision")),
	]);

	server.views({
		engines: {
			html: require("handlebars"),
		},
		path: [
			"./src/static/templates",
		],
		helpersPath: "./src/static/templates/helpers",
		layoutPath: "./src/static/templates/layout",
		layout: "default",
		context: appContext,
	});

	require("./controllers").forEach(controller => server.route(controller));

	server.events.on("response", function (request) {
		console.log("RESPONSE: " + request.info.remoteAddress + ": " + request.method.toUpperCase() + " " + request.url.path + " --> " + request.response.statusCode);
	});

	return server;
}

module.exports = {
	init,
	server,
};