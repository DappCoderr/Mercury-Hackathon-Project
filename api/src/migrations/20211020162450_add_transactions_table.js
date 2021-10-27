exports.up = function (knex, Promise) {
  return knex.schema.createTable("transactions", function (table) {
    table.uuid("id").primary();
    table.uuid("tx_user_id").notNullable();
    table.foreign("tx_user_id").references("users.id").onDelete("CASCADE");
    table.string("transaction_id").notNullable().unique();
    table.integer("transaction_status").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.unique(["tx_user_id", "transaction_id"]);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("transactions");
};
