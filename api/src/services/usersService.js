import { Users } from "../models/users";

class UsersService {
  findOrCreateNewUser = async address => {
    console.log("User Address", address);
    if (address) {
      let user = await Users.query().findOne({ address });
      if (!user) {
        user = await Users.query().insertAndFetch({
          address
        });
      }
      return user;
    }
    return null;
  };
}

export default UsersService;
