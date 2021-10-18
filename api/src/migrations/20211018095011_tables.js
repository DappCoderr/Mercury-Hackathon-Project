exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", function (table) {
      table.uuid("id").primary();
      table.string("address");
      table.unique("address");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("packs", function (table) {
      table.uuid("id").primary();
      table.specificType("nfts", "jsonb[]").notNullable();
      table.boolean("sold");
      table.uuid("owner_id").notNullable();
      table
        .foreign("owner_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("orders", function (table) {
      table.uuid("id").primary();
      table.uuid("user_id").notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table.uuid("pack_id").notNullable();
      table.foreign("pack_id").references("packs.id").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("races", function (table) {
      table.uuid("id").primary();
      table.uuid("user_id_1").notNullable();
      table.foreign("user_id_1").references("users.id").onDelete("CASCADE");
      table.uuid("user_id_2").notNullable();
      table.foreign("user_id_2").references("users.id").onDelete("CASCADE");
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

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable("races")
    .dropTable("orders")
    .dropTable("packs")
    .dropTable("users");
};
