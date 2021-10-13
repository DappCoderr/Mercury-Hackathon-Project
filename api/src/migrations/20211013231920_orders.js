exports.up = function (knex) {
  return knex.schema.createTable("orders", function (table) {
    // table.increments("id");
    table.uuid("id").primary();
    table
      .uuid("user_id")
      .notNullable()
      .references("users.id")
      .onDelete("cascade");
    table
      .uuid("pack_id")
      .notNullable()
      .references("packs.id")
      .onDelete("cascade");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
