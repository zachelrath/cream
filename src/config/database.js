
function getRequiredVar(envVar) {
	const val = process.env[envVar];
	if (!val) throw `Environment variable ${envVar} is required.`;
	else return val;
}

const connection = {
	host: getRequiredVar("PGHOST"),
	user: getRequiredVar("PGUSER"),
	password: getRequiredVar("PGPASSWORD"),
	database: getRequiredVar("PGDATABASE"),
	port: getRequiredVar("PGPORT"),
};

module.exports = {
	connection,
	debug: false,
	client: "pg",
	acquireConnectionTimeout: 10 * 1000,
	pool: {
		bailAfter: 10 * 1000,
	},
};
