
exports.up = knex => {
	return knex.transaction(trx => {
		return trx.schema.createTable("people", table => {
			table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
			table.timestamps();
			table.string("first_name", 1000).notNullable();
			table.string("last_name", 1000).notNullable();
			table.string("city", 1000);
			table.string("state", 1000);
			table.string("country", 1000);
			table.date("birthdate");
		})
			.then(trx.commit)
			.catch(trx.rollback);
	});
};

exports.down = knex => {
	return knex.transaction(trx => {
		return trx.schema.dropTable("people")
			.then(trx.commit)
			.catch(trx.rollback);
	});
};
