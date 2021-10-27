exports.up = function (knex) {
  return knex.schema.alterTable("races", table => {
    table.integer("request_status").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("races", table => {
    table.dropColumn("request_status");
  });
};
