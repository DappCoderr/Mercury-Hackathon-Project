exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", function (table) {
    // table.increments("id");
    table.uuid("id").primary();
    table.string("address");
    table.unique("address");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
