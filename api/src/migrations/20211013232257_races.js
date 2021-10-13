exports.up = function (knex) {
  return knex.schema.createTable("races", function (table) {
    // table.increments("id");
    table.uuid("id").primary();
    table
      .uuid("user_id_1")
      .notNullable()
      .references("users.id")
      .onDelete("cascade");
    table
      .uuid("user_id_2")
      .notNullable()
      .references("users.id")
      .onDelete("cascade");
    table.string("car_nft_id_1").notNullable();
    table.string("car_nft_id_2").notNullable();
    table
      .uuid("winner")
      .notNullable()
      .references("users.id")
      .onDelete("cascade");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("races");
};
