import { BaseModel } from "./base";
import { Users } from "./users";
import { Packs } from "./packs";

class Orders extends BaseModel {
  user_id!;
  pack_id!;
  static get tableName() {
    return "orders";
  }
  static relationMappings = {
    user_id: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: 'orders.user_id',
        to: 'users.id'
      }
    },
    pack_id: {
      relation: Model.BelongsToOneRelation,
      modelClass: Packs,
      join: {
        from: 'orders.pack_id',
        to: 'packs.id'
      }
    }
  };
}

export { Orders };