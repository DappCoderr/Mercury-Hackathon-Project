import { Users } from "../models/users";

class UsersService {
  findOrCreateNewUser = async address => {
    if (address) {
      let user = await Users.query().findOne({ address });
      if (!user) {
        user = await Users.query().insertAndFetch({
          address
        });
      }
      return user;
    }
    throw "Can't create User Entry without Address";
  };

  findUserByAddr = async address => {
    if (address) {
      let user = await Users.query().findOne({ address });
      if (!user) {
        throw "Can't find User Entry with this address";
      }
      return user;
    }
    throw "Can't create User Entry without Address";
  };
}

export default UsersService;
