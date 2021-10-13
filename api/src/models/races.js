import { BaseModel } from "./base";

class Races extends BaseModel {
  user_id_1!;
  user_id_2!;
  car_nft_id_1!
  car_nft_id_2!
  winner!;
  static get tableName() {
    return "races";
  }
}

export { Races };