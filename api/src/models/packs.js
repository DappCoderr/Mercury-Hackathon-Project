import { BaseModel } from "./base";
import { Users } from "./Users";
const { Model } = require("objection");

class Packs extends BaseModel {
  nfts;
  sold;
  owner_id;

  static get tableName() {
    return "packs";
  }

  static relationMappings = {
    user_id_1: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "packs.owner_id",
        to: "users.id"
      }
    }
  };
}

export { Packs };
