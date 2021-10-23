exports.up = function (knex) {
  return knex.schema.alterTable("transactions", table => {
    table.renameColumn("user_id", "tx_user_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("transactions", table => {
    table.renameColumn("tx_user_id", "user_id");
  });
};
