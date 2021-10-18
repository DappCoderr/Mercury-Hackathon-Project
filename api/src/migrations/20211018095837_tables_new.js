exports.up = function (knex) {
  return knex.schema.alterTable("packs", table => {
    table.uuid("owner_id").nullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("packs", table => {
    table.uuid("owner_id").notNullable().alter();
  });
};
