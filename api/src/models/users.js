import { BaseModel } from "./base";

class Users extends BaseModel {
  address;
  static get tableName() {
    return "users";
  }
}

export { Users };
