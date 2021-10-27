exports.up = function (knex) {
  return knex.schema.alterTable("races", table => {
    table.uuid("winner").nullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("races", table => {
    table.uuid("winner").notNullable().alter();
  });
};
