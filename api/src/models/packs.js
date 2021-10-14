import { BaseModel } from "./base";

class Packs extends BaseModel {
  nfts;
  static get tableName() {
    return "packs";
  }
}

export { Packs };
