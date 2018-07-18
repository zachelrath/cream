
const dbConfig = require("../knexfile");
const db = require("knex")(dbConfig);

// Handlers
function getPeople(request, h) {
	return db.select("id", "first_name", "last_name")
		.from("people")
		.limit(10)
		.then(results => {
			return h
				.response(results)
				.type("application/json");
		})
		.catch(err => {
			return h.response("error: " + err.message)
				.code(400);
		});
}

function createPerson(request, h) {
	return db("people").insert(request.payload).returning("id")
		.then(id => {
			return h
				.response({
					id,
				})
				.type("application/json")
				.code(201);
		})
		.catch(err => {
			return h.response("error: " + err.message)
				.code(400);
		});
}

const routes = [
	{
		method: "GET",
		path: "/api/v1/people",
		handler: getPeople,
	},
	{
		method: "POST",
		path: "/api/v1/people",
		handler: createPerson,
	},
];

module.exports = routes;