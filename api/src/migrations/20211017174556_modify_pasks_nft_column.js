exports.up = function (knex) {
  return knex.schema.table("packs", table => {
    table.specificType("nfts", "jsonb[]").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table("packs", table => {
    table.dropColumn("nfts");
  });
};
