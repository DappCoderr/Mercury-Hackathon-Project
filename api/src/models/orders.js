import { BaseModel } from "./base";

class Orders extends BaseModel {
  user_id!;
  pack_id!;
  static get tableName() {
    return "orders";
  }
}

export { Orders };