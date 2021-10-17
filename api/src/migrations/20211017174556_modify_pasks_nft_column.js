exports.up = function (knex) {
  return knex.schema.table("packs", table => {
    return knex.schema.hasColumn("packs", "nfts").then(exists => {
      if (!exists) {
        table.specificType("nfts", "jsonb[]");
      } else {
        table.dropColumn("nfts");
        table.specificType("nfts", "jsonb[]");
      }
    });
  });
};

exports.down = function (knex) {
  return knex.schema.table("packs", table => {
    table.dropColumn("nfts");
  });
};
