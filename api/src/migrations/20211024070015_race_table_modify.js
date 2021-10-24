exports.up = function (knex) {
  return knex.schema.alterTable("races", table => {
    table.uuid("owner_id").nullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("races", table => {
    table.uuid("owner_id").notNullable().alter();
  });
};
