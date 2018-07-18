const routes = [
	{
		method: "GET",
		path: "/",
		handler: (request, h) => {
			return h.view("index");
		},
	},
	{
		method: "GET",
		path: "/favicon.ico",
		handler: (request, h) => {
			return h.file("favicon.ico");
		},
	},
	{
		method: "GET",
		path: "/js/{modstamp}/app.js",
		handler: (request, h) => {
			return h.file("js/app.js");
		},
		config: {
			cache: {
				expiresIn: 1000 * 60 * 60 * 24 * 7,  // 7 Days in ms
				privacy: "public",
			},
		},
	},
];

module.exports = routes;