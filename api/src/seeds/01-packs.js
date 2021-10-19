const { v4: uuidv4 } = require("uuid");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("packs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("packs").insert([
        {
          id: uuidv4(),
          nfts: [
            { nft_id: "0xerrerer", value: 20, type: "tyre" },
            { nft_id: "0xerrerer", value: 20, type: "tyre" }
          ]
        },
        {
          id: uuidv4(),
          nfts: [
            { nft_id: "0xerrerer", value: 20, type: "tyre" },
            { nft_id: "0xerrerer", value: 20, type: "tyre" }
          ]
        },
        {
          id: uuidv4(),
          nfts: [
            { nft_id: "0xerrerer", value: 20, type: "tyre" },
            { nft_id: "0xerrerer", value: 20, type: "tyre" }
          ]
        }
      ]);
    });
};
