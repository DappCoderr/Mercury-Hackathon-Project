import { BaseModel } from "./base";
import { Users } from "./users";
const { Model } = require("objection");

class Transactions extends BaseModel {
  tx_user_id;
  transaction_id;
  transaction_status;
  static get tableName() {
    return "transactions";
  }

  static relationMappings = {
    user_id: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "transactions.tx_user_id",
        to: "users.id"
      }
    }
  };
}

export { Transactions };
