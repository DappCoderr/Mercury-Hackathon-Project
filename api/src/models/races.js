import { BaseModel } from "./base";
import { Users } from "./users";
const { Model } = require("objection");

class Races extends BaseModel {
  user_id_1;
  user_id_2;
  car_nft_id_1;
  car_nft_id_2;
  winner;
  request_status; // 0: Requested; 1: Request_accepted, 2: Completed, 3: Request_rejected
  static get tableName() {
    return "races";
  }

  static relationMappings = {
    race_user_id_1: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "races.user_id_1",
        to: "users.id"
      }
    },
    race_user_id_2: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "races.user_id_2",
        to: "users.id"
      }
    }
  };
}

export { Races };
