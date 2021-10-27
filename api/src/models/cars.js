import { BaseModel } from "./base";
import { Users } from "./users";
const { Model } = require("objection");

class Cars extends BaseModel {
  user_id;
  car_nft_id;
  car_config_value;
  static get tableName() {
    return "cars";
  }

  static relationMappings = {
    car_user_id: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "cars.user_id",
        to: "users.id"
      }
    }
  };
}

export { Cars };
