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
            { nft_id: "0xerrerer", value: 20, type: "engine" },
            { nft_id: "0xerrerer", value: 30, type: "wheel" },
            { nft_id: "0xerrerer", value: 50, type: "power-up" },
            { nft_id: "0xerrerer", value: 5, type: "body" }
          ],
          sold: false,
          owner_id: null
        },
        {
          id: uuidv4(),
          nfts: [
            { nft_id: "0xerrerer", value: 12, type: "engine" },
            { nft_id: "0xerrerer", value: 34, type: "wheel" },
            { nft_id: "0xerrerer", value: 5, type: "power-up" },
            { nft_id: "0xerrerer", value: 7, type: "body" }
          ],
          sold: false,
          owner_id: null
        },
        {
          id: uuidv4(),
          nfts: [
            { nft_id: "0xerrerer", value: 13, type: "engine" },
            { nft_id: "0xerrerer", value: 61, type: "wheel" },
            { nft_id: "0xerrerer", value: 70, type: "power-up" },
            { nft_id: "0xerrerer", value: 9, type: "body" }
          ],
          sold: false,
          owner_id: null
        }
      ]);
    });
};
