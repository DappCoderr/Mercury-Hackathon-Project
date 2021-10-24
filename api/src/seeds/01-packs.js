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
            { nft_id: "0xerrerer1", value: 20, type: "engine" },
            { nft_id: "0xerrerer2", value: 30, type: "wheel" },
            { nft_id: "0xerrerer3", value: 50, type: "power-up" },
            { nft_id: "0xerrerer4", value: 5, type: "body" }
          ],
          sold: false,
          owner_id: null
        },
        {
          id: uuidv4(),
          nfts: [
            { nft_id: "0xerrerer5", value: 12, type: "engine" },
            { nft_id: "0xerrerer6", value: 34, type: "wheel" },
            { nft_id: "0xerrerer7", value: 5, type: "power-up" },
            { nft_id: "0xerrerer8", value: 7, type: "body" }
          ],
          sold: false,
          owner_id: null
        },
        {
          id: uuidv4(),
          nfts: [
            { nft_id: "0xerrerer9", value: 13, type: "engine" },
            { nft_id: "0xerrerer0", value: 61, type: "wheel" },
            { nft_id: "0xerrerer10", value: 70, type: "power-up" },
            { nft_id: "0xerrerer11", value: 9, type: "body" }
          ],
          sold: false,
          owner_id: null
        }
      ]);
    });
};
