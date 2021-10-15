import { BaseModel } from "./base";
import { Users } from "./users";

class Races extends BaseModel {
  user_id_1;
  user_id_2;
  car_nft_id_1;
  car_nft_id_2;
  winner;
  static get tableName() {
    return "races";
  }

  static relationMappings = {
    user_id_1: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "races.user_id_1",
        to: "users.id"
      }
    },
    user_id_2: {
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
