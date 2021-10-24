import { Model } from "objection";
import { v4 as uuidv4 } from "uuid";

class BaseModel extends Model {
  id;
  updated_at;
  created_at;

  $beforeInsert() {
    this.id = uuidv4();
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

export { BaseModel };
